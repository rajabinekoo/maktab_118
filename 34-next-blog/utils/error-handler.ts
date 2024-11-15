import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const errorHandler = (error: AxiosError) => {
  if (typeof error.message === "string") {
    toast.error(error.message);
  }
};
