import * as React from "react";
import { Eye, EyeOff, Lock, Mail, Search, User } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge/cn";
import { useTranslations } from "use-intl";
import { PASSWORD_PATTERN } from "@/lib/constants/auth/auth.constant";

type NativeInputProps = React.ComponentProps<"input">;

type InputProps = NativeInputProps & {
  inputClassName?: string;
  wrapperClassName?: string;
  startIcon?: React.ReactNode;
  label?: string;
  error?: string;
  mood?: "create" | "login";
  passwordLabels?: {
    show: string;
    hide: string;
  };
};

// ─── Shared Styles ───
const wrapperBaseClasses = cn(
  "relative flex h-12 w-full items-center overflow-hidden rounded-[16px]",
  "border transition-all duration-200",
  "bg-white/95 border-zinc-300",
  "focus-within:border-zinc-500 hover:border-zinc-400",
  "dark:bg-white/[0.03] dark:border-white/25",
  "dark:hover:border-white/40 dark:focus-within:border-white/50",
  "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60",
);

const wrapperErrorClasses =
  "border-destructive hover:border-destructive focus-within:border-destructive dark:border-destructive dark:hover:border-destructive dark:focus-within:border-destructive";

const innerInputClasses = cn(
  "h-full w-full bg-transparent border-0",
  "px-3 text-sm",
  "text-zinc-50 placeholder:text-zinc-500/80",
  "outline-none ring-0",
  "focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
  "disabled:cursor-not-allowed",
  "dark:text-white dark:placeholder:text-white/45",
  "[&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_transparent]",
  "[&:-webkit-autofill]:[-webkit-text-fill-color:currentColor]",
);

const plainInputClasses = cn(
  "flex h-12 w-full rounded-[1rem] border bg-white/95",
  "border-zinc-300 px-4 py-2 text-sm",
  "text-zinc-50 placeholder:text-zinc-500/80",
  "transition-all duration-200",
  "outline-none ring-0 shadow-none",
  "hover:border-zinc-400 focus:border-zinc-500",
  "focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
  "disabled:cursor-not-allowed disabled:opacity-60",
  "dark:bg-white/[0.03] dark:border-white/25",
  "dark:text-white dark:placeholder:text-white/45",
  "dark:hover:border-white/40 dark:focus:border-white/50",
);

const iconClasses = cn("shrink-0 text-zinc-500/80 dark:text-white/45");

// ─── Password Generator ───
function generateStrongPassword(): string {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const special = "#?!@$%^&*-";
  const all = upper + lower + digits + special;

  const rand = (str: string) => str[Math.floor(Math.random() * str.length)];

  const required = [rand(upper), rand(lower), rand(digits), rand(special)];
  const rest = Array.from({ length: 8 }, () => rand(all));

  const password = [...required, ...rest]
    .sort(() => Math.random() - 0.5)
    .join("");

  return PASSWORD_PATTERN.test(password) ? password : generateStrongPassword();
}

// ─── Field Wrapper ───
type FieldWrapperProps = {
  id?: string;
  label?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

function FieldWrapper({
  id,
  label,
  error,
  children,
  className,
}: FieldWrapperProps) {
  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium leading-none",
            "text-zinc-700 dark:text-white/80",
            error && "text-destructive dark:text-destructive",
          )}
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs font-medium leading-none text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Helpers ───
function getPasswordLabels(custom?: InputProps["passwordLabels"]) {
  if (custom) return custom;

  if (typeof document !== "undefined") {
    const lang = document.documentElement.lang?.toLowerCase();
    if (lang?.startsWith("ar")) {
      return { show: "إظهار كلمة المرور", hide: "إخفاء كلمة المرور" };
    }
  }

  return { show: "Show password", hide: "Hide password" };
}

function getDefaultIcon(type?: string) {
  switch (type) {
    case "search":
      return <Search size={16} strokeWidth={1.75} />;
    case "email":
      return <Mail size={16} strokeWidth={1.75} />;
    case "text":
      return <User size={16} strokeWidth={1.75} />;
    default:
      return null;
  }
}

// ─── Password Input ───
const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,
      wrapperClassName,
      disabled,
      passwordLabels,
      label,
      error,
      mood = "login",
      id: externalId,
      onChange,
      type: _type,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const isMouseDownRef = React.useRef(false);
    const generatedId = React.useId();
    const inputId = externalId ?? generatedId;
    const labels = getPasswordLabels(passwordLabels);
    const t = useTranslations();

    void _type;

    const handleBlur = () => {
      if (!isMouseDownRef.current) {
        setIsFocused(false);
      }
      isMouseDownRef.current = false;
    };

    const handleGenerate = () => {
      const password = generateStrongPassword();
      setShowPassword(true);

      const nativeInput = document.getElementById(
        inputId,
      ) as HTMLInputElement | null;

      if (nativeInput) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value",
        )?.set;

        nativeInputValueSetter?.call(nativeInput, password);
        nativeInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    };

    return (
      <FieldWrapper
        id={inputId}
        label={label}
        error={error}
        className={wrapperClassName}
      >
        <div
          className="flex w-full flex-col gap-1"
          onMouseDown={() => {
            isMouseDownRef.current = true;
          }}
        >
          {/* input row */}
          <div className="relative flex w-full items-center">
            <div
              className={cn(
                wrapperBaseClasses,
                "w-full",
                error && wrapperErrorClasses,
                className,
              )}
            >
              <span className={cn(iconClasses, "ps-4")}>
                <Lock size={16} strokeWidth={1.75} />
              </span>

              <input
                {...props}
                id={inputId}
                ref={ref}
                type={showPassword ? "text" : "password"}
                data-slot="input"
                disabled={disabled}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
                className={cn(innerInputClasses, "px-3 pe-10", inputClassName)}
              />
            </div>

            {/* toggle visibility */}
            <button
              type="button"
              disabled={disabled}
              tabIndex={-1}
              aria-controls={inputId}
              aria-label={showPassword ? labels.hide : labels.show}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword((prev) => !prev)}
              className={cn(
                "absolute inset-e-3 top-1/2 -translate-y-1/2",
                "shrink-0 transition-colors duration-200",
                "text-zinc-500/80 hover:text-zinc-700",
                "dark:text-white/45 dark:hover:text-white/80",
                "disabled:pointer-events-none",
              )}
            >
              {showPassword ? (
                <EyeOff size={16} strokeWidth={1.75} />
              ) : (
                <Eye size={16} strokeWidth={1.75} />
              )}
            </button>
          </div>

          {/* generate button — only in create mood */}
          {mood === "create" && (
            <div
              className={cn(
                "grid transition-all duration-200 ease-in-out",
                isFocused
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <button
                  type="button"
                  tabIndex={-1}
                  disabled={disabled}
                  onClick={handleGenerate}
                  className={cn(
                    "mt-1 flex items-center gap-1.5",
                    "text-xs font-medium",
                    "text-zinc-500 hover:text-main",
                    "dark:text-white/45 dark:hover:text-main",
                    "transition-colors duration-200",
                    "disabled:pointer-events-none disabled:opacity-50",
                  )}
                >
                  <span className="text-base leading-none">✦</span>
                  <span>{t("generate-password")}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </FieldWrapper>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

// ─── Main Input ───
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,
      wrapperClassName,
      type = "text",
      disabled,
      startIcon,
      passwordLabels,
      mood,
      label,
      error,
      id: externalId,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = externalId ?? generatedId;

    if (type === "password") {
      return (
        <PasswordInput
          ref={ref}
          id={inputId}
          type="password"
          mood={mood}
          disabled={disabled}
          label={label}
          error={error}
          className={className}
          inputClassName={inputClassName}
          wrapperClassName={wrapperClassName}
          passwordLabels={passwordLabels}
          {...props}
        />
      );
    }

    const icon = startIcon ?? getDefaultIcon(type);

    if (icon) {
      return (
        <FieldWrapper
          id={inputId}
          label={label}
          error={error}
          className={wrapperClassName}
        >
          <div
            className={cn(
              wrapperBaseClasses,
              error && wrapperErrorClasses,
              className,
            )}
          >
            <span className={cn(iconClasses, "ps-4")}>{icon}</span>
            <input
              ref={ref}
              id={inputId}
              type={type}
              data-slot="input"
              disabled={disabled}
              className={cn(innerInputClasses, "px-3", inputClassName)}
              {...props}
            />
          </div>
        </FieldWrapper>
      );
    }

    return (
      <FieldWrapper
        id={inputId}
        label={label}
        error={error}
        className={wrapperClassName}
      >
        <input
          ref={ref}
          id={inputId}
          type={type}
          data-slot="input"
          disabled={disabled}
          className={cn(
            plainInputClasses,
            error && wrapperErrorClasses,
            className,
          )}
          {...props}
        />
      </FieldWrapper>
    );
  },
);

Input.displayName = "Input";

export { Input };
