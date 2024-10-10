import { urls } from "../utils/url";
import { generateClient } from "./client";
import { IAuthDto, ILoginResDto } from "../types/auth";

type loginType = (_: IAuthDto) => Promise<ILoginResDto>;
export const login: loginType = async (body) => {
  const client = generateClient();
  const response = await client.post(urls.auth.login, body);
  return response.data;
};

type signupType = (_: IAuthDto) => Promise<ILoginResDto>;
export const signup: signupType = async (body) => {
  const client = generateClient();
  const response = await client.post(urls.auth.signup, body);
  return response.data;
};
