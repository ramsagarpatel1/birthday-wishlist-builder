import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("simi-theme");
    const d = saved === "dark";
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
  }, []);
  const toggle = () => {
    const nd = !dark;
    setDark(nd);
    document.documentElement.classList.toggle("dark", nd);
    localStorage.setItem("simi-theme", nd ? "dark" : "light");
  };
  return (
    <button
      onClick={toggle}
      aria-label="toggle theme"
      className="fixed top-4 right-4 z-40 h-10 w-10 rounded-full bg-white/50 backdrop-blur border border-white/60 grid place-items-center hover:bg-white/80"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
