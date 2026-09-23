import type {
  ApiRequestOptions,
  BackendResponse,
} from "@/interface/api.interface"; // Type defining the shape of request options and standard backend response structure
import { apiInstance } from "."; // Shared Axios instance with interceptors configured
import { REQUEST_BODY } from "@/interface/enum/enum"; // Enum for request body types (JSON, FORM_DATA, etc.)

/**
 * GLOBAL API REQUEST HANDLER
 */
export const apiRequest = async <
  TResponse = BackendResponse, // Defaults to BackendResponse<any> — the standard backend envelope { success, message, data }
  TVariables = any, // Type for path/query variables
  TData = any, // Type for the request body data
>(
  options: ApiRequestOptions<TVariables, TData>, // Accepts a typed options object
): Promise<TResponse> => {
  const { apiDetails, pathVariables, queryParams, requestData, extraConfig } =
    options; // Destructure all request options

  let url = apiDetails.apiRouteName; // Start with the base route name (may contain path placeholders)

  // 1. Path Variable Replacement
  if (pathVariables) {
    // Only process if path variables are provided
    Object.entries(pathVariables).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, encodeURIComponent(String(value))); // Replace {key} placeholders with encoded values
    });
  }

  /**
   * 2. Handle Body and Content-Type logic
   * We use 'any' here or a local variable to bypass the strict TData check
   * because we are transforming the type specifically for the Axios call.
   */
  let finalData: any = requestData; // Default to raw data; may be converted to FormData below

  if (
    apiDetails.requestBodyType === REQUEST_BODY.FORM_DATA && // Check if route expects multipart/form-data
    requestData && // Ensure data exists
    !(requestData instanceof FormData) // Skip conversion if already a FormData instance
  ) {
    const formData = new FormData(); // Create a new FormData object for file/multipart uploads
    Object.entries(requestData as Record<string, any>).forEach(
      ([key, value]) => {
        // Append only if value is not null/undefined
        if (value !== undefined && value !== null) {
          formData.append(key, value instanceof Blob ? value : String(value)); // Append Blob as-is, others as strings
        }
      },
    );
    finalData = formData; // Replace raw data with the constructed FormData
  }

  const response = await apiInstance({
    // Execute the HTTP request using the shared Axios instance
    url, // Resolved URL with path variables substituted
    method: apiDetails.requestMethod, // HTTP method (GET, POST, PUT, DELETE, etc.)
    params: queryParams, // Appended as URL query string parameters
    data: finalData, // Request body (JSON or FormData)
    ...extraConfig, // Spread any additional Axios config overrides
    headers: {
      ...extraConfig?.headers, // Merge any custom headers from extraConfig
      // Axios automatically sets the boundary for FormData; usually better not to manual set 'Content-Type'
    },
  });

  return response.data; // Return only the response body, not the full Axios response object
};
