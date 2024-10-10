import React from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

import { errorHandler } from "../utils/errorHandler";
import { TaskListContext } from "../providers/tasks-list.provider";
import { TaskCard, TaskCardSkeleton } from "../components/task-card";
import { removeTask, completeTask, inprogressTask } from "../apis/task";

export const TasksList: React.FC = () => {
  const { tasks, dispatch, ...fetching } = React.useContext(TaskListContext);

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

  return (
    <section className="grid grid-cols-1 max-w-[600px] mx-auto gap-y-4 pt-24 pb-10 px-2">
      <p className="font-semibold text-xl">Inprogress Tasks List</p>
      {(fetching?.isPending ||
        inprogressTaskMutation.isPending ||
        completeTaskMutation.isPending ||
        removeTaskMutation.isPending) && (
        <>
          {[1, 2, 3].map((el) => (
            <TaskCardSkeleton key={el} />
          ))}
        </>
      )}
      {fetching?.isSuccess &&
        !(
          inprogressTaskMutation.isPending ||
          completeTaskMutation.isPending ||
          removeTaskMutation.isPending
        ) &&
        tasks
          .filter((el) => !el.isCompleted)
          .map((el) => (
            <TaskCard
              key={el.id}
              done={done}
              remove={remove}
              loading={fetching?.isPending}
              inprogress={inprogress}
              {...el}
            />
          ))}

      <p className="font-semibold text-xl mt-10">Completed Tasks List</p>
      {(fetching?.isPending ||
        inprogressTaskMutation.isPending ||
        completeTaskMutation.isPending ||
        removeTaskMutation.isPending) && (
        <>
          {[1, 2, 3].map((el) => (
            <TaskCardSkeleton key={el} />
          ))}
        </>
      )}
      {fetching?.isSuccess &&
        !(
          inprogressTaskMutation.isPending ||
          completeTaskMutation.isPending ||
          removeTaskMutation.isPending
        ) &&
        tasks
          .filter((el) => el.isCompleted)
          .map((el) => (
            <TaskCard
              key={el.id}
              done={done}
              remove={remove}
              loading={fetching.isPending}
              inprogress={inprogress}
              {...el}
            />
          ))}
    </section>
  );
};
