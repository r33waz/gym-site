import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "./auth.api";
import { apiRequest } from "../api.request";
import type { ILoginInterface } from "@/interface/auth.interface";
import { showSuccessMessage } from "@/utils/message";

/**
 * LOGIN HOOK
 * ----------
 * Handles authentication request
 */
const { authLogin } = AuthApi;

export const useLogin = () => {
  return useMutation({
    /**
     * mutationFn = API call for login
     */
    mutationFn: (payload: ILoginInterface) =>
      apiRequest({
        apiDetails: authLogin,
        data: payload,
      }),
    onSuccess: (res) => {
      return showSuccessMessage(res.message || "Login successful");
    },
    onError: (err) => {
      console.error("Login failed:", err);
    },
  });
};
