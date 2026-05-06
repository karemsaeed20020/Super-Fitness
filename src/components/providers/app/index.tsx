import TanstackProvider from "../tanstack-provider/tanstack-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ThemeProvider from "../theme-provider/theme-provider";
import I18nProvider from "../i18-provider/i18-provider";
import { AuthProvider } from "../auth-provider/auth-provider";
import { Toaster } from "sonner";
import { MealProvider } from "../meals/meal-provider";

export default function Providers({ children }: ProviderProps) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <TanstackProvider>
            <MealProvider>
            {/* app */}
            {children}
            {/* sonner */}
            <Toaster position="top-center" />
            </MealProvider>
            {/* tanstack-dev-tools */}
            <ReactQueryDevtools initialIsOpen={false} />
          </TanstackProvider>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
