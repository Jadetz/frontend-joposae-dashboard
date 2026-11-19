import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "./auth/AuthContext.js";
import { GuestOnly, RequireAuth } from "./auth/RouteGuards.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import ConsultationsPage from "./pages/ConsultationsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import StartupErrorPage from "./pages/StartupErrorPage.jsx";

function App() {
  const { status } = useAuth();

  // Wait for /me before choosing a page, so the login page never flashes.
  if (status === "loading") {
    return (
      <p role="status" className="p-6 text-sm text-muted">
        Memeriksa sesi...
      </p>
    );
  }
  if (status === "failed") {
    return <StartupErrorPage />;
  }
  return (
    <Routes>
      <Route element={<GuestOnly />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          {/* No Ringkasan page yet (stage 3), so / opens Konsultasi for now. */}
          <Route index element={<Navigate to="/konsultasi" replace />} />
          <Route path="konsultasi" element={<ConsultationsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
