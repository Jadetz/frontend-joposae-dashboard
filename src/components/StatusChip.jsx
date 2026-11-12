import { CONSULTATION_STATUSES } from "../lib/consultationStatus.js";

// Used when the API sends a status this dashboard does not know yet.
const UNKNOWN_STATUS_CLASS =
  "bg-neutral-soft ring-neutral-line text-neutral-ink";

function StatusChip({ status }) {
  const { label, chipClass } = CONSULTATION_STATUSES[status] ?? {
    label: status,
    chipClass: UNKNOWN_STATUS_CLASS,
  };
  return (
    <span
      className={`inline-block rounded-full px-3 py-1.5 text-xs font-medium ring-1 ring-inset whitespace-nowrap ${chipClass}`}
    >
      {label}
    </span>
  );
}

export default StatusChip;
