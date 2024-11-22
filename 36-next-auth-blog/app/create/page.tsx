import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { CreateBlogForm } from "@/components/create-blog-form";
import { authorization } from "@/server/services/bloggers.service";

const CreateBlogPage: React.FC = async () => {
  const cookie = await cookies();
  const session = cookie.get("session");
  const authorized = !session?.value
    ? false
    : await authorization(session.value);
  if (!authorized) return notFound();
  return (
    <main className="container mx-auto pt-navbar px-2 flex justify-center py-10">
      <section className="bg-white border-slate-200 border rounded-md w-full max-w-[700px] px-8 py-5 mt-10">
        <p className="text-2xl font-semibold text-center">Create Blog</p>
        <CreateBlogForm />
      </section>
    </main>
  );
};

export default CreateBlogPage;
