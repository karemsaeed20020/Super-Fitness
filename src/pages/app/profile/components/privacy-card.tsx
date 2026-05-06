import { useTranslations } from "use-intl";
import { ShieldAlert } from "lucide-react";
import { profileSettingCardCn } from "./profile-setting-classes";

export function PrivacyCard({ className }: { className?: string }) {
  const t = useTranslations();

  const handlePrivacyClick = () => {
    // TODO: Add privacy policy navigation/action
    console.log("Privacy policy clicked");
  };

  return (
    <button
      type="button"
      onClick={handlePrivacyClick}
      className={profileSettingCardCn(className)}
    >
      <ShieldAlert size={32} className="text-main" aria-hidden />

      <span className="text-center text-lg font-bold text-charcoal dark:text-white">
        {t("privacy-policy")}
      </span>
    </button>
  );
}
