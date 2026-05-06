import type { EmailField } from "@/lib/schemes/auth/forget-password.schema";
import type { SendEmailResponse } from "@/lib/types/forget-password";
import { apiRequest } from "@/lib/utils/api/api-request";

export const sendEmailApi = (body: EmailField) =>
  apiRequest<SendEmailResponse>({
    endpoint: "/auth/forgotPassword",
    method: "POST",
    body,
  });
