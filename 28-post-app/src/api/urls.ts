export const urls = {
  posts: {
    list: "/posts",
    byId: (id: number) => `/posts/${id}`,
  },
  users: {
    list: "/users",
    byId: (id: number) => `/users/${id}`,
  },
};
