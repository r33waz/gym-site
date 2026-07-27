import { adminRoutePaths } from "@/core/private/Admin/admin.path"; // Path constants for admin section routes
import { gymRoutePath } from "@/core/private/Gym/gym.path"; // Path constants for gym management routes
import { staffRoutePath } from "@/core/private/Staff/staff.path"; // Path constants for staff section routes
import { memberRoutePath } from "@/core/private/memberShip/memberShip.path"; // Path constants for membership routes

export type RouteType = "private" | "public" | "bypass"; // Union type defining the access level of a route

export const privateRoutePath = {
  base: "/", // Base path for the private app shell
  ...adminRoutePaths, // Merge all admin route path constants
  ...gymRoutePath, // Merge all gym route path constants
  ...staffRoutePath, // Merge all staff route path constants
  ...memberRoutePath, // Merge all membership route path constants
} as const; // Freeze the object so paths are inferred as literal types

export const routePaths = {
  ...privateRoutePath, // Expose all private paths under a single routePaths object
} as const;

export type RoutePaths = (typeof routePaths)[keyof typeof routePaths]; // Union type of all valid route path strings
