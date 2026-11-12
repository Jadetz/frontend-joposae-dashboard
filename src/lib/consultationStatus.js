// Display label and tone classes for each consultation_status value, in workflow order.
// Tones come from the status map in src/index.css.
// tabLabel is the filter tab name; it differs from the chip label only for link_generated (PRD rev 71).
export const CONSULTATION_STATUSES = {
  link_generated: {
    label: "Link terkirim",
    tabLabel: "Belum ada kabar",
    chipClass: "bg-info-soft ring-info-line text-info-ink",
  },
  pending: {
    label: "Sedang ditangani",
    tabLabel: "Sedang ditangani",
    chipClass: "bg-info-strong-soft ring-info-strong-line text-info-strong-ink",
  },
  closed: {
    label: "Selesai",
    tabLabel: "Selesai",
    chipClass: "bg-success-soft ring-success-line text-success-ink",
  },
  cancelled: {
    label: "Batal",
    tabLabel: "Batal",
    chipClass: "bg-neutral-soft ring-neutral-line text-neutral-ink",
  },
};
