import { useRef, useState, useEffect } from "react";
import { SlidersHorizontal, X, Check } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge/cn";
import FilterTabButton from "./filter-tab-button";
import FilterTabSkeleton from "../skeletons/shared/filter-tab-skeleton";

//Types
type FilterTabItem = {
  id: string;
  label: string;
};

type FilterTabsProps = {
  items: FilterTabItem[];
  activeId: string | null;
  allTab?: FilterTabItem;
  isLoading?: boolean;
  skeletonCount?: number;
  onChange: (id: string | null) => void;
  className?: string;
};

// Mobile trigger button
const mobileTriggerBase = cn(
  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
  "border transition-all duration-200",
  "border-zinc-200 bg-white text-zinc-700 shadow-sm",
  "hover:border-zinc-300 hover:bg-zinc-50",
  "dark:border-white/10 dark:bg-white/5 dark:text-zinc-300",
  "dark:hover:border-white/20 dark:hover:bg-white/8 dark:hover:text-white",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50",
);

const mobileTriggerActive = cn(
  "border-brand bg-brand/10 text-brand",
  "dark:border-brand dark:bg-brand/20 dark:text-main",
);

// Fade overlays
const fadeBase = cn(
  "pointer-events-none absolute inset-y-0 w-10",
  "transition-opacity duration-200",
);

// Bottom sheet
const sheetBase = cn(
  "fixed inset-x-0 bottom-0 z-50 md:hidden",
  "rounded-t-3xl border-t border-border/60",
  "bg-white dark:bg-zinc-900",
  "shadow-2xl",
  "animate-in slide-in-from-bottom-4 fade-in-0 duration-300",
);

const sheetCloseBtn = cn(
  "flex h-8 w-8 items-center justify-center rounded-full",
  "bg-zinc-100 text-zinc-500 hover:bg-zinc-200",
  "dark:bg-white/10 dark:text-zinc-400 dark:hover:bg-white/20",
  "transition-colors",
);

// Sheet option items
const sheetItemBase = cn(
  "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-150",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50",
);

const sheetItemActive = cn(
  "border-brand bg-brand/10 text-brand",
  "dark:border-brand dark:bg-main dark:text-white",
);

const sheetItemInactive = cn(
  "border-zinc-200 bg-white text-zinc-700",
  "hover:border-zinc-300 hover:bg-zinc-50",
  "dark:border-white/10 dark:bg-white/5 dark:text-zinc-300",
  "dark:hover:border-white/20 dark:hover:bg-white/8",
);

// Sheet skeleton item
const sheetSkeletonItem = cn(
  "h-11 animate-pulse rounded-2xl border",
  "border-zinc-200 bg-zinc-100/80",
  "dark:border-white/10 dark:bg-white/5",
);

export default function FilterTabs({
  items,
  activeId,
  allTab,
  isLoading = false,
  skeletonCount = 6,
  onChange,
  className,
}: FilterTabsProps) {
  // Refs
  const scrollRef = useRef<HTMLDivElement>(null);

  // States
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Handlers
  const updateFades = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const absLeft = Math.abs(scrollLeft);
    setCanScrollStart(absLeft > 4);
    setCanScrollEnd(absLeft + clientWidth < scrollWidth - 4);
  };

  const handleSelect = (id: string | null) => {
    onChange(id);
    setSheetOpen(false);
  };

  // Effects
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateFades();
    el.addEventListener("scroll", updateFades, { passive: true });
    const ro = new ResizeObserver(updateFades);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateFades);
      ro.disconnect();
    };
  }, [items, isLoading]);

  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  // Derived
  const activeLabel =
    activeId === null
      ? allTab?.label
      : items.find((i) => i.id === activeId)?.label;

  const allItems: Array<{ id: string | null; label: string }> = [
    ...(allTab ? [{ id: null, label: allTab.label }] : []),
    ...items.map((i) => ({ id: i.id, label: i.label })),
  ];

  return (
    <>
      {/* ─── Mobile trigger button ─── */}
      <div className={cn("md:hidden", className)}>
        <button
          type="button"
          aria-label="Open filters"
          onClick={() => setSheetOpen(true)}
          className={cn(
            mobileTriggerBase,
            activeId !== null && mobileTriggerActive,
          )}
        >
          <SlidersHorizontal size={15} />
          <span>{activeLabel}</span>
        </button>
      </div>

      {/* ─── Desktop scroll row ─── */}
      <div className={cn("relative hidden md:block", className)}>
        <div
          ref={scrollRef}
          className="flex gap-2.5 overflow-x-auto scrollbar-none md:flex-wrap md:overflow-x-visible"
        >
          {allTab && (
            <FilterTabButton
              label={allTab.label}
              isActive={activeId === null}
              onClick={() => onChange(null)}
            />
          )}
          {isLoading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <FilterTabSkeleton key={i} />
              ))
            : items.map((item) => (
                <FilterTabButton
                  key={item.id}
                  label={item.label}
                  isActive={activeId === item.id}
                  onClick={() => onChange(item.id)}
                />
              ))}
        </div>

        {/* Fades */}
        <div
          aria-hidden="true"
          className={cn(
            fadeBase,
            "inset-s-0 bg-gradient-to-e from-background to-transparent",
            canScrollStart ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            fadeBase,
            "inset-e-0 bg-gradient-to-s from-background to-transparent",
            canScrollEnd ? "opacity-100" : "opacity-0",
          )}
        />
      </div>

      {/* ─── Mobile bottom sheet ─── */}
      {sheetOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] md:hidden"
            onClick={() => setSheetOpen(false)}
          />

          <div className={sheetBase}>
            {/* Handle */}
            <div className="flex items-center justify-between px-5 pb-3 pt-4">
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-zinc-200 dark:bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-4">
              <p className="text-base font-semibold text-foreground">
                {allTab?.label ?? "Filter"}
              </p>
              <button
                aria-label="Close"
                type="button"
                onClick={() => setSheetOpen(false)}
                className={sheetCloseBtn}
              >
                <X size={16} />
              </button>
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-2 gap-2 px-5 pb-8">
              {isLoading
                ? Array.from({ length: skeletonCount }).map((_, i) => (
                    <div key={i} className={sheetSkeletonItem} />
                  ))
                : allItems.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                      <button
                        key={item.id ?? "__all__"}
                        type="button"
                        onClick={() => handleSelect(item.id)}
                        className={cn(
                          sheetItemBase,
                          isActive ? sheetItemActive : sheetItemInactive,
                        )}
                      >
                        <span className="truncate">{item.label}</span>
                        {isActive && (
                          <Check
                            size={15}
                            className="ms-2 shrink-0 text-brand dark:text-white"
                          />
                        )}
                      </button>
                    );
                  })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
