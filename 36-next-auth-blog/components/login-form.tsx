"use client";

import React from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { setSession } from "@/utils/session";

const LoginBtnSkeleton: React.FC = () => {
  return (
    <div className="bg-slate-300 animate-pulse rounded-xl h-12 w-full"></div>
  );
};

const LoginBtn: React.FC<INextAuthProvider> = ({ id, name }) => {
  return (
    <button
      onClick={() => signIn(id)}
      className="bg-slate-300 hover:bg-slate-400 rounded-xl h-12 w-full"
    >
      {name}
    </button>
  );
};

export const LoginForm: React.FC = () => {
  const [providers, setProviders] = React.useState<INextAuthProvider[]>([]);
  const { data: session } = useSession();

  const fetchProviders = async () => {
    const response = await getProviders();
    const providersList = Object.values(response as object);
    setProviders(providersList);
  };

  React.useEffect(() => {
    fetchProviders();
  }, []);

  React.useEffect(() => {
    if (!session?.token) return;
    setSession(session?.token as string);
  }, [session]);

  if (!!session?.token) {
    return (
      <>
        <button
          onClick={() => signOut()}
          className="bg-slate-300 hover:bg-slate-400 rounded-xl h-12 w-full"
        >
          Sign out
        </button>
      </>
    );
  }

  return (
    <>
      {!providers?.length && [1, 2].map((el) => <LoginBtnSkeleton key={el} />)}
      {!!providers?.length &&
        providers.map((el, index) => <LoginBtn key={index} {...el} />)}
    </>
  );
};
