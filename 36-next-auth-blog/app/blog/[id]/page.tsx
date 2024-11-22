import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { BlogInfo } from "@/containers/blog-info";
import { blogById } from "@/server/services/blogs.service";
import { authorization } from "@/server/services/bloggers.service";

export const dynamicParams = true;

const BlogPage: React.FC<IPageParams<{ id: string }>> = async ({ params }) => {
  const id = (await params).id;
  if (!id) return notFound();
  const blog = await blogById(id);
  if (!blog) return notFound();
  if (blog.hide) {
    const cookie = await cookies();
    const session = cookie.get("session");
    const authorized = !session?.value
      ? false
      : await authorization(session.value);
    if (!authorized) return notFound();
  }
  return <BlogInfo {...blog} />;
};

// export async function generateStaticParams() {
//   const result = await blogsList({ page: 1, perPage: 10000000 });
//   return result.items.map((el) => ({ id: String(el.id) }));
// }

export default BlogPage;
