import React, { useContext } from "react";

import { GlobalContext } from "../context/GlobalState";
import Article from "./Article";

export const ArticleList = () => {
  const { articles } = useContext(GlobalContext);

  return (
    <div className="columns-1 md:columns-2 mt-16 lg:px-10 px-5 ">
      {articles.length > 0 ? (
        <>
          {articles.slice(0).reverse().map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </>
      ) : (
        <p>No Data.</p>
      )}
    </div>
  );
};
