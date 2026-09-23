import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { publicRoutePath } from "@/routes/path"; // Centralized public route path constants

// Paths that should NOT show the header (login, signup, etc.)
const AUTH_PATHS = [publicRoutePath.login, publicRoutePath.signup]; // Use path constants instead of hardcoded strings

function PublicLayout() {
  const { pathname } = useLocation(); // Get current URL path
  const hideHeader = AUTH_PATHS.includes(pathname); // True if current page is a login/signup page

  return (
    <>
      {!hideHeader && <Header />}{" "}
      {/* Render Header only on non-auth public pages */}
      <Outlet /> {/* Render the matched child route */}
    </>
  );
}

export default PublicLayout;
