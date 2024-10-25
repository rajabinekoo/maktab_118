import React from "react";

import { TodoCard } from "./todocard";
import { TodoInput } from "./todoinput";
import { useAppSelector } from "../redux/hook";

export const TodoList: React.FC = () => {
  const todoList = useAppSelector((state) => state.todo.list);

  return (
    <section className="p-2 pt-8 max-w-[500px] mx-auto">
      <TodoInput />
      <div className="pt-8 space-y-4">
        <p>Inprogress Todo List</p>
        {todoList
          .filter((el) => !el.completed)
          .map((el) => (
            <TodoCard key={el.id} {...el} />
          ))}

        <p className="pt-8">Completed Todo List</p>
        {todoList
          .filter((el) => el.completed)
          .map((el) => (
            <TodoCard key={el.id} {...el} />
          ))}
      </div>
    </section>
  );
};
