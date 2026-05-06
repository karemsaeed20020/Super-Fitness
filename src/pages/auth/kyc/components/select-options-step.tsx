import { cn } from "@/lib/utils/tailwind-merge/cn";

export type SelectOptionItem<T extends string> = {
  value: T;
  label: string;
};

type SelectOptionsStepProps<T extends string> = {
  value: T | null;
  options: SelectOptionItem<T>[];
  onChange: (value: T) => void;
};

export default function SelectOptionsStep<T extends string>({
  value,
  options,
  onChange,
}: SelectOptionsStepProps<T>) {
  return (
    <div className="mx-auto w-full max-w-sm space-y-2.5">
      {options.map((item) => {
        // Compare by backend value, not by UI label.
        const selected = value === item.value;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={cn(
              "group relative flex h-11 w-full items-center justify-between rounded-full border px-5 text-left backdrop-blur-[2px] transition-all duration-200",
              selected
                ? "border-main bg-white/10"
                : "border-white/40 bg-white/5 hover:border-white/70",
            )}
            aria-pressed={selected}
          >
            <span
              className={cn(
                "text-base font-bold transition-colors duration-200",
                selected ? "text-main" : "text-white/80",
              )}
            >
              {item.label}
            </span>

            <span
              className={cn(
                "relative flex h-4.5 w-4.5 items-center justify-center rounded-full border transition-colors duration-200",
                selected ? "border-white/80" : "border-white/55",
              )}
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-200",
                  selected
                    ? "scale-100 bg-main opacity-100"
                    : "scale-75 bg-transparent opacity-0",
                )}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}
