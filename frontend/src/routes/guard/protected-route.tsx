import { Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const location = useLocation();

  return <Outlet />;
};
