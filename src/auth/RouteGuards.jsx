import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./AuthContext.js";

// Pages that need a session. Without one, go to /login and remember where we were.
export function RequireAuth() {
  const { status } = useAuth();
  const location = useLocation();

  if (status !== "signedIn") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}

// The login page. Already signed in: go back to where we came from, or to /.
export function GuestOnly() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "signedIn") {
    return <Navigate to={location.state?.from?.pathname ?? "/"} replace />;
  }
  return <Outlet />;
}
