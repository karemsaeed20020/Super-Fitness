import type { ForgetPasswordStep } from "@/lib/types/forget-password";

export const FORGET_PASSWORD_STEPS: Record<
  ForgetPasswordStep,
  ForgetPasswordStep
> = {
  EMAIL: "EMAIL",
  OTP: "OTP",
  NEW_PASSWORD: "NEW_PASSWORD",
};

export const OTP_COOL_DOWN_KEY = "fitness_otp_cooldown";

export const COOL_DOWN_TIME = 2 * 60 * 1000; // 2 minutes

export const OTP_EMAIL_KEY = "fitness_otp_email";
