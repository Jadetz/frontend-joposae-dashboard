import { apiGet } from "./client.js";

// All consultations, newest first. The page filters them by status.
export const fetchConsultations = (signal) =>
  apiGet("/api/consultations", { signal });
