"use client";

import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import React from "react";

export const LoginBtn: React.FC = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = React.useState<INextAuthProvider[]>([]);

  const fetchProviders = async () => {
    const response = await getProviders();
    const providersList = Object.values(response as object);
    setProviders(providersList);
  };

  React.useEffect(() => {
    fetchProviders();
  }, []);

  console.log(session);

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <section className="flex justify-center py-10 w-screen">
      <div className="max-w-[400px] w-full flex flex-col gap-5 border border-slate-200 p-8 rounded-xl">
        <p className="text-slate-800 text-2xl font-semibold text-center pb-5">
          Login
        </p>
        {providers.map((el, index) => (
          <button
            className="bg-slate-200 hover:bg-slate-300 rounded-xl py-2"
            key={index}
            onClick={() => signIn(el.id)}
          >
            {el.name}
          </button>
        ))}
      </div>
    </section>
  );
};
