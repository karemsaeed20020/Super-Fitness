import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge/cn";

const buttonVariants = cva(
  [
    "inline-flex relative items-center justify-center gap-2 whitespace-nowrap",
    "rounded-[1.25rem] text-base font-bold",
    "transition-all duration-200 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.98]",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-main text-white hover:bg-main/80 hover:shadow-md dark:hover:bg-main/70 dark:hover:shadow-[0_0_1rem_rgba(255,65,0,0.3)]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/80 hover:shadow-md dark:hover:shadow-[0_0_1rem_rgba(255,100,80,0.25)]",
        outline:
          "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent dark:border-border dark:hover:bg-secondary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70 dark:hover:bg-secondary/50",
        ghost:
          "border border-main text-main bg-transparent hover:bg-main hover:text-white dark:hover:bg-main/90",
        link: "text-main underline-offset-4 hover:underline hover:text-main/80 dark:text-main dark:hover:text-main/70",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-3 rounded-[0.375rem] text-sm",
        lg: "h-11 px-8 rounded-[0.375rem] text-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  icon?: () => React.ReactNode;
  serverError?: string;
}

// ─── Server Error ───
function ServerError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-2 self-center",
        "rounded-[0.75rem] px-4 py-3",
        "text-sm font-medium",
        "border border-destructive/30 bg-destructive/8 text-destructive",
        "dark:border-destructive/40 dark:bg-destructive/15 dark:text-red-400",
        "animate-in fade-in slide-in-from-top-1 duration-200",
      )}
    >
      <TriangleAlert
        size={15}
        strokeWidth={2}
        className="shrink-0 text-destructive dark:text-red-400"
      />
      <span>{message}</span>
    </div>
  );
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant,
    size,
    icon,
    isLoading,
    asChild = false,
    children,
    disabled,
    serverError,
    type,
    ...props
  },
  ref,
) {
  const Comp = asChild ? Slot : "button";

  const renderIcon = () => {
    if (isLoading) {
      return <LoaderCircle className="mt-0.5 size-5 animate-spin" />;
    }

    if (icon) {
      return (
        <div
          className={cn(
            "absolute bg-main rounded-full size-8",
            "border-2 border-gray-extra text-gray-extra",
            "dark:border-gray-extra dark:text-foreground",
            "flex items-center justify-center",
            "-right-4 top-1/2 -translate-y-1/2 -rotate-45",
            "transition-transform duration-200 group-hover:rotate-0",
          )}
        >
          {icon()}
        </div>
      );
    }

    return null;
  };

  //submit with server error
  if (type === "submit") {
    return (
      <div className="flex w-full flex-col gap-2">
        <Comp
          type="submit"
          className={cn(
            buttonVariants({ variant, size }),
            icon && "group pr-6",
            className,
          )}
          ref={ref}
          disabled={isLoading || disabled}
          {...props}
        >
          {asChild ? (
            children
          ) : (
            <>
              {children}
              {renderIcon()}
            </>
          )}
        </Comp>
        {serverError && <ServerError message={serverError} />}
      </div>
    );
  }

  return (
    <Comp
      type={type}
      className={cn(
        buttonVariants({ variant, size }),
        icon && "group pr-6",
        className,
      )}
      ref={ref}
      disabled={isLoading || disabled}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {children}
          {renderIcon()}
        </>
      )}
    </Comp>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
