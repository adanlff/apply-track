import type { JobApplication } from '../../types/applytrack-types';
import type { ApplicationStatus } from '../../types/applytrack-types';

interface StatsPanelProps {
  applications: JobApplication[];
}

export function StatsPanel({ applications }: StatsPanelProps) {
  const total = applications.length;
  
  const counts = applications.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    },
    {} as Record<ApplicationStatus, number>
  );

  const activeCount = (['applied', 'screening', 'interview', 'test', 'offering'] as ApplicationStatus[])
    .reduce((sum, s) => sum + (counts[s] ?? 0), 0);

  return (
    <section aria-label="Statistik lamaran">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <SummaryCard value={total} label="Total Lamaran" valueClass="text-slate-800" />
        <SummaryCard value={activeCount} label="Sedang Berjalan" valueClass="text-blue-600" />
        <SummaryCard value={counts.accepted ?? 0} label="Diterima" valueClass="text-emerald-600" />
        <SummaryCard value={counts.rejected ?? 0} label="Ditolak" valueClass="text-red-500" />
      </div>
    </section>
  );
}

function SummaryCard({ value, label, valueClass }: { value: number; label: string; valueClass: string }) {
  return (
    <div className="bg-white border border-surface-border rounded-lg p-4 text-center shadow-card">
      <div className={`text-golden-h3 font-bold ${valueClass}`}>{value}</div>
      <div className="text-golden-sm text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}
