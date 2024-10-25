import { ITodo } from "../types/todo.type";
import { useAppDispatch } from "../redux/hook";
import { todoActions } from "../redux/features/todo.slice";

export const TodoCard: React.FC<ITodo> = ({ id, title, completed }) => {
  const dispatch = useAppDispatch();

  const remove = () => {
    dispatch(todoActions.removeTodo(id));
  };

  const toggle = () => {
    if (completed) {
      dispatch(todoActions.inprogress(id));
    } else {
      dispatch(todoActions.complete(id));
    }
  };

  return (
    <div className="bg-white border-gray-200 rounded-lg shadow-md px-3 py-2">
      <p className="text-lg font-semibold overflow-hidden truncate">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
        <button
          onClick={toggle}
          className="bg-blue-500 text-white font-semibold px-3 py-1 rounded-lg"
        >
          {completed ? "Inprogress" : "Complete"}
        </button>
        <button
          onClick={remove}
          className="bg-red-500 text-white font-semibold px-3 py-1 rounded-lg"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
