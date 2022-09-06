import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const Navigation = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth);
    navigate("/login");
  };
  console.log(user?.displayName?.[0])
  return (
    <nav>
      <div className="navbar bg-base-100 lg:px-16 px-12 shadow-md mb-10">
        <div className="flex-1">
          <Link
            className="lg:text-3xl md:text-2xl font-bold text-primary"
            to="/"
          >
            Microblogging App
          </Link>
        </div>
        <div className="flex-none gap-2 text-black">
          {!user ? (
            <Link to="/login" className="btn btn-primary text-white">
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 h-10 rounded-full shadow-md bg-secondary">
                  <span className="text-2xl pt-0.5 flex justify-center items-center">
                    {user?.displayName?.[0]}
                  </span>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <button className="btn btn-ghost" onClick={logout}>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
