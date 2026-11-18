import { Link, useLocation } from "react-router";
import mascotMap from "../assets/mascot/mascot-map.svg";

// Shown inside the layout for any address the router does not know.
function NotFoundPage() {
  const location = useLocation();

  return (
    <section className="flex flex-wrap items-center justify-center gap-x-18 gap-y-8 rounded-2xl border border-line border-b-line-strong bg-card px-5 py-8 shadow-card sm:gap-y-12 sm:px-16 sm:py-14">
      <div className="relative flex min-h-80 w-95 max-w-full items-center justify-center sm:min-h-110">
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sunken sm:size-85"
        />
        <img src={mascotMap} alt="" className="relative w-48 sm:w-62.5" />
      </div>

      <div className="flex max-w-120 min-w-0 flex-1 basis-90 flex-col gap-4">
        <span
          aria-hidden="true"
          className="text-8xl font-extrabold tracking-tighter text-heading sm:text-9xl"
        >
          404
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
          Halaman tidak ditemukan
        </h2>
        <p className="text-base leading-relaxed text-muted">
          Alamat ini tidak ada di dashboard. Mungkin salah ketik, atau tautannya
          sudah lama.
        </p>
        <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
          Alamat yang dibuka
          <code className="rounded-md bg-sunken px-2 py-0.5 break-all text-heading ring-1 ring-line ring-inset">
            {location.pathname}
          </code>
        </p>

        <div className="pt-1.5">
          <Link
            to="/konsultasi"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-navy hover:bg-brand-hover"
          >
            Kembali ke Konsultasi
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
