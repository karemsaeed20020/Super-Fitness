import SocialLogin from '@/components/shared/social-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ROUTES } from '@/lib/constants/routes/routes.constant';
import {
  useLoginSchema,
  type LoginFields,
} from '@/lib/schemes/auth/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useTranslations } from 'use-intl';
import { useLogin } from '../hooks/use-login';

// Default Values
const defaultValues: LoginFields = {
  email: '',
  password: '',
};

export default function LoginForm() {
  // Translations
  const t = useTranslations();

  // Mutation
  const { onLogin, isPending, loginServerError } = useLogin();

  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm<LoginFields>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(useLoginSchema()),
  });

  // Handlers
  const handleLogin: SubmitHandler<LoginFields> = (data) => {
    onLogin(data);
  };

  return (
    <section className="flex max-h-screen flex-col items-center justify-center p-2 text-white">
      <div className="mb-8 text-center">
        <p className="mb-1 text-sm text-gray-400">{t('hey-there')},</p>
        <h1 className="text-4xl font-black tracking-wider uppercase">
          {t('welcome-back')}!
        </h1>
      </div>
      <div className="w-full max-w-96 rounded-[3.125rem] border border-gray-50/20 p-8 shadow-2xl backdrop-blur-md md:p-10">
        <h2 className="text-center text-2xl font-bold">{t('login')}</h2>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 py-4">
          {/* Email */}
          <Input
            {...register('email')}
            id="email"
            type="email"
            error={errors.email?.message}
            placeholder={t('email-placeholder')}
            className="h-12 border-gray-300 bg-transparent pr-12 focus-visible:border-orange-600 focus-visible:ring-orange-600"
          />

          {/* Password */}
          <Input
            {...register('password')}
            id="password"
            type="password"
            error={errors.password?.message}
            placeholder={t('password-placeholder')}
            className="h-12 border-gray-300 bg-transparent pr-12 focus-visible:border-orange-600 focus-visible:ring-orange-600"
          />

          {/* Forget Password */}
          <div className="flex justify-end">
            <Link
              to={ROUTES.auth.forgetPassword}
              className="text-main text-sm font-semibold hover:underline"
            >
              {t('forgot-your-password')}
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            isLoading={isPending}
            disabled={isPending || (!isValid && isSubmitted)}
            serverError={loginServerError?.message}
            className="w-full"
          >
            {t('login')}
          </Button>
        </form>

        <SocialLogin />

        <div className="mt-3 flex justify-center text-sm">
          <span>
            {t('dont-have-account')}
            <Link
              to={ROUTES.auth.register}
              className="text-main ms-1 font-semibold underline"
            >
              {t('register')}
            </Link>
          </span>
        </div>
      </div>
      {/* Navigate to Register */}
    </section>
    // <SmartCoachChat />
  );
}
