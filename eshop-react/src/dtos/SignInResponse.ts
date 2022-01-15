import { UserDto } from '.';

export interface SignInResponse {
  accessToken: string;
  user: UserDto;
}
