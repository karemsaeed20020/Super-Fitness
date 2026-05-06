import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/lib/constants/routes/routes.constant";
import { resetPasswordApi } from "../apis/reset-password.api";
import { toast } from "sonner";
import { useTranslations } from "use-intl";
import { AUTH_LOADING_DURATION } from "@/lib/constants/auth/auth.constant";

export function useResetPassword() {
  // Translations
  const t = useTranslations();
  // Navigation
  const navigate = useNavigate();
  // Mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success(t("password-reset-successfully"), {
        duration: AUTH_LOADING_DURATION,
        onAutoClose: () => {
          navigate(`${ROUTES.auth.login}`);
        },
      });
    },
  });

  return { onResetPassword: mutate, isPending, error: error };
}
