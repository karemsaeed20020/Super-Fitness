import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "use-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendEmail } from "../hooks/use-send-email";
import { useLocalStorage } from "@/hooks/shared/use-local-storage";

import {
  useEmailSchema,
  type EmailField,
} from "@/lib/schemes/auth/forget-password.schema";
import type { ForgetPasswordStep } from "@/lib/types/forget-password";
import {
  COOL_DOWN_TIME,
  FORGET_PASSWORD_STEPS,
  OTP_COOL_DOWN_KEY,
  OTP_EMAIL_KEY,
} from "@/lib/constants/auth/forget-password.constant";

type EmailStepOneProps = {
  onSetStep: React.Dispatch<React.SetStateAction<ForgetPasswordStep>>;
  onSetCurrentEmail: React.Dispatch<React.SetStateAction<string>>;
  currentEmail: string;
};

export default function EmailStepOne({
  onSetStep,
  onSetCurrentEmail,
  currentEmail,
}: EmailStepOneProps) {
  // Translations
  const t = useTranslations();
  // Mutation
  const { onSubmitEmail, isPending, error } = useSendEmail();

  // Hooks
  const {
    setValue: setCooldown,
    removeValue: removeCooldown,
    storedValue: otpCooldown,
  } = useLocalStorage<string | null>(OTP_COOL_DOWN_KEY, null);

  // survives page reload so we can compare against new input
  const {
    setValue: setStoredEmail,
    removeValue: removeStoredEmail,
    storedValue: storedEmail,
  } = useLocalStorage<string | null>(OTP_EMAIL_KEY, null);

  // RHF
  const {
    register,
    handleSubmit,
    formState: { isSubmitted, errors, isValid },
  } = useForm<EmailField>({
    defaultValues: { email: storedEmail || currentEmail || "" },
    mode: "onBlur",
    resolver: zodResolver(useEmailSchema()),
  });

  // Functions
  const handleSubmitEmail: SubmitHandler<EmailField> = (values) => {
    const timerActive = !!otpCooldown && new Date(otpCooldown) > new Date();
    // Use persisted email as source of truth (survives reload)
    const lastEmail = storedEmail || currentEmail;
    const isSameEmail = values.email === lastEmail;

    // Same email + timer still running → skip API
    if (isSameEmail && timerActive) {
      onSetCurrentEmail(values.email);
      onSetStep(FORGET_PASSWORD_STEPS.OTP);
      return;
    }
    // Different email + timer active → clear old cooldown and stored email
    if (!isSameEmail && timerActive) {
      removeCooldown();
      removeStoredEmail();
    }

    // Send OTP (new email OR expired timer)
    onSubmitEmail(values, {
      onSuccess: () => {
        const expireTime = new Date(Date.now() + COOL_DOWN_TIME);
        setCooldown(expireTime.toISOString());
        setStoredEmail(values.email); // persist so reload comparison works
        onSetCurrentEmail(values.email);
        onSetStep(FORGET_PASSWORD_STEPS.OTP);
        toast.success(t("forget-password.email-sent"));
      },
    });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(handleSubmitEmail)}>
      <p className="text-center text-zinc-50">{t("email-placeholder")}</p>

      {/* Email */}
      <Input
        {...register("email")}
        id="fp-email"
        type="email"
        autoComplete="email"
        placeholder={t("email-placeholder")}
        error={errors.email?.message}
      />

      {/* Submit */}
      <Button
        type="submit"
        isLoading={isPending}
        disabled={isPending || (!isValid && isSubmitted)}
        serverError={error?.message}
        className="w-full cursor-pointer"
      >
        {t("forget-password.send-otp")}
      </Button>
    </form>
  );
}
