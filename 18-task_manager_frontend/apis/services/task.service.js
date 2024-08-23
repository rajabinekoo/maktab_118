import { urls } from "../urls";
import { httpClient } from "../client";

export async function newTask(data) {
  const response = await httpClient().post(urls.task.new, data);
  return response.data;
}
