"use client";

/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";

const PanelPage: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div>
      <img src={session?.user?.image || ""} alt="avatar" />
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
    </div>
  );
};

export default PanelPage;
