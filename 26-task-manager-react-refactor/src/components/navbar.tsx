import React from "react";
import { Link } from "wouter";
import { AxiosError } from "axios";

import { IUser } from "../types/user";
import { getUserInfo } from "../apis/user";
import { errorHandler } from "../utils/errorHandler";
import { delSession } from "../utils/session-management";

export const Navbar: React.FC = () => {
  const [info, setInfo] = React.useState<IUser>();

  const logout = () => {
    delSession();
    window.location.href = "/";
  };

  const fetchUserInfo = async () => {
    try {
      const response = await getUserInfo();
      setInfo(response);
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  React.useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <nav className="w-full h-14 bg-slate-600 fixed top-0 left-0">
      <section className="flex justify-between gap-2 h-full items-center px-2 sm:px-5">
        {!info ? (
          <div className="w-full h-5 max-w-32 bg-gray-400 animate-pulse rounded-lg"></div>
        ) : (
          <p className="text-slate-50 font-semibold text-lg">{info.username}</p>
        )}
        <div className="flex gap-3">
          <Link
            href="/new"
            className="bg-slate-300 hover:bg-slate-400 rounded-lg py-1 px-2"
          >
            New
          </Link>
          <Link
            href="/tasks"
            className="bg-slate-300 hover:bg-slate-400 rounded-lg py-1 px-2"
          >
            List
          </Link>
          <button
            onClick={logout}
            className="bg-slate-300 hover:bg-slate-400 rounded-lg py-1 px-2"
          >
            Logout
          </button>
        </div>
      </section>
    </nav>
  );
};
