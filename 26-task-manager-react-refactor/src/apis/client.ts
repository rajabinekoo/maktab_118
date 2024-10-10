import axios from "axios";
import { getSession } from "../utils/session-management";

const serverUrl = "http://localhost:3000";
export const generateClient = () => {
  const session = getSession();
  return axios.create({
    baseURL: serverUrl,
    headers: { Authorization: `Bearer ${session}` },
  });
};
