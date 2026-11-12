import { useEffect, useState } from "react";
import { fetchConsultations } from "../api/consultations.js";
import ConsultationTable from "../components/ConsultationTable.jsx";
import { CONSULTATION_STATUSES } from "../lib/consultationStatus.js";

// Filter buttons: "all" first, then every status in workflow order.
const FILTERS = [
  { value: "all", label: "Semua" },
  ...Object.keys(CONSULTATION_STATUSES).map((status) => ({
    value: status,
    label: CONSULTATION_STATUSES[status].tabLabel,
  })),
];
// How manny rows a filter tab would show
const countFor = (consultations, filterValue) =>
  filterValue === "all"
    ? consultations.length
    : consultations.filter(
        (consultation) => consultation.consultation_status === filterValue,
      ).length;
function ConsultationsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  // One state for the request: "loading", then "ready" with rows or "failed" with an error.
  const [request, setRequest] = useState({ state: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    fetchConsultations(controller.signal)
      .then((consultations) => setRequest({ state: "ready", consultations }))
      .catch((error) => {
        if (controller.signal.aborted) {
          return;
        }
        setRequest({ state: "failed", error });
      });
    // StrictMode mounts twice in development; cancel the first request.
    return () => controller.abort();
  }, []);

  const consultations = request.state === "ready" ? request.consultations : [];
  const visibleConsultations =
    statusFilter === "all"
      ? consultations
      : consultations.filter(
          (consultation) => consultation.consultation_status === statusFilter,
        );

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-heading">Konsultasi</h2>
      <div
        role="group"
        aria-label="Saring status"
        className="inline-flex flex-wrap gap-1 rounded-xl bg-track p-1 inset-shadow-track"
      >
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            aria-pressed={statusFilter === filter.value}
            onClick={() => setStatusFilter(filter.value)}
            className={`min-h-9.5 rounded-lg border px-3.5 text-sm whitespace-nowrap text-navy ${
              statusFilter === filter.value
                ? "border-brand-edge bg-brand-gradient font-extrabold inset-shadow-gloss"
                : "border-transparent font-semibold"
            }`}
          >
            {filter.label}
            {request.state === "ready" && (
              <span className="ml-1 text-xs text-muted">
                {countFor(consultations, filter.value)}
              </span>
            )}
          </button>
        ))}
      </div>
      {request.state === "loading" && (
        <p className="rounded-lg bg-sunken p-4 text-sm text-muted inset-shadow-sunken">
          Memuat data konsultasi...
        </p>
      )}
      {request.state === "failed" && (
        <div
          role="alert"
          className="rounded-lg border border-danger-line bg-danger-soft p-4 text-sm"
        >
          <p className="font-semibold text-danger-title">
            Gagal memuat
            {request.error.refCode && ` · kode ${request.error.refCode}`}
          </p>
          <p className="mt-1 text-danger-body">{request.error.message}</p>
        </div>
      )}
      {request.state === "ready" &&
        (visibleConsultations.length === 0 ? (
          <p className="rounded-lg bg-sunken p-4 text-sm text-muted inset-shadow-sunken">
            Belum ada konsultasi di daftar ini.
          </p>
        ) : (
          <ConsultationTable consultations={visibleConsultations} />
        ))}
    </section>
  );
}

export default ConsultationsPage;
