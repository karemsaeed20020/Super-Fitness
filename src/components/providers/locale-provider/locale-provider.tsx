import { createContext, useEffect, useState } from "react";
import {
  defaultLocale,
  LOCALE_KEY,
  type Locale,
} from "@/lib/constants/locale/locale.constant";

type LocalContextProps = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
} | null;

export const LocaleContext = createContext<LocalContextProps>(null);

export default function LocaleProvider({ children }: ProviderProps) {
  // States
  const [locale, setLocale] = useState<Locale>(
    () => (localStorage.getItem(LOCALE_KEY) as Locale) ?? defaultLocale,
  );

  // Functions
  const handleSetLocale = (newLocale: Locale) => {
    localStorage.setItem(LOCALE_KEY, newLocale);
    setLocale(newLocale);
  };

  // Effects
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return (
    <LocaleContext value={{ locale, setLocale: handleSetLocale }}>
      {children}
    </LocaleContext>
  );
}
