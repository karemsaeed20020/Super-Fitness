import type { OtpField } from "@/lib/schemes/auth/forget-password.schema";
import type { VerifyOtpResponse } from "@/lib/types/forget-password";
import { apiRequest } from "@/lib/utils/api/api-request";

export const verifyOtpApi = (body: OtpField) =>
  apiRequest<VerifyOtpResponse>({
    endpoint: "/auth/verifyResetCode",
    method: "POST",
    body,
  });
