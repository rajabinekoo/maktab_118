import { Provider as ReduxProvider } from "react-redux";

import { reduxStore } from "./redux/store";
// import { TodoList } from "./components/todolist";
import { BrandFilters } from "./components/brand-filters";
import { BrandProvider } from "./providers/brand-filters.provider";

function App() {
  return (
    <ReduxProvider store={reduxStore}>
      <main className="bg-gray-100 min-h-screen pt-0.5">
        {/* <TodoList /> */}
        <section className="p-5">
          <BrandProvider>
            <BrandFilters />
          </BrandProvider>
        </section>
      </main>
    </ReduxProvider>
  );
}

export default App;
