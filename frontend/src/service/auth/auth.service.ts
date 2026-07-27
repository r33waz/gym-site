import { useMutation } from "@tanstack/react-query"; // Hook for triggering non-idempotent API calls (POST, PUT, DELETE)
import { AuthApi } from "./auth.api"; // Auth API endpoint definitions
import { apiRequest } from "../api.request"; // Generic API request handler
import type { ILoginInterface } from "@/interface/auth.interface"; // Type for login request payload (email + password)
import type { BackendResponse } from "@/interface/api.interface"; // Standard backend response envelope
import { showErrorsMessage, showSuccessMessage } from "@/utils/message"; // Utility functions to display toast/alert messages

const { authLogin } = AuthApi; // Destructure the login endpoint config from AuthApi

export const useLogin = () => {
  return useMutation({
    mutationFn: (requestData: ILoginInterface) => {
      // Accept login credentials as the mutation argument
      return apiRequest<BackendResponse<null>>({
        // Typed with BackendResponse — no data payload expected on login response
        apiDetails: authLogin, // Pass the login endpoint config (route, method)
        requestData: { ...requestData }, // Spread payload as request body
      });
    },
    onSuccess: (res) => {
      showSuccessMessage({ message: res.message || "Login successful" }); // Show success toast with backend message or fallback
    },
    onError: (err: any) => {
      showErrorsMessage({ message: err?.message || "Something went wrong" }); // Show error toast with the error message
    },
  });
};
