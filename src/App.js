import React from "react";
import "./App.css";
import CreatePost from "./components/CreatePost";
import Article from "./components/Article";

const articles = [];
const AppContext = React.createContext({ articles });

function App() {
  const updatedArticles = [
    { id: 1, title: "a title", body: "a body" },
    { id: 2, title: "a title 2", body: "a body 2" },
  ];
  return (
    <div className="bg-white h-screen">
      <CreatePost />
      <Article />
    </div>
  );
}

export default App;
