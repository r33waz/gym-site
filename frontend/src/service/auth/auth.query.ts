import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "./auth.api";
import { apiRequest } from "../api.request";

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
    mutationFn: (payload: { email: string; password: string }) =>
      apiRequest({
        apiDetails: authLogin,
        data: payload,
      }),
    onSuccess: (res) => {
      console.log("Login success:", res);
    },
    onError: (err) => {
      console.error("Login failed:", err);
    },
  });
};
