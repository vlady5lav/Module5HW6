import { ProductDto } from './ProductDto';

export interface ProductsDto {
  data: ProductDto[];
  total_pages: number;
}
