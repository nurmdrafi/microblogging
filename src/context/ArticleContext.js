import { createContext, useContext, useState } from "react";

const initialState = {
  articles: [
    {
      id: 1,
      title: "hello1",
      category: "test1",
      time: "05/09/2022, 21:13:19",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta eius laborum voluptate hic aut doloremque officiis quasi quos explicabo molestiae!",
      comments: [
        { id: 1, user: "admin", email: "admin@admin.com", text: "hello" },
        { id: 2, user: "admin", email: "admin@admin.com", text: "world" },
      ],
      upVote: 0,
      upVoteUsers: [],
      downVote: 0,
      downVoteUsers: [],
      email: "admin@admin.com",
      userName: "admin",
    },
    {
      id: 2,
      title: "hello2",
      category: "test2",
      time: "05/09/2022, 21:13:30",
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
  function loveComment() {}

  return (
    <ArticleContext.Provider
      value={{
        articles,
        addArticle,
        addComment,
        upVote,
        downVote,
        updateToggleVote,
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
