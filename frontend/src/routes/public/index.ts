import type { AppRouteObject } from "@/interface/enum/types"; // Custom route type with role and metadata support
import { createRoute } from "../create-route"; // Helper to build a route object with permission wrapping
import React from "react"; // Required for lazy loading

const Login = React.lazy(() => import("@/core/public/auth/login")); // Lazy-load the Login page component

export const publicRoutes: AppRouteObject[] = [
  createRoute({
    path: "/login", // URL path for the login page
    element: Login, // Lazy-loaded Login component to render
    type: "public", // Marks route as public — no auth required
    roles: [], // No role restriction for public routes
    title: "Login", // Display title used for page metadata or breadcrumbs
    icon: null, // No sidebar/nav icon for this route
  }),
];
