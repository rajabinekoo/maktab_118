import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./instance";
import { authSchemaType } from "@/server/validations/auth.validation";

type loginType = (_: authSchemaType) => Promise<{ token: string }>;
export const login: loginType = async (body) => {
  const instance = generateAxiosInstance();
  const response = await instance.post(urls.auth, body);
  return response.data;
};
