import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { delSession } from "./session-management";

interface IBackendError {
  message: Array<string> | string;
}
export const errorHandler = (err: AxiosError) => {
  const response = err.response?.data as IBackendError;
  if (Array.isArray(response?.message)) {
    for (const msg of response.message) {
      toast.error(msg);
    }
  } else if (typeof response?.message === "string") {
    toast.error(response.message);
  }
  if (err.status === 403) {
    delSession();
    window.location.href = "/";
  }
};
