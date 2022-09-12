import { createContext, useContext, useState } from "react";

const initialState = {
  articles: [
    {
      id: "8adf57ac-66cc-45e2-8402-85b616b42e7f",
      title: "hello1",
      time: "Sun, 30 May 2021 14:59:15 GMT",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta eius laborum voluptate hic aut doloremque officiis quasi quos explicabo molestiae!",
      comments: [
        {
          id: "542813e9-e882-401b-967d-d6fbc1460278",
          user: "admin",
          email: "admin@admin.com",
          text: "hello",
          loveCount: 0,
          loveVoters: [],
          time: "Mon, 12 Sep 2022 04:11:51 GMT",
        },
        {
          id: "25f818c4-9cba-4924-b67c-617d18884ec6",
          user: "admin",
          email: "admin@admin.com",
          text: "world",
          loveCount: 0,
          loveVoters: [],
          time: "Mon, 12 Sep 2022 04:12:09 GMT",
        },
      ],
      upVote: 0,
      upVoteUsers: [],
      downVote: 0,
      downVoteUsers: [],
      email: "admin@admin.com",
      userName: "admin",
    },
    {
      id: "72eac71f-f84c-4c17-a5db-77709dd84946",
      title: "hello2",
      time: "Mon, 12 Sep 2022 04:12:32 GMT",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta eius laborum voluptate hic aut doloremque officiis quasi quos explicabo molestiae!",
      comments: [],
      upVote: 0,
      upVoteUsers: [],
      downVote: 0,
      downVoteUsers: [],
      email: "admin@admin.com",
      userName: "admin",
    },
  ],
};

const ArticleContext = createContext();

export const ArticleContextProvider = ({ children }) => {
  const [articles, setArticles] = useState(initialState);
  // console.log(articles)

  // addArticle
  function addArticle(newArticle) {
    const updatedArticles = [...articles.articles, newArticle];
    return setArticles({ articles: updatedArticles });
  }
  function deleteArticle() {}
  function updateArticle() {}

  // upVote count
  function upVote(article_id, updateArticleWithUpVotes) {
    const articleList = articles.articles.filter(
      (article) => article.id !== article_id
    );
    const updatedArticles = [...articleList, updateArticleWithUpVotes];
    return setArticles({ articles: updatedArticles });
  }
  // downVote count
  function downVote(article_id, updateArticleWithDownVotes) {
    const articleList = articles.articles.filter(
      (article) => article.id !== article_id
    );
    const updatedArticles = [...articleList, updateArticleWithDownVotes];
    return setArticles({ articles: updatedArticles });
  }

  // updateToggleVote count
  function updateToggleVote(article_id, updateArticleWithVotes) {
    const articleList = articles.articles.filter(
      (article) => article.id !== article_id
    );
    const updatedArticles = [...articleList, updateArticleWithVotes];
    return setArticles({ articles: updatedArticles });
  }

  // addComment
  function addComment(article_id, updatedArticleWithComments) {
    const articleList = articles.articles.filter(
      (article) => article.id !== article_id
    );
    const updatedArticles = [...articleList, updatedArticleWithComments];
    return setArticles({ articles: updatedArticles });
  }
  // deleteComment
  function deleteComment() {}

  // updateComment
  function updateComment() {}

  // loveComment
  function loveVote(article_id, updatedArticleWithLoveVote) {
    const articleList = articles.articles.filter(
      (article) => article.id !== article_id
    );
    const updatedArticles = [...articleList, updatedArticleWithLoveVote];
    return setArticles({ articles: updatedArticles });
  }

  return (
    <ArticleContext.Provider
      value={{
        articles,
        addArticle,
        addComment,
        upVote,
        downVote,
        updateToggleVote,
        loveVote,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

const useArticleContext = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw Error(
      "useArticleContext must be used within a ArticleContextProvider"
    );
  }
  return context;
};

export default useArticleContext;
