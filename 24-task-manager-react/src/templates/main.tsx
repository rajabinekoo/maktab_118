import { Navbar } from "../components/navbar";

export const MainLayout: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
