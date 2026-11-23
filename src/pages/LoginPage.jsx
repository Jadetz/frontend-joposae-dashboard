import { useState } from "react";
import { useAuth } from "../auth/AuthContext.js";
import GoogleSignInButton from "../components/GoogleSignInButton.jsx";
import { FeatureTiles } from "../components/LoginFeatures.jsx";
import LoginPanel from "../components/LoginPanel.jsx";
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

  // Mas Jopo follows the card: sorry when rejected, pocket watch after an expired session.
  let mood = "waving";
  if (notRegistered) {
    mood = "apologizing";
  } else if (sessionExpired && status === "idle") {
    mood = "pocketWatch";
  }

  return (
    <div className="flex min-h-screen flex-col bg-brand xl:flex-row xl:bg-page">
      <LoginPanel mood={mood} />

      <main className="flex flex-1 justify-center xl:grow xl:basis-105 xl:items-center xl:px-6 xl:py-14">
        <section className="-mt-2 flex w-full max-w-120 flex-col gap-4.5 rounded-t-3xl border-t border-navy/10 bg-card px-5 pt-6.5 pb-6 xl:mt-0 xl:max-w-105 xl:gap-6 xl:rounded-2xl xl:border xl:border-line xl:border-b-line-strong xl:p-9 xl:shadow-card">
          {/* Phone head: the amber panel above has no title. */}
          <div className="flex flex-col gap-2 xl:hidden">
            <span className="text-xs font-bold tracking-widest text-brand-ink uppercase">
              Khusus admin terdaftar
            </span>
            <h1 className="text-2xl leading-tight font-extrabold tracking-tight text-heading">
              Dashboard pemantau chatbot JopoSae.
            </h1>
            <p className="text-sm leading-relaxed text-muted">
              Masuk dengan akun Google yang sudah didaftarkan owner.
            </p>
          </div>
          <FeatureTiles />

          {/* Desktop head. */}
          <span className="hidden text-xs font-bold tracking-widest text-brand-ink uppercase xl:block">
            Dashboard chatbot
          </span>
          <div className="hidden flex-col gap-2 xl:flex">
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
                  Silakan masuk lagi untuk melanjutkan. Sesi berlaku 7 hari
                  sejak terakhir masuk.
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

          <p className="mt-auto pt-1 text-center text-xs font-medium text-muted xl:hidden">
            Semua jam di dashboard memakai WIB.
          </p>
        </section>
      </main>
    </div>
  );
}

export default LoginPage;
