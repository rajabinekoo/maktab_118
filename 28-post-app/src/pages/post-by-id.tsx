import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Navigate,
  useParams,
  useLoaderData,
  LoaderFunctionArgs,
} from "react-router-dom";

import { IPost } from "../types/posts.type";
import { fetchPostById } from "../api/posts.api";

export const PostById: React.FC = () => {
  const { id } = useParams();
  const loaderData = useLoaderData();
  const validId = !isNaN(Number(id));

  console.log(loaderData);

  const post = useQuery({
    queryKey: ["fetching-posts", id],
    queryFn: () => fetchPostById(Number(id)),
    enabled: validId,
  });

  if (!validId || (post.error as AxiosError)?.status === 404) {
    return <Navigate to="/404" />;
  }

  return <p>post id: {post.data?.id}</p>;
};

export const fetchPostByIdLoader = async (data: LoaderFunctionArgs) => {
  let post: IPost | undefined = undefined;
  try {
    post = await fetchPostById(Number(data.params.id));
  } catch (error) {
    console.log("error", error);
  }
  return { post };
};
