import { createQuote } from "@/apis/server-side-apis/quotes";

const NewQuote: React.FC = () => {
  return (
    <main className="bg-slate-100 min-h-screen flex justify-center items-center px-3">
      <section className="bg-white border border-slate-200 px-4 py-4 rounded-xl shadow-md w-full max-w-[700px]">
        <p className="text-2xl font-medium capitalize text-center pb-4">
          new quote
        </p>
        <form action={createQuote} className="space-y-3">
          <div className="space-y-1">
            <label className="text-slate-600 font-medium text-sm pl-2">
              Author
            </label>
            <input
              type="text"
              name="author"
              placeholder="author"
              className="border border-slate-300 placeholder:text-slate-400 rounded-xl w-full px-3 py-2"
            />
          </div>
          <div className="space-y-1">
            <label className="text-slate-600 font-medium text-sm pl-2">
              Body
            </label>
            <textarea
              name="quote"
              placeholder="Quote body"
              className="border border-slate-300 placeholder:text-slate-400 rounded-xl w-full px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-slate-800 hover:bg-slate-700 text-white text-lg font-medium rounded-xl py-1.5 w-full"
          >
            Create
          </button>
        </form>
      </section>
    </main>
  );
};

export default NewQuote;
