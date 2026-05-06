// import en from "../../i18n/messages/en.json";
import type en from "../../i18n/messages/en.json";

declare module "use-intl" {
  interface AppConfig {
    messages: typeof en;
  }
}
