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
  className,
  ...inputProps
}) => {
  return (
    <div className="w-full space-y-1">
      <label
        className={classNames(
          "text-sm font-medium",
          !label ? "hidden" : "block",
          !error ? "text-gray-600" : "text-red-500"
        )}
      >
        {label}
      </label>
      <input
        className={classNames(
          className || "px-2 py-1 border border-slate-400 rounded-md w-full",
          !error ? "border-slate-400" : "border-red-500"
        )}
        {...inputProps}
      />
      {!!error && <p className="text-red-500 text-sm font-medium">{error}</p>}
    </div>
  );
};
