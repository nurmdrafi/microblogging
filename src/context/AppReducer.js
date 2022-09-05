export default function appReducer(state, action) {
    switch (action.type) {
      case "ADD_POST":
        return {
          ...state,
          articles: [...state.articles, action.payload],
        };
  
      case "EDIT_POST":
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
  
      case "REMOVE_POST":
        return {
          ...state,
          articles: state.articles.filter(
            (article) => article.id !== action.payload
          ),
        };
  
      default:
        return state;
    }
  };