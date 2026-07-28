import { useTheme } from "@/context/themeContext";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      className={cn(
        "relative inline-flex h-8 w-16 items-center rounded-full cursor-pointer",
        "transition-colors duration-300 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
        isDark
          ? "bg-linear-to-r from-dark-secondary to-dark-tertiary"
          : "bg-linear-to-r from-green-primary to-green-secondary",
      )}
    >
      <Sun
        className={cn(
          "absolute left-1.5 size-4 transition-opacity duration-300",
          isDark ? " text-secondary-primary" : "opacity-0",
        )}
      />
      <Moon
        className={cn(
          "absolute right-1.5 size-4 transition-opacity duration-300",
          isDark ? "opacity-0" : " text-white",
        )}
      />

      <span
        className={cn(
          "absolute flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md",
          "transition-transform duration-300 ease-in-out",
          isDark ? "translate-x-9" : "translate-x-1",
        )}
      >
        {isDark ? (
          <Moon className="size-3.5 text-dark-primary" strokeWidth={2.5} />
        ) : (
          <Sun className="size-3.5 text-secondary-primary" strokeWidth={2.5} />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
