import { classNames } from "@/utils/classname";
import Link from "next/link";

export const QuoteCardSkeleton: React.FC = () => {
  return (
    <div
      className={classNames(
        "border border-slate-200 shadow-md space-y-2",
        "bg-white px-5 py-4 rounded-xl transition",
        "hover:scale-105 hover:cursor-pointer ease-in-out"
      )}
    >
      <div className="w-full max-w-[620px] h-5 rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-full max-w-[120px] h-5 rounded-lg bg-slate-300 animate-pulse"></div>
    </div>
  );
};

export const QuoteCard: React.FC<IQuote> = ({ id, author, quote }) => {
  return (
    <Link href={`/quote/${id}`} className="block">
      <div
        className={classNames(
          "border border-slate-200 shadow-md space-y-2",
          "bg-white px-5 py-4 rounded-xl transition",
          "hover:scale-105 hover:cursor-pointer ease-in-out"
        )}
      >
        <p className="font-medium">{quote}</p>
        <p className="text-sm font-semibold text-slate-500">- {author}</p>
      </div>
    </Link>
  );
};
