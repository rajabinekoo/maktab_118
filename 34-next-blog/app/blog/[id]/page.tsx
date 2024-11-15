import { notFound } from "next/navigation";
import { blogById, blogsList } from "@/server/services/blogs.service";

export const dynamicParams = true;

const BlogPage: React.FC<IPageParams<{ id: string }>> = async ({ params }) => {
  const id = (await params).id;
  if (!id) return notFound();
  const blog = await blogById(id);
  if (!blog) return notFound();
  return <p>{id}</p>;
};

export async function generateStaticParams() {
  const result = await blogsList({ page: 1, perPage: 10000000 });
  return result.items.map((el) => ({ id: String(el.id) }));
}

export default BlogPage;
