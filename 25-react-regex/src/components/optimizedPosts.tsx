import React from "react";
import { fetchPosts, IPost } from "../apis/post.apis";

const PostItemSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-4 shadow-md space-y-2 rounded-md">
      <div className="max-w-[200px] w-full h-5 bg-gray-200 rounded-xl"></div>
      <div className="pt-3 space-y-2">
        <div className="max-w-[300px] w-full h-4 bg-gray-200 rounded-xl"></div>
        <div className="max-w-[400px] w-full h-4 bg-gray-200 rounded-xl"></div>
        <div className="max-w-[200px] w-full h-4 bg-gray-200 rounded-xl"></div>
      </div>
      <div className="pt-2">
        <div className="max-w-[90px] w-full h-8 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

const PostItem: React.FC<
  IPost & { onClick?: React.MouseEventHandler<HTMLButtonElement> }
> = ({ title, body, onClick }) => {
  return (
    <div className="bg-white p-4 shadow-md space-y-2 rounded-md">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-500">{body}</p>
      <div>
        <button
          onClick={onClick}
          className="bg-red-400 text-white font-semibold px-2 py-1 rounded-md"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export const OptimizedPostsList: React.FC = () => {
  // const [values, setValues] = React.useState<IPost[]>(data);
  const [values, setValues] = React.useState<IPost[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const removeItem = (id: number) => {
    setValues(values.filter((el) => el.id !== id));
  };

  const fetch = async () => {
    const data = await fetchPosts();
    setValues(data.slice(0, 6));
    setLoaded(true);
  };

  React.useEffect(() => {
    fetch();
  }, []);

  React.useEffect(() => {
    if (values.length) return;
    setValues([{ body: "Empty", title: "Empty", userId: -1, id: 0 }]);
  }, [values]);

  //   =============== useEffects ===============

  //   //  useEffect without dependencies
  //   React.useEffect(() => {
  //     // invoke callback function at the first of every updates
  //     console.log("update init");
  //     // invoke callback function at the end of every updates
  //     return () => {
  //       console.log("update end");
  //     };
  //   });

  //   //  useEffect within empty dependencies
  //   React.useEffect(() => {
  //     // invoke callback function at the mount point
  //     console.log("mount");
  //     // invoke callback function at the unmount point
  //     return () => {
  //       console.log("unmount");
  //     };
  //   }, []);

  //   //  useEffect within dependencies
  //   React.useEffect(() => {
  //     // invoke callback function at the setState update
  //     console.log(loaded);
  //   }, [loaded]);

  return (
    <main className="bg-slate-100 min-h-screen">
      <section className="container space-y-5 mx-auto max-w-[700px] py-10 px-4">
        {!loaded && [1, 2, 3, 4, 5].map((el) => <PostItemSkeleton key={el} />)}
        {loaded &&
          values.map((el) => (
            <PostItem key={el.id} {...el} onClick={() => removeItem(el.id)} />
          ))}
      </section>
    </main>
  );
};
