import React from "react";
import { ROLEENUM } from "@/interface/enum/role.enum";
import PageNotFound from "@/core/public/components/pageNotFound";
import { useAuth } from "@/context/AuthContext";
import type { AppRoute, AppRouteObject } from "@/interface/enum/types";
import RouteWrapper from "@/context/RouteWrapper";
import ErrorBoundary from "@/core/public/components/ErrorBoundry";

interface IPermissionProps {
  RElement: React.LazyExoticComponent<React.FC>;
  roles: ROLEENUM[];
}

export const Permission = (props: IPermissionProps) => {
  const { RElement, roles } = props;
  const { isLoading, userInfo } = useAuth();

  if (isLoading) {
    return null;
  }

  const hasRoleAccess =
    roles.length > 0 && roles.includes(userInfo?.role as ROLEENUM);

  if (!hasRoleAccess) {
    return <PageNotFound />;
  }

  return (
    <RouteWrapper>
      <RElement />
    </RouteWrapper>
  );
};

export function createRoute(args: AppRoute): AppRouteObject {
  const { element, roles, type, children, ...rest } = args;

  return {
    ...rest,
    roles,
    element:
      type && ["public", "bypass"].includes(type) ? (
        <RouteWrapper>{React.createElement(element)}</RouteWrapper>
      ) : (
        <Permission RElement={element} roles={roles} />
      ),
    // Recursively convert nested AppRoute[] -> AppRouteObject[]
    children: children
      ? children.map((child) => createRoute(child))
      : undefined,
    errorElement: <ErrorBoundary />,
  };
}
