import { Suspense } from "react";
import { BlogCardSkeleton } from "@/components/blog-card";
import { BlogsListSSR } from "@/containers/blogs-list-ssr";

const HomeSkeleton = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8].map((el) => <BlogCardSkeleton key={el} />);
};

const Home: React.FC<IPageParams> = async () => {
  return (
    <main className="pt-navbar">
      <Suspense fallback={<HomeSkeleton />}>
        <BlogsListSSR />
      </Suspense>
    </main>
  );
};

export default Home;
