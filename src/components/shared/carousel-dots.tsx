import { cn } from "@/lib/utils/tailwind-merge/cn";

type CarouselDotsProps = {
  count: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
  className?: string;
};

export default function CarouselDots({
  count,
  activeIndex,
  onDotClick,
  className,
}: CarouselDotsProps) {
  if (count <= 1) return null;

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {Array.from({ length: count }).map((_, index) => {
        const isActive = activeIndex === index;

        return (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={isActive}
            onClick={() => onDotClick(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              isActive ? "w-5 bg-main" : "w-2 bg-main/35 hover:bg-main/55",
            )}
          />
        );
      })}
    </div>
  );
}
