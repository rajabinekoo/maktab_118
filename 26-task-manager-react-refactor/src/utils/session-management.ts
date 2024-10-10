const sessionKey = "task-manager-session";

export const getSession = () => {
  return window.localStorage.getItem(sessionKey);
};

export const setSession = (value: string) => {
  return window.localStorage.setItem(sessionKey, value);
};

export const delSession = () => {
  return window.localStorage.removeItem(sessionKey);
};
