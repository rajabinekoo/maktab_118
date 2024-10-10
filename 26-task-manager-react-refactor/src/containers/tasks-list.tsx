import React from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { ITask } from "../types/task";
import { TaskCard, TaskCardSkeleton } from "../components/task-card";
import { errorHandler } from "../utils/errorHandler";
import {
  removeTask,
  completeTask,
  getTasksList,
  inprogressTask,
} from "../apis/task";
import { useQuery } from "@tanstack/react-query";

type actionType = "set-list" | "done" | "inprogress" | "remove";
type action = { type: actionType; payload: number | ITask[] };
type reducerType = (state: ITask[], action: action) => ITask[];
const reducer: reducerType = (state, action) => {
  switch (action.type) {
    case "set-list":
      return action.payload as ITask[];
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

export const TasksList: React.FC = () => {
  const [tasksState, dispatch] = React.useReducer<reducerType>(reducer, []);

  const fetchTasks = useQuery({
    queryKey: ["fetching-tasks-list"],
    queryFn: getTasksList,
    retry: 1,
  });

  const remove = async (id: number) => {
    try {
      await removeTask(id);
      dispatch({ payload: id, type: "remove" });
      toast.success("Removed");

      // offload
      // fetchTasksList();
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  const done = async (id: number) => {
    try {
      await completeTask(id);
      dispatch({ payload: id, type: "done" });
      toast.success("Updated");
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  const inprogress = async (id: number) => {
    try {
      await inprogressTask(id);
      dispatch({ payload: id, type: "inprogress" });
      toast.success("Updated");
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  React.useEffect(() => {
    if (!fetchTasks.isSuccess || !fetchTasks.data) return;
    dispatch({ type: "set-list", payload: fetchTasks.data });
  }, [fetchTasks.isSuccess, fetchTasks.data]);

  React.useEffect(() => {
    if (!fetchTasks.isError || !fetchTasks.error) return;
    errorHandler(fetchTasks.error as AxiosError);
  }, [fetchTasks.isError, fetchTasks.error]);

  return (
    <section className="grid grid-cols-1 max-w-[600px] mx-auto gap-y-4 pt-24 pb-10 px-2">
      <p className="font-semibold text-xl">Inprogress Tasks List</p>
      {fetchTasks.isPending && (
        <>
          {[1, 2, 3].map((el) => (
            <TaskCardSkeleton key={el} />
          ))}
        </>
      )}
      {fetchTasks.isSuccess &&
        tasksState
          .filter((el) => !el.isCompleted)
          .map((el) => (
            <TaskCard
              key={el.id}
              done={done}
              remove={remove}
              loading={fetchTasks.isPending}
              inprogress={inprogress}
              {...el}
            />
          ))}

      <p className="font-semibold text-xl mt-10">Completed Tasks List</p>
      {fetchTasks.isPending && (
        <>
          {[1, 2, 3].map((el) => (
            <TaskCardSkeleton key={el} />
          ))}
        </>
      )}
      {fetchTasks.isSuccess &&
        tasksState
          .filter((el) => el.isCompleted)
          .map((el) => (
            <TaskCard
              key={el.id}
              done={done}
              remove={remove}
              loading={fetchTasks.isPending}
              inprogress={inprogress}
              {...el}
            />
          ))}
    </section>
  );
};
