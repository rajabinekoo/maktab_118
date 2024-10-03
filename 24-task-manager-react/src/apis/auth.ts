import { urls } from "../utils/url";
import { IAuthDto, ILoginResDto } from "../types/auth";
import { generateClient } from "./client";

type loginType = (_: IAuthDto) => Promise<ILoginResDto>;
export const login: loginType = async (body) => {
  const client = generateClient();
  const response = await client.post(urls.login, body);
  return response.data;
};
