import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isDarkMode, setDarkMode] = useState();

  function changeCurrentTheme(newTheme) {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  useEffect(() => {
    if (theme === "light") {
        document.body.classList.remove("dark");
        setDarkMode(false);
    }
    else {
        document.body.classList.add("dark");
        setDarkMode(true);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, isDarkMode, changeCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw Error("useThemeContext must be used within a ThemeContextProvider");
  }
  return context;
};

export default useThemeContext;
