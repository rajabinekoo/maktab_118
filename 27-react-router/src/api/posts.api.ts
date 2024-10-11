import { urls } from "./urls";
import { generateClient } from "./client";
import { IPost } from "../types/posts.type";
import { IResDto } from "../types/global.type";

interface IFetchPostsResDto extends IResDto {
  posts: IPost[];
}
type fetchPostsListType = () => Promise<IFetchPostsResDto>;
export const fetchPostsList: fetchPostsListType = async () => {
  const client = generateClient();
  const response = await client.get<IFetchPostsResDto>(urls.posts.list);
  return response.data;
};

type fetchPostByIdType = (_: number) => Promise<IPost>;
export const fetchPostById: fetchPostByIdType = async (id: number) => {
  const client = generateClient();
  const response = await client.get<IPost>(urls.posts.byId(id));
  return response.data;
};
