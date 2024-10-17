import { Outlet } from "react-router-dom";
import { NavBar } from "../components/navbar";

export const MainLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
