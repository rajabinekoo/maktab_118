import { toast } from "../libs/toast";
import { errorHandler } from "../libs/error-handler";
import { newTask } from "../apis/services/task.service";

const newTaskForm = document.getElementById("new-task-form");
newTaskForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const titleInput = event.target.children[1];
  const descriptionInput = event.target.children[3];

  try {
    await newTask({
      title: titleInput.value,
      description: descriptionInput.value,
    });
    toast("Created successfully", "success");
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
  } catch (error) {
    errorHandler(error);
  }
});
