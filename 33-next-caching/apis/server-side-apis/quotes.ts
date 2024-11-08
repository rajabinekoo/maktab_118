"use server";

import { redirect } from "next/navigation";
import { quotesLimit } from "@/utils/config";
import { revalidatePath, revalidateTag } from "next/cache";

type fetchQuotesType = (
  _?: IDummyJsonServerPaginationDto
) => Promise<IDummyJsonServerResDto & { quotes: IQuote[] }>;
export const fetchQuotes: fetchQuotesType = async (params) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(
    "https://dummyjson.com/quotes?" +
      new URLSearchParams({
        skip: params?.skip || "0",
        limit: params?.limit || String(quotesLimit),
      }),
    // { next: { revalidate: 1 } } // ISR - Incremental site regeneration
    // { cache: "no-store" } // default: no-store, no-store === no-cache === revalidate: 0
    // { cache: "force-cache" }
    { cache: "force-cache", next: { tags: ["quotes-list"] } }
  );
  if (!response.ok) throw new Error("Something went wrong");
  return await response.json();
};

type fetchQuoteByIdType = (_: number) => Promise<IQuote>;
export const fetchQuoteById: fetchQuoteByIdType = async (id) => {
  const response = await fetch(`https://dummyjson.com/quotes/${id}`, {
    next: { tags: ["fetch-quote-by-id-" + id.toString()] },
  });
  if (!response.ok) throw new Error("Something went wrong");
  return await response.json();
};

type removeQuoteByIdType = (_: number) => Promise<void>;
export const removeQuoteById: removeQuoteByIdType = async (id) => {
  await fetch(`https://dummyjson.com/quotes/${id}`, {
    method: "DELETE",
  });
  revalidatePath(`/quote/${id}`);
  revalidateTag("fetch-quote-by-id-" + id.toString());
  revalidateTag("quotes-list");
  redirect("/");
};

type createQuoteType = (_: FormData) => Promise<void>;
export const createQuote: createQuoteType = async (data) => {
  await fetch(`https://dummyjson.com/quotes`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quote: data.get("quote"),
      author: data.get("author"),
    }),
  });
  revalidateTag("quotes-list");
  redirect("/");
};
