import { ROUTES } from "@/lib/constants/routes/routes.constant";
import { useRegisterStore } from "@/lib/store/register.store";
import type { RegisterBody } from "@/lib/types/register";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslations } from "use-intl";
import { registerApi } from "../api/register-api";

export function useRegister() {
  // Translations
  const t = useTranslations();
  // Navigation
  const navigate = useNavigate();

  // Mutation
  const {
    mutate: onRegister,
    isPending,
    error: registerServerError,
  } = useMutation({
    mutationFn: async (values: RegisterBody) => await registerApi(values),

    onSuccess: () => {
      useRegisterStore.getState().reset();
      toast.success(t("successful-register"));
      navigate(ROUTES.auth.login);
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { onRegister, isPending, registerServerError };
}
