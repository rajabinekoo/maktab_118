import { TasksList } from "../containers/tasks-list";

export const TasksListPage: React.FC = () => {
  return (
    <main className="bg-slate-200 min-h-screen w-full">
      <TasksList />
    </main>
  );
};
