import moment from "moment";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import type { Session, AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import {
  createUser,
  createSession,
  findUserByEmail,
  delSessionByToken,
  getSessionByToken,
} from "@/server/services/bloggers.service";

const sessionChecker = async (token: JWT, nextAuthSession: Session | null) => {
  if (!!nextAuthSession && !!token) {
    const session = await getSessionByToken(token.accessToken as string);
    const valid = moment((session?.expiration || 0) * 1000).isAfter(moment());
    if (!!session && valid) return true;
    if (!!session) await delSessionByToken(session.id);

    let existUser = await findUserByEmail(token.email?.toLowerCase() || "");
    if (!existUser) {
      const newUser = await createUser({
        name: token.name as string,
        avatar: token.picture as string,
        email: (token.email as string).toLowerCase(),
      });
      if (!newUser) return false;
      existUser = newUser;
    }
    return await createSession(
      existUser.id,
      token.accessToken as string,
      moment(nextAuthSession.expires).unix()
    );
  }
};

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET_KEY as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_KEY as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (!!account && !!token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }): Promise<{ token: string }> {
      const success = await sessionChecker(token, session);
      return { token: success ? (token.accessToken as string) : "" };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 1800,
  },
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
