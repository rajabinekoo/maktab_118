"use client";

import { classNames } from "@/utils/classname";

interface IFileUploadProgress {
  progressPercentage: number;
  cancel?: () => void;
  cancelled?: boolean;
}
export const FileUploadProgress: React.FC<IFileUploadProgress> = ({
  progressPercentage,
  cancel,
  cancelled = false,
}) => {
  return (
    <section
      className={classNames(
        "fixed bottom-5 right-5 z-50 bg-white max-w-[500px] w-full",
        "border border-slate-300 rounded-lg px-4 py-4"
      )}
    >
      <div className="flex justify-between w-full">
        <p className="mb-3 font-medium text-xs">
          {cancelled
            ? "Aborted"
            : progressPercentage === 100
            ? "Uploaded"
            : "Uploading..."}
        </p>
        <p className="mb-3 font-medium text-xs">
          {progressPercentage.toFixed(1)}%
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className={classNames(
            "h-2.5 rounded-full",
            cancelled
              ? "bg-red-500"
              : progressPercentage === 100
              ? "bg-green-500"
              : "bg-blue-600"
          )}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <button
        onClick={cancel}
        className={classNames(
          "w-full bg-red-500 hover:bg-red-400 text-white",
          "text-sm font-semibold py-1 mt-5 rounded-lg",
          cancelled ? "hidden" : ""
        )}
      >
        Cancel
      </button>
    </section>
  );
};
