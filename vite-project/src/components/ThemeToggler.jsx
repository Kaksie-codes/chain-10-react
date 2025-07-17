import React, { useContext } from "react";
import { ThemeContext, useTheme } from "../context/ThemeContext";

const ThemeToggler = () => {
//   const { darkMode, toggleTheme } = useTheme();
const {darkMode, toggleTheme} = useContext(ThemeContext)

    const styles = {
        background: darkMode ? "#333" : "#f0f0f0",
        color: darkMode ? "#fff" : "#000",
        padding: "20px",
        textAlign: "center",
        borderRadius: "10px",
        marginTop: "40px"
      }
  return (
    <div
      style={styles}
    >
      <h2>{darkMode ? "Dark Mode" : "Light Mode"}</h2>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default ThemeToggler;
