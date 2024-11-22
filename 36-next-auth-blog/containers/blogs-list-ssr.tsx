export const dynamic = "force-dynamic";

import React from "react";
import { cookies } from "next/headers";

import { classNames } from "@/utils/classname";
import { BlogCard } from "@/components/blog-card";
import { blogsList } from "@/server/services/blogs.service";
import { authorization } from "@/server/services/bloggers.service";

export const BlogsListSSR: React.FC = async () => {
  const cookie = await cookies();
  const session = cookie.get("session");
  const authorized = !session?.value
    ? false
    : await authorization(session.value);
  const list = await blogsList({ page: 1, perPage: 10, hide: !authorized });
  return (
    <main
      className={classNames(
        "mx-auto container pb-10 pt-5 px-5 sm:px-2 grid gap-6",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      )}
    >
      {list.items.map((el, index) => (
        <BlogCard key={index} {...el} />
      ))}
    </main>
  );
};
