import type { LoginFields } from "@/lib/schemes/auth/login.schema";
import type { AuthSession } from "@/lib/types/auth";
import { apiRequest } from "@/lib/utils/api/api-request";

export const loginApi = (body: LoginFields) =>
  apiRequest<AuthSession>({
    endpoint: "/auth/signin",
    method: "POST",
    body,
    
  });
