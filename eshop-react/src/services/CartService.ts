import { inject, injectable } from 'inversify';
import { IoCTypes } from '../ioc';
import { Cart } from '../models';
import { default as LocalStorageService, KeyType } from '../services/LocalStorageService';

export interface CartService {
  getCarts(): Cart[];
  setCarts(cart: Cart[]): void;
}

@injectable()
export default class DefaultCartService implements CartService {
  public constructor(
    @inject(IoCTypes.localStorageService)
    private readonly localStorageService: LocalStorageService
  ) {}

  public getCarts(): Cart[] {
    return this.localStorageService.getJson<Cart[]>(KeyType.Carts) ?? [];
  }

  public setCarts(cart: Cart[]): void {
    this.localStorageService.setJson<Cart[]>(KeyType.Carts, cart);
  }
}
