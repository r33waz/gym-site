import type { HTTP_METHOD, RequestBody } from "@/interface/enum/enum";

// Standard structure returned by the backend for every API response
export interface BackendResponse<T = any> {
  success: boolean; // Indicates whether the request was successful
  message: string; // Human-readable message from the backend
  data: T; // Actual response payload — generic so each endpoint can type it
}

export interface ApiDetails {
  apiRouteName: string;
  requestMethod: HTTP_METHOD;
  queryKeyName?: string;
  // Use a string literal or enum for consistency
  requestBodyType?: RequestBody;
}

export interface ApiRequestOptions<TVariables = any, TData = any> {
  apiDetails: ApiDetails;
  pathVariables?: TVariables;
  queryParams?: Record<string, any>;
  requestData?: TData; // Renamed from data — request body payload sent to the backend
  // Added for production: allow overriding axios config (e.g., for signals or headers)
  extraConfig?: import("axios").AxiosRequestConfig;
}
