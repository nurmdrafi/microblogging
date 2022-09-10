import React, { createContext, useContext, useReducer } from "react";
import appReducer from "./AppReducer";

const initialState = {
  articles: [
    {
      id: 1,
      title: "hello1",
      category: "test1",
      time: "05/09/2022, 21:13:19",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta eius laborum voluptate hic aut doloremque officiis quasi quos explicabo molestiae!",
      comments: [
        { id: 1, user: "admin", text: "hello" },
        { id: 2, user: "admin", text: "world" },
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

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function addArticle(article) {
    dispatch({
      type: "ADD_ARTICLE",
      payload: article,
    });
  }

  function updateArticle(article) {
    dispatch({
      type: "UPDATE_ARTICLE",
      payload: article,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        articles: state.articles,
        addArticle,
        updateArticle,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useArticle = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw Error("useArticle must be used within a GlobalContextProvider");
  }
  return context;
};

export default useArticle;
