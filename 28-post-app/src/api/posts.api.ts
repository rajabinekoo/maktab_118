import { urls } from "./urls";
import { generateClient } from "./client";
import { IPost } from "../types/posts.type";
import { listsLimit } from "../utils/config";
import { IPagination, IResDto } from "../types/global.type";

interface IFetchPostsResDto extends IResDto {
  posts: IPost[];
}
type fetchPostsListType = (_?: IPagination) => Promise<IFetchPostsResDto>;
export const fetchPostsList: fetchPostsListType = async (params) => {
  const client = generateClient();
  const response = await client.get<IFetchPostsResDto>(urls.posts.list, {
    params: { limit: params?.limit || listsLimit, skip: params?.skip || 0 },
  });
  return response.data;
};

type fetchPostByIdType = (_: number) => Promise<IPost>;
export const fetchPostById: fetchPostByIdType = async (id: number) => {
  const client = generateClient();
  const response = await client.get<IPost>(urls.posts.byId(id));
  return response.data;
};
