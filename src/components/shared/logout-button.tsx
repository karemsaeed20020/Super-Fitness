import { useAuth } from "@/hooks/shared/use-auth";
import { cn } from "@/lib/utils/tailwind-merge/cn";
import { useTranslations } from "use-intl";
import { LogOut } from "lucide-react";

type Variant = "ghost" | "filled" | "subtle" | "icon";

const variants: Record<Variant, string> = {
  ghost:
    "border border-destructive/40 text-destructive hover:bg-destructive/10",
  filled:
    "bg-destructive text-white hover:bg-destructive/80 border-transparent",
  subtle:
    "border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 hover:bg-destructive/10",
  icon: "border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 hover:bg-destructive/10 w-9 px-0 justify-center",
};

type Props = {
  variant?: Variant;
  className?: string;
};

export function LogoutButton({ variant = "subtle", className }: Props) {
  const { logout } = useAuth();
  const t = useTranslations();

  return (
    <button
      onClick={logout}
      className={cn(
        "inline-flex items-center cursor-pointer gap-2 h-9 px-4 rounded-md text-sm font-medium transition-all active:scale-[0.98]",
        variants[variant],
        className,
      )}
    >
      <LogOut size={15} className="rtl:rotate-180" />
      {variant !== "icon" && <span>{t("logout")}</span>}
    </button>
  );
}
