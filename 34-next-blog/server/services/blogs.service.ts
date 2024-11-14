"use server";

import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

await pb.admins.authWithPassword(
  "ali.rajabinekoo@gmail.com",
  "9LAqKG422VncVzzHhBu0SUJtHliAoinr"
);

type blogsListType = (_: IPocketBasePagination) => Promise<any>;
export const blogsList: blogsListType = async ({ page, perPage }) => {
  return await pb.collection("blogs").getList(page, perPage, {
    sort: "-created",
  });
};

type blogByIdType = (_: string) => Promise<any>;
export const blogById: blogByIdType = async (id: string) => {
  try {
    return await pb.collection("blogs").getFirstListItem(`id="${id}"`);
  } catch {
    return undefined;
  }
};
