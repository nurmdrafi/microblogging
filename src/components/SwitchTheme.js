import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useThemeContext from "../context/ThemeContext";

const SwitchTheme = () => {
  const { currentTheme, isDarkMode, changeCurrentTheme } = useThemeContext();

  return (
    <DarkModeSwitch
      style={{ marginBottom: "2rem" }}
        checked={isDarkMode}
      onChange={() => {
        changeCurrentTheme(currentTheme === "light" ? "dark" : "light");
      }}
      size={20}
    />
  );
};

export default SwitchTheme;
