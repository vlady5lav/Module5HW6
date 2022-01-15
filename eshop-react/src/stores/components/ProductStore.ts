import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { IoCTypes } from '../../ioc';
import i18n from '../../locales/config';
import type { Product } from '../../models/Product';
import type ProductService from '../../services/ProductService';

@injectable()
export default class ProductStore {
  product: Product | null = null;
  isLoading = false;
  error = '';
  queryString = '';

  constructor(
    @inject(IoCTypes.productService)
    private readonly productService: ProductService
  ) {
    makeAutoObservable(this);
  }

  public search = async () => {
    this.error = '';

    try {
      this.isLoading = true;
      const id = Number(this.queryString);

      if (id === NaN) {
        this.queryString = '';
        this.error = i18n.t('product:error.input');
        return;
      }

      const result = await this.productService.getById(id);

      this.product = { ...result };
    } catch (e) {
      if (e instanceof Error) {
        this.queryString = '';
        this.error = e.message;
      }
    }
    this.isLoading = false;
  };

  public changeQueryString = (query: string): void => {
    this.queryString = query;
  };
}
