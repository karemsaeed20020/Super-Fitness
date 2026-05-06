import { ROUTES } from "@/lib/constants/routes/routes.constant";
import { cn } from "@/lib/utils/tailwind-merge/cn";
import { UserRound } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useTranslations } from "use-intl";

const navLinkClass =
    "text-sm font-bold text-charcoal transition-colors hover:text-main dark:text-white/90 dark:hover:text-main md:text-base";
export default function ProfileHeader() {
    const t = useTranslations();
    return (
        <header className="sticky top-0 z-20 border-b border-zinc-400/30 bg-white/45 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/55">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:gap-6">
                <Link
                    to={ROUTES.app.home}
                    className="flex shrink-0 items-center gap-2.5"
                >
                    <img
                        src="/assets/images/logo.webp"
                        alt="Logo"
                        className="h-10 w-28 object-contain"
                    />

                </Link>
                <nav
                    className="order-3 flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 md:order-none md:flex-1 md:justify-center md:gap-8"
                    aria-label="Main"
                >
                    {(
                        [
                            [ROUTES.app.home, "profile-page.home"],
                            [ROUTES.app.about, "profile-page.about"],
                            [ROUTES.app.classes, "profile-page.classes"],
                            [ROUTES.app.healthy, "profile-page.healthy"],
                        ] as const
                    ).map(([to, labelKey]) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === ROUTES.app.home}
                            className={({ isActive }) =>
                                cn(navLinkClass, isActive && "text-main dark:text-main")
                            }
                        >
                            {t(labelKey)}
                        </NavLink>
                    ))}
                </nav>
                <NavLink
                    to={ROUTES.app.profile}
                    aria-label={t("profile-page.profile")}
                    className={({ isActive }) =>
                        cn(
                            "flex size-11 shrink-0 items-center justify-center rounded-full bg-main text-white shadow-md ring-2 ring-white/30 transition-transform hover:scale-105",
                            isActive && "ring-2 ring-white",
                        )
                    }
                >
                    <UserRound className="size-5" strokeWidth={2} />
                </NavLink>
            </div>
        </header>
    );
}