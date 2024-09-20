import * as React from "react";
import { className } from "../utils/classNames";

interface IInputProps {
  value?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  type?: React.HTMLInputTypeAttribute;
  onChangeHandler?: (_: string) => unknown;
  validator?: (_: string) => boolean;
  //   onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input: React.FC<IInputProps> = ({
  //   value,
  label,
  placeholder,
  type = "text",
  defaultValue = "",
  onChangeHandler,
  validator,
}) => {
  const [value, setValue] = React.useState<string>(defaultValue);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
    if (validator && !validator?.(event.target.value)) return;
    if (onChangeHandler) onChangeHandler(event.target.value);
  };

  return (
    <div className="flex flex-col gap-y-2 mt-4">
      {!!label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={className(
          "border rounded-xl px-2 py-2 border-slate-300"
          //   !error ? "border-slate-300" : "border-red-500"
        )}
      />

      {/* conditional rendering: start */}
      {/* <p
        className={className(
          "text-red-600 text-sm py-2",
          !error ? "hidden" : ""
        )}
      >
        {error}
      </p> */}

      {/* {!error ? (
      <></>
    ) : (
      <p className={className("text-red-600 text-sm py-2")}>
        {error}
      </p>
    )}
    {!!error && (
      <p className={className("text-red-600 text-sm py-2")}>
        {error}
      </p>
    )} */}
      {/* {false ? <p>ok</p> : <p>nok</p>} */}
      {/* conditional rendering: end */}
    </div>
  );
};
