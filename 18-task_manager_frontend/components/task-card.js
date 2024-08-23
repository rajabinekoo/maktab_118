import { XIcon } from "./x-icon";
import { toast } from "../libs/toast";
import { CheckIcon } from "./check-icon";
import { errorHandler } from "../libs/error-handler";
import {
  deleteTask,
  setTaskAsDone,
  setTaskAsInprogress,
} from "../apis/services/task.service";

export function initTaskCardListeners(tasksList, renderCB) {
  window.removeTask = async (id) => {
    try {
      tasksList = tasksList.filter((el) => Number(el.id) !== Number(id));
      renderCB(tasksList);
      toast("Removed successfully", "success");
      await deleteTask(id);
    } catch (error) {
      errorHandler(error);
    }
  };

  window.completeTrigger = async (id, isCompleted) => {
    try {
      tasksList = tasksList.map((el) => {
        if (Number(el.id) === Number(id)) {
          return { ...el, isCompleted: !isCompleted };
        }
        return el;
      });
      renderCB(tasksList);
      toast("Updated successfully", "success");
      if (isCompleted) {
        await setTaskAsInprogress(id);
      } else {
        await setTaskAsDone(id);
      }
    } catch (error) {
      errorHandler(error);
    }
  };
}

export function taskCardGenerator({ id, isCompleted, description, title }) {
  return `
    <div
      class="w-full border border-gray-200 rounded-xl shadow-lg py-3 px-4 bg-white space-y-2"
    >
      <div class="flex justify-between items-center">
        <p class="text-lg font-semibold">${title}</p>
        ${
          isCompleted
            ? CheckIcon("size-6 text-green-600")
            : XIcon("size-6 text-red-500")
        }
      </div>
      <p class="text-gray-600 text-sm font-medium line-clamp-2">${description}</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 pt-2 gap-3">
        <button
          onClick="removeTask('${id}')"
          class="border-2 border-red-500 rounded-xl text-red-500 font-semibold hover:bg-red-100 py-1"
        >
          Remove
        </button>
        <button
          onClick="completeTrigger('${id}', ${isCompleted})"
          class="border-2 border-slate-500 rounded-xl text-slate-500 font-semibold hover:bg-slate-100 py-1"
        >
          ${isCompleted ? "Inprogress" : "Done"}
        </button>
      </div>
    </div>`;
}
