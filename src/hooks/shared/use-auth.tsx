import { AuthContext } from "@/components/providers/auth-provider/auth-provider";
import { use } from "react";

export const useAuth = () => {
  const authContext = use(AuthContext);
  if (!authContext)
    throw new Error("useAuth must be used inside <AuthProvider>");
  return authContext;
};
