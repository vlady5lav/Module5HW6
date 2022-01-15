import { UserDto } from './UserDto';

export interface UsersDto {
  data: UserDto[];
  total_pages: number;
}
