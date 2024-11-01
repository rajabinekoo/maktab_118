import { posts } from "@/data/posts";

const PostPage: React.FC<{
  params: Promise<{ postId: string }>;
}> = async (props) => {
  const params = await props.params;
  const post = posts.find((el) => el.id === Number(params.postId));

  if (!post) throw new Error("Not found");
  return <p>Post page {post?.body}</p>;
};

export default PostPage;
