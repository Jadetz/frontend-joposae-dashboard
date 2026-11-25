import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import MobileMenu from "../components/MobileMenu.jsx";
import MobileTopBar from "../components/MobileTopBar.jsx";
import PageErrorBoundary from "../components/PageErrorBoundary.jsx";
import Sidebar from "../components/Sidebar.jsx";

// Shell around every signed-in page. From 1024 px: the sidebar on the left, the page on the right.
// Below 1024 px: a top bar whose menu button opens MobileMenu.
function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-page lg:flex">
      <MobileTopBar menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Sidebar />
      <main className="min-w-0 grow-999 basis-140 px-4 pt-6 pb-10 sm:px-9 sm:pt-8 sm:pb-14">
        <h1 className="sr-only">Dashboard JopoSae</h1>
        {/* A new key on every navigation clear a crash from the previous page */}
        <PageErrorBoundary key={location.key}>
          <Outlet />
        </PageErrorBoundary>
      </main>
    </div>
  );
}

export default AppLayout;
