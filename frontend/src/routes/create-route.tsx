import type { ReactNode } from "react";

// Defines the route access type.
export type RouteAccess = "public" | "private";

// Defines the common route configuration.
export interface AppRoute {
  path?: string;
  index?: boolean;
  element: ReactNode;
  access?: RouteAccess;
  privilegeScreen?: string[];
  children?: AppRoute[];
}

// Creates a type-safe route configuration.
export const createRoute = (route: AppRoute): AppRoute => route;
