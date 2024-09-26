import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/posts";
export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
type fetchPostsType = () => Promise<Array<IPost>>;
export const fetchPosts: fetchPostsType = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
