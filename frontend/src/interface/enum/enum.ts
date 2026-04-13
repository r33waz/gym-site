export enum HTTP_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type HttpMethod = (typeof HTTP_METHOD)[keyof typeof HTTP_METHOD];

export enum REQUEST_BODY {
  JSON = "JSON",
  FORM_DATA = "FORM_DATA",
}

export type RequestBody = (typeof REQUEST_BODY)[keyof typeof REQUEST_BODY];
