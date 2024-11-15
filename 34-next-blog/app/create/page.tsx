import { CreateBlogForm } from "@/components/create-blog-form";

const CreateBlogPage: React.FC = () => {
  return (
    <main className="container mx-auto pt-navbar px-2 flex justify-center">
      <section className="bg-white border-slate-200 border rounded-md w-full max-w-[700px] px-8 py-5 mt-10">
        <p className="text-2xl font-semibold text-center">Create Blog</p>
        <CreateBlogForm />
      </section>
    </main>
  );
};

export default CreateBlogPage;
