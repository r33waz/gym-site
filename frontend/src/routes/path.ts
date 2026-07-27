import { adminRoutePaths } from "@/core/private/Admin/admin.path";
import { gymRoutePath } from "@/core/private/Gym/gym.path";
import { staffRoutePath } from "@/core/private/Staff/staff.path";
import { memberRoutePath } from "@/core/private/memberShip/memberShip.path";
import { publicRoutes } from "./public";

export type RouteType = "private" | "public" | "bypass";

export const publicRoutePath = {
  ...publicRoutes,
} as const;

export const privateRoutePath = {
  base: "/",
  ...adminRoutePaths,
  ...gymRoutePath,
  ...staffRoutePath,
  ...memberRoutePath,
} as const;

export const routePaths = {
  ...publicRoutePath,
  ...privateRoutePath,
} as const;

export type RoutePaths = (typeof routePaths)[keyof typeof routePaths];
