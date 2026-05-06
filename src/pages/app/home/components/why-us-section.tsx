import { useTranslations } from "use-intl";
import { Dumbbell } from "lucide-react";

// ─── Constants ─────────────────────────────────────────────────────────────
const whyUsItems = [
  {
    num: "01",
    titleKey: "why-us-item-1-title",
    descKey: "why-us-item-1-desc",
  },
  {
    num: "02",
    titleKey: "why-us-item-2-title",
    descKey: "why-us-item-2-desc",
  },
  {
    num: "03",
    titleKey: "why-us-item-3-title",
    descKey: "why-us-item-3-desc",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────
export default function WhyUsSection() {
  // Translations
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#1a1a1a] py-16 px-6 md:px-10">
      {/* ── Background watermark text */}
      <span
        className="absolute top-4 md:inset-s-32 text-[80px] md:text-[100px] font-black uppercase select-none pointer-events-none leading-none text-gray-100 dark:text-white/[0.03] z-0"
        aria-hidden="true"
      >
        {t("why-us-background-text")}
      </span>

      {/* ── Main Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

        {/* ── Left: Text Content */}
        <div className="flex flex-col gap-7">

          {/* Badge */}
          <div className="flex items-center gap-2 w-fit">
            <Dumbbell size={20} className="text-main" />
            <span className="text-main font-semibold text-sm uppercase tracking-widest">
              {t("why-us-badge")}
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-2xl md:text-4xl font-bold mt-3 text-charcoal dark:text-white uppercase"
            style={{ fontFamily: "'Baloo Thambi 2', sans-serif", letterSpacing: "0%" }}
          >
            {t("why-us-heading-1")}
            <br />
            <span className="text-main">{t("why-us-heading-2")}</span>{" "}
            <span>{t("why-us-heading-3")}</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl">
            {t("why-us-description")}
          </p>

          {/* Numbered Items */}
          <div className="flex flex-col gap-6 mt-10">
            {whyUsItems.map((item) => (
              <div key={item.num} className="flex items-start gap-5">
                {/* Number circle */}
                <div className="shrink-0 w-12 h-12 rounded-full bg-main flex items-center justify-center shadow-lg shadow-main/30">
                  <span className="text-white font-bold text-sm tracking-wider">
                    {item.num}
                  </span>
                </div>

                {/* Title + Desc */}
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-base text-charcoal dark:text-white">
                    {t(item.titleKey)}
                  </h4>
                  <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Image Grid */}
        <div className="grid grid-cols-2 grid-rows-[3fr_2fr] gap-3 h-[420px] md:h-[500px]">
          {/* Top-left: large */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/assets/images/why-us-1.png"
              alt="why us athlete 1"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Top-right */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/assets/images/why-us-2.jpg"
              alt="why us athlete 2"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Bottom-left */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/assets/images/why-us-3.jpg"
              alt="why us athlete 3"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Bottom-right */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/assets/images/why-us-4.png"
              alt="why us athlete 4"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
