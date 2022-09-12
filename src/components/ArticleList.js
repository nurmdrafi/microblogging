import React from "react";
import useArticleContext from "../context/ArticleContext";
import Article from "./Article";

export const ArticleList = () => {
  const { articles } = useArticleContext();
  const articleList = articles?.articles.sort((a, b) => {
    return new Date(b.time) - new Date(a.time);
  });

  return (
    <div className="columns-1 md:columns-2 mt-16 lg:px-10 px-5 ">
      {articleList.length > 0 ? (
        <>
          {articleList.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </>
      ) : (
        <p>No Data.</p>
      )}
    </div>
  );
};
