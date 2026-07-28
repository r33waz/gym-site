import React from "react"; // Required for JSX and lazy component types
import { ROLEENUM } from "@/interface/enum/role.enum"; // Enum of all user roles (admin, staff, etc.)
import PageNotFound from "@/core/public/components/pageNotFound"; // Shown when user lacks role access
import { useAuth } from "@/context/AuthContext"; // Hook to read auth state and current user info
import type { AppRoute, AppRouteObject } from "@/interface/enum/types"; // Input and output types for route creation
import RouteWrapper from "@/context/RouteWrapper"; // Wraps elements with context/auth providers
import ErrorBoundary from "@/core/public/components/ErrorBoundry"; // Catches errors thrown during route rendering

interface IPermissionProps {
  RElement: React.LazyExoticComponent<React.FC>; // The lazy-loaded component to conditionally render
  roles: ROLEENUM[]; // List of roles allowed to access this route
}

export const Permission = (props: IPermissionProps) => {
  const { RElement, roles } = props; // Destructure the component and allowed roles
  const { isLoading, userInfo } = useAuth(); // Get loading state and current user from auth context

  if (isLoading) {
    return null; // Render nothing while auth state is being resolved
  }

  const hasRoleAccess =
    roles.length > 0 && roles.includes(userInfo?.role as ROLEENUM); // Check if user's role is in the allowed list

  if (!hasRoleAccess) {
    return <PageNotFound />; // Block access and show 404 if role doesn't match
  }

  return (
    <RouteWrapper>
      {" "}
      {/* Wrap the authorized component with context providers */}
      <RElement /> {/* Render the protected route component */}
    </RouteWrapper>
  );
};

export function createRoute(args: AppRoute): AppRouteObject {
  const { element, roles, type, children, ...rest } = args; // Destructure route config, separating routing-specific fields

  return {
    ...rest, // Spread remaining fields (path, title, icon, etc.) onto the route object
    roles, // Attach roles for reference in nav/sidebar rendering
    element:
      type && ["public", "bypass", "auth"].includes(type) ? (
        <RouteWrapper>{React.createElement(element)}</RouteWrapper> // Public/bypass/auth routes: wrap directly without permission check
      ) : (
        <Permission RElement={element} roles={roles} /> // Private routes: gate behind role-based Permission component
      ),
    // Recursively convert nested AppRoute[] -> AppRouteObject[]
    children: children
      ? children.map((child) => createRoute(child)) // Recursively apply createRoute to each nested child route
      : undefined,
    errorElement: <ErrorBoundary />, // Attach error boundary to every generated route
  };
}
