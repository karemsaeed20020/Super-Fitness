import { defaultTheme, THEME_KEY } from "@/lib/constants/theme/theme.constant";
import type { Theme } from "@/lib/types/theme";
import { useEffect, useState, createContext } from "react";

//Types
type ThemeContextProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null;
// Variables
export const ThemeContext = createContext<ThemeContextProps>(null);

export default function ThemeProvider({ children }: ProviderProps) {
  // States
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(THEME_KEY) as Theme) ?? defaultTheme,
  );

  // Effects
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  // Functions
  const handleSetTheme = (newTheme: Theme) => {
    localStorage.setItem(THEME_KEY, newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext>
  );
}
