import { notFound } from "next/navigation";

import { BlogInfo } from "@/containers/blog-info";
import { blogById, blogsList } from "@/server/services/blogs.service";

export const dynamicParams = true;

const BlogPage: React.FC<IPageParams<{ id: string }>> = async ({ params }) => {
  const id = (await params).id;
  if (!id) return notFound();
  const blog = await blogById(id);
  if (!blog) return notFound();
  return <BlogInfo {...blog} />;
};

export async function generateStaticParams() {
  const result = await blogsList({ page: 1, perPage: 10000000 });
  return result.items.map((el) => ({ id: String(el.id) }));
}

export default BlogPage;
