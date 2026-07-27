import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";
import { roleHomeMap } from "./role.map";
import type { ROLEENUM } from "@/interface/enum/role.enum";
import { authRoutePath } from "@/core/public/auth/auth.path";

const RoleRedirect: React.FC = () => {
  const { userInfo, isLoading } = useAuth();

  if (isLoading) return null;

  if (!userInfo?.role) {
    return <Navigate to={authRoutePath.login} replace />;
  }

  return <Navigate to={roleHomeMap[userInfo.role as ROLEENUM]} replace />;
};

export default RoleRedirect;
