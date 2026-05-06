import { cn } from "@/lib/utils/tailwind-merge/cn";

export default function FilterTabSkeleton() {
  return (
    <div
      className={cn(
        "h-10 w-24 animate-pulse rounded-full border",
        "border-zinc-200 bg-zinc-100/80",
        "dark:border-white/10 dark:bg-white/5",
      )}
    />
  );
}
