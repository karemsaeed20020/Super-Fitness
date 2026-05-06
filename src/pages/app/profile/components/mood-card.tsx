import { useTheme } from "@/hooks/shared/use-theme";
import { cn } from "@/lib/utils/tailwind-merge/cn";
import { SunMoon } from "lucide-react";
import { useTranslations } from "use-intl";
import { profileSettingCardCn } from "./profile-setting-classes";

export function MoodCard({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const t = useTranslations();

  return (
    <div className={profileSettingCardCn(className)}>
      <span className="text-main" aria-hidden>
        <SunMoon size={32} />
      </span>

      <span className="text-center text-lg font-bold text-charcoal dark:text-white">
        {t("mood")}{" "}
        <span className="text-charcoal dark:text-white">
          ({t(isDark ? "dark" : "light")})
        </span>
      </span>

      <button
        type="button"
        aria-label={t("toggle-dark-mode")}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cn(
          "flex h-6 w-12 items-center rounded-full bg-gray-500 transition-colors duration-300 dark:bg-gray-700",
          isDark ? "justify-end pe-0.5" : "justify-start ps-0.5",
        )}
      >
        <span className="block size-5 rounded-full border border-gray-400 bg-white shadow-md dark:border-gray-600" />
      </button>
    </div>
  );
}