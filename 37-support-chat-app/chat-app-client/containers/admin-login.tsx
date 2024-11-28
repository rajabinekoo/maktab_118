"use client";

import React from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { Input } from "@/components/input";
import { login } from "@/apis/auth.service";
import { setToken } from "@/utils/token-management";
import { errorHandler } from "@/utils/error-handler";

export const AdminLoginContainer: React.FC = () => {
  const [refreshToken, setRefreshToken] = React.useState<string>("");
  const { push } = useRouter();

  const onChangeRefreshToken: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setRefreshToken(event.target.value);
  };

  const onSubmit = async () => {
    if (!refreshToken?.trim?.()) return;
    try {
      const response = await login({ refresh_token: refreshToken });
      setToken(response.access_token);
      push("/admin/rooms");
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  return (
    <div className="space-y-5 w-full">
      <p className="text-lg font-semibold text-center">Admin Login</p>
      <Input
        onChange={onChangeRefreshToken}
        value={refreshToken}
        placeholder="refresh_token"
        label="Refresh Token"
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
