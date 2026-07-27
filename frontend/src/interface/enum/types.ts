// interface/enum/types.ts
import type React from "react";
import type { RouteObject } from "react-router-dom";
import { ROLEENUM } from "@/interface/enum/role.enum";

export type RouteType = "private" | "public" | "bypass";

export type _RouteObject<Type extends RouteType = "private"> = RouteObject & {
  type?: Type;
};

export interface AppRoute extends Omit<
  _RouteObject<RouteType>,
  "element" | "children"
> {
  //                        ^^^^^^^^^ was "private", now the full union
  element: React.LazyExoticComponent<React.FC>;
  roles: ROLEENUM[];
  title: string;
  icon: React.ReactNode;
  children?: AppRoute[];
}

export interface AppRouteObject extends Omit<
  _RouteObject<RouteType>,
  "element" | "children"
> {
  //                        ^^^^^^^^^ same fix here
  element: React.ReactNode;
  roles: ROLEENUM[];
  title: string;
  icon: React.ReactNode;
  children?: AppRouteObject[];
}
