import { Outlet } from "react-router";

// Shell around every signed-in page. The sidebar is added in task 17.
function AppLayout() {
  return (
    <div className="min-h-screen bg-page">
      <main className="mx-auto max-w-5xl space-y-6 p-6">
        <h1 className="text-2xl font-semibold text-heading">
          Dashboard JopoSae
        </h1>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
