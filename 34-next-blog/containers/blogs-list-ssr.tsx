import React from "react";

import { classNames } from "@/utils/classname";
import { BlogCard } from "@/components/blog-card";
import { blogsList } from "@/server/services/blogs.service";

export const BlogsListSSR: React.FC = async () => {
  const list = await blogsList({ page: 1, perPage: 10 });
  return (
    <main
      className={classNames(
        "mx-auto container py-10 px-5 sm:px-2 grid gap-6",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      )}
    >
      {list.items.map((el, index) => (
        <BlogCard key={index} {...el} />
      ))}
    </main>
  );
};
