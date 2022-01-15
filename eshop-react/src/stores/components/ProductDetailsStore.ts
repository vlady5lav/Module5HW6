import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { IoCTypes } from '../../ioc';
import type { Product } from '../../models';
import { ProductService } from '../../services';

@injectable()
export default class ProductDetailsStore {
  product: Product | null = null;
  isLoading = false;
  error = '';

  constructor(@inject(IoCTypes.productService) private readonly productService: ProductService) {
    makeAutoObservable(this);
  }

  public init = async (id: string | undefined) => {
    this.error = '';
    try {
      this.isLoading = true;
      const result = await this.productService.getById(Number(id));
      this.product = { ...result };
    } catch (e) {
      if (e instanceof Error) {
        this.error = e.message;
      }
    }
    this.isLoading = false;
  };
}
