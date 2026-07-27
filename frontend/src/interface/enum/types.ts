import type React from "react";
import type { RouteObject } from "react-router-dom";
import { ROLEENUM } from "@/interface/enum/role.enum";

export type RouteType = "private" | "public" | "bypass";

export type _RouteObject<Type extends RouteType = "private"> = RouteObject & {
  type?: Type;
};

// INPUT shape — what you write by hand in gym.routes.ts etc.
export interface AppRoute extends Omit<
  _RouteObject<"private">,
  "element" | "children"
> {
  element: React.LazyExoticComponent<React.FC>;
  roles: ROLEENUM[];
  title: string;
  icon: React.ReactNode;
  children?: AppRoute[];
}

// OUTPUT shape — what createRoute() returns, what the router + sidebar actually consume
export interface AppRouteObject extends Omit<
  _RouteObject<"private">,
  "element" | "children"
> {
  element: React.ReactNode; // now a rendered element, not a lazy reference
  roles: ROLEENUM[];
  title: string;
  icon: React.ReactNode;
  children?: AppRouteObject[];
}
