import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function DarkMode() {
  // Initialize theme state from localStorage if available
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  });

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.setAttribute("data-bs-theme", "dark");
    } else {
      document.body.classList.remove("dark");
      document.body.setAttribute("data-bs-theme", "light");
    }
    // Save the user's theme preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const icon = theme === "dark" ? faSun : faMoon;

  return (
    <div className="d-flex me-4 my-2 pt-1" style={{cursor: "pointer"}}>
      <FontAwesomeIcon icon={icon} style={{fontSize:"20"}} onClick={handleChangeTheme} />
    </div>
  );
}

export default DarkMode;
