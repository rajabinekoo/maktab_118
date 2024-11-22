import { LoginForm } from "@/components/login-form";

const LoginPage: React.FC = () => {
  return (
    <main className="py-10 flex justify-center items-center bg-slate-100 w-full min-h-screen px-3">
      <section className="bg-white border border-gray-100 shadow rounded-md px-5 py-4 max-w-[500px] w-full space-y-3">
        <p className="text-2xl font-semibold text-slate-800 text-center mb-3">
          Login
        </p>
        <LoginForm />
      </section>
    </main>
  );
};

export default LoginPage;
