import Link from "next/link";
import { notFound } from "next/navigation";

import { classNames } from "@/utils/classname";
import { QuoteRemove } from "@/components/quote-remove";
import { fetchQuoteById, fetchQuotes } from "@/apis/server-side-apis/quotes";

export const dynamicParams = true;

type paramsType = { id: string };
const QuotePage: React.FC<IPageParams<paramsType>> = async ({ params }) => {
  const id = Number((await params)?.id);
  if (isNaN(id)) return notFound();
  const quote = await fetchQuoteById(id);
  return (
    <main className="bg-slate-100 min-h-screen flex justify-center items-center">
      <section className="max-w-[900px] px-2">
        <div
          className={classNames(
            "bg-white border-slate-200 border rounded-xl space-y-5",
            "px-5 py-7"
          )}
        >
          <p className="font-medium">{quote.quote}</p>
          <p className="text-sm font-semibold text-slate-500">
            - {quote.author}
          </p>
          <div className="flex justify-between">
            <div>
              <Link href="/">
                <button className="text-sm font-semibold underline text-blue-700">
                  Back
                </button>
              </Link>
            </div>
            <QuoteRemove id={id} />
          </div>
        </div>
      </section>
    </main>
  );
};

export async function generateStaticParams() {
  const result = await fetchQuotes({ limit: "10000" });
  return result.quotes.map((el) => ({ id: String(el.id) })) as paramsType[];
}

export default QuotePage;
