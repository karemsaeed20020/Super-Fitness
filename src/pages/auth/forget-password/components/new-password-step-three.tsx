import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "use-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useNewPasswordSchema,
  type NewPasswordFields,
} from "@/lib/schemes/auth/forget-password.schema";
import { useResetPassword } from "../hooks/use-reset-password";
import { useLocalStorage } from "@/hooks/shared/use-local-storage";
import {
  OTP_COOL_DOWN_KEY,
  OTP_EMAIL_KEY,
} from "@/lib/constants/auth/forget-password.constant";

type NewPasswordStepThreeProps = { currentEmail: string };

const defaultValues: NewPasswordFields = { password: "", rePassword: "" };

export default function NewPasswordStepThree({
  currentEmail,
}: NewPasswordStepThreeProps) {
  // Translation
  const t = useTranslations();
  // Mutation
  const { onResetPassword, isPending, error } = useResetPassword();

  // Hooks
  // Clean up both keys once the flow completes
  const { removeValue: removeCooldown } = useLocalStorage<string | null>(
    OTP_COOL_DOWN_KEY,
    null,
  );
  const { removeValue: removeStoredEmail } = useLocalStorage<string | null>(
    OTP_EMAIL_KEY,
    null,
  );

  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm<NewPasswordFields>({
    mode: "onBlur",
    defaultValues,
    resolver: zodResolver(useNewPasswordSchema()),
  });

  // Functions
  const handleNewPassword: SubmitHandler<NewPasswordFields> = ({
    password,
  }) => {
    onResetPassword(
      { email: currentEmail, newPassword: password },
      {
        onSuccess: () => {
          // Clear persisted OTP state
          removeCooldown();
          removeStoredEmail();
        },
      },
    );
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(handleNewPassword)}>
      {/* New password */}
      <Input
        {...register("password")}
        id="fp-password"
        type="password"
        autoComplete="new-password"
        placeholder={t("forget-password.new-password-placeholder")}
        error={errors.password?.message}
      />

      {/* Confirm password */}
      <Input
        {...register("rePassword")}
        id="fp-re-password"
        type="password"
        autoComplete="new-password"
        placeholder={t("forget-password.confirm-password-placeholder")}
        error={errors.rePassword?.message}
      />

      {/* Submit */}
      <Button
        type="submit"
        isLoading={isPending}
        disabled={isPending || (isSubmitted && !isValid)}
        serverError={error?.message}
        className="w-full cursor-pointer"
      >
        {t("forget-password.reset-password")}
      </Button>
    </form>
  );
}
