import React, { useContext } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";

import { ITask } from "../types/task";
import { errorHandler } from "../utils/errorHandler";
import { TaskCard, TaskCardSkeleton } from "../components/task-card";
import {
  removeTask,
  completeTask,
  getTasksList,
  inprogressTask,
} from "../apis/task";
import { TaskListContext } from "../providers/tasks-list.provider";

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

export const TasksList: React.FC = () => {
  const [tasksState, dispatch] = React.useReducer<reducerType>(reducer, []);
  const { tasks, addTask } = useContext(TaskListContext);

  // fetching
  const fetchTasks = useQuery({
    queryKey: ["fetching-tasks-list"],
    queryFn: getTasksList,
    retry: 1,
  });

  // synchronization (with server database)
  const removeTaskMutation = useMutation({
    mutationFn: removeTask,
  });
  const completeTaskMutation = useMutation({
    mutationFn: completeTask,
  });
  const inprogressTaskMutation = useMutation({
    mutationFn: inprogressTask,
  });

  const addTaskTest = () => {
    addTask({
      description: "sassdasdasd",
      title: "aaa",
      isCompleted: false,
      id: -1,
    });
  };

  const remove = async (id: number) => {
    try {
      await removeTaskMutation.mutateAsync(id);
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
      await completeTaskMutation.mutateAsync(id);
      dispatch({ payload: id, type: "done" });
      toast.success("Updated");
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  const inprogress = async (id: number) => {
    try {
      await inprogressTaskMutation.mutateAsync(id);
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
      <button onClick={addTaskTest}>add task test</button>
      {tasks.map((el) => (
        <TaskCard
          key={el.id}
          done={done}
          remove={remove}
          loading={fetchTasks.isPending}
          inprogress={inprogress}
          {...el}
        />
      ))}
      <p className="font-semibold text-xl">Inprogress Tasks List</p>
      {(fetchTasks.isPending ||
        inprogressTaskMutation.isPending ||
        completeTaskMutation.isPending ||
        removeTaskMutation.isPending) && (
        <>
          {[1, 2, 3].map((el) => (
            <TaskCardSkeleton key={el} />
          ))}
        </>
      )}
      {fetchTasks.isSuccess &&
        !(
          inprogressTaskMutation.isPending ||
          completeTaskMutation.isPending ||
          removeTaskMutation.isPending
        ) &&
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
      {(fetchTasks.isPending ||
        inprogressTaskMutation.isPending ||
        completeTaskMutation.isPending ||
        removeTaskMutation.isPending) && (
        <>
          {[1, 2, 3].map((el) => (
            <TaskCardSkeleton key={el} />
          ))}
        </>
      )}
      {fetchTasks.isSuccess &&
        !(
          inprogressTaskMutation.isPending ||
          completeTaskMutation.isPending ||
          removeTaskMutation.isPending
        ) &&
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
