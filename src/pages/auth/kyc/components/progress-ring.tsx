import { cn } from "@/lib/utils/tailwind-merge/cn";

type ProgressRingProps = {
  current: number;
  total: number;
  className?: string;
};

export default function ProgressRing({
  current,
  total,
  className,
}: ProgressRingProps) {
  const normalizedTotal = total > 0 ? total : 1;
  const progress = Math.min(Math.max(current / normalizedTotal, 0), 1);
  const size = 72;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * progress;

  return (
    <div className={cn("mx-auto relative h-18 w-18", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full"
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#FF4100"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      <div className="absolute inset-0  flex items-center justify-center text-2xl font-medium text-white">
        {current}/{normalizedTotal}
      </div>
    </div>
  );
}
