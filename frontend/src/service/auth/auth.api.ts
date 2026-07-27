import { HTTP_METHOD } from "@/interface/enum/enum"; // Enum for HTTP methods (GET, POST, PUT, DELETE, etc.)

export const AuthApi = {
  // Login endpoint definition used by apiRequest
  authLogin: {
    queryKeyName: "GET_ALL_USERS", // Cache/query key name used to identify this request in TanStack Query
    apiRouteName: "/auth/login", // API route path sent to the backend
    requestMethod: HTTP_METHOD.POST, // HTTP method — POST because login submits credentials
  },
};
