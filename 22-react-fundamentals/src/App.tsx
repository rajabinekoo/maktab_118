import { useState } from "react";
import { className } from "./utils/classNames";

function App() {
  const [username, setUsername] = useState<string>("");

  const onChangeUsernameHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setUsername(event.target.value);
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
        <div className="flex flex-col gap-y-2 mt-4">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={onChangeUsernameHandler}
            className="border border-slate-300 rounded-xl px-2 py-2"
          />
        </div>
      </section>
    </main>
  );
}

export default App;
