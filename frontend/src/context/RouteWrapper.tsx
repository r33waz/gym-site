import React, { Suspense } from "react";

interface RouteWrapperProps {
  children: React.ReactNode;
}

const RouteWrapper = ({ children }: RouteWrapperProps) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default RouteWrapper;
