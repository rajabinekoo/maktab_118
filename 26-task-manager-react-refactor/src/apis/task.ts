import { urls } from "../utils/url";
import { ICreateTaskReqDto, ITask } from "../types/task";
import { generateClient } from "./client";

type getTasksListType = () => Promise<ITask[]>;
export const getTasksList: getTasksListType = async () => {
  const client = generateClient();
  const response = await client.get(urls.task.list);
  return response.data;
};

type removeTaskType = (_: number) => Promise<void>;
export const removeTask: removeTaskType = async (id) => {
  const client = generateClient();
  await client.delete(urls.task.removeById(id));
};

type completeTaskType = (_id: number) => Promise<void>;
export const completeTask: completeTaskType = async (id) => {
  const client = generateClient();
  await client.patch(urls.task.done(id));
};

type inprogressTaskType = (_id: number) => Promise<void>;
export const inprogressTask: inprogressTaskType = async (id) => {
  const client = generateClient();
  await client.patch(urls.task.inprogress(id));
};

type addTaskType = (_: ICreateTaskReqDto) => Promise<ITask>;
export const addTask: addTaskType = async (body) => {
  const client = generateClient();
  const response = await client.post<ITask>(urls.task.create, body);
  return response.data;
};
