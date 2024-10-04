import { urls } from "../utils/url";
import { ITask } from "../types/task";
import { generateClient } from "./client";

type getTasksListType = () => Promise<ITask[]>;
export const getTasksList: getTasksListType = async () => {
  const client = generateClient();
  const response = await client.get(urls.task.list);
  return response.data;
};
