import axios from "axios";
import { getSession } from "@/utils/session";

export const generateAxiosInstance = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: { Authorization: getSession() },
  });
};
