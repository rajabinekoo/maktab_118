import React from "react";
import { fetchPosts, IPost } from "../apis/post.apis";

// const data = await fetchPosts();

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

export const PostsList: React.FC = () => {
  // const [values, setValues] = React.useState<IPost[]>(data);
  const [values, setValues] = React.useState<IPost[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const removeItem = (id: number) => {
    setValues(values.filter((el) => el.id !== id));
  };

  const fetch = async () => {
    if (loaded) return;
    const data = await fetchPosts();
    setValues(data.slice(0, 6));
    setLoaded(true);
  };
  fetch();

  // recursion hell, infinity loop
  // fetchPosts().then((result) => setValues(result));

  return (
    <main className="bg-slate-100 min-h-screen">
      <section className="space-y-5 container mx-auto max-w-[700px] py-10 px-4">
        {values.map((el) => (
          <PostItem key={el.id} {...el} onClick={() => removeItem(el.id)} />
        ))}
      </section>
    </main>
  );
};
