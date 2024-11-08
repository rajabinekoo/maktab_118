const HomeTemplate: React.FC<IChildren> = async ({ children }) => {
  return (
    <main className="bg-slate-100 min-h-screen px-5">
      <section className="mx-auto container max-w-[1200px] py-10">
        <p className="text-2xl sm:text-3xl md:text-4xl font-semibold">Quotes</p>
        {children}
      </section>
    </main>
  );
};

export default HomeTemplate;
