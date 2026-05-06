import { useTranslations } from "use-intl";
import z from "zod";

export function useLoginSchema() {
  const t = useTranslations();

  return z.object({
    email: z.email({
      error: (iss) =>
        iss.input ? t("email-is-invalid") : t("email-is-required"),
    }),

    password: z
      .string()
      .nonempty(t("password-is-required"))
  });
}

export type LoginFields = z.infer<ReturnType<typeof useLoginSchema>>;
