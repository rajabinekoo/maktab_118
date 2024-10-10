import { Navbar } from "../components/navbar";
import { TasksListProvider } from "../providers/tasks-list.provider";

export const Dashboard: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  return (
    <TasksListProvider>
      <Navbar />
      {children}
    </TasksListProvider>
  );
};
