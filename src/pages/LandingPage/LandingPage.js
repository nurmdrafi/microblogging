import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const LandingPage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  if (user) {
    navigate("/home");
  }

  return (
    <div className="bg-gradient-to-r from-rose-50 to-teal-50 flex min-h-[calc(100vh-80px)] items-center justify-center">
      <div>
        <h1 className="text-primary font-bold text-center text-7xl">
          We can write anything...
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
