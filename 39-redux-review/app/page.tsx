import { BankForm } from "@/components/bank-form";
import { Todos } from "@/components/todos";
import { TodoListProvider } from "@/providers/todo-list.provider";

export default function Home() {
  return (
    <main className="space-y-4 flex flex-col justify-center items-center bg-gray-100 min-h-screen">
      <BankForm />
      <TodoListProvider>
        <Todos />
      </TodoListProvider>
    </main>
  );
}
