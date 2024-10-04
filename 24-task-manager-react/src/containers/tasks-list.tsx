import React from "react";
import { ITask } from "../types/task";
import { getTasksList } from "../apis/task";

export const TasksList: React.FC = () => {
  const [list, setList] = React.useState<ITask[]>([]);

  const fetchTasksList = async () => {
    try {
      const response = await getTasksList();
      setList(response);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchTasksList();
  }, []);

  return (
    <div>
      {list.map((el) => (
        <p key={el.id}>{el.title}</p>
      ))}
    </div>
  );
};
