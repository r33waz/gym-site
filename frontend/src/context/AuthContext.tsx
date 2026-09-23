import type { ILoginInterface } from "@/interface/auth.interface";
import { useLogin } from "@/service/auth/auth.service";
import { createContext, useContext, useState } from "react";

type AuthContextType = {
  userInfo: any;
  login: (payload: ILoginInterface) => Promise<any>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserInfo] = useState(null);

  const loginMutation = useLogin();

  const login = async (payload: ILoginInterface) => {
    const res = await loginMutation.mutateAsync(payload);

    setUserInfo(res?.data);

    return res;
  };

  const logout = () => {
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo: user,
        login,
        logout,
        isLoading: loginMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
