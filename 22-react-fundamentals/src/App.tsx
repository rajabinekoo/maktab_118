import React from "react";
import { Input } from "./components/input";
import { className } from "./utils/classNames";

function App() {
  // const [username, setUsername] = React.useState<string>("");
  // const [password, setPassword] = React.useState<string>("");

  // const handleUsername: React.ChangeEventHandler<HTMLInputElement> = (
  //   event
  // ) => {
  //   setUsername(event.target.value);
  // };

  // const handlePassword: React.ChangeEventHandler<HTMLInputElement> = (
  //   event
  // ) => {
  //   setPassword(event.target.value);
  // };

  const [values, setValues] = React.useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  const inputChangeHandler = (
    inputType: "username" | "password",
    value: string
  ) => {
    setValues({ ...values, [inputType]: value });
  };

  const submit = () => {
    console.log(values);
  };

  return (
    <main className="pt-20 bg-slate-50 min-h-screen px-3">
      <section
        className={className(
          "bg-white border border-slate-200 rounded-xl",
          "shadow-md max-w-[600px] w-full mx-auto px-7 py-8"
        )}
      >
        <p className="text-xl font-semibold">Login</p>
        <Input
          placeholder="Username"
          label="Username"
          onChangeHandler={(value) => inputChangeHandler("username", value)}
        />
        <Input
          placeholder="Password"
          label="Password"
          type="password"
          onChangeHandler={(value) => inputChangeHandler("password", value)}
          validator={(value) => value?.length >= 8}
        />

        <button
          onClick={submit}
          className={className(
            "bg-black rounded-xl text-white",
            "text-lg font-semibold w-full py-2 mt-5",
            "disabled:bg-slate-600"
          )}
        >
          Submit
        </button>
      </section>
    </main>
  );
}

export default App;
