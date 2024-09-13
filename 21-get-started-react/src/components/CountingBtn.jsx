import { useState } from "react";

export function CoutingBtn() {
  // let count = 0;
  // const [value, setValueFunc] = useState(initializedValue)
  // const [getter, setter] = useState(initializedValue)
  const [count, setCount] = useState(0);

  // event handler
  const onClickCoutingBtn = () => {
    setCount(count + 1);
  };

  return <button onClick={onClickCoutingBtn}>count is {count}</button>;
}
