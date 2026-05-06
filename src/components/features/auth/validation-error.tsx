import { cn } from "@/lib/utils/tailwind-merge/cn";
type Props = {
  errorMsg?: string;
  className?: string;
};

export default function ValidationError({ errorMsg, className }: Props) {
  if (!errorMsg) return null;

  return (
    <p
      className={cn(
        "text-xs font-medium leading-none capitalize",
        "text-destructive dark:text-destructive",
        className,
      )}
    >
      {errorMsg}
    </p>
  );
}
