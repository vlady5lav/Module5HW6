import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { AuthStore } from '..';
import { IoCTypes } from '../../ioc';
import type { User } from '../../models/User';
import UserService from '../../services/UserService';

@injectable()
export default class OwnUserProfileStore {
  user: User | null = null;
  isLoading = false;
  error = '';
  token = '';
  id = -1;

  constructor(
    @inject(IoCTypes.userService)
    private readonly userService: UserService,
    @inject(IoCTypes.authStore)
    private readonly authStore: AuthStore
  ) {
    makeAutoObservable(this);
  }

  public init = async () => {
    this.error = '';
    try {
      this.id = this.authStore.userId ?? Number(-1);
      this.isLoading = true;
      const result = await this.userService.getById(this.id);
      this.user = {
        ...result,
      };
    } catch (e) {
      if (e instanceof Error) {
        this.error = e.message;
      }
    }
    this.isLoading = false;
  };
}
