import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";

import { IPost } from "../types/posts.type";
import { IUser } from "../types/users.type";
import { listsLimit } from "../utils/config";
import { fetchPostsList } from "../api/posts.api";
import { fetchUsersListByIds } from "../api/users.api";
import { PostCard, PostCardSkeleton } from "../components/post-card";

interface IData {
  user: IUser;
  post: IPost;
}

export const PostsPage: React.FC = () => {
  const [page, setPage] = React.useState<number>(1);
  const [data, setData] = React.useState<IData[]>([]);
  const [dataLoading, setDataLoading] = React.useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const posts = useQuery({
    queryKey: ["fetching-posts", page, searchParams.get("tag")],
    queryFn: () =>
      fetchPostsList({
        skip: page * listsLimit - listsLimit,
        tag: searchParams.get("tag"),
      }),
    refetchOnWindowFocus: false,
  });
  const users = useQuery({
    queryKey: [
      "fetching-usesr-by-ids",
      (posts.data?.posts || []).map((el) => String(el.userId)).join(""),
    ],
    queryFn: () =>
      fetchUsersListByIds(
        (posts.data?.posts || []).map((el) => Number(el.userId))
      ),
    enabled: posts.isSuccess,
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    setPage(1);
    setData([]);
  }, [searchParams]);

  React.useEffect(() => {
    if (!posts.error || !posts.isError) return;
    throw new Error("Something went wrong");
    // passing error message to error boundary
  }, [posts.error, posts.isError]);

  React.useEffect(() => {
    if (!posts.isSuccess || !users.isSuccess) return;
    if (!posts.data || !users.data) return;
    setDataLoading(() => true);
    const newData: IData[] = [];
    for (const post of posts.data.posts) {
      const user = users.data.find(
        (el) => Number(el.id) === Number(post.userId)
      ) as IUser;
      newData.push({ user, post });
    }
    setDataLoading(false);
    setData((prevState) => [...prevState, ...newData]);
  }, [posts.isSuccess, users.isSuccess, posts.data, users.data]);

  return (
    <main className="min-h-screen w-full bg-slate-200 px-2">
      <section className="mx-auto max-w-[600px] w-full grid grid-cols-1 gap-y-4 py-10">
        {data.map((item, index) => {
          return (
            <Link key={index} to={`/post-info/${item.post.id}`}>
              <PostCard user={item.user} post={item.post} />
            </Link>
          );
        })}

        {(posts.isLoading || users.isLoading || dataLoading) && (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        )}
        <div className="flex justify-center">
          <button
            disabled={Number(posts.data?.total || -1) < data.length}
            className="bg-slate-400 text-white font-bold text-sm px-2 py-1 rounded-md"
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            Load More
          </button>
        </div>
      </section>
    </main>
  );
};
