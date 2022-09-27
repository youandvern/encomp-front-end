export default interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserRegisterDto {
  email: string;
  password: string;
}
