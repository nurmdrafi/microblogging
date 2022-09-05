import React, { useContext } from "react";

import { GlobalContext } from "../context/GlobalContext";
import Article from "./Article";

export const ArticleList = () => {
  const { articles } = useContext(GlobalContext);

  return (
    <>
      {articles.length > 0 ? (
        <>
          articles.map((article)=> (<Article />))
        </>
      ) : (
        <p>No Data.</p>
      )}
    </>
  );
};
