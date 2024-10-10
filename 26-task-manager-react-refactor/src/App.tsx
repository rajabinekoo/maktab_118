import { Route } from "wouter";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Home } from "./pages/home";
import { NewTask } from "./pages/new";
import { NotFound } from "./pages/404";
import { MainLayout } from "./templates/main";
import { TasksListPage } from "./pages/tasks";
import { Dashboard } from "./templates/dashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Route path="/" component={Home} />
        <Route path="/dashboard" nest>
          <Dashboard>
            <Route path="/new" component={NewTask} />
            <Route path="/tasks" component={TasksListPage} />
          </Dashboard>
        </Route>
        <Route path="*" component={NotFound} />
      </MainLayout>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
