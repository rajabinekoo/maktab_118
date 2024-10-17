import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchPostComments } from "../api/comments.api";

export const PostComments: React.FC = () => {
  const { id } = useParams();

  const comments = useQuery({
    queryKey: ["post-comments", id],
    queryFn: () =>
      fetchPostComments({
        postId: Number(id),
      }),
  });

  return (
    <section>
      <p>Comments {id}</p>
      {(comments.data?.comments || []).map((el) => (
        <p key={el.id}>{el.body}</p>
      ))}
      {/* <div className="flex justify-center">
        <button
          disabled={Number(comments.data?.total || -1) < data.length}
          className="bg-slate-400 text-white font-bold text-sm px-2 py-1 rounded-md"
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          Load More
        </button>
      </div> */}
    </section>
  );
};
