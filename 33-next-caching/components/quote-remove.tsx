"use client";

import { removeQuoteById } from "@/apis/server-side-apis/quotes";

// mutation removeQuoteById
export const QuoteRemove: React.FC<{ id: number }> = ({ id }) => {
  return (
    <button
      onClick={() => removeQuoteById(id)}
      className="text-sm font-semibold underline text-red-500"
    >
      Delete
    </button>
  );
};
