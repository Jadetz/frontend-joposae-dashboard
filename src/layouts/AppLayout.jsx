import { Outlet } from "react-router";
import { useAuth } from "../auth/AuthContext.js";
// Shell around every signed-in page. The sidebar is added in task 18.
function AppLayout() {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen bg-page">
      <main className="mx-auto max-w-5xl space-y-6 p-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-heading">
            Dashboard JopoSae
          </h1>
          {/* Temporary: this button moves to the sidebar in task 18. */}
          <button
            type="button"
            onClick={logout}
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-line-strong bg-white px-4 text-sm font-semibold text-navy hover:bg-sunken"
          >
            Keluar
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
