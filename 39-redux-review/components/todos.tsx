"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchTodos } from "@/redux/slices/todo-slice";

export const Todos: React.FC = () => {
  const { todos, isError, isLoading, error } = useAppSelector(
    (state) => state.todo
  );
  const dispatch = useAppDispatch();

  if (isError) return <p>{error}</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="bg-white border border-gray-200 rounded-lg py-4 px-5 max-w-[500px] w-full">
      <div className="mb-4">
        {todos.map((el, index) => {
          return (
            <p key={index} className={el.completed ? "line-through" : ""}>
              {el.todo}
            </p>
          );
        })}
      </div>
      <button
        onClick={() => dispatch(fetchTodos(1))}
        className="w-full py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-lg font-semibold"
      >
        Fetch todos
      </button>
    </section>
  );
};
