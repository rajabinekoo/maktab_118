import { LoginForm } from "./components/login-form";

function App() {
  return (
    <main className="bg-gray-100 min-h-screen pt-0.5">
      <LoginForm editValues={{ username: "ali", password: "testtest" }} />
    </main>
  );
}

export default App;
