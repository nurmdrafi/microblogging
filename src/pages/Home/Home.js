import React from "react";
import { ArticleList } from "../../components/ArticleList";
import CreatePost from "../../components/CreatePost";

const Home = () => {
  return (
    <div>
      <CreatePost />
      <div>
        <ArticleList />
      </div>
    </div>
  );
};

export default Home;
