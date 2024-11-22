"use client";

import React from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Input } from "./input";
import { setSession } from "@/utils/session";
import { classNames } from "@/utils/classname";
import { useLogin } from "@/apis/mutations/auth";
import { errorHandler } from "@/utils/error-handler";
import {
  authSchema,
  authSchemaType,
} from "@/server/validations/auth.validation";

export const LoginForm: React.FC = () => {
  const loginForm = useForm<authSchemaType>({
    resolver: zodResolver(authSchema),
  });

  const login = useLogin();
  const { push } = useRouter();

  const onSubmit = (data: authSchemaType) => {
    login.mutate(data);
  };

  React.useEffect(() => {
    if (!login.data || !login.isSuccess) return;
    setSession(login.data.token);
    push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login.data, login.isSuccess]);

  React.useEffect(() => {
    if (!login.error || !login.isError) return;
    errorHandler(login.error as AxiosError);
  }, [login.error, login.isError]);

  return (
    <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="username"
        control={loginForm.control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            error={error?.message}
            label="username"
            placeholder="username"
          />
        )}
      />
      <Controller
        name="password"
        control={loginForm.control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            error={error?.message}
            label="password"
            placeholder="password"
          />
        )}
      />
      <button
        type="submit"
        className={classNames(
          "py-2 px-1 w-full bg-slate-800 hover:bg-slate-700",
          "text-white text-sm rounded-md font-semibold"
        )}
      >
        Submit
      </button>
    </form>
  );
};
