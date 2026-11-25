import type { AxiosRequestConfig } from "axios";

import type {
  ApiRequestOptions,
  BackendResponse,
} from "@/interface/api.interface";


import { REQUEST_BODY } from "@/interface/enum/enum";
import { apiInstance } from ".";

const buildFormData = (data: Record<string, unknown>): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (value instanceof Blob) {
      formData.append(key, value);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item instanceof Blob) {
          formData.append(key, item);
        } else if (item !== null && item !== undefined) {
          formData.append(
            key,
            typeof item === "object" ? JSON.stringify(item) : String(item),
          );
        }
      });

      return;
    }

    if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
      return;
    }

    formData.append(key, String(value));
  });

  return formData;
};

export const apiRequest = async <
  TResponse = BackendResponse,
  TVariables = Record<string, unknown>,
  TData = unknown,
>(
  options: ApiRequestOptions<TVariables, TData>,
): Promise<TResponse> => {
  const { apiDetails, pathVariables, queryParams, requestData, extraConfig } =
    options;

  let url = apiDetails.apiRouteName;

  if (pathVariables) {
    Object.entries(pathVariables).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
    });
  }

  const isFormData = apiDetails.requestBodyType === REQUEST_BODY.FORM_DATA;

  let finalData: unknown = requestData;

  if (isFormData && requestData && !(requestData instanceof FormData)) {
    finalData = buildFormData(requestData as Record<string, unknown>);
  }

  const config: AxiosRequestConfig = {
    ...extraConfig,
    url,
    method: apiDetails.requestMethod,
    params: queryParams,
    data: finalData,
    headers: {
      ...extraConfig?.headers,
    },
  };

  if (isFormData) {
    delete config.headers?.["Content-Type"];
  }

  const response = await apiInstance(config);

  return response.data as TResponse;
};
