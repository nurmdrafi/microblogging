import React, { createContext, useReducer } from "react";
import appReducer from "./AppReducer";

const initialState = {
  articles: [
    {
      id: 1,
      title: "hello",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta eius laborum voluptate hic aut doloremque officiis quasi quos explicabo molestiae!",
    },
    {
      id: 2,
      title: "hello2",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta eius laborum voluptate hic aut doloremque officiis quasi quos explicabo molestiae!",
    },
  ],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function addPost(post) {
    dispatch({
      type: "ADD_POST",
      payload: post,
    });
  }

  function editPost(post) {
    dispatch({
      type: "EDIT_POST",
      payload: post,
    });
  }

  function removePost(id) {
    dispatch({
      type: "REMOVE_POST",
      payload: id,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        articles: state.articles,
        addPost,
        editPost,
        removePost,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
