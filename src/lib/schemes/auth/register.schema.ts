import { FIRST_LAST_NAME_PATTERN, PASSWORD_PATTERN } from "@/lib/constants/auth/auth.constant";
import { useTranslations } from "use-intl";
import z from "zod";

export function createRegisterSchema(t: ReturnType<typeof useTranslations>) {
  return z
    .object({
      firstName: z
        .string()
        .nonempty(t("first-name-is-required"))
        .regex(FIRST_LAST_NAME_PATTERN),

      lastName: z
        .string()
        .nonempty(t("last-name-is-required"))
        .regex(FIRST_LAST_NAME_PATTERN),

      email: z.email({
        error: (iss) =>
          iss.input ? t("email-is-invalid") : t("email-is-required"),
      }),

      password: z
        .string()
        .nonempty(t("password-is-required"))
        .regex(PASSWORD_PATTERN, t("password-pattern", { count: 8 })),

      rePassword: z.string().nonempty(t("confirm-password-is-required")),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t("passwords-dont-match"),
      path: ["rePassword"],
    });
}

export type RegisterFields = z.infer<ReturnType<typeof createRegisterSchema>>;