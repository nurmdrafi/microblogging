import React, { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import auth from "../../firebase.init";

const LandingPage = () => {
  const {authUser} = useUserAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate("/home");
    }
  }, [authUser, navigate]);

  return (
    <div className="bg-gradient-to-r from-rose-50 to-teal-50 flex min-h-[calc(100vh-65px)] items-center justify-center">
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
