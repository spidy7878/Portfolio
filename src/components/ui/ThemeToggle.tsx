import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";

/** Dark/light switch — both icons rendered, crossfaded with pure CSS. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      data-cursor="hover"
      className="glass relative grid h-10 w-10 place-items-center overflow-hidden rounded-full text-ink transition-colors hover:text-accent"
    >
      <FiMoon
        size={16}
        className={cn(
          "absolute transition-all duration-300 ease-out",
          isDark ? "translate-y-0 rotate-0 opacity-100" : "translate-y-3 -rotate-45 opacity-0",
        )}
      />
      <FiSun
        size={16}
        className={cn(
          "absolute transition-all duration-300 ease-out",
          isDark ? "-translate-y-3 rotate-45 opacity-0" : "translate-y-0 rotate-0 opacity-100",
        )}
      />
    </button>
  );
}
