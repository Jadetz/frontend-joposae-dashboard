// Display label and tone classes for each consultation_status value, in workflow order.
// Tones come from the status map in src/index.css.
export const CONSULTATION_STATUSES = {
  link_generated: {
    label: "Link terkirim",
    chipClass: "bg-info-soft ring-info-line text-info-ink",
  },
  pending: {
    label: "Sedang ditangani",
    chipClass: "bg-info-strong-soft ring-info-strong-line text-info-strong-ink",
  },
  closed: {
    label: "Selesai",
    chipClass: "bg-success-soft ring-success-line text-success-ink",
  },
  cancelled: {
    label: "Batal",
    chipClass: "bg-neutral-soft ring-neutral-line text-neutral-ink",
  },
};
