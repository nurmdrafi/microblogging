import React from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Navigation from "./components/Navigation";
import { GlobalProvider } from "./context/GlobalState";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Notfound from "./pages/Notfound/Notfound";
import Registration from "./pages/Registration/Registration";
import { ThemeContextProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeContextProvider>
      <GlobalProvider>
        <UserAuthContextProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </UserAuthContextProvider>
      </GlobalProvider>
    </ThemeContextProvider>
  );
}

export default App;
