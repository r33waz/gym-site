import type { AppRouteObject } from "@/interface/enum/types"; // Custom route object type extending react-router's RouteObject
import { adminRoutes } from "./admin.routes"; // Routes accessible only to admin role
import { gymRoutes } from "./gym.route"; // Routes related to gym management
import { staffRoutes } from "./staff.routes"; // Routes accessible to staff role

export const privateRoutes: AppRouteObject[] = [
  ...adminRoutes, // Spread admin-specific protected routes
  ...gymRoutes, // Spread gym-specific protected routes
  ...staffRoutes, // Spread staff-specific protected routes
];
