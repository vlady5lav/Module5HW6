import { Container } from 'inversify';
import type { AuthenticationService } from '../services/AuthenticationService';
import DefaultAuthenticationService from '../services/AuthenticationService';
import type { CartService } from '../services/CartService';
import DefaultCartService from '../services/CartService';
import type { HttpService } from '../services/HttpService';
import DefaultHttpService from '../services/HttpService';
import type { LocalStorageService } from '../services/LocalStorageService';
import DefaultLocalStorageService from '../services/LocalStorageService';
import type { ProductService } from '../services/ProductService';
import DefaultProductService from '../services/ProductService';
import type { UserService } from '../services/UserService';
import DefaultUserService from '../services/UserService';
import {
  AuthStore,
  CartStore,
  OwnUserProfileStore,
  ProductDetailsStore,
  ProductsStore,
  ProductStore,
  SignInStore,
  SignUpStore,
  UserProfileStore,
  UsersStore,
  UserStore,
} from '../stores';
import { IoCTypes } from './';

export const IoCContainer = new Container();

IoCContainer.bind<AuthenticationService>(IoCTypes.authenticationService).to(DefaultAuthenticationService).inSingletonScope();
IoCContainer.bind<AuthStore>(IoCTypes.authStore).to(AuthStore).inSingletonScope();
IoCContainer.bind<CartService>(IoCTypes.cartService).to(DefaultCartService).inSingletonScope();
IoCContainer.bind<CartStore>(IoCTypes.cartStore).to(CartStore).inSingletonScope();
IoCContainer.bind<HttpService>(IoCTypes.httpService).to(DefaultHttpService).inSingletonScope();
IoCContainer.bind<LocalStorageService>(IoCTypes.localStorageService).to(DefaultLocalStorageService).inSingletonScope();
IoCContainer.bind<SignInStore>(IoCTypes.signInStore).to(SignInStore).inTransientScope();
IoCContainer.bind<OwnUserProfileStore>(IoCTypes.ownUserProfileStore).to(OwnUserProfileStore).inTransientScope();
IoCContainer.bind<ProductDetailsStore>(IoCTypes.productDetailsStore).to(ProductDetailsStore).inTransientScope();
IoCContainer.bind<ProductService>(IoCTypes.productService).to(DefaultProductService).inSingletonScope();
IoCContainer.bind<ProductsStore>(IoCTypes.productsStore).to(ProductsStore).inTransientScope();
IoCContainer.bind<ProductStore>(IoCTypes.productStore).to(ProductStore).inTransientScope();
IoCContainer.bind<SignUpStore>(IoCTypes.signUpStore).to(SignUpStore).inTransientScope();
IoCContainer.bind<UserProfileStore>(IoCTypes.userProfileStore).to(UserProfileStore).inTransientScope();
IoCContainer.bind<UserService>(IoCTypes.userService).to(DefaultUserService).inSingletonScope();
IoCContainer.bind<UsersStore>(IoCTypes.usersStore).to(UsersStore).inTransientScope();
IoCContainer.bind<UserStore>(IoCTypes.userStore).to(UserStore).inTransientScope();

export default IoCContainer;
