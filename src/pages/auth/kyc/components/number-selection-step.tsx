import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils/tailwind-merge/cn";

type NumberSelectionStepProps = {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (next: number) => void;
};

// Number slots shown on each side of the active center value.
const SIDE_SLOTS = 3;
const SLOT_COUNT = SIDE_SLOTS * 2 + 1;
// Change this single value to control picker spacing.
const SLOT_REM = 6;

function clamp(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), hi);
}

// Return size and opacity classes based on distance from the center slot.
function slotClass(distance: number): string {
  switch (distance) {
    case 0:
      return "text-[3.2rem] text-main   opacity-100";
    case 1:
      return "text-[2.4rem] text-white  opacity-90";
    case 2:
      return "text-[1.85rem] text-white opacity-55";
    case 3:
      return "text-[1.4rem] text-white  opacity-30";
    default:
      return "text-[1.05rem] text-white opacity-15";
  }
}

export default function NumberSelectionStep({
  label,
  min,
  max,
  value,
  onChange,
}: NumberSelectionStepProps) {
  // Build the full selectable range once per min/max change.
  const values = useMemo(
    () => Array.from({ length: max - min + 1 }, (_, i) => min + i),
    [min, max],
  );

  const [selectedIndex, setSelectedIndex] = useState(() =>
    clamp(value - min, 0, values.length - 1),
  );

  // Keep local index in sync when parent value changes.
  useEffect(() => {
    setSelectedIndex(clamp(value - min, 0, values.length - 1));
  }, [value, min, values.length]);

  // Use ref to avoid stale onChange inside pointer handlers.
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Apply a safe index and emit the mapped numeric value.
  const commitIndex = useCallback(
    (idx: number) => {
      const safe = clamp(idx, 0, values.length - 1);
      setSelectedIndex(safe);
      const next = values[safe];
      if (next !== undefined) onChangeRef.current(next);
    },
    [values],
  );

  // Pointer logic supports both mouse and touch drag.
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startIndex = useRef(0);
  const tapIndex = useRef<number | null>(null);

  // Read rendered slot width in pixels at runtime.
  const getSlotPx = useCallback((): number => {
    if (!trackRef.current) return SLOT_REM * 16;
    const first = trackRef.current.firstElementChild as HTMLElement | null;
    return first ? first.getBoundingClientRect().width : SLOT_REM * 16;
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const target = e.target as HTMLElement;
      const tapValueIndex = target
        .closest("[data-value-index]")
        ?.getAttribute("data-value-index");

      tapIndex.current =
        tapValueIndex !== undefined && tapValueIndex !== null
          ? Number(tapValueIndex)
          : null;

      isDragging.current = true;
      startX.current = e.clientX;
      startIndex.current = selectedIndex;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [selectedIndex],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - startX.current;
      const slotPx = getSlotPx();
      // Drag left => move to higher values.
      const delta = Math.round(-dx / slotPx);
      const preview = clamp(startIndex.current + delta, 0, values.length - 1);
      // Update local UI only while dragging.
      setSelectedIndex(preview);
    },
    [getSlotPx, values.length],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const dx = e.clientX - startX.current;

      // Short tap means direct select on clicked value.
      if (Math.abs(dx) < 6 && tapIndex.current !== null) {
        commitIndex(tapIndex.current);
        tapIndex.current = null;
        return;
      }

      const slotPx = getSlotPx();
      const delta = Math.round(-dx / slotPx);
      commitIndex(startIndex.current + delta);
      tapIndex.current = null;
    },
    [commitIndex, getSlotPx],
  );

  const onPointerCancel = useCallback(() => {
    isDragging.current = false;
    tapIndex.current = null;
  }, []);

  // Keyboard support for accessibility.
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        commitIndex(selectedIndex + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        commitIndex(selectedIndex - 1);
      }
    },
    [commitIndex, selectedIndex],
  );

  // Always render a fixed number of slots around the active center value.
  const visibleItems = useMemo(
    () =>
      Array.from({ length: SLOT_COUNT }, (_, i) => {
        const valueIndex = selectedIndex - SIDE_SLOTS + i;
        return {
          valueIndex,
          distance: Math.abs(i - SIDE_SLOTS),
          item: values[valueIndex] ?? null,
        };
      }),
    [selectedIndex, values],
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-3 text-base font-black tracking-[0.2em] text-main">
        {label}
      </p>

      <div
        ref={trackRef}
        role="slider"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onKeyDown={onKeyDown}
        className="relative flex cursor-grab items-end select-none outline-none active:cursor-grabbing"
        style={{ minHeight: "6rem", padding: "0.375rem 0" }}
      >
        {visibleItems.map(({ distance, item }, i) => (
          <div
            key={i}
            className="flex shrink-0 items-end justify-center"
            style={{ width: `${SLOT_REM}rem` }}
          >
            {item === null ? (
              <span className="block" style={{ height: "3.5rem" }} />
            ) : (
              <button
                type="button"
                tabIndex={-1}
                data-value-index={item - min}
                className={cn(
                  "mx-auto block w-full text-center font-black tabular-nums leading-none transition-all duration-150 hover:opacity-80",
                  slotClass(distance),
                )}
              >
                {item}
              </button>
            )}
          </div>
        ))}
      </div>

      <span
        aria-hidden
        className="mt-2 h-0 w-0 border-x-[7px] border-x-transparent border-b-10 border-b-main"
      />
    </div>
  );
}
