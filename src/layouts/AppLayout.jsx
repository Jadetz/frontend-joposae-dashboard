import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar.jsx";

// Shell around every signed-in page: the sidebar on the left, the page on the right.
// Narrower than 800 px the two wrap, so the sidebar sits above the page (phone layout: task 20).
function AppLayout() {
  return (
    <div className="flex min-h-screen flex-wrap bg-page">
      <Sidebar />
      <main className="min-w-0 grow-999 basis-140 px-4 pt-6 pb-10 sm:px-9 sm:pt-8 sm:pb-14">
        <h1 className="sr-only">Dashboard JopoSae</h1>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
