import type { ApiRequestOptions } from "@/interface/api.interface";
import { apiInstance } from ".";
import { REQUEST_BODY } from "@/interface/enum/enum";

/**
 * GLOBAL API REQUEST HANDLER
 */
export const apiRequest = async <
  TResponse = any,
  TVariables = any,
  TData = any,
>(
  options: ApiRequestOptions<TVariables, TData>,
): Promise<TResponse> => {
  const { apiDetails, pathVariables, queryParams, data, extraConfig } = options;

  let url = apiDetails.controllerName;

  // 1. Path Variable Replacement
  if (pathVariables) {
    Object.entries(pathVariables).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
    });
  }

  /**
   * 2. Handle Body and Content-Type logic
   * We use 'any' here or a local variable to bypass the strict TData check
   * because we are transforming the type specifically for the Axios call.
   */
  let finalData: any = data;

  if (
    apiDetails.requestBodyType === REQUEST_BODY.FORM_DATA &&
    data &&
    !(data instanceof FormData)
  ) {
    const formData = new FormData();
    Object.entries(data as Record<string, any>).forEach(([key, value]) => {
      // Append only if value is not null/undefined
      if (value !== undefined && value !== null) {
        formData.append(key, value instanceof Blob ? value : String(value));
      }
    });
    finalData = formData;
  }

  const response = await apiInstance({
    url,
    method: apiDetails.requestMethod,
    params: queryParams,
    data: finalData, // Using the transformed data
    ...extraConfig,
    headers: {
      ...extraConfig?.headers,
      // Axios automatically sets the boundary for FormData; usually better not to manual set 'Content-Type'
    },
  });

  return response.data;
};
