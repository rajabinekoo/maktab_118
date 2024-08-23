import { urls } from "../urls";
import { httpClient } from "../client";

export async function newTask(data) {
  const response = await httpClient().post(urls.task.new, data);
  return response.data;
}

export async function getUserTasks() {
  const response = await httpClient().get(urls.task.list);
  return response.data;
}

export async function setTaskAsDone(id) {
  const response = await httpClient().patch(urls.task.done(id));
  return response.data;
}

export async function setTaskAsInprogress(id) {
  const response = await httpClient().patch(urls.task.inprogress(id));
  return response.data;
}

export async function deleteTask(id) {
  const response = await httpClient().delete(urls.task.delete(id));
  return response.data;
}
