import iconServicesFaq from "../assets/icons/icon-services-faq.svg";
import iconSummaryLive from "../assets/icons/icon-summary-live.svg";
import iconSystemHealth from "../assets/icons/icon-system-health.svg";

// What the dashboard offers, shown on the login page.
// title and description go on the desktop cards, shortLabel on the phone tiles.
export const LOGIN_FEATURES = [
  {
    icon: iconSummaryLive,
    title: "Ringkasan dan percakapan live",
    description: "Angka harian, plus chat bot dan pelanggan secara langsung.",
    shortLabel: "Ringkasan & live",
  },
  {
    icon: iconServicesFaq,
    title: "Layanan dan FAQ",
    description: "Ubah isi menu dan jawaban bot tanpa menyentuh database.",
    shortLabel: "Layanan & FAQ",
  },
  {
    icon: iconSystemHealth,
    title: "Kesehatan sistem",
    description: "Status bot, penyapu, sesi beku, dan ruang disk.",
    shortLabel: "Kesehatan sistem",
  },
];
