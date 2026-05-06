import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/shared/use-theme";

export default function ThemeToggle() {
  // Hooks
  const { theme, setTheme } = useTheme();

  // Functions
  const handleToggle = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <Button variant="outline" size="icon" onClick={handleToggle}>
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
}
