import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserAuth from "../context/UserAuthContext";
import toast, { Toaster } from "react-hot-toast";
import SwitchTheme from "./SwitchTheme";

const Navigation = () => {
  const { authUser, logOut } = useUserAuth();

  const navigate = useNavigate();

  const handleLogOut = () => {
    try {
      logOut();
    } catch (err) {
      toast.error(err.message, {
        id: "logOut error",
      });
    }
    navigate("/login");
  };

  return (
    <nav>
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <div className="navbar bg-gradient-to-r from-rose-50 to-teal-50 dark:from-slate-900 dark:to-slate-900 lg:px-16 px-12 h-[65px]">
        <div className="flex-1">
          <Link
            className="text-2xl font-bold text-primary"
            to="/"
          >
            Microblogging App
          </Link>
        </div>
        <div className="flex items-center">
          {/* Theme toggle button */}
          <div className="mt-8 mr-5">
          <SwitchTheme />
          </div>
          {/* logout button */}
          <div className="flex items-center gap-2 text-black">
            {authUser?.auth?.currentUser && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 h-10 rounded-full shadow-md bg-primary">
                    {authUser?.photoURL ? (
                      <img
                        src={authUser?.photoURL}
                        alt=""
                        className="w-10 h-10"
                      />
                    ) : (
                      <span className="text-2xl pt-1 flex justify-center items-center text-white">
                        {authUser?.displayName?.[0]}
                      </span>
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content dark:bg-slate-800 dark:shadow-slate-700 bg-base-100 rounded-box w-52"
                >
                  <li>
                    <button
                      className="btn btn-primary text-white"
                      onClick={handleLogOut}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
