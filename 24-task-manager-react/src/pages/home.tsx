import * as React from "react";

import { IAuthDto } from "../types/auth";
import { Input } from "../components/input";
import { classNames } from "../utils/classNames";
import { UsernameValidation } from "../validators/username-validation";
import { PasswordValidation } from "../validators/password-validation";
import { login } from "../apis/auth";
import { AxiosError } from "axios";
import { setSession } from "../utils/session-management";

export const Home: React.FC = () => {
  const [disable, setDisable] = React.useState<boolean>(true);
  const [firstLoad, setFirstLoad] = React.useState<boolean>(true);
  const [values, setValues] = React.useState<IAuthDto>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<IAuthDto>({
    username: "",
    password: "",
  });
  const [serverError, setServerError] = React.useState<string>("");

  const onValueChange = (field: keyof IAuthDto, value: string) => {
    const newValues = { ...values };
    newValues[field] = value;
    setValues(newValues);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      const response = await login(values);
      setSession(response.token);
      window.location.href = "/test";
    } catch (error: unknown) {
      const err = error as AxiosError;
      const response = err.response?.data as { message: Array<string> };
      if (Array.isArray(response?.message)) {
        const newErrors: IAuthDto = {
          username: "",
          password: "",
        };
        for (const msg of response.message) {
          if (msg.includes("username")) {
            newErrors.username = msg;
          } else if (msg.includes("password")) {
            newErrors.password = msg;
          } else setServerError(msg);
        }
        setErrors(newErrors);
      } else if (typeof response?.message === "string") {
        setServerError(response.message);
      }
    }
  };

  React.useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    const usernameError = UsernameValidation(values.username);
    const passwordError = PasswordValidation(values.password);
    const newErrors: IAuthDto = {
      username: "",
      password: "",
    };
    if (usernameError) newErrors.username = usernameError;
    if (passwordError) newErrors.password = passwordError;
    if (usernameError || passwordError) setDisable(true);
    setDisable(!!usernameError || !!passwordError);
    setErrors(newErrors);
    setServerError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <main className="px-2 pt-20 bg-slate-200 min-h-screen">
      <section className="max-w-[500px] w-full mx-auto bg-white shadow-lg py-4 px-6 rounded-lg">
        <p className="text-2xl font-semibold">Login</p>
        <form onSubmit={onSubmit} className="mt-5 space-y-5">
          <Input
            label="Username"
            placeholder="username"
            value={values.username}
            error={errors.username}
            onChange={(e) => onValueChange("username", e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            placeholder="password"
            value={values.password}
            error={errors.password}
            onChange={(e) => onValueChange("password", e.target.value)}
          />
          <button
            disabled={disable || !!serverError}
            className={classNames(
              "text-white bg-gray-800 w-full py-1",
              "rounded-sm font-medium hover:bg-gray-700",
              "disabled:bg-gray-400"
            )}
          >
            <span>Submit</span>
          </button>
          <p
            className={classNames(
              !serverError ? "hidden" : "block",
              "text-xs font-medium text-red-500"
            )}
          >
            {serverError}
          </p>
        </form>
      </section>
    </main>
  );
};
