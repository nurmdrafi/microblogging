const appReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ARTICLE":
      return {
        ...state,
        articles: [...state.articles, action.payload],
      };

    case "UPDATE_ARTICLE":
      const updatedArticle = action.payload;

      const updatedArticles = state.articles.map((article) => {
        if (article.id === updatedArticle.id) {
          return updatedArticle;
        }
        return article; 
      });

      return {
        ...state,
        articles: updatedArticles,
      };

    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};
export default appReducer;
