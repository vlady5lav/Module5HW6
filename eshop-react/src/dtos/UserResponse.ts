export interface UserResponse {
  id: number;
  email: string;
  avatar?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  mobile?: string | number;
  password?: string;
  age?: number;
  gender?: number;
}
