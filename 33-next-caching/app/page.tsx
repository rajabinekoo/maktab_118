import { Suspense } from "react";
import { QuotesList, QuotesListSkeleton } from "@/containers/quotes/list";
import HomeTemplate from "@/containers/quotes/layout";

const Home: React.FC<IPageParams> = async ({ searchParams }) => {
  const queryStrings = await searchParams;
  const page = Number(queryStrings.page || 1);
  return (
    <HomeTemplate>
      <Suspense fallback={<QuotesListSkeleton />}>
        <QuotesList page={page} />
      </Suspense>
    </HomeTemplate>
  );
};

export default Home;

// const Home: React.FC<IPageParams> = async ({ searchParams }) => {
//   const queryStrings = await searchParams;
//   const page = Number(queryStrings.page || 1);
//   const result = await fetchQuotes({
//     skip: String(page * quotesLimit - quotesLimit),
//   });
//   return (
//     <main className="bg-slate-100 min-h-screen">
//       <section className="mx-auto container max-w-[1200px] py-10">
//         <p className="text-2xl sm:text-3xl md:text-4xl font-semibold">Quotes</p>
//         <QuotesList quotes={result.quotes} />
//       </section>
//       <section className="w-full flex justify-center pt-3 pb-12">
//         <Link href={`?` + new URLSearchParams({ page: String(page + 1) })}>
//           <button
//             className={classNames(
//               "px-4 py-2 text-white font-semibold",
//               "bg-slate-800 hover:bg-slate-600 rounded-xl"
//             )}
//           >
//             Load more quotes
//           </button>
//         </Link>
//       </section>
//     </main>
//   );
// };

// export default Home;
