import axios, {
  AxiosError, // Type for errors thrown by Axios
  type AxiosInstance, // Type for the Axios instance object
  type AxiosResponse, // Type for successful HTTP responses
  type InternalAxiosRequestConfig, // Type for request config inside interceptors
} from "axios"; // Import Axios library for making HTTP requests

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
    const lang = localStorage.getItem("lang") || "en"; // Fall back to "en" if no lang is stored

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
    console.log("🚀 ~ error:", error); // Log the raw error for debugging
    // Check if server responded with 403 Forbidden
    if (error.response?.status === 403) {
      // ⚠️ IMPORTANT:
      // force browser navigation to login page
      window.location.replace("/login"); // Hard redirect to login on forbidden response
    }

    // Extract backend error message if available, otherwise use Axios default message
    const customError = (error.response?.data as any)?.message || error.message;

    // 3. Create a new Error object or modify the existing one
    // This ensures that 'err.message' in TanStack Query is actually your backend message.
    error.message = customError; // Override Axios error message with backend message

    return Promise.reject(error); // Propagate the modified error to the caller
  },
);
