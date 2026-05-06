import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import { toast } from "sonner";
import { useSendEmail } from "../hooks/use-send-email";
import { useLocalStorage } from "@/hooks/shared/use-local-storage";
import {
  COOL_DOWN_TIME,
  OTP_COOL_DOWN_KEY,
} from "@/lib/constants/auth/forget-password.constant";

type ResendOtpProps = {
  email: string;
};

export default function ResendOtp({ email }: ResendOtpProps) {
  // Translations
  const t = useTranslations();

  // Mutation
  const { onSubmitEmail } = useSendEmail();

  // Hooks
  // Cooldown — persisted in localStorage so it survives page reload
  const {
    storedValue: otpCooldown,
    setValue,
    removeValue,
  } = useLocalStorage<string | null>(OTP_COOL_DOWN_KEY, null);

  // Countdown state — derived from stored expiry on mount
  const [countDown, setCountDown] = useState(() => {
    if (!otpCooldown) return 0;
    return Math.max(
      Math.floor((new Date(otpCooldown).getTime() - Date.now()) / 1000),
      0,
    );
  });

  // Tick every second while cooldown is active; clear when it reaches zero
  //   Effects
  useEffect(() => {
    if (!otpCooldown) return;
    const interval = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          removeValue();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [otpCooldown, removeValue]);

  // Handlers
  const handleResend = () => {
    onSubmitEmail(
      { email },
      {
        onSuccess: () => {
          const expireTime = new Date(Date.now() + COOL_DOWN_TIME);
          setValue(expireTime.toISOString());
          setCountDown(COOL_DOWN_TIME / 1000);
          toast.success(t("forget-password.otp-resent"));
        },
        onError: (err) =>
          toast.error(err?.message || t("forget-password.resend-failed")),
      },
    );
  };

  return (
    <div className="text-center space-y-1">
      <p className="text-sm text-white">{t("forget-password.didnt-receive")}</p>
      {countDown > 0 ? (
        <p className="text-sm text-zinc-400">
          {t("forget-password.resend-countdown", { seconds: countDown })}
        </p>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          className="text-sm font-semibold cursor-pointer text-main underline hover:opacity-80 transition-opacity"
        >
          {t("forget-password.resend-code")}
        </button>
      )}
    </div>
  );
}
