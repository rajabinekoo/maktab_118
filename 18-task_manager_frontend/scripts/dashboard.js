import { errorHandler } from "../libs/error-handler";
import { getUserInfo } from "../apis/services/user.service";
import { getUserTasks } from "../apis/services/task.service";
import { removeSessionToken } from "../libs/session-manager";
import {
  initTaskCardListeners,
  taskCardGenerator,
} from "../components/task-card";

const tasksListContainer = document.getElementById("tasks-list-container");

const username = document.getElementById("username");
document.getElementById("logout-btn").addEventListener("click", () => {
  removeSessionToken();
  window.location.href = "/";
});

async function fetchUserInfo() {
  try {
    const response = await getUserInfo();
    username.innerText = response.username;
    username.setAttribute("title", response.username);
  } catch (error) {
    errorHandler(error);
  }
}

async function renderTasks(list) {
  tasksListContainer.innerHTML = list
    .map((el) => taskCardGenerator(el))
    .join(" ");
}

async function init() {
  fetchUserInfo();
  const list = await getUserTasks();
  renderTasks(list);
  initTaskCardListeners(list, renderTasks);
}

init();
