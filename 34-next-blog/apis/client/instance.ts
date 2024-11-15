import axios from "axios";

export const generateAxiosInstance = () => {
  const token = localStorage.getItem(
    process.env.NEXT_PUBLIC_SESSIONS_NAME as string
  );
  console.log(process.env.NEXT_PUBLIC_SERVER_URL);
  
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: { Authorization: token },
  });
};
