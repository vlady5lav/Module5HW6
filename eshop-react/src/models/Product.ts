import { ProductDetails } from './ProductDetails';

export interface Product {
  id: number;
  image?: string;
  manufacturer?: string;
  model?: string;
  modelDescription?: string;
  price?: number;
  details?: ProductDetails;
}
