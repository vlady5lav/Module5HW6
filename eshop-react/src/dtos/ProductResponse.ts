import { ProductDatailsDto } from '.';

export interface ProductResponse {
  id: number;
  image?: string;
  manufacturer?: string;
  model?: string;
  modelDescription?: string;
  price?: number;
  details?: ProductDatailsDto;
}
