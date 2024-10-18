import React from "react";

export const RefSample: React.FC = () => {
  const msg = React.useRef<string>("Hellllooooooo");
  const inputRef = React.useRef<HTMLInputElement>();

  const changeMessage: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    msg.current = event.target.value;
    console.log(msg.current);
    console.log(inputRef.current);
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      console.log("ok");
    }
  };

  return (
    <div>
      <p>{msg.current}</p>
      <input
        ref={inputRef}
        type="text"
        value={msg.current}
        onChange={changeMessage}
        className="border border-gray-500"
      />
    </div>
  );
};
