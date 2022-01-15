import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { IoCTypes } from '../ioc';
import { Cart, CartProduct, Product } from '../models';
import type { CartService } from '../services';
import type { ProductService } from '../services/ProductService';
import { AuthStore } from './';

@injectable()
export default class CartStore {
  cart: Cart | undefined = undefined;
  cartProducts: CartProduct[] = [];
  carts: Cart[] = [];
  cartsIndex = Number(-1);
  error = '';
  userId = Number(-1);
  isLoading = true;
  productsCart: { product: Product; count: number }[] = [];

  constructor(
    @inject(IoCTypes.authStore)
    private readonly authStore: AuthStore,
    @inject(IoCTypes.cartService)
    private readonly cartService: CartService,
    @inject(IoCTypes.productService)
    private readonly productService: ProductService
  ) {
    makeAutoObservable(this);
    this.updateCartState();
  }

  public updateCartState = (): void => {
    this.cart = undefined;
    this.cartProducts = [];
    this.carts = [];
    this.cartsIndex = -1;
    this.error = '';
    this.userId = -1;

    try {
      this.userId = this.authStore.userId ?? -1;
      this.carts = this.cartService.getCarts();
      this.cartsIndex = this.carts.map((c) => c.userId).indexOf(this.userId) ?? -1;
      if (this.cartsIndex >= 0) {
        this.cart = this.carts[this.cartsIndex];
      } else {
        this.cart = { userId: this.userId, userProducts: [] };
        this.cartsIndex = -1;
      }
      this.cartProducts = this.cart.userProducts ?? [];
    } catch (e) {
      if (e instanceof Error) {
        this.error = e.message;
      }
    }
  };

  public getProductsCart = async (): Promise<void> => {
    try {
      this.isLoading = true;
      this.productsCart = [];
      this.updateCartState();
      this.cartProducts.map(async (cp) => this.productsCart.push({ product: await this.productService.getById(cp.productId), count: cp.productCount }));
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
    this.isLoading = false;
  };

  public addItem = (id: number): void => {
    try {
      this.updateCartState();
      const index = this.cartProducts.map((cp) => cp.productId).indexOf(id);
      if (index >= 0) {
        this.cartProducts[index].productCount += 1;
      } else {
        this.cartProducts.push({ productId: id, productCount: Number(1) });
      }
      if (this.cartsIndex >= 0) {
        this.carts[this.cartsIndex].userProducts = this.cartProducts;
      } else {
        this.carts.push({ userId: this.userId, userProducts: this.cartProducts });
      }
      if (this.carts) {
        this.cartService.setCarts(this.carts);
      }
      this.updateCartState();
    } catch (e) {
      if (e instanceof Error) {
        this.updateCartState();
        this.error = e.message;
      }
    }
  };

  public getItemCount = (id: number): number => {
    try {
      const index = this.cartProducts.map((cp) => cp.productId).indexOf(id);
      if (index >= 0) {
        const productCount = this.cartProducts[index].productCount;
        return productCount;
      } else {
        return Number(0);
      }
    } catch (e) {
      if (e instanceof Error) {
        this.error = e.message;
      }
      return 0;
    }
  };

  public moveItemsToUser = (): void => {
    try {
      const unregisteredUserIndex = this.carts.map((c) => c.userId).indexOf(-1);
      if (unregisteredUserIndex >= 0) {
        const unregisteredUserProducts = this.carts[unregisteredUserIndex].userProducts;
        if (unregisteredUserProducts.length > 0 && this.userId > -1) {
          const registeredUserIndex = this.carts.map((c) => c.userId).indexOf(this.userId);
          if (registeredUserIndex >= 0) {
            const registeredUserProducts = this.carts[registeredUserIndex].userProducts;
            if (registeredUserProducts.length > 0) {
              for (const reg of registeredUserProducts) {
                let i = 0;
                for (const unreg of unregisteredUserProducts) {
                  if (unreg.productId === reg.productId) {
                    reg.productCount += unreg.productCount;
                    unregisteredUserProducts.splice(i, 1);
                    i++;
                  }
                }
              }
              registeredUserProducts.push(...unregisteredUserProducts);
              this.carts[registeredUserIndex].userProducts = registeredUserProducts;
            } else {
              this.carts[registeredUserIndex].userProducts = unregisteredUserProducts;
            }
          } else {
            this.carts.push({ userId: this.userId, userProducts: unregisteredUserProducts });
          }
          this.carts.splice(unregisteredUserIndex, 1);
          this.cartService.setCarts(this.carts);
        }
      }
      this.updateCartState();
    } catch (e) {
      if (e instanceof Error) {
        this.updateCartState();
        this.error = e.message;
      }
    }
  };

  public removeItem = (id: number): void => {
    try {
      this.updateCartState();
      const index = this.cartProducts.map((cp) => cp.productId).indexOf(id);
      if (index >= 0) {
        const productCount = this.cartProducts[index].productCount;
        if (productCount > 1) {
          this.cartProducts[index].productCount -= 1;
        } else {
          this.cartProducts.splice(index, 1);
        }
        this.carts[this.cartsIndex].userProducts = this.cartProducts;
        this.cartService.setCarts(this.carts);
      } else {
        this.error = 'There is no such item in your cart to remove!';
      }
      this.updateCartState();
    } catch (e) {
      if (e instanceof Error) {
        this.updateCartState();
        this.error = e.message;
      }
    }
  };
}
