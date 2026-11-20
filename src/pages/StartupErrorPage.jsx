import { useState } from "react";
import { useAuth } from "../auth/AuthContext.js";
import logo from "../assets/logo.png";
import mascotApologizing from "../assets/mascot/mascot-apologizing.svg";
import mascotUnplugged from "../assets/mascot/mascot-unplugged.svg";

// Full screen shown when /me fails for a reason other than 401.
// With a refCode the server answered with an error; without one it never answered.
function StartupErrorPage() {
  const { error, retry } = useAuth();
  const [copied, setCopied] = useState(false);
  const hasRefCode = Boolean(error.refCode);

  const copyRefCode = async () => {
    try {
      await navigator.clipboard.writeText(error.refCode);
      setCopied(true);
    } catch {
      // The code stays on screen, so it can still be copied by hand.
    }
  };

  return (
    <main
      role="alert"
      className="flex min-h-screen items-center bg-page px-4 py-8 sm:px-8 sm:py-12"
    >
      <section className="mx-auto flex w-full max-w-280 flex-col rounded-2xl border border-line border-b-line-strong bg-card px-5 py-6 shadow-card sm:min-h-175 sm:px-8 sm:py-7">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="size-10 drop-shadow-sm" />
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-heading">JopoSae</span>
            <span className="text-xs text-muted">Dashboard chatbot</span>
          </div>
        </div>

        <div className="flex flex-1 flex-wrap items-center justify-center gap-x-18 gap-y-8 pt-8 sm:px-8 sm:py-12">
          <div className="relative flex min-h-80 w-95 max-w-full items-center justify-center sm:min-h-110">
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sunken sm:size-85"
            />
            <img
              src={hasRefCode ? mascotApologizing : mascotUnplugged}
              alt=""
              className="relative w-48 sm:w-62.5"
            />
          </div>

          <div className="flex max-w-120 min-w-0 flex-1 basis-90 flex-col gap-4">
            {hasRefCode ? (
              <>
                <span
                  aria-hidden="true"
                  className="text-8xl font-extrabold tracking-tighter text-heading sm:text-9xl"
                >
                  {error.status}
                </span>
                <h1 className="text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
                  Maaf, terjadi kesalahan di server
                </h1>
                <p className="text-base leading-relaxed text-muted">
                  Permintaan Anda tidak bisa diproses. Kirim kode di bawah ke
                  engineer supaya masalahnya cepat ditemukan.
                </p>
                <div className="flex flex-wrap items-center gap-3 rounded-xl bg-sunken px-3.5 py-3 inset-shadow-sunken">
                  <p className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-muted">
                      Kode kesalahan
                    </span>
                    <code className="font-mono text-lg font-bold tracking-wider text-heading">
                      {error.refCode}
                    </code>
                  </p>
                  <button
                    type="button"
                    onClick={copyRefCode}
                    className="ml-auto inline-flex min-h-10 items-center justify-center rounded-xl border border-line-strong bg-white px-4 text-sm font-semibold text-navy hover:bg-sunken"
                  >
                    {copied ? "Kode tersalin" : "Salin kode"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
                  Server tidak dapat dihubungi
                </h1>
                <p className="text-base leading-relaxed text-muted">
                  Dashboard tidak bisa terhubung ke server JopoSae. Bisa karena
                  server sedang dinyalakan ulang, atau koneksi internet Anda
                  terputus.
                </p>
                <p className="text-sm text-muted">
                  Kalau masih gagal setelah beberapa menit, kabari engineer.
                </p>
              </>
            )}

            <div className="pt-1.5">
              <button
                type="button"
                onClick={retry}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-navy hover:bg-brand-hover"
              >
                Coba lagi
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default StartupErrorPage;
