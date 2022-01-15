import { ProductDatailsDto } from './ProductDetailsDto';

export interface ProductDto {
  id: number;
  image?: string;
  manufacturer?: string;
  model?: string;
  modelDescription?: string;
  price?: number;
  details?: ProductDatailsDto;
}
