export type RouteType = "private" | "public" | "bypass";

export const privateRoutePath = {};

export const publicRoutePath = {};

export const routePaths = {};

export type RoutePaths = (typeof routePaths)[keyof typeof routePaths];
