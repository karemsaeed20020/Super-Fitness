
import { useTranslations } from "use-intl";
import { ArrowUpRight } from "lucide-react";
import { Dumbbell } from "lucide-react";


const features = [
  {
    icon: <ArrowUpRight size={18} className="text-main shrink-0" />,
    titleKey: "about-feature-trainer-title",
    descKey: "about-feature-trainer-desc"
  },
  {
    icon: <ArrowUpRight size={18} className="text-main shrink-0" />,
    titleKey: "about-feature-cardio-title",
    descKey: "about-feature-cardio-desc"
  },
  {
    icon: <ArrowUpRight size={18} className="text-main shrink-0" />,
    titleKey: "about-feature-equipment-title",
    descKey: "about-feature-equipment-desc"
  },
  {
    icon: <ArrowUpRight size={18} className="text-main shrink-0" />,
    titleKey: "about-feature-nutrition-title",
    descKey: "about-feature-nutrition-desc"
  },
];

export default function AboutPage() {
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#1a1a1a] flex items-center py-10">
      {/* WORKOUTS badge (background text) */}
      <img
        src="/assets/images/WOrkouts.svg"
        alt="workouts background"
        className="absolute select-none pointer-events-none top-[100px] start-[730px] z-0 w-[332px]"
      />

      <div className="relative w-full max-w-7xl min-h-185 mx-auto px-10 pt-10 pb-10 grid grid-cols-1 lg:grid-cols-[600px_1fr] gap-15 items-center">
        {/* ── Start section */}
        <div className="relative w-full max-w-150 h-185">
          <div className="absolute top-0 start-0 w-89.5 h-135.5 overflow-hidden shadow-xl rounded-[18px]">
            <img
              src="/assets/images/about-athlete-training.png"
              alt="Athlete training"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="absolute overflow-hidden shadow-xl border-4 border-white dark:border-[#1a1a1a] w-[222px] h-[188px] top-[80px] start-[378px] rounded-[18px]">
            <img
              src="/assets/images/about-athlete-seated.png"
              alt="Athlete seated"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="absolute bottom-0 end-0 w-88.25 h-113 overflow-hidden shadow-xl border-4 border-white dark:border-[#1a1a1a] rounded-[18px]">
            <img
              src="/assets/images/about-athlete-standing.png"
              alt="Athlete standing"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>


        {/* End: content */}
        <div className="flex flex-col w-full max-w-135 gap-10 z-10">
          {/* Badge */}
          <div className="flex items-center gap-2 w-fit mb-2">
            <Dumbbell size={20} className="text-main" />
            <span className="text-main font-semibold text-base uppercase tracking-widest">
              {t("about-badge")}
            </span>
          </div>

          {/* Heading */}
          <h3 className="text-[38px] font-bold leading-[120%] text-charcoal dark:text-white uppercase max-w-142 min-h-24 opacity-100" style={{ fontFamily: "'Baloo Thambi 2', sans-serif", letterSpacing: "0%" }}>
            {t("about-heading-1")}
            <br />
            <span className="text-main">{t("about-heading-2")}</span> <span>{t("about-heading-3")}</span>
          </h3>

          {/* Description */}
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mb-2">
            {t("about-description")}
          </p>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 border-t border-b border-gray-200 py-6 mt-2">
            {features.map(({ icon, titleKey, descKey }) => (
              <div key={titleKey} className="flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-1">
                  {icon}
                  <span className="font-bold text-sm text-charcoal dark:text-white">
                    {t(titleKey)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed ps-6">
                  {t(descKey)}
                </p>
              </div>
            ))}
          </div>

          {/* button */}
          <div className="mt-4 relative w-fit">
            <button
              className="relative flex items-center bg-[#FF3C00] hover:bg-[#e63600] transition-colors text-white font-bold text-base pl-8 pr-12 py-3 rounded-full shadow-lg min-w-[170px] h-[48px]"
              style={{ fontFamily: "inherit", letterSpacing: 0 }}
            >
              {t("about-cta")}
              {/* Overlapping icon */}
              <span
                className="absolute end-0 top-1/2 -translate-y-1/2 translate-x-1/3 flex items-center justify-center w-9 h-9 rounded-full border-2 border-white bg-[#FF3C00] shadow"
                style={{ boxShadow: "0 2px 8px 0 rgba(255,60,0,0.15)" }}
              >
                <ArrowUpRight size={20} className="text-white" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
