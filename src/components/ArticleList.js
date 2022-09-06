import React, { useContext } from "react";

import { GlobalContext } from "../context/GlobalState";
import Article from "./Article";

export const ArticleList = () => {
  const { articles } = useContext(GlobalContext);

  return (
    <div className="bg-white">
      {articles.length > 0 ? (
        <>
          {articles.map((article, index)=> (<Article key={index} article={article}/>))}
        </>
      ) : (
        <p>No Data.</p>
      )}
    </div>
  );
};
