import type { ProfileResponse } from "@/lib/types/auth";
import { apiRequest } from "@/lib/utils/api/api-request";

export const profileApi = () =>
  apiRequest<ProfileResponse>({
    endpoint: "/auth/profile-data",
  });
