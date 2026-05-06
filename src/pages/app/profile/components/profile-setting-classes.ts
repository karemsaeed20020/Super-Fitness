import { cn } from "@/lib/utils/tailwind-merge/cn";

/** Shared shell for profile settings tiles (fixed size, border, hover). */
export const profileSettingCardClass =
  "flex h-[168px] w-[209px] flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-8 transition-all hover:bg-gray-100 active:scale-[0.98] dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20";

export function profileSettingCardCn(className?: string) {
  return cn(profileSettingCardClass, className);
}
