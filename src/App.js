import React from "react";
import "./App.css";
import { ArticleList } from "./components/ArticleList";
import { GlobalProvider } from "./context/GlobalState";
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <GlobalProvider>
      <CreatePost />
      <div className="bg-white h-screen">
        <ArticleList />
      </div>
    </GlobalProvider>
  );
}

export default App;
