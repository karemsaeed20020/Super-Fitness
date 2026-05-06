import type { ResetPasswordPayload, ResetPasswordResponse } from "@/lib/types/forget-password";
import { apiRequest } from "@/lib/utils/api/api-request";


export const resetPasswordApi = (body: ResetPasswordPayload) =>
  apiRequest<ResetPasswordResponse>({
    endpoint: "/auth/resetPassword",
    method: "PUT",
    body,
  });
