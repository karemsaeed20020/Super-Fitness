export type ForgetPasswordStep = "EMAIL" | "OTP" | "NEW_PASSWORD";

export type ForgetPasswordStepEntry = {
  title: string;
  component: ReactNode;
};

export type ForgetPasswordStepsMap = Record<
  ForgetPasswordStep,
  ForgetPasswordStepEntry
>;

export type SendEmailResponse = {
  message: string;
  info: string;
};

export type VerifyOtpResponse = {
  message: string;
};

export type ResetPasswordResponse = {
  message: string;
};

export type ResetPasswordPayload = {
  email: string;
  newPassword: string;
};
