import React from "react";
import { useDebounce } from "../hooks/useDebounce";

export const DebounceInput = () => {
  const [orgValue, setOrgValue] = React.useState<string>("");
  const [value] = useDebounce(orgValue, 500);

  const changeMessage: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setOrgValue(event.target.value);
  };

  return (
    <div>
      <p>value: {value}</p>
      <input
        type="text"
        value={orgValue}
        onChange={changeMessage}
        className="border border-gray-500"
      />
    </div>
  );
};

// ===================================
// Without customized hook
// ===================================

// import React from "react";

// export const DebounceInput = () => {
//   const [orgValue, setOrgValue] = React.useState<string>("");
//   const [value, setValue] = React.useState<string>("");
//   const timeoutRef = React.useRef<number>();

//   const changeMessage: React.ChangeEventHandler<HTMLInputElement> = (event) => {
//     setOrgValue(event.target.value);
//   };

//   React.useEffect(() => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//     timeoutRef.current = setTimeout(() => {
//       setValue(orgValue);
//     }, 1000);
//   }, [orgValue]);

//   return (
//     <div>
//       <p>value: {value}</p>
//       <input
//         type="text"
//         value={orgValue}
//         onChange={changeMessage}
//         className="border border-gray-500"
//       />
//     </div>
//   );
// };
