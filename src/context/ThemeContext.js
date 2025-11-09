import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("github-ui-theme") || "dark";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeName) => {
    document.documentElement.setAttribute("data-theme", themeName);
    document.documentElement.className = themeName;
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "dark-dimmed" : "dark";
    setTheme(newTheme);
    localStorage.setItem("github-ui-theme", newTheme);
    applyTheme(newTheme);
  };

  const setCustomTheme = (themeName) => {
    setTheme(themeName);
    localStorage.setItem("github-ui-theme", themeName);
    applyTheme(themeName);
  };

  const value = {
    theme,
    toggleTheme,
    setTheme: setCustomTheme,
    isDark: theme === "dark",
    isDarkDimmed: theme === "dark-dimmed",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
