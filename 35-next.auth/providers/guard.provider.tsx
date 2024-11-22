"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const GuardProvider: React.FC<{
  children: React.ReactNode;
  restrict?: boolean;
}> = ({ children, restrict = true }) => {
  const { status } = useSession();
  const { push } = useRouter();

  React.useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated") return;
    if (restrict) push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, restrict]);

  return <>{children}</>;
};
