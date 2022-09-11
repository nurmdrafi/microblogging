import React from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Navigation from "./components/Navigation";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Notfound from "./pages/Notfound/Notfound";
import Registration from "./pages/Registration/Registration";
import { ThemeContextProvider } from "./context/ThemeContext";
import { ArticleContextProvider } from "./context/ArticleContext";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
  return (
    <ArticleContextProvider>
      <UserAuthContextProvider>
        <ThemeContextProvider>
          <Navigation />
        </ThemeContextProvider>
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
    </ArticleContextProvider>
  );
}

export default App;
