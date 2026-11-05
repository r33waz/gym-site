import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

// Paths that should NOT show the header (login, signup, etc.)

function PublicLayout() {
  return (
    <>
      {/* Render Header only on non-auth public pages */}
      <Outlet /> {/* Render the matched child route */}
    </>
  );
}

export default PublicLayout;
