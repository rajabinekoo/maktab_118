"use server";

import moment from "moment";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

await pb.admins.authWithPassword(
  "ali.rajabinekoo@gmail.com",
  "9LAqKG422VncVzzHhBu0SUJtHliAoinr"
);

// credential = username + password
type getBloggerByCredentialsType = (
  _username: string,
  _password: string
) => Promise<IUser | undefined>;
export const getBloggerByCredentials: getBloggerByCredentialsType = async (
  username,
  password
) => {
  try {
    return await pb
      .collection("bloggers")
      .getFirstListItem(`username="${username}" && password="${password}"`);
  } catch {
    return undefined;
  }
};

type loginBloggerType = (userId: string, token: string) => Promise<boolean>;
export const loginBlogger: loginBloggerType = async (userId, token) => {
  try {
    const expiration = moment().add(30, "minutes").unix();
    await pb.collection("sessions").create({ userId, token, expiration });
    return true;
  } catch {
    return false;
  }
};

type authorizationType = (token: string) => Promise<boolean>;
export const authorization: authorizationType = async (token) => {
  try {
    const session: ISession = await pb
      .collection("sessions")
      .getFirstListItem(`token="${token}"`);
    if (!session) return false;
    const user = await pb
      .collection("bloggers")
      .getFirstListItem(`id="${session.userId}"`);
    if (!user) return false;
    const valid = moment(session.expiration * 1000).isAfter(moment());
    if (!valid) await pb.collection("sessions").delete(session.id);
    return valid;
  } catch {
    return false;
  }
};
