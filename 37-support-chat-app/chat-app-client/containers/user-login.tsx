"use client";

import React from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { Input } from "@/components/input";
import { signup } from "@/apis/auth.service";
import { setToken } from "@/utils/token-management";
import { errorHandler } from "@/utils/error-handler";
import { SocketContext } from "@/providers/socket.provider";

export const UserLoginContainer: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const { resetSocket } = React.useContext(SocketContext);
  const { push } = useRouter();

  const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = async () => {
    if (!email?.trim?.()) return;
    try {
      const response = await signup({ email });
      setToken(response.access_token);
      resetSocket();
      push("/chat");
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  return (
    <div className="space-y-5 w-full">
      <p className="text-lg font-semibold text-center">User Login</p>
      <Input
        onChange={onChangeEmail}
        value={email}
        placeholder="your email"
        label="Email Address"
      />
      <button
        onClick={onSubmit}
        className="bg-slate-900 rounded-lg text-white w-full py-1"
      >
        <span className="text-sm font-semibold">Login</span>
      </button>
    </div>
  );
};
