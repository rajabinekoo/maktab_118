"use server";

import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

await pb.admins.authWithPassword(
  "ali.rajabinekoo@gmail.com",
  "9LAqKG422VncVzzHhBu0SUJtHliAoinr"
);

type blogsListType = (
  _: IPocketBasePagination
) => Promise<IPocketBaseList<IBlog>>;
export const blogsList: blogsListType = async ({ page, perPage }) => {
  return await pb.collection("blogs").getList(page, perPage, {
    sort: "-created",
    filter: "hide=False",
  });
};

type blogByIdType = (_: string) => Promise<IBlog | undefined>;
export const blogById: blogByIdType = async (id: string) => {
  try {
    return await pb.collection("blogs").getFirstListItem(`id="${id}"`);
  } catch {
    return undefined;
  }
};

type createBlogType = (_: FormData) => Promise<boolean>;
export const createBlog: createBlogType = async (data) => {
  try {
    await pb.collection("blogs").create(data);
    return true;
  } catch {
    return false;
  }
};

// hide patch
type patchBlogType = (_1: string, _2: boolean) => Promise<boolean>;
export const patchBlog: patchBlogType = async (id, hide) => {
  try {
    await pb.collection("blogs").update(id, { hide });
    return true;
  } catch {
    return false;
  }
};

type deleteBlogType = (_: string) => Promise<boolean>;
export const deleteBlog: deleteBlogType = async (id) => {
  try {
    await pb.collection("blogs").delete(id);
    return true;
  } catch {
    return false;
  }
};

type updateBlogType = (_1: string, _2: FormData) => Promise<boolean>;
export const updateBlog: updateBlogType = async (id, data) => {
  try {
    await pb.collection("blogs").update(id, data);
    return true;
  } catch {
    return false;
  }
};
