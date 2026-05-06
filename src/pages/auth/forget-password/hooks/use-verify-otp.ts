import { useMutation } from "@tanstack/react-query";
import { verifyOtpApi } from "../apis/verify-otp.api";

export function useVerifyOtp() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: verifyOtpApi,
  });

  return { onVerifyOtp: mutate, isPending, error };
}
