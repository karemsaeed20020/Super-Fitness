import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useTranslations } from "use-intl";

export default function Footer() {
    const t = useTranslations();

    const tickerKeys = [
        "footer-ticker-classes",
        "footer-ticker-trainers",
        "footer-ticker-personal",
        "footer-ticker-live",
        "footer-ticker-personal-trainers",
    ] as const;

    // Duplicate for seamless loop
    const marqueeItems = [...tickerKeys, ...tickerKeys];

    return (
        <footer className="w-full">
            {/* Orange ticker bar */}
            <div className="bg-main overflow-hidden py-2.5">
                <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap w-max">
                    {marqueeItems.map((key, i) => (
                        <span
                            key={i}
                            className="text-white font-bold text-sm uppercase tracking-wider mx-4 flex items-center gap-3"
                        >
                            {t(key)}
                            <span className="text-white/70 text-lg">✦</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* Main footer body */}
            <div className="bg-[#f3f3f4] dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-white/10 py-10 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div className="flex flex-col gap-3">
                        <img
                            src="/assets/images/logo.webp"
                            alt="Super Fitness logo"
                            className="h-14 w-auto object-contain object-left self-start"
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-[200px]">
                            {t("footer-tagline")}
                        </p>
                    </div>

                    {/* Contact Us */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-sm uppercase tracking-widest text-[#242424] dark:text-white">
                            {t("footer-contact")}
                        </h3>
                        <div className="flex flex-col gap-3">
                            <a
                                href={`tel:${t("footer-phone")}`}
                                className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-main transition-colors"
                            >
                                <span className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 dark:border-white/20 shrink-0">
                                    <Phone size={15} />
                                </span>
                                {t("footer-phone")}
                            </a>
                            <a
                                href={`mailto:${t("footer-email")}`}
                                className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-main transition-colors"
                            >
                                <span className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 dark:border-white/20 shrink-0">
                                    <Mail size={15} />
                                </span>
                                {t("footer-email")}
                            </a>
                        </div>
                    </div>

                    {/* Gym Timing */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-sm uppercase tracking-widest text-[#242424] dark:text-white">
                            {t("footer-timing")}
                        </h3>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <Clock size={14} className="mt-0.5 shrink-0 text-main" />
                                <div>
                                    <p className="font-medium text-[#242424] dark:text-white/80">
                                        {t("footer-timing-weekdays")}
                                    </p>
                                    <p>{t("footer-timing-weekdays-hours")}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <Clock size={14} className="mt-0.5 shrink-0 text-main" />
                                <div>
                                    <p className="font-medium text-[#242424] dark:text-white/80">
                                        {t("footer-timing-weekend")}
                                    </p>
                                    <p>{t("footer-timing-weekend-hours")}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-sm uppercase tracking-widest text-[#242424] dark:text-white">
                            {t("footer-location")}
                        </h3>
                        <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <MapPin size={15} className="mt-0.5 shrink-0 text-main" />
                            <p>{t("footer-address")}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-[#242424] dark:bg-black py-3 px-6 text-center text-xs text-white/50">
                {t("footer-copyright", { year: new Date().getFullYear() })}
            </div>
        </footer>
    );
}
