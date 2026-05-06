import type { Formats } from "use-intl";

export const getFormats = (locale: string): Formats => {
  const numberingSystem = (locale === "ar" ? "arab" : "latn") as
    | "arab"
    | "latn";

  const base = { numberingSystem };
  const egp = { ...base, style: "currency" as const, currency: "EGP" };
  const decimal = { ...base, style: "decimal" as const };
  const percent = { ...base, style: "percent" as const };

  return {
    dateTime: {
      // 02 فبراير 2026 | 02 February 2026
      "date-only": {
        ...base,
        year: "numeric",
        month: "long",
        day: "2-digit",
      },
      // 02 فبراير 2026، 08:30 م | 02 February 2026, 08:30 PM
      "date-time": {
        ...base,
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      },
    },

    number: {
      // ج.م 4,999 | EGP 4,999
      "currency-egp": { ...egp, maximumFractionDigits: 0 },
      // ج.م 4,999.50 | EGP 4,999.50
      "currency-egp-full": { ...egp },
      // 4,999 | ٤٩٩٩
      decimal: { ...decimal, maximumFractionDigits: 0 },
      // 4,999.50 | ٤٩٩٩٫٥٠
      "decimal-full": { ...decimal },
      // 1,234 | ١٬٢٣٤
      number: { ...base },
      // 25.00% | ٢٥٫٠٠٪
      percent: { ...percent, maximumFractionDigits: 2 },
      // 25% | ٢٥٪
      "percent-clean": { ...percent, maximumFractionDigits: 0 },
    },
  };
};
