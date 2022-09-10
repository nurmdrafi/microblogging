import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUserAuth from "../context/UserAuthContext";

const RequireAuth = ({ children }) => {
  const { authUser } = useUserAuth();
  const location = useLocation();

  if (authUser?.auth?.currentUser) {
    return children;
  }
   else {
    return (
      <Navigate to="/login" state={{ path: location.pathname }}></Navigate>
    );
  }
};

export default RequireAuth;
