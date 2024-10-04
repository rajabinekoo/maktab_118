import React from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { ITask } from "../types/task";
import { TaskCard, TaskCardSkeleton } from "../components/task-card";
import { errorHandler } from "../utils/errorHandler";
import {
  completeTask,
  getTasksList,
  inprogressTask,
  removeTask,
} from "../apis/task";

export const TasksList: React.FC = () => {
  const [list, setList] = React.useState<ITask[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchTasksList = async () => {
    try {
      const response = await getTasksList();
      setList(response);
    } catch (error) {
      errorHandler(error as AxiosError);
    }
    setLoading(false);
  };

  const remove = async (id: number) => {
    setLoading(true);
    try {
      await removeTask(id);
      setList(list.filter((el) => Number(el.id) !== Number(id)));
      toast.success("Removed");

      // offload
      // fetchTasksList();
    } catch (error) {
      errorHandler(error as AxiosError);
    }
    setLoading(false);
  };

  const done = async (id: number) => {
    setLoading(true);
    try {
      await completeTask(id);
      setList(
        list.map((el) => {
          if (Number(el.id) === Number(id)) {
            return { ...el, isCompleted: true };
          }
          return el;
        })
      );
      toast.success("Updated");
    } catch (error) {
      errorHandler(error as AxiosError);
    }
    setLoading(false);
  };

  const inprogress = async (id: number) => {
    setLoading(true);
    try {
      await inprogressTask(id);
      setList(
        list.map((el) => {
          if (Number(el.id) === Number(id)) {
            return { ...el, isCompleted: false };
          }
          return el;
        })
      );
      toast.success("Updated");
    } catch (error) {
      errorHandler(error as AxiosError);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchTasksList();
  }, []);

  return (
    <section className="grid grid-cols-1 max-w-[600px] mx-auto gap-y-4 pt-24 pb-10 px-2">
      <p className="font-semibold text-xl">Inprogress Tasks List</p>
      {loading && !list.length && (
        <>
          {[1, 2, 3].map((el) => (
            <TaskCardSkeleton key={el} />
          ))}
        </>
      )}
      {list
        .filter((el) => !el.isCompleted)
        .map((el) => (
          <TaskCard
            key={el.id}
            done={done}
            remove={remove}
            loading={loading}
            inprogress={inprogress}
            {...el}
          />
        ))}

      <p className="font-semibold text-xl mt-10">Completed Tasks List</p>
      {loading && !list.length && (
        <>
          {[1, 2, 3].map((el) => (
            <TaskCardSkeleton key={el} />
          ))}
        </>
      )}
      {list
        .filter((el) => el.isCompleted)
        .map((el) => (
          <TaskCard
            key={el.id}
            done={done}
            remove={remove}
            loading={loading}
            inprogress={inprogress}
            {...el}
          />
        ))}
    </section>
  );
};
