export const urls = {
  user: { info: "/user" },
  auth: { login: "/auth/login", signup: "/auth/signup" },
  task: {
    list: "/task",
    create: "/task",
    done: (id: number) => `/task/done/${id}`,
    removeById: (id: number) => `/task/${id}`,
    inprogress: (id: number) => `/task/inprogress/${id}`,
  },
};
