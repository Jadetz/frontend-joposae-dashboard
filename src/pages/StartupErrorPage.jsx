import { useAuth } from "../auth/AuthContext.js";

// Shown when /me fails for a reason other than 401. The designed version comes in task 16.
function StartupErrorPage() {
  const { error, retry } = useAuth();

  return (
    <main role="alert" className="mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-semibold text-heading">
        Dashboard belum bisa dibuka
      </h1>
      <p className="text-sm text-muted">{error.message}</p>
      {error.refCode && (
        <p className="text-sm text-muted">Kode: {error.refCode}</p>
      )}
      <button
        type="button"
        onClick={retry}
        className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-navy hover:bg-brand-hover"
      >
        Coba lagi
      </button>
    </main>
  );
}

export default StartupErrorPage;
