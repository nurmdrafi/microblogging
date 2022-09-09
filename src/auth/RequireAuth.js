import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
// import Loading from "../components/Loading";

const RequireAuth = ({ children }) => {
  const { authUser } = useUserAuth();
  console.log(authUser)
  const location = useLocation();

  // if (loading) {
  //   return <Loading/>;
  // }

  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default RequireAuth;
