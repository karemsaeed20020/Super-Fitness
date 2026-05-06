import { useAuth } from "@/hooks/shared/use-auth";
import { useTranslations } from "use-intl";
import { SquareArrowRightEnter } from "lucide-react";
import { profileSettingCardCn } from "./profile-setting-classes";

export function LogoutCard({ className }: { className?: string }) {
  const { logout } = useAuth();
  const t = useTranslations();

  return (
    <button
      type="button"
      onClick={logout}
      className={profileSettingCardCn(className)}
    >
      <SquareArrowRightEnter
        size={32}
        className="text-main rtl:rotate-180"
        aria-hidden
      />

      <span className="text-lg font-bold text-main">{t("logout")}</span>
    </button>
  );
}