import type { HTTP_METHOD, RequestBody } from "@/interface/enum/enum";

export interface ApiDetails {
  controllerName: string;
  requestMethod: HTTP_METHOD;
  queryKeyName?: string;
  // Use a string literal or enum for consistency
  requestBodyType?: RequestBody;
}

export interface ApiRequestOptions<TVariables = any, TData = any> {
  apiDetails: ApiDetails;
  pathVariables?: TVariables;
  queryParams?: Record<string, any>;
  data?: TData;
  // Added for production: allow overriding axios config (e.g., for signals or headers)
  extraConfig?: import("axios").AxiosRequestConfig;
}
