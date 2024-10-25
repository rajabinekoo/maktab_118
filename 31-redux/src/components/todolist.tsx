import React from "react";
import { useAppSelector } from "../redux/hook";

export const TodoList: React.FC = () => {
  const todoList = useAppSelector((state) => state.todo.list);

  React.useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  return <p>list</p>;
};
