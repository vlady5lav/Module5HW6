import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { IoCTypes } from '../../ioc';
import type { Product } from '../../models/Product';
import type ProductService from '../../services/ProductService';

@injectable()
export default class ProductsStore {
  products: Product[] = [];
  isLoading = false;
  totalPages = 0;
  currentPage = 1;
  pageLimit = 10;

  constructor(
    @inject(IoCTypes.productService)
    private readonly productService: ProductService
  ) {
    makeAutoObservable(this);
  }

  public init = async (limit = 10) => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('_page');
    this.currentPage = Number(page ?? this.currentPage);
    this.pageLimit = Number(urlParams.get('_limit') ?? limit);

    try {
      this.isLoading = true;
      const result = await this.productService.getByPage(this.currentPage, Number(this.pageLimit));
      this.products = result.data;
      this.totalPages = result.total_pages;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
    this.isLoading = false;
  };

  public changePage = async (page: number) => {
    this.currentPage = page;
  };
}
