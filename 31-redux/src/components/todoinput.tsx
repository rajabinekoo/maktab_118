import React from "react";
import { useAppDispatch } from "../redux/hook";
import { todoActions } from "../redux/features/todo.slice";

export const TodoInput: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const dispatch = useAppDispatch();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const add = () => {
    dispatch(todoActions.addTodo(value));
    setValue("");
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md shadow-md w-full px-2 py-1"
      />
      <button
        onClick={add}
        className="bg-green-500 text-white font-semibold px-3 py-1 rounded-lg"
      >
        Add
      </button>
    </div>
  );
};
