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
