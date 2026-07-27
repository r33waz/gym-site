import type { AppRouteObject } from "@/interface/enum/types";
import { createRoute } from "../create-route";
import React from "react";

const Login = React.lazy(() => import("@/core/public/auth/login"));

export const publicRoutes: AppRouteObject[] = [
  createRoute({
    path: "/login",
    element: Login,
    type: "public",
    roles: [],
    title: "Login",
    icon: null,
  }),
];
