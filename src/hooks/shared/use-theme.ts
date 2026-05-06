import { ThemeContext } from "@/components/providers/theme-provider/theme-provider";
import { use } from "react";

export function useTheme() {
  const themeContext = use(ThemeContext);
  if (!themeContext)
    throw new Error("useTheme must be used within ThemeProvider");
  return themeContext;
}
