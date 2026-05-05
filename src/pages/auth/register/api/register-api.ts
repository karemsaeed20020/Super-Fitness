import type { RegisterBody, RegisterResponseData } from "@/lib/types/register";
import { apiRequest } from "@/lib/utils/api/api-request";

export const registerApi = (body: RegisterBody) =>
  apiRequest<RegisterResponseData>({
    endpoint: "/auth/signup",
    method: "POST",
    body,
  });
