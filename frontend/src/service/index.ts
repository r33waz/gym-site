import axios, {
  AxiosError, // Type for errors thrown by Axios
  type AxiosInstance, // Type for the Axios instance object
  type AxiosResponse, // Type for successful HTTP responses
  type InternalAxiosRequestConfig, // Type for request config inside interceptors
} from "axios"; // Import Axios library for making HTTP requests

export const apiInstance: AxiosInstance = axios.create({
  // Base URL for all API requests (comes from environment variables)
  baseURL: import.meta.env.VITE_API_BASE_URL,

  timeout: 15000,
  // Ensures cookies (httpOnly/session) are sent with every request
  // Required for cookie-based authentication
  withCredentials: true,

  // Default headers applied to all requests
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
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
    config.headers.set("Accept-Language", lang);

    // Return modified config so request continues
    return config;
  },

  (error: AxiosError) => Promise.reject(error),
);

// ====================== RESPONSE INTERCEPTOR ======================

apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },

  (error: AxiosError) => {
    const status = error.response?.status;

    const responseData = error.response?.data as
      | {
          message?: string | string[];
        }
      | undefined;

    // Extract backend error message
    const backendMessage = responseData?.message;

    if (Array.isArray(backendMessage)) {
      error.message = backendMessage.join(", ");
    } else if (backendMessage) {
      error.message = backendMessage;
    }

    // Authentication failure
    if (status === 401) {
      // Do not redirect here yet.
      // Refresh-token handling will be implemented here.
    }

    // Authorization failure
    if (status === 403) {
      // User is authenticated but lacks permission.
      // Let the UI handle the forbidden response.
    }

    return Promise.reject(error);
  },
);
