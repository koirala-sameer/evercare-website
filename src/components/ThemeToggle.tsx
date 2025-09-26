import React from "react";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">(
    (localStorage.getItem("ec-theme") as "light" | "dark") || "light"
  );

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("ec-theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}
      className="rounded-xl px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur text-sm"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === "dark" ? "🌙 Dark" : "🌞 Light"}
    </button>
  );
};

export default ThemeToggle;
