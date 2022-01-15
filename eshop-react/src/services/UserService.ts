import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import type { UserDto, UserResponse, UsersDto } from '../dtos';
import { IoCTypes } from '../ioc';
import type { User } from '../models';
import type { HttpService } from './HttpService';
import { MethodType } from './HttpService';

export interface UserService {
  getById(id: number): Promise<UserDto>;
  getByPage(page: number): Promise<UsersDto>;
}

@injectable()
export default class DefaultUserService implements UserService {
  public constructor(@inject(IoCTypes.httpService) private readonly httpService: HttpService) {}

  public async getById(id: number): Promise<User> {
    const result = await this.httpService.send<UserResponse>(`users/${id}`, MethodType.GET);
    return result.data;
  }

  public async getByPage(page: number, limit = 5): Promise<UsersDto> {
    const result = await this.httpService.send<UserDto[]>(`users?_page=${page}&_limit=${limit}`, MethodType.GET);
    const data = result.data;
    const headers = result.headers;
    const total_pages = this.getPagesCount(headers);
    return { data: data, total_pages: total_pages };
  }

  private getPagesCount(headers: Headers) {
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
