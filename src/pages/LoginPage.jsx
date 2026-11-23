import { useState } from "react";
import { useAuth } from "../auth/AuthContext.js";
import GoogleSignInButton from "../components/GoogleSignInButton.jsx";
import { readCredentialEmail } from "../lib/credentialEmail.js";

// Red box with a title, used for every failure on this page.
function DangerBanner({ title, children }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-danger-line bg-danger-soft p-4"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        className="mt-px size-5 shrink-0 text-danger-icon"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9l6 6M15 9l-6 6" />
      </svg>
      <div className="flex flex-col gap-1 text-sm leading-relaxed text-danger-ink">
        <strong className="font-semibold">{title}</strong>
        {children}
      </div>
    </div>
  );
}

// Sign-in page. After a successful login, GuestOnly sends the admin back to where they came from.
function LoginPage() {
  const { login, sessionExpired } = useAuth();
  // status: "idle", "checking" (waiting for the API), or "failed".
  const [attempt, setAttempt] = useState({
    status: "idle",
    error: null,
    email: null,
  });
  const [buttonFailed, setButtonFailed] = useState(false);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleCredential = async (credential) => {
    if (attempt.status === "checking") {
      return;
    }
    setAttempt({
      status: "checking",
      error: null,
      email: null,
    });
    try {
      await login(credential);
    } catch (error) {
      setAttempt({
        status: "failed",
        error,
        email: readCredentialEmail(credential),
      });
    }
  };

  const { status, error, email } = attempt;
  // Every 403 except an unverified email means "not on the admin list".
  const notRegistered =
    status === "failed" &&
    error.status === 403 &&
    error.code !== "auth.email_unverified";

  return (
    <main className="flex min-h-screen items-center justify-center bg-page px-4 py-14 sm:px-6">
      <section className="flex w-full max-w-105 flex-col gap-6 rounded-2xl border border-line border-b-line-strong bg-card p-6 shadow-card sm:p-9">
        <span className="text-xs font-bold tracking-widest text-brand-ink uppercase">
          Dashboard chatbot
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-heading">
            Masuk
          </h1>
          <p className="text-sm leading-relaxed text-muted">
            Gunakan akun Google yang sudah didaftarkan owner.
          </p>
        </div>

        {!clientId && (
          <DangerBanner title="Login belum disiapkan">
            <span>
              Client ID Google (VITE_GOOGLE_CLIENT_ID) belum diisi. Kabari
              engineer.
            </span>
          </DangerBanner>
        )}
        {buttonFailed && (
          <DangerBanner title="Tombol Google gagal dimuat">
            <span>Periksa koneksi internet, lalu muat ulang halaman.</span>
          </DangerBanner>
        )}
        {notRegistered && (
          <DangerBanner title="Akun ini belum terdaftar">
            {email && <strong className="font-bold">{email}</strong>}
            <span>{error.message}</span>
          </DangerBanner>
        )}
        {status === "failed" && !notRegistered && (
          <DangerBanner title="Login gagal">
            <span>{error.message}</span>
            {error.refCode && <span>Kode: {error.refCode}</span>}
          </DangerBanner>
        )}
        {sessionExpired && status === "idle" && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-xl border border-warning-line bg-warning-banner p-3.5"
          >
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-warning-line ring-inset"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4.5 text-warning-ink"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </span>
            <div className="flex flex-col gap-1 text-sm leading-relaxed">
              <strong className="font-semibold text-warning-title">
                Sesi Anda sudah berakhir
              </strong>
              <span className="text-warning-body">
                Silakan masuk lagi untuk melanjutkan. Sesi berlaku 7 hari sejak
                terakhir masuk.
              </span>
            </div>
          </div>
        )}
        {status === "checking" && (
          <p role="status" className="text-sm font-semibold text-muted">
            Memeriksa akun…
          </p>
        )}

        {clientId && !buttonFailed && (
          <div
            aria-busy={status === "checking"}
            className={
              status === "checking" ? "pointer-events-none opacity-60" : ""
            }
          >
            <GoogleSignInButton
              clientId={clientId}
              onCredential={handleCredential}
              onLoadError={() => setButtonFailed(true)}
            />
          </div>
        )}

        {!sessionExpired && status !== "failed" && (
          <div className="flex items-start gap-3 rounded-xl bg-sunken p-3.5 inset-shadow-sunken">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="mt-px size-4.5 shrink-0 text-muted"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v5M12 7.5v0" />
            </svg>
            <p className="text-sm leading-relaxed text-secondary">
              Belum terdaftar? Minta owner menambahkan email Anda di halaman
              Kelola admin.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default LoginPage;
