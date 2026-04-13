import { HTTP_METHOD } from "@/interface/enum/enum";

export const AuthApi = {
  // login endpoint
  authLogin: {
    queryKeyName: "GET_ALL_USERS",
    controllerName: "/auth/login",
    requestMethod: HTTP_METHOD.POST,
  },
};
