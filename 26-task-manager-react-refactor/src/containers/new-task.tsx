import * as React from "react";
import { AxiosError } from "axios";

import { toast } from "react-toastify";
import { addTask } from "../apis/task";
import { Input } from "../components/input";
import { classNames } from "../utils/classNames";
import { ICreateTaskReqDto } from "../types/task";

export const NewTaskForm: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [serverError, setServerError] = React.useState<string>("");
  const [values, setValues] = React.useState<ICreateTaskReqDto>({
    title: "",
    description: "",
  });
  const [errors, setErrors] = React.useState<ICreateTaskReqDto>({
    title: "",
    description: "",
  });

  const onValueChange = (field: keyof ICreateTaskReqDto, value: string) => {
    const newValues = { ...values };
    newValues[field] = value;
    setValues(newValues);
    const newErrors = { ...errors };
    newErrors[field] = "";
    setErrors(newErrors);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await addTask(values);
      toast.success("Created");
      setTimeout(() => {
        window.location.href = "/tasks";
      }, 2000);
    } catch (error: unknown) {
      const err = error as AxiosError;
      const response = err.response?.data as { message: Array<string> };
      if (Array.isArray(response?.message)) {
        const newErrors: ICreateTaskReqDto = {
          title: "",
          description: "",
        };
        for (const msg of response.message) {
          if (msg.includes("title")) {
            newErrors.title = msg;
          } else if (msg.includes("description")) {
            newErrors.description = msg;
          } else setServerError(msg);
        }
        setErrors(newErrors);
      } else if (typeof response?.message === "string") {
        setServerError(response.message);
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className="mt-5 space-y-5">
      <Input
        label="Title"
        placeholder="title"
        value={values.title}
        error={errors.title}
        onChange={(e) => onValueChange("title", e.target.value)}
      />
      <Input
        type="description"
        label="Description"
        placeholder="description"
        value={values.description}
        error={errors.description}
        onChange={(e) => onValueChange("description", e.target.value)}
      />
      <button
        disabled={loading}
        className={classNames(
          "text-white bg-gray-800 w-full py-1",
          "rounded-sm font-medium hover:bg-gray-700",
          "disabled:bg-gray-400"
        )}
      >
        <span>Add</span>
      </button>
      <p
        className={classNames(
          !serverError ? "hidden" : "block",
          "text-xs font-medium text-red-500"
        )}
      >
        {serverError}
      </p>
    </form>
  );
};
