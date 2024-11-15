import { useState } from "react";
import { Control, useController } from "react-hook-form";
import { Switch as DefaultSwitch } from "@headlessui/react";

interface ISwitch {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

export const Switch: React.FC<ISwitch> = ({ control, name }) => {
  const [enabled, setEnabled] = useState(false);
  const { field } = useController({
    name,
    control,
    defaultValue: "false",
  });

  const onChangeSwitch = (state: boolean) => {
    setEnabled(state);
    field.onChange(state ? "true" : "false");
  };

  return (
    <DefaultSwitch
      checked={enabled}
      onChange={onChangeSwitch}
      className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-slate-600"
    >
      <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
    </DefaultSwitch>
  );
};
