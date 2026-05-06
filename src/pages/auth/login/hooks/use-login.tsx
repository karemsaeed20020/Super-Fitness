import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'use-intl';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/shared/use-auth';
import { ROUTES } from '@/lib/constants/routes/routes.constant';
import type { LoginFields } from '@/lib/schemes/auth/login.schema';
import { loginApi } from '../apis/login-api';

export function useLogin() {
  // Translations
  const t = useTranslations();
  // Navigation
  const navigate = useNavigate();
  // Hooks
  const { login: saveToken } = useAuth();

  // Mutation
  const {
    mutate: onLogin,
    isPending,
    error: loginServerError,
  } = useMutation({
    mutationFn: async (formValues: LoginFields) => await loginApi(formValues),

    onSuccess: (data) => {
      saveToken(data.token);
      toast.success(t('successful-login'), {
        duration: 2000,
        onAutoClose: () => navigate(ROUTES.app.home),
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { onLogin, isPending, loginServerError };
}
