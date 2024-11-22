export const urls = {
  blogs: {
    list: "/blog",
    create: "/blog",
    remove: (id: string) => `/blog/${id}`,
  },
  auth: "/auth",
  files: {
    storage: (collectionId: string, recordId: string, fileName: string) =>
      `${process.env.NEXT_PUBLIC_FILES_URL}/${collectionId}/${recordId}/${fileName}`,
  },
};
