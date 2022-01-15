import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { IoCTypes } from '../../ioc';
import type { User } from '../../models/User';
import UserService from '../../services/UserService';

@injectable()
export default class UserProfileStore {
  user: User | null = null;
  isLoading = false;
  error = '';

  constructor(@inject(IoCTypes.userService) private readonly userService: UserService) {
    makeAutoObservable(this);
  }

  public init = async (id: string | undefined) => {
    this.error = '';
    try {
      this.isLoading = true;
      const result = await this.userService.getById(Number(id));
      this.user = { ...result };
    } catch (e) {
      if (e instanceof Error) {
        this.error = e.message;
      }
    }
    this.isLoading = false;
  };
}
