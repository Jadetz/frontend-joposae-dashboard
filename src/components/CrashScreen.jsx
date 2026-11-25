import { Link, useLocation } from "react-router";
import mascotScrewdriver from "../assets/mascot/mascot-screwdriver.svg";

// Shown in the page area when a page throws while rendering (crash.png).
// The sidebar stays, so the admin can still move to another page.
function CrashScreen({ error }) {
  const location = useLocation();

  return (
    <section
      role="alert"
      className="flex flex-wrap items-center justify-center gap-x-18 gap-y-8 rounded-2xl border border-line border-b-line-strong bg-card px-5 py-8 shadow-card sm:gap-y-12 sm:px-16 sm:py-14"
    >
      <div className="relative flex min-h-80 w-95 max-w-full items-center justify-center sm:min-h-110">
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sunken sm:size-85"
        />
        <img
          src={mascotScrewdriver}
          alt=""
          className="relative w-48 sm:w-62.5"
        />
      </div>

      <div className="flex max-w-120 min-w-0 flex-1 basis-90 flex-col gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
          Ada yang rusak di halaman ini
        </h2>
        <p className="text-base leading-relaxed text-muted">
          Halaman berhenti karena kesalahan di kode dashboard, bukan karena data
          Anda. Muat ulang biasanya cukup. Kalau terulang, kabari engineer dan
          sebutkan halaman yang sedang dibuka.
        </p>

        <details className="rounded-xl bg-sunken px-4 py-3 text-sm ring-1 ring-line ring-inset">
          <summary className="cursor-pointer font-semibold text-heading">
            Detail untuk engineer
          </summary>
          <pre className="mt-2 font-mono text-xs whitespace-pre-wrap break-words text-heading">
            {String(error)}
          </pre>
          <p className="mt-1 text-xs text-muted">
            di halaman {location.pathname}
          </p>
        </details>

        <div className="flex flex-wrap gap-2.5 pt-1.5">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-navy hover:bg-brand-hover w-full sm:w-auto"
          >
            Muat ulang halaman
          </button>
          <Link
            to="/konsultasi"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line-strong bg-white px-5 text-sm font-semibold text-navy hover:bg-sunken w-full sm:w-auto"
          >
            Kembali ke Konsultasi
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CrashScreen;
