// Fake rows shaped like GET /api/consultations. Used by R1 only, replaced by the API in R2.
export const sampleConsultations = [
  {
    consultation_id: 5,
    display_name: "Budi",
    service_name: "Layanan PDAM",
    consultation_status: "link_generated",
    created_at: "2026-11-11T02:15:00.000Z",
  },
  {
    consultation_id: 4,
    display_name: null,
    service_name: null,
    consultation_status: "pending",
    created_at: "2026-11-10T07:02:00.000Z",
  },
  {
    consultation_id: 3,
    display_name: "Sari",
    service_name: "WiFi dan Internet",
    consultation_status: "closed",
    created_at: "2026-11-09T03:40:00.000Z",
  },
  {
    consultation_id: 2,
    display_name: "Andi",
    service_name: "Manajemen Sekolah",
    consultation_status: "cancelled",
    created_at: "2026-11-08T09:25:00.000Z",
  },
  {
    consultation_id: 1,
    display_name: "Rina",
    service_name: "PPOB",
    consultation_status: "link_generated",
    created_at: "2026-11-08T01:05:00.000Z",
  },
];
