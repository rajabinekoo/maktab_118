import React from "react";
import Link from "next/link";

import { quotesLimit } from "@/utils/config";
import { classNames } from "@/utils/classname";
import { fetchQuotes } from "@/apis/server-side-apis/quotes";
import { QuoteCard, QuoteCardSkeleton } from "@/components/quote-card";

export const QuotesListSkeleton: React.FC = () => {
  return (
    <>
      <div className="space-y-8 pt-10">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
          <QuoteCardSkeleton key={el} />
        ))}
      </div>
      <div className="w-full flex justify-center pt-10 gap-5">
        <button
          className={classNames(
            "px-4 py-2 text-white font-semibold disabled:bg-slate-500",
            "bg-slate-800 hover:bg-slate-600 rounded-xl"
          )}
          disabled={true}
        >
          Previous
        </button>
        <button
          className={classNames(
            "px-4 py-2 text-white font-semibold disabled:bg-slate-500",
            "bg-slate-800 hover:bg-slate-600 rounded-xl"
          )}
          disabled={true}
        >
          Next
        </button>
      </div>
    </>
  );
};

export const QuotesList: React.FC<{ page: number }> = async ({ page }) => {
  const result = await fetchQuotes({
    skip: String(page * quotesLimit - quotesLimit),
  });
  const totalPages = Math.max(Number(result.total) / Number(quotesLimit));
  return (
    <>
      <div className="space-y-8 pt-10">
        {result.quotes.map((el, index) => (
          <QuoteCard key={index} {...el} />
        ))}
      </div>
      <div className="w-full flex justify-center pt-10 gap-5">
        <Link
          href={
            `?` +
            new URLSearchParams({
              page: String(page - 1 < 1 ? page : page - 1),
            })
          }
        >
          <button
            className={classNames(
              "px-4 py-2 text-white font-semibold disabled:bg-slate-500",
              "bg-slate-800 hover:bg-slate-600 rounded-xl"
            )}
            disabled={page - 1 < 1}
          >
            Previous
          </button>
        </Link>
        <Link
          href={
            `?` +
            new URLSearchParams({
              page: String(page + 1 > totalPages ? page : page + 1),
            })
          }
        >
          <button
            className={classNames(
              "px-4 py-2 text-white font-semibold disabled:bg-slate-500",
              "bg-slate-800 hover:bg-slate-600 rounded-xl"
            )}
            disabled={page + 1 > totalPages}
          >
            Next
          </button>
        </Link>
      </div>
    </>
  );
};

// "use client";

// import React from "react";
// import { QuoteCard } from "@/components/quote-card";

// export const QuotesList: React.FC<{ quotes: IQuote[] }> = ({ quotes }) => {
//   const [data, setData] = React.useState<IQuote[]>([]);

//   React.useEffect(() => {
//     setData([...data, ...quotes]);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [quotes]);

//   return (
//     <div className="grid grid-cols-1 gap-y-8 pt-10">
//       {data.map((el) => (
//         <QuoteCard key={el.id} {...el} />
//       ))}
//     </div>
//   );
// };
