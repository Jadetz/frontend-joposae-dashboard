import StatusChip from "./StatusChip.jsx";

// Formats an ISO timestamp as Indonesian date and time, in the browser's time zone.
const formatDate = (iso) =>
  new Date(iso).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });

function ConsultationTable({ consultations }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-card shadow-card">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-line text-muted">
          <tr>
            <th className="px-4 py-2.5 font-medium">ID</th>
            <th className="px-4 py-2.5 font-medium">Nama</th>
            <th className="px-4 py-2.5 font-medium">Layanan</th>
            <th className="px-4 py-2.5 font-medium">Status</th>
            <th className="px-4 py-2.5 font-medium">Dibuat</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-divider-soft">
          {consultations.map((consultation) => (
            <tr key={consultation.consultation_id}>
              <td className="px-4 py-2.5 text-muted">
                #{consultation.consultation_id}
              </td>
              <td className="px-4 py-2.5">
                {consultation.display_name ?? "Tanpa nama"}
              </td>
              <td className="px-4 py-2.5">
                {consultation.service_name ?? "Umum"}
              </td>
              <td className="px-4 py-2.5">
                <StatusChip status={consultation.consultation_status} />
              </td>
              <td className="px-4 py-2.5 text-muted">
                {formatDate(consultation.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsultationTable;
