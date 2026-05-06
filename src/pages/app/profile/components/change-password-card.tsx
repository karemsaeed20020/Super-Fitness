import { useTranslations } from "use-intl";
import { RefreshCw } from "lucide-react";
import { profileSettingCardCn } from "./profile-setting-classes";

export function ChangePasswordCard({ className }: { className?: string }) {
  const t = useTranslations();

  const handleChangePassword = () => {
    // TODO: Navigate to change password page/modal
    console.log("Change password");
  };

  return (
    <button
      type="button"
      onClick={handleChangePassword}
      className={profileSettingCardCn(className)}
    >
      <RefreshCw size={32} className="text-main" aria-hidden />

      <span className="text-center text-lg font-bold text-charcoal dark:text-white">
        {t("change-password")}
      </span>
    </button>
  );
}
