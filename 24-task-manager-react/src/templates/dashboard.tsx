import { Navbar } from "../components/navbar";

export const Dashboard: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
