import { Provider as ReduxProvider } from "react-redux";

import { reduxStore } from "./redux/store";
import { TodoList } from "./components/todolist";

function App() {
  return (
    <ReduxProvider store={reduxStore}>
      <main className="bg-gray-100 min-h-screen pt-0.5">
        <TodoList />
      </main>
    </ReduxProvider>
  );
}

export default App;
