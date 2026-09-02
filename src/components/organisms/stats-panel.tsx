import type { JobApplication } from '../../types/applytrack-types';
import { STATUS_LABELS } from '../../types/applytrack-types';
import type { ApplicationStatus } from '../../types/applytrack-types';

interface StatsPanelProps {
  applications: JobApplication[];
}

const STATUS_ORDER: ApplicationStatus[] = [
  'applied', 'screening', 'interview', 'test', 'offering', 'accepted', 'rejected', 'withdrawn',
];

const STAT_PILL: Record<ApplicationStatus, { text: string; bg: string; dot: string }> = {
  applied:   { text: 'text-brand-700',   bg: 'bg-brand-50 border-brand-200',     dot: 'bg-brand-500' },
  screening: { text: 'text-blue-700',    bg: 'bg-blue-50 border-blue-200',       dot: 'bg-blue-500' },
  interview: { text: 'text-violet-700',  bg: 'bg-violet-50 border-violet-200',   dot: 'bg-violet-500' },
  test:      { text: 'text-amber-700',   bg: 'bg-amber-50 border-amber-200',     dot: 'bg-amber-500' },
  offering:  { text: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500' },
  accepted:  { text: 'text-emerald-800', bg: 'bg-emerald-100 border-emerald-300',dot: 'bg-emerald-600' },
  rejected:  { text: 'text-red-700',     bg: 'bg-red-50 border-red-200',         dot: 'bg-red-500' },
  withdrawn: { text: 'text-slate-600',   bg: 'bg-slate-100 border-slate-200',    dot: 'bg-slate-400' },
};

export function StatsPanel({ applications }: StatsPanelProps) {
  const total = applications.length;
  const counts = STATUS_ORDER.reduce(
    (acc, status) => {
      acc[status] = applications.filter((a) => a.status === status).length;
      return acc;
    },
    {} as Record<ApplicationStatus, number>
  );

  const activeCount = (['applied', 'screening', 'interview', 'test', 'offering'] as ApplicationStatus[])
    .reduce((sum, s) => sum + (counts[s] ?? 0), 0);

  return (
    <section aria-label="Statistik lamaran" className="space-y-3">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <SummaryCard value={total} label="Total Lamaran" valueClass="text-slate-800" />
        <SummaryCard value={activeCount} label="Sedang Berjalan" valueClass="text-blue-600" />
        <SummaryCard value={counts.accepted} label="Diterima" valueClass="text-emerald-600" />
        <SummaryCard value={counts.rejected} label="Ditolak" valueClass="text-red-500" />
      </div>

      {/* Per-status pills */}
      <div className="flex flex-wrap gap-2">
        {STATUS_ORDER.map((status) => {
          const count = counts[status];
          if (count === 0) return null;
          const s = STAT_PILL[status];
          return (
            <div
              key={status}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-golden-sm font-medium ${s.bg} ${s.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} aria-hidden="true" />
              {STATUS_LABELS[status]}
              <span className="font-bold">{count}</span>
            </div>
          );
        })}
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
