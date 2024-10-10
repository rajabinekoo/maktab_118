import { Link } from "wouter";
import { IoMdArrowBack } from "react-icons/io";

import { NewTaskForm } from "../containers/new-task";
export const NewTask: React.FC = () => {
  return (
    <main className="bg-slate-200 min-h-screen w-full pt-0.5">
      <section className="bg-white shadow-md rounded-lg mx-auto w-full max-w-[600px] p-5 mt-24">
        <div className="flex items-center gap-x-2">
          <Link href="/tasks">
            <IoMdArrowBack className="w-5 h-5" />
          </Link>
          <p className="font-semibold text-2xl text-gray-700">New Task</p>
        </div>
        <NewTaskForm />
      </section>
    </main>
  );
};
