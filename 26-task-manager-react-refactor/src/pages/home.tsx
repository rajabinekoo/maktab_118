import * as React from "react";

import { LoginForm } from "../containers/login-form";
import { SignupForm } from "../containers/signup-form";

export const Home: React.FC = () => {
  const [form, setForm] = React.useState<1 | 2>(1);

  const changeForm = (formNumber: 1 | 2) => {
    setForm(formNumber);
  };

  return (
    <main className="px-2 pt-20 bg-slate-200 min-h-screen">
      <section className="max-w-[500px] w-full mx-auto bg-white shadow-lg py-4 px-6 rounded-lg">
        {form === 1 ? (
          <>
            <p className="text-2xl font-semibold">Login</p>
            <LoginForm />
            <div className="flex justify-center w-full mt-3">
              <button
                onClick={() => changeForm(2)}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Signup
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-2xl font-semibold">Signup</p>
            <SignupForm />
            <div className="flex justify-center w-full mt-3">
              <button
                onClick={() => changeForm(1)}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Login
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
};
