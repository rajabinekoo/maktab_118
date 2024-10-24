import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/login.validation";
import { Input } from "./input";

interface ILoginForm {
  username: string;
  password: string;
}

interface ILoginFormProps {
  editValues?: ILoginForm;
}

export const LoginForm: React.FC<ILoginFormProps> = ({ editValues }) => {
  const formField = useForm<ILoginForm>({
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });
  const submit = (data: ILoginForm) => console.log(data);

  // watchdog
  const passwordWatch = formField.watch("password");
  React.useEffect(() => {
    console.log(passwordWatch);
  }, [passwordWatch]);

  React.useEffect(() => {
    if (!editValues) return;
    formField.reset(editValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editValues]);

  return (
    <form
      className="flex flex-col mx-auto max-w-[500px] w-full bg-white py-4 px-5 rounded-lg shadow-md my-10 space-y-3"
      onSubmit={formField.handleSubmit(submit)}
    >
      <p>Login</p>
      {/* <input
        type="text"
        placeholder="username"
        {...formField.register("username")}
      />
      {!!formField.formState.errors.username && (
        <p>{formField.formState.errors.username.message}</p>
      )} */}
      <Controller
        control={formField.control}
        name="username"
        render={({ field, fieldState }) => (
          <Input
            type="username"
            label="username"
            placeholder="username"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={formField.control}
        render={({ field, fieldState }) => (
          <Input
            type="password"
            label="password"
            placeholder="password"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <button
        className="bg-gray-900 hover:bg-gray-700 text-white font-semibold py-1 rounded-xl"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
