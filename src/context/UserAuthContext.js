import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import auth from "../firebase.init";
import { useLocation, useNavigate } from "react-router-dom";

const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const value = useMemo(() => [authUser, setAuthUser], [authUser]);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth).then(() => setAuthUser({}));
  }

  function googleSignIn() {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  }

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/home";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setAuthUser(currentUser);
        navigate(redirectPath, { replace: true });
      } else {
        setAuthUser({});
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserAuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isLoading,
        setIsLoading,
        signUp,
        logIn,
        logOut,
        googleSignIn,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};
