import { useTranslations } from "use-intl";
import { ShieldCheck } from "lucide-react";
import { profileSettingCardCn } from "./profile-setting-classes";

export function SecurityCard({ className }: { className?: string }) {
  const t = useTranslations();

  const handleSecurityClick = () => {
    // TODO: Add security action/navigation
    console.log("Security card clicked");
  };

  return (
    <button
      type="button"
      onClick={handleSecurityClick}
      className={profileSettingCardCn(className)}
    >
      <ShieldCheck size={32} className="text-main" aria-hidden />

      <span className="text-center text-lg font-bold text-charcoal dark:text-white">
        {t("security")}
      </span>
    </button>
  );
}
