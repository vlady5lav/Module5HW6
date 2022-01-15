import { UserDto } from './';

export interface SignUpResponse {
  accessToken: string;
  user: UserDto;
}
