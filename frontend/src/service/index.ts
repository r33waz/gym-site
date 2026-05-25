import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
// Import Axios library for making HTTP requests

export const apiInstance: AxiosInstance = axios.create({
  // Base URL for all API requests (comes from environment variables)
  baseURL: import.meta.env.VITE_API_BASE_URL,

  // Ensures cookies (httpOnly/session) are sent with every request
  // Required for cookie-based authentication
  withCredentials: true,

  // Default headers applied to all requests
  headers: {
    "Content-Type": "application/json", // Default request body format
  },
});

// ====================== REQUEST INTERCEPTOR ======================

apiInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Retrieve language preference from localStorage
    const lang = localStorage.getItem("lang") || "en";

    // Ensure headers object exists (safe assignment)
    config.headers = config.headers ?? {};

    // Attach language header to every outgoing request
    // Used by backend for localization (i18n)
    config.headers["Accept-Language"] = lang;

    // Return modified config so request continues
    return config;
  },

  (error: AxiosError) => {
    // If request setup fails, reject the promise
    return Promise.reject(error);
  },
);

// ====================== RESPONSE INTERCEPTOR ======================

apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // If response is successful (status 2xx), just return it
    return response;
  },

  (error: AxiosError) => {
    console.log("🚀 ~ error:", error);
    // Check if server responded with 403 Unauthorized
    if (error.response?.status === 403) {
      // ⚠️ IMPORTANT:
      // force browser navigation to login page

      window.location.replace("/login");
    }

    const customError = (error.response?.data as any)?.message || error.message;

    // 3. Create a new Error object or modify the existing one
    // This ensures that 'err.message' in TanStack Query is actually your backend message.
    error.message = customError;

    return Promise.reject(error);
  },
);
