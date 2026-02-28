import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}