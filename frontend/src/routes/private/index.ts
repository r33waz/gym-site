import type { AppRouteObject } from "@/interface/enum/types";
import { adminRoutes } from "./admin.routes";
import { gymRoutes } from "./gym.route";
import { staffRoutes } from "./staff.routes";

export const privateRoutes: AppRouteObject[] = [
  ...adminRoutes,
  ...gymRoutes,
  ...staffRoutes,
  //   ...userRoutes,
];
