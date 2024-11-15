"use client";

import React from "react";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { classNames } from "@/utils/classname";
import { getBlogsList } from "@/apis/client/blogs";
import { errorHandler } from "@/utils/error-handler";
import { BlogCard, BlogCardSkeleton } from "@/components/blog-card";

export const BlogsList: React.FC = () => {
  const list = useQuery({
    queryKey: ["blogs-list"],
    queryFn: () => getBlogsList(),
  });

  React.useEffect(() => {
    if (!list.isError || !list.error) return;
    errorHandler(list.error as AxiosError);
  }, [list.isError, list.error]);

  return (
    <main
      className={classNames(
        "mx-auto container py-10 px-5 sm:px-2 grid gap-6",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      )}
    >
      {(list.isPending || list.isError) &&
        [1, 2, 3, 4, 5, 6, 7, 8].map((el) => <BlogCardSkeleton key={el} />)}

      {(list.data?.items || []).map((el, index) => (
        <BlogCard key={index} {...el} />
      ))}
    </main>
  );
};
