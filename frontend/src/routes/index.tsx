// routes/index.tsx - Root router configuration for the entire application
import React from "react"; // Required for JSX and lazy loading
import RouteWrapper from "@/context/RouteWrapper"; // Wraps routes with auth/context providers
import ErrorBoundary from "@/core/public/components/ErrorBoundry"; // Catches and displays route-level errors
import { createBrowserRouter, type RouteObject } from "react-router-dom"; // Browser history router factory and route type
import { privateRoutes } from "./private"; // Aggregated protected routes (admin, gym, staff)
import { publicRoutes } from "./public"; // Publicly accessible routes (e.g. login)
import PageNotFound from "@/core/public/components/pageNotFound"; // Fallback UI for unmatched routes
import PrivateLayout from "@/components/layouts/privateLayout"; // Layout wrapper for all private/authenticated routes
import PublicLayout from "@/components/layouts/publicLayout"; // Layout wrapper for all public routes

const Root = React.lazy(() => import("@/core/private/Root")); // Lazy-load the private app shell for code splitting
const LandingPage = React.lazy(
  () => import("@/core/public/components/LandingPage"), // Lazy-load the landing page component
);

export const router = createBrowserRouter([
  // Create the browser router with the full route tree
  {
    path: "/", // Root path — entry point of the app
    element: (
      <RouteWrapper>
        {/* Provide context/auth wrapping for the root layout */}
        <Root /> {/* Private app shell that renders nested child routes */}
      </RouteWrapper>
    ),
    errorElement: <ErrorBoundary />, // Render error boundary if this route or its children throw
    children: [
      {
        element: <PrivateLayout />, // Wrap all private children with PrivateLayout
        children: [
          { index: true, element: <LandingPage /> }, // Default child rendered at "/"
          ...privateRoutes, // Spread all protected role-based routes as children of PrivateLayout
        ] as RouteObject[],
      },
    ],
  },
  {
    element: <PublicLayout />, // Wrap all public children with PublicLayout
    children: publicRoutes as RouteObject[], // Spread public routes (e.g. /login) under PublicLayout
    errorElement: <ErrorBoundary />, // Handle errors thrown within public routes
  },
  {
    path: "*", // Catch-all for any unmatched URL
    element: (
      <RouteWrapper>
        {/* Wrap 404 page with context providers */}
        <PageNotFound /> {/* Display 404 not found UI */}
      </RouteWrapper>
    ),
    errorElement: <ErrorBoundary />, // Handle errors thrown within the 404 route
  },
] as RouteObject[]);
