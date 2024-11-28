const AdminLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <main className="w-full min-h-screen bg-slate-100 flex justify-center items-center">
      <section className="w-full bg-white rounded-xl border border-slate-200 shadow-md px-5 py-4 max-w-[400px]">
        {children}
      </section>
    </main>
  );
};

export default AdminLayout;
