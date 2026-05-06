import { PASSWORD_PATTERN } from "@/lib/constants/auth/auth.constant";
import { useTranslations } from "use-intl";
import { z } from "zod";

// Email
export function useEmailSchema() {
  const t = useTranslations();
  return z.object({
    email: z.email({
      error: (iss) =>
        iss.input ? t("email-is-invalid") : t("email-is-required"),
    }),
  });
}

export type EmailField = z.infer<ReturnType<typeof useEmailSchema>>;

//OTP
export function useOtpSchema() {
  const t = useTranslations();
  return z.object({
    resetCode: z
      .string()
      .min(1, t("validation.required"))
      .length(6, t("validation.otp-length")),
  });
}

export type OtpField = z.infer<ReturnType<typeof useOtpSchema>>;

//New Password
export function useNewPasswordSchema() {
  const t = useTranslations();
  return z
    .object({
      password: z
        .string()
        .min(1, t("validation.required"))
        .regex(PASSWORD_PATTERN, t("password-pattern")),
      rePassword: z.string().min(1, t("validation.required")),
    })
    .refine((d) => d.password === d.rePassword, {
      message: t("validation.passwords-not-match"),
      path: ["rePassword"],
    });
}

export type NewPasswordFields = z.infer<
  ReturnType<typeof useNewPasswordSchema>
>;
