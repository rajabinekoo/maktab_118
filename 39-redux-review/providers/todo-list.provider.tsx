"use client";

import React from "react";

import { fetchTodos } from "@/redux/slices/todo-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export const TodoListProvider: React.FC<IChildren> = ({ children }) => {
  const { success } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (success) return;
    dispatch(fetchTodos());
  }, [success]);

  return <>{children}</>;
};
