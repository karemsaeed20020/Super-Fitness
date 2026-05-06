import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslations } from 'use-intl';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes/routes.constant';
import EmailStepOne from './email-step-one';
import VerifyOtpStepTwo from './verify-otp-step-two';
import NewPasswordStepThree from './new-password-step-three';
import type {
  ForgetPasswordStep,
  ForgetPasswordStepsMap,
} from '@/lib/types/forget-password';

const STEPS = {
  EMAIL: 'EMAIL',
  OTP: 'OTP',
  NEW_PASSWORD: 'NEW_PASSWORD',
} as const;

export default function ForgetPasswordLayout() {
  // Translations
  const t = useTranslations();
  // Navigation
  const navigate = useNavigate();
  // States
  const [step, setStep] = useState<ForgetPasswordStep>(STEPS.EMAIL);
  const [currentEmail, setCurrentEmail] = useState('');

  // Functions
  function handleGoBack() {
    if (step === STEPS.EMAIL) navigate(`${ROUTES.auth.login}`);
    else if (step === STEPS.OTP) setStep(STEPS.EMAIL);
    else setStep(STEPS.OTP);
  }

  const steps: ForgetPasswordStepsMap = {
    [STEPS.EMAIL]: {
      title: t('forget-password.title'),
      component: (
        <EmailStepOne
          onSetStep={setStep}
          onSetCurrentEmail={setCurrentEmail}
          currentEmail={currentEmail}
        />
      ),
    },
    [STEPS.OTP]: {
      title: t('forget-password.otp-title'),
      component: (
        <VerifyOtpStepTwo onSetStep={setStep} currentEmail={currentEmail} />
      ),
    },
    [STEPS.NEW_PASSWORD]: {
      title: t('forget-password.new-password-title'),
      component: <NewPasswordStepThree currentEmail={currentEmail} />,
    },
  };

  return (
    <section className="min-h-screen w-full">
      {/* Back button */}
      <button
        type="button"
        onClick={handleGoBack}
        aria-label={t('common.go-back')}
        className="mb-4 flex cursor-pointer items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={16} />
        <span>
          {step === STEPS.EMAIL ? t('common.back-to-login') : t('common.back')}
        </span>
      </button>

      {/* Title */}
      <h1 className="my-3 text-center text-3xl font-extrabold text-white capitalize">
        {steps[step].title}
      </h1>

      {step === STEPS.OTP && (
        // change-email button
        <p className="mb-4 text-center text-sm text-zinc-400">
          {t.rich('forget-password.otp-subtitle', {
            email: currentEmail,
            button: (chunks) => (
              <button
                type="button"
                onClick={() => setStep(STEPS.EMAIL)}
                className="text-main cursor-pointer font-semibold underline"
              >
                {chunks}
              </button>
            ),
          })}
        </p>
      )}
      {step === STEPS.NEW_PASSWORD && (
        <p className="mb-4 text-center text-sm text-zinc-400">
          {t('forget-password.new-password-card-label')}
        </p>
      )}

      <section className="mx-auto rounded-3xl border border-white p-8 md:w-[80%]">
        {/* Active step */}
        <main>{steps[step].component}</main>
      </section>
    </section>
  );
}
