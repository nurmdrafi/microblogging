import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import auth from "../firebase.init";
import {  useNavigate } from "react-router-dom";

const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function updateDisplayName(name){
    return updateProfile(authUser?.auth?.currentUser, {displayName: name})
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
  
  /* causes issue inside useEffect
  const location = useLocation();
  const redirectPath = location.state?.path || "/home"; */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setAuthUser(currentUser);
        navigate("/home");
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
        updateDisplayName,
        logIn,
        logOut,
        googleSignIn,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

const useUserAuth = () => {
  const context = useContext(UserAuthContext);

  if(!context){
    throw Error("useUserAuth must be used within a UserAuthContextProvider")
  }
  return context;
};

export default useUserAuth;