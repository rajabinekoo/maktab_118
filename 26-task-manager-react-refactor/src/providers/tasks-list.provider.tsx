import React from "react";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { ITask } from "../types/task";
import { getTasksList } from "../apis/task";
import { errorHandler } from "../utils/errorHandler";

type actionType = "set-list" | "add" | "done" | "inprogress" | "remove";
type action = { type: actionType; payload: number | ITask[] | ITask };
type reducerType = (state: ITask[], action: action) => ITask[];
const reducer: reducerType = (state, action) => {
  switch (action.type) {
    case "set-list":
      return action.payload as ITask[];
    case "add":
      return [...state, action.payload as ITask];
    case "remove":
      return state.filter((el) => Number(el.id) !== Number(action.payload));
    case "done":
      return state.map((el) => {
        if (Number(el.id) === Number(action.payload)) {
          return { ...el, isCompleted: true };
        }
        return el;
      });
    case "inprogress":
      return state.map((el) => {
        if (Number(el.id) === Number(action.payload)) {
          return { ...el, isCompleted: false };
        }
        return el;
      });
  }
};

type tasksListContextType = {
  tasks: ITask[];
  dispatch: React.Dispatch<action>;
  isPending?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
};
export const TaskListContext = React.createContext<tasksListContextType>({
  tasks: [],
  dispatch: () => undefined,
  isPending: true,
  isError: false,
  isSuccess: false,
});

interface ITasksListProviderProps {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
}

export const TasksListProvider: React.FC<ITasksListProviderProps> = ({
  children,
}) => {
  const [tasks, dispatch] = React.useReducer<reducerType>(reducer, []);

  // fetching
  const fetchTasks = useQuery({
    queryKey: ["fetching-tasks-list"],
    queryFn: getTasksList,
    retry: 1,
    enabled: !tasks?.length,
  });

  React.useEffect(() => {
    if (tasks?.length) return;
    if (!fetchTasks.isSuccess || !fetchTasks.data) return;
    dispatch({ type: "set-list", payload: fetchTasks.data });
  }, [fetchTasks.isSuccess, fetchTasks.data, tasks]);

  React.useEffect(() => {
    if (!fetchTasks.isError || !fetchTasks.error) return;
    errorHandler(fetchTasks.error as AxiosError);
  }, [fetchTasks.isError, fetchTasks.error]);

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        dispatch,
        isPending: fetchTasks.isPending,
        isSuccess: fetchTasks.isSuccess,
        isError: fetchTasks.isError,
      }}
    >
      {children}
    </TaskListContext.Provider>
  );
};
