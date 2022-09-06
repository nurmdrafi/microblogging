import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RequireAuth from "./auth/RequireAuth";
import Navigation from "./components/Navigation";
import { GlobalProvider } from "./context/GlobalState";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Notfound from "./pages/Notfound/Notfound";
import Registration from "./pages/Registration/Registration";

function App() {
  return (
    <GlobalProvider>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
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
    </GlobalProvider>
  );
}

export default App;
