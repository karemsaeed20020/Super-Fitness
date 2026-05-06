import LocaleProvider from "@/components/providers/locale-provider/locale-provider";
import UseIntlProvider from "@/components/providers/use-intl-provider/use-intl-provider";

export default function I18nProvider({ children }: ProviderProps) {
  return (
    <LocaleProvider>
      <UseIntlProvider>{children}</UseIntlProvider>
    </LocaleProvider>
  );
}
