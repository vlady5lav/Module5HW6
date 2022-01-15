import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { IoCTypes } from '../../ioc';
import i18n from '../../locales/config';
import type { User } from '../../models/User';
import type UserService from '../../services/UserService';

@injectable()
export default class UserStore {
  user: User | null = null;
  isLoading = false;
  error = '';
  queryString = '';

  constructor(@inject(IoCTypes.userService) private readonly userService: UserService) {
    makeAutoObservable(this);
  }

  public search = async () => {
    this.error = '';
    try {
      this.isLoading = true;
      const id = Number(this.queryString);
      if (id === NaN) {
        this.queryString = '';
        this.error = i18n.t('user:error.input');
        return;
      }
      const result = await this.userService.getById(id);
      this.user = { ...result };
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
