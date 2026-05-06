import { useTranslations } from "use-intl";
import { LifeBuoy } from "lucide-react";
import { profileSettingCardCn } from "./profile-setting-classes";

export function HelpCard({ className }: { className?: string }) {
  const t = useTranslations();

  const handleHelpClick = () => {
    // TODO: Add help action/navigation
    console.log("Help card clicked");
  };

  return (
    <button
      type="button"
      onClick={handleHelpClick}
      className={profileSettingCardCn(className)}
    >
      <LifeBuoy size={32} className="text-main" aria-hidden />

      <span className="text-center text-lg font-bold text-charcoal dark:text-white">
        {t("help")}
      </span>
    </button>
  );
}
