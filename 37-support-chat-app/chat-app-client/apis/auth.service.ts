import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./client";

type loginFuncType = (_: ILoginReqDto) => Promise<ILoginResDto>;
export const login: loginFuncType = async (body) => {
  const client = generateAxiosInstance();
  const response = await client.post(urls.auth.login, body);
  return response.data;
};

type signupFuncType = (_: ISignupReqDto) => Promise<ISignupResDto>;
export const signup: signupFuncType = async (body) => {
  const client = generateAxiosInstance();
  const response = await client.post(urls.auth.signup, body);
  return response.data;
};
