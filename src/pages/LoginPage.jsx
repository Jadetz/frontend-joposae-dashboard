import { useAuth } from "../auth/AuthContext.js";

// Placeholder until the real Login page (task 17). Shows the session-expired note.
function LoginPage() {
  const { sessionExpired } = useAuth();

  return (
    <main className="mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-semibold text-heading">Masuk</h1>
      {sessionExpired && (
        <p
          role="status"
          className="rounded-lg border border-warning-line bg-warning-banner p-4 text-sm text-warning-body"
        >
          Sesi Anda sudah berakhir. Silakan masuk lagi.
        </p>
      )}
      <p className="text-sm text-muted">
        Halaman Login menyusul. Untuk sementara, masuk lewat halaman uji.
      </p>
    </main>
  );
}

export default LoginPage;
