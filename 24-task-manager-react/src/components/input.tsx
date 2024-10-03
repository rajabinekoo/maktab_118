import { classNames } from "../utils/classNames";

interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: string;
}

export const Input: React.FC<IInputProps> = ({
  label,
  error,
  className = "w-full border-b border-gray-300 focus:outline-none focus:border-black",
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label
        className={classNames(
          !label ? "hidden" : "block",
          "text-xs font-medium"
        )}
      >
        {label}
      </label>
      <input
        className={classNames(className, !error ? "" : "!border-red-500")}
        {...props}
      />
      <p
        className={classNames(
          !error ? "hidden" : "block",
          "text-xs font-medium text-red-500 mt-1"
        )}
      >
        {error}
      </p>
    </div>
  );
};
