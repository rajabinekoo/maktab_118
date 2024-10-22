import { UsersTable } from "./components/users-table";
// import { MemoSample } from "./components/memo-sample";
// import { DebounceInput } from "./components/debounce-input";
// import { RefSample } from "./components/use-ref-sample.";

function App() {
  // return <RefSample />;
  // return <DebounceInput />;
  // return <MemoSample />;
  return <UsersTable serverUrl="https://reqres.in/api/users" />;
}

export default App;
