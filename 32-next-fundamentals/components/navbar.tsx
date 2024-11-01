// directive
"use client";

import { useRouter } from "next/navigation";

export const Navbar: React.FC = () => {
  const router = useRouter();

  const navigate = (href: string) => {
    router.push(href);
  };

  return (
    <nav className="w-full py-[10px] bg-slate-200 flex justify-center gap-2">
      <button
        onClick={() => navigate("/")}
        className="py-2 px-3 bg-gray-700 text-white rounded-lg"
      >
        Home
      </button>
      <button
        onClick={() => navigate("/dashboard")}
        className="py-2 px-3 bg-gray-700 text-white rounded-lg"
      >
        Dashboard
      </button>
      <button
        onClick={() => navigate("/dashboard/settings")}
        className="py-2 px-3 bg-gray-700 text-white rounded-lg"
      >
        Settings
      </button>
      <button
        onClick={() => navigate("/about-us")}
        className="py-2 px-3 bg-gray-700 text-white rounded-lg"
      >
        About us
      </button>
    </nav>
  );
};
