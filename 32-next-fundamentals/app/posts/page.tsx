import { posts } from "@/data/posts";
import Link from "next/link";

const PostsPage: React.FC = () => {
  throw new Error("chert");
  return (
    <main className="container mx-auto py-6">
      <p className="font-semibold text-2xl pb-6">Posts List</p>
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {posts.map((el, index) => (
          <Link key={index} href={`/posts/${el.id}`}>
            <div className="border border-gray-500 rounded-xl p-4 hover:shadow-lg cursor-pointer">
              <p
                className="text-nowrap truncate font-semibold text-lg pb-2"
                title={el.title}
              >
                {el.title}
              </p>
              <p className="line-clamp-3">{el.body}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default PostsPage;
