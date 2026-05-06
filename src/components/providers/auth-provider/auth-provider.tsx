import { STORAGE_KEY } from "@/lib/constants/api/api.constant";
import { createContext, useState } from "react";

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: ProviderProps) => {
  // States
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEY),
  );
  //Functions
  const login = (token: string) => {
    localStorage.setItem(STORAGE_KEY, token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
  };

  return (
    <AuthContext
      value={{ token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext>
  );
};
