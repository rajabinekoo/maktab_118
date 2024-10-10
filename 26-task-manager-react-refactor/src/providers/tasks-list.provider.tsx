import React from "react";
import { ITask } from "../types/task";

type tasksListContextType = { tasks: ITask[]; addTask: (_: ITask) => void };
export const TaskListContext = React.createContext<tasksListContextType>({
  tasks: [],
  addTask: () => undefined,
});

interface ITasksListProviderProps {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
}

export const TasksListProvider: React.FC<ITasksListProviderProps> = ({
  children,
}) => {
  const [tasks, setTasks] = React.useState<ITask[]>([]);

  const addTask = (data: ITask) => {
    console.log(data);

    setTasks([...tasks, data]);
  };

  return (
    <TaskListContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskListContext.Provider>
  );
};
