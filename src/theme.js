export const applyTheme = () => {
    const savedTheme = localStorage.getItem("theme");
  
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  };
  
  export const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  
    const isDarkMode = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  };
  