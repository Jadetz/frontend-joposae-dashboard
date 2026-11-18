import ConsultationsPage from "./pages/ConsultationsPage.jsx";
import { Navigate, Route, Routes } from "react-router";
import AppLayout from "./layouts/AppLayout.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* No Ringkasan page yet (stage 3), so / opens Konsultasi for now. */}
        <Route index element={<Navigate to="/konsultasi" replace />} />
        <Route path="konsultasi" element={<ConsultationsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
