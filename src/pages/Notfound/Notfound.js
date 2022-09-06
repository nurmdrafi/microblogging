import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="mx-auto w-96 h-screen flex justify-center items-center">
      <div className="flex flex-col gap-3 text-black border">
        <p className="text-red-600 font-bold text-2xl">ERROR 404</p>
        <h2 className="text-xl">
          Oops! The page you're <br /> looking for is'nt here.
        </h2>
        <p className="text-xl">
          You might have the wrong address,
          <br /> or the page may have moved.
        </p>
        <Link to="/home">
          <button type="button" className="btn btn-primary text-white">
            Back to homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
