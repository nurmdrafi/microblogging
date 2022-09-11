import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-rose-50 to-teal-50 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-900 flex min-h-[calc(100vh-65px)] items-center justify-center">
      <div>
        <h1 className="text-primary font-bold text-center text-7xl">
          You can write anything...
        </h1>
        <div className="flex justify-center gap-5 mt-5">
          <Link to="/login">
            <button className="btn btn-primary btn-outline ">Login</button>
          </Link>
          <Link to="/registration">
            <button className="btn btn-primary btn-outline">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
