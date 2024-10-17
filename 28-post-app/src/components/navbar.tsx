import { Link, useNavigate } from "react-router-dom";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate("/");
  };

  return (
    <section className="w-full flex justify-center gap-x-2 bg-slate-500 text-white font-semibold text-2xl py-3 px-2">
      <button
        onClick={onClickHome}
        className="bg-slate-700 px-2 py-1 rounded-lg hover:bg-slate-600"
      >
        Home
      </button>
      <Link to="/users">
        <button className="bg-slate-700 px-2 py-1 rounded-lg hover:bg-slate-600">
          Users
        </button>
      </Link>
      <Link to="/posts">
        <button className="bg-slate-700 px-2 py-1 rounded-lg hover:bg-slate-600">
          Posts
        </button>
      </Link>
    </section>
  );
};
