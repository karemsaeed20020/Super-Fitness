import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/shared/use-locale";

export default function LocaleSwitcher() {
  // Hooks
  const { locale, setLocale } = useLocale();

  // Functions
  const handleSwitch = () => setLocale(locale === "en" ? "ar" : "en");

  return (
    <Button variant="outline" onClick={handleSwitch}>
      {locale === "en" ? "العربية" : "English"}
    </Button>
  );
}
