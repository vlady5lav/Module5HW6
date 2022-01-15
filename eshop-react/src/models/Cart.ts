import { CartProduct } from '.';

export interface Cart {
  userId: number;
  userProducts: CartProduct[];
}
