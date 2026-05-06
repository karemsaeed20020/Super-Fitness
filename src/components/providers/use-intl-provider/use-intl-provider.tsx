import { IntlProvider } from "use-intl";
import en from "@/i18n/messages/en.json";
import ar from "@/i18n/messages/ar.json";
import { useLocale } from "@/hooks/shared/use-locale";
import { getFormats } from "@/i18n/formate";

const messages = { en, ar };

export default function UseIntlProvider({ children }: ProviderProps) {
  const { locale } = useLocale();

  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale]}
      formats={getFormats(locale)}
    >
      {children}
    </IntlProvider>
  );
}
