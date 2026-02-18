interface IApiResponse<T = any> {
  success: boolean;
  httpCode?: number;
  message: string;
  data?: T;
  errors?: any;
}

// Success response
export const successResponse = <T>(
  data: T,
  message = "Operation successful",
  httpCode = 200, // default   httpCode
): IApiResponse<T> => ({
  success: true,
  httpCode,
  message,
  data,
});

// Error response
export const errorResponse = (
  message = "Something went wrong",
  errors?: any,
  httpCode = 200, // default   httpCode
): IApiResponse => ({
  success: false,
  httpCode,
  message,
  errors,
});
