import { useLocale } from "@/hooks/shared/use-locale";
import { Globe } from "lucide-react";
import { useTranslations } from "use-intl";
import { profileSettingCardCn } from "./profile-setting-classes";

export function LanguageCard({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const t = useTranslations();

  const handleToggle = () => setLocale(locale === "en" ? "ar" : "en");

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={profileSettingCardCn(className)}
    >
      <Globe size={32} className="text-main" aria-hidden />

      <span className="text-center text-lg font-bold text-charcoal dark:text-white">
        {t("select-language")}
      </span>

      <span className="text-sm font-semibold text-charcoal dark:text-white">
        {locale === "ar" ? t("english") : t("arabic")}
      </span>
    </button>
  );
}
