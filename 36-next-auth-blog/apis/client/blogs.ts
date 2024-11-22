import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./instance";

type getBlogsListType = (
  _?: Partial<IPocketBasePagination>
) => Promise<IPocketBaseList<IBlog>>;
export const getBlogsList: getBlogsListType = async (params) => {
  const instance = generateAxiosInstance();
  const response = await instance.get(urls.blogs.list, { params });
  return response.data;
};

type removeBlogByIdType = (_: string) => Promise<IPocketBaseList<IBlog>>;
export const removeBlogById: removeBlogByIdType = async (id) => {
  const instance = generateAxiosInstance();
  const response = await instance.delete(urls.blogs.remove(id));
  return response.data;
};

type createBlogType = (_: {
  data: FormData;
  signal?: AbortSignal;
  progressCb?: (_?: number) => void;
}) => Promise<{ message: string }>;
export const createBlog: createBlogType = async ({
  data,
  signal,
  progressCb,
}) => {
  const instance = generateAxiosInstance({ progressCb, signal });
  const response = await instance.post(urls.blogs.create, data);
  return response.data;
};
