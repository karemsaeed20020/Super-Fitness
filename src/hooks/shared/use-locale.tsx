import { LocaleContext } from "@/components/providers/locale-provider/locale-provider";
import { use } from "react";

export function useLocale() {
  const localContext = use(LocaleContext);
  if (!localContext)
    throw new Error("useLocale must be used within IntlProvider");
  return localContext;
}
