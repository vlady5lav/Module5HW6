import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import type { ProductDto, ProductResponse, ProductsDto } from '../dtos';
import { IoCTypes } from '../ioc';
import type { Product } from '../models';
import type { HttpService } from './HttpService';
import { MethodType } from './HttpService';

export interface ProductService {
  getById(id: number): Promise<Product>;
  getByPage(page: number): Promise<ProductsDto>;
}

@injectable()
export default class DefaultProductService implements ProductService {
  public constructor(@inject(IoCTypes.httpService) private readonly httpService: HttpService) {}

  public async getById(id: number): Promise<Product> {
    const result = await this.httpService.send<ProductResponse>(`products/${id}`, MethodType.GET);
    return result.data;
  }

  public async getByPage(page: number, limit = 10): Promise<ProductsDto> {
    const result = await this.httpService.send<ProductDto[]>(`products?_page=${page}&_limit=${limit}`, MethodType.GET);
    const data = result.data;
    const headers = result.headers;
    const total_pages = this.GetPagesCount(headers);
    return { data: data, total_pages: total_pages };
  }

  private GetPagesCount(headers: Headers) {
    const lastPage = headers.get('Link')?.split(',').pop();
    let total_pages = 0;
    if (!!lastPage) {
      const startIndex = lastPage.indexOf('?_page=') + 7;
      const stopIndex = lastPage.indexOf('&_limit') === Number(-1) ? lastPage.indexOf('>') : lastPage.indexOf('&_limit');
      total_pages = lastPage.endsWith('rel="last"') ? parseInt(lastPage.substring(startIndex, stopIndex)) : Number(1);
    } else {
      total_pages = Number(1);
    }
    return total_pages;
  }
}
