import { IUser } from "./user";

// Data Transfer Object
export interface IAuthDto {
  username: string;
  password: string;
}

export interface ILoginResDto {
  user: IUser;
  token: string;
}
