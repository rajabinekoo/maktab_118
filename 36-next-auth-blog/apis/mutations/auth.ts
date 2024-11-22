import { useMutation } from "@tanstack/react-query";

import { login } from "../client/auth";
import { createBlog, removeBlogById } from "../client/blogs";

export const useLogin = () => {
  return useMutation({ mutationFn: login, mutationKey: ["login"] });
};

export const useRemoveBlog = () => {
  return useMutation({
    mutationFn: removeBlogById,
    mutationKey: ["remove-blog"],
  });
};

export const useCreateBlog = () => {
  return useMutation({
    mutationFn: createBlog,
    mutationKey: ["create-blog"],
    retry: 0,
    retryDelay: 0,
  });
};
