import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggler = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div
      style={{
        background: darkMode ? "#333" : "#f0f0f0",
        color: darkMode ? "#fff" : "#000",
        padding: "20px",
        textAlign: "center",
        borderRadius: "10px",
        marginTop: "40px"
      }}
    >
      <h2>{darkMode ? "Dark Mode" : "Light Mode"}</h2>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default ThemeToggler;
