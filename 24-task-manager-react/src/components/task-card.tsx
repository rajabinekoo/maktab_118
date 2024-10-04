import { IoIosTimer } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ShowMoreText from "react-show-more-text";

import { Spinner } from "./spinner";
import { ITask } from "../types/task";
import { classNames } from "../utils/classNames";

interface ITaskCardProps extends ITask {
  loading?: boolean;
  done: (id: number) => Promise<void>;
  remove: (id: number) => Promise<void>;
  inprogress: (id: number) => Promise<void>;
}

export const TaskCard: React.FC<ITaskCardProps> = ({
  id,
  title,
  description,
  isCompleted,
  loading = false,
  done,
  remove,
  inprogress,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg py-5 px-5 space-y-2">
      <p
        className="font-semibold text-lg text-ellipsis overflow-hidden"
        title={title}
      >
        {title}
      </p>
      <div className="text-slate-500 font-medium text-justify">
        <ShowMoreText
          lines={3}
          more="Show more"
          less="Show less"
          anchorClass="cursor"
          onClick={() => console.log("ok")}
          expanded={false}
          truncatedEndingComponent={"... "}
        >
          {description}
        </ShowMoreText>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
        <button
          onClick={() => inprogress(id)}
          disabled={loading}
          className={classNames(
            "flex items-center justify-center gap-x-2",
            "bg-orange-600 text-white py-2 rounded-md hover:bg-orange-400",
            "disabled:bg-orange-400",
            !isCompleted ? "!hidden" : ""
          )}
        >
          {loading ? (
            <Spinner className="animate-spin h-6 w-6" />
          ) : (
            <IoIosTimer className="w-6 h-6" />
          )}
          <span className="font-semibold">Inprogress</span>
        </button>
        <button
          onClick={() => done(id)}
          disabled={loading}
          className={classNames(
            "flex items-center justify-center gap-x-2",
            "bg-green-600 text-white py-2 rounded-md hover:bg-green-400",
            "disabled:bg-green-400",
            isCompleted ? "!hidden" : ""
          )}
        >
          {loading ? (
            <Spinner className="animate-spin h-6 w-6" />
          ) : (
            <IoMdCheckmarkCircleOutline className="w-6 h-6" />
          )}
          <span className="font-semibold">Complete</span>
        </button>
        <button
          disabled={loading}
          onClick={() => remove(id)}
          className={classNames(
            "flex items-center justify-center gap-x-2",
            "bg-red-600 text-white py-2 rounded-md hover:bg-red-400",
            "disabled:bg-red-400"
          )}
        >
          {loading ? (
            <Spinner className="animate-spin h-6 w-6" />
          ) : (
            <MdDeleteForever className="w-6 h-6" />
          )}
          <span className="font-semibold">Remove</span>
        </button>
      </div>
    </div>
  );
};

export const TaskCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg py-5 px-5 space-y-3">
      <div className="bg-gray-300 h-6 w-full max-w-32 animate-pulse rounded-lg"></div>
      <div className="space-y-3 pt-3">
        <div className="bg-gray-300 h-4 w-full max-w-60 animate-pulse rounded-lg"></div>
        <div className="bg-gray-300 h-4 w-full max-w-52 animate-pulse rounded-lg"></div>
        <div className="bg-gray-300 h-4 w-full max-w-72 animate-pulse rounded-lg"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
        <div className="bg-gray-300 h-10 w-full animate-pulse rounded-lg"></div>
        <div className="bg-gray-300 h-10 w-full animate-pulse rounded-lg"></div>
      </div>
    </div>
  );
};
