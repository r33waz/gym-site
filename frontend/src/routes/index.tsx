// routes/index.tsx
import React from "react";
import RouteWrapper from "@/context/RouteWrapper";
import ErrorBoundary from "@/core/public/components/ErrorBoundry";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { privateRoutes } from "./private";
import { publicRoutes } from "./public";
import PageNotFound from "@/core/public/components/pageNotFound";

const Root = React.lazy(() => import("@/core/private/Root"));
const LandingPage = React.lazy(
  () => import("@/core/public/components/LandingPage"),
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteWrapper>
        <Root />
      </RouteWrapper>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <LandingPage /> },
      ...privateRoutes,
    ] as RouteObject[],
  },
  ...(publicRoutes as RouteObject[]),
  {
    path: "*",
    element: (
      <RouteWrapper>
        <PageNotFound />
      </RouteWrapper>
    ),
    errorElement: <ErrorBoundary />,
  },
] as RouteObject[]);
