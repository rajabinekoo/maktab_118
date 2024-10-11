import React from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchPostsList } from "../api/posts.api";

export const PostsPage: React.FC = () => {
  const posts = useQuery({
    queryKey: ["fetching-posts"],
    queryFn: fetchPostsList,
  });

  React.useEffect(() => {
    console.log(posts.data);
  }, [posts]);

  React.useEffect(() => {
    if (!posts.error || !posts.isError) return;
    throw new Error("AAA");
    // passing AAA to error boundary
  }, [posts.error, posts.isError]);

  return <p>posts list page</p>;
};
