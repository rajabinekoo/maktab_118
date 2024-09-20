import { useState } from "react";

interface ICoutingBtnProps {
  initialValue?: number;
}

export const CoutingBtn: React.FC<ICoutingBtnProps> = ({
  initialValue = 0,
}) => {
  const [count, setCount] = useState<number>(initialValue);

  const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setCount(count + 1);
  };

  return <button onClick={handleOnClick}>count is {count}</button>;
};
