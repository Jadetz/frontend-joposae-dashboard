// Sidebar menu in groups. An item with "to" opens a page; an item with "stage" has no page yet.
// ownerOnly groups are hidden from engineers. Display only: the backend enforces it in stage 4.

export const NAV_GROUPS = [
  {
    label: "Admin",
    items: [
      { label: "Ringkasan", stage: 3 },
      { label: "Percakapan", stage: 5 },
      { label: "Konsultasi", to: "/konsultasi" },
      { label: "Layanan", stage: 4 },
      { label: "FAQ", stage: 4 },
    ],
  },
  {
    label: "Engineer",
    items: [
      {
        label: "Kesehatan sistem",
        stage: 3,
      },
    ],
  },
  {
    label: "Pengaturan",
    ownerOnly: true,
    items: [
      {
        label: "Kelola admin",
        stage: 4,
      },
    ],
  },
];
