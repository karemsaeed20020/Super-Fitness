import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "use-intl";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOtp } from "../hooks/use-verify-otp";
import { useSendEmail } from "../hooks/use-send-email";
import {
  useOtpSchema,
  type OtpField,
} from "@/lib/schemes/auth/forget-password.schema";
import ResendOtp from "./resend-otp";
import type { ForgetPasswordStep } from "@/lib/types/forget-password";
import { FORGET_PASSWORD_STEPS } from "@/lib/constants/auth/forget-password.constant";
import ValidationError from "@/components/features/auth/validation-error";

type VerifyOtpStepTwoProps = {
  onSetStep: React.Dispatch<React.SetStateAction<ForgetPasswordStep>>;
  currentEmail: string;
};

const defaultValues: OtpField = { resetCode: "" };

export default function VerifyOtpStepTwo({
  onSetStep,
  currentEmail,
}: VerifyOtpStepTwoProps) {
  // Translations
  const t = useTranslations();

  // Mutations
  const { onVerifyOtp, isPending, error } = useVerifyOtp();
  const { isPending: resendIsPending, error: resendError } = useSendEmail();

  // Variables
  const serverError = error?.message || resendError?.message;

  // RHF
  const {
    handleSubmit,
    control,
    formState: { isSubmitted, isValid, errors },
  } = useForm<OtpField>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(useOtpSchema()),
  });

  // Handlers
  const handleVerifyOtp: SubmitHandler<OtpField> = (values) => {
    onVerifyOtp(values, {
      onSuccess: () => onSetStep(FORGET_PASSWORD_STEPS.NEW_PASSWORD),
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(handleVerifyOtp)}>
      {/* Instruction */}
      <p className="text-center text-sm text-zinc-300">
        {t("forget-password.otp-card-label")}
      </p>

      {/* OTP inputs */}
      <Controller
        name="resetCode"
        control={control}
        render={({ field }) => (
          <div className="flex justify-center" dir="ltr">
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
            >
              <InputOTPGroup className="gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
        )}
      />

      {/* Validation error */}
      <ValidationError
        className="text-center"
        errorMsg={errors.resetCode?.message}
      />

      {/* Submit */}
      <Button
        type="submit"
        isLoading={isPending}
        disabled={(isSubmitted && !isValid) || isPending || resendIsPending}
        serverError={serverError}
        className="w-full cursor-pointer"
      >
        {t("forget-password.confirm")}
      </Button>

      {/* Resend OTP */}
      <ResendOtp email={currentEmail} />
    </form>
  );
}
