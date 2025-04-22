import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store";
import { setTheme } from "@/store/slices/ui.slice";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ui.theme);

  useEffect(() => {
    // Handle system theme preference
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "h-9 w-9 rounded-lg hover:bg-sidebar-accent transition-all duration-300",
        className
      )}
      title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === 'dark' ? (
        <Sun size={18} className="text-sidebar-foreground transition-transform hover:rotate-45" />
      ) : (
        <Moon size={18} className="text-sidebar-foreground transition-transform hover:-rotate-12" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
} 