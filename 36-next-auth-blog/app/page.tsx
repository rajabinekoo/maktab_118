import { Suspense } from "react";

import { classNames } from "@/utils/classname";
import { BlogsList } from "@/containers/blogs-list";
import { BlogCardSkeleton } from "@/components/blog-card";

const HomeSkeleton = () => {
  return (
    <main
      className={classNames(
        "mx-auto container pb-10 pt-5 px-5 sm:px-2 grid gap-6",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      )}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
        <BlogCardSkeleton key={el} />
      ))}
    </main>
  );
};

const Home: React.FC<IPageParams> = async () => {
  return (
    <main className="pt-navbar">
      <Suspense fallback={<HomeSkeleton />}>
        <BlogsList />
      </Suspense>
    </main>
  );
};

export default Home;
