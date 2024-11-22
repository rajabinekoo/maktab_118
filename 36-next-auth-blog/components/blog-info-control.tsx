"use client";

import React from "react";
import { getSession } from "@/utils/session";
import { RemoveBlog } from "./blog-remove";

export const BlogInfoController: React.FC = () => {
  const isAdmin = React.useMemo(() => {
    const session = getSession();
    return !!session;
  }, []);

  if (!isAdmin) return <></>;

  return (
    <div className="flex gap-x-2">
      <button className="px-2 py-1 rounded-lg bg-orange-400">Update</button>
      <RemoveBlog />
    </div>
  );
};
