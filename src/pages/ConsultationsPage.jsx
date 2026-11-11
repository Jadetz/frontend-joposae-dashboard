import { useState } from "react";
import ConsultationTable from "../components/ConsultationTable.jsx";
import { CONSULTATION_STATUSES } from "../lib/consultationStatus.js";
import { sampleConsultations } from "../lib/sampleConsultations.js";

// Filter buttons: "all" first, then every status in workflow order.
const FILTERS = [
  { value: "all", label: "Semua" },
  ...Object.keys(CONSULTATION_STATUSES).map((status) => ({
    value: status,
    label: CONSULTATION_STATUSES[status].label,
  })),
];

function ConsultationsPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const visibleConsultations =
    statusFilter === "all"
      ? sampleConsultations
      : sampleConsultations.filter(
          (consultation) => consultation.consultation_status === statusFilter,
        );

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-heading">Konsultasi</h2>
      <div className="inline-flex flex-wrap gap-1 rounded-lg bg-track p-1 inset-shadow-track">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setStatusFilter(filter.value)}
            className={`rounded-md px-3 py-1 text-sm ${
              statusFilter === filter.value
                ? "bg-card font-semibold text-navy shadow-card"
                : "text-secondary"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <ConsultationTable consultations={visibleConsultations} />
    </section>
  );
}

export default ConsultationsPage;
