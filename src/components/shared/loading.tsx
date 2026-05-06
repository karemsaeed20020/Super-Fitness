import { cn } from '@/lib/utils/tailwind-merge/cn';

export default function Loading() {
  return (
    <div
      className={cn(
        'relative grid min-h-screen w-full grid-cols-1 md:grid-cols-12',
        'before:absolute before:inset-0',
        "before:bg-[url('/assets/images/person-fit.png')]",
        'before:bg-cover before:bg-center',
        "before:content-['']",
        'after:absolute after:inset-0',
        'after:bg-[#24242499] after:backdrop-blur-xl',
        "after:content-['']",
      )}
    ></div>
  );
}
