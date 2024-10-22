import React from "react";

export const MemoSample: React.FC = () => {
  const [orgValue, setOrgValue] = React.useState<string>("");
  //   const [value, setValue] = React.useState<string>("");

  const changeValue: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setOrgValue(event.target.value);
  };

  //   React.useEffect(() => {
  //     const regex = /^(\+98|0)?9\d{9}$/g;
  //     if (!regex.test(orgValue)) return;
  //     setValue(orgValue.replace(/^(\+98|0)?/g, ""));
  //   }, [orgValue]);

  //   bad solution
  //   const value = (() => {
  //     const regex = /^(\+98|0)?9\d{9}$/g;
  //     if (!regex.test(orgValue)) return;
  //     return orgValue.replace(/^(\+98|0)?/g, "");
  //   })()

  const value = React.useMemo(() => {
    const regex = /^(\+98|0)?9\d{9}$/g;
    if (!regex.test(orgValue)) return;
    return orgValue.replace(/^(\+98|0)?/g, "");
  }, [orgValue]);

  return (
    <div>
      <p>Valid phone number: {value}</p>
      <input
        type="text"
        value={orgValue}
        onChange={changeValue}
        className="border border-gray-500"
      />
    </div>
  );
};
