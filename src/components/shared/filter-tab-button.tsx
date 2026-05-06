import { cn } from "@/lib/utils/tailwind-merge/cn";

//Types
type FilterTabButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

// Styles
const baseClasses = cn(
  "inline-flex cursor-pointer min-h-10 items-center justify-center rounded-full px-4 py-2 text-sm font-medium",
  "border transition-all duration-200 ease-out",
  "whitespace-nowrap",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2",
  "focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950",
);

const activeClasses = cn(
  "border-brand bg-black/70 text-white shadow-sm",
  "hover:bg-black",
  "dark:border-brand dark:bg-main dark:text-white",
);

const inactiveClasses = cn(
  "border-zinc-200 bg-white text-zinc-700 shadow-sm",
  "hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900",
  "dark:border-white/10 dark:bg-white/4 dark:text-zinc-300 dark:shadow-none",
  "dark:hover:border-white/20 dark:hover:bg-white/8 dark:hover:text-white",
);

export default function FilterTabButton({
  label,
  isActive,
  onClick,
}: FilterTabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(baseClasses, isActive ? activeClasses : inactiveClasses)}
    >
      <span className="truncate">{label}</span>
    </button>
  );
}
