import { Link } from "react-router";

// Shown inside the layout for any address the router does not know
function NotFoundPage() {
  return (
    <section className="space-y-2 rounded-lg border border-line bg-card p-6">
      <h2 className="text-lg font-semibold text-heading">
        Halaman tidak ditemukan
      </h2>
      <p className="text-sm text-muted">Alamat ini tidak ada di dashboard.</p>
      <Link to="/" className="text-sm font-semibold text-link hover:text-navy">
        Kembali ke halaman utama
      </Link>
    </section>
  );
}

export default NotFoundPage;
