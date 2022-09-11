import React from "react";
import useArticleContext from "../context/ArticleContext";
import Article from "./Article";

export const ArticleList = () => {
  const { articles } = useArticleContext();
  const articleList = articles?.articles?.sort((a, b) => (a.id > b.id ? 1 : -1));

  return (
    <div className="columns-1 md:columns-2 mt-16 lg:px-10 px-5 ">
      {articleList.length > 0 ? (
        <>
          {articleList
            .slice(0)
            .reverse()
            .map((article) => (
              <Article key={article.id} article={article} />
            ))}
        </>
      ) : (
        <p>No Data.</p>
      )}
    </div>
  );
};
