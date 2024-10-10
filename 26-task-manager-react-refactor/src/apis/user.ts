import { urls } from "../utils/url";
import { IUser } from "../types/user";
import { generateClient } from "./client";

type getUserInfoType = () => Promise<IUser>;
export const getUserInfo: getUserInfoType = async () => {
  const client = generateClient();
  const response = await client.get(urls.user.info);
  return response.data;
};
