import { STATUS_COLORS, STATUS_LABELS } from '../../types/applytrack-types';
import type { ApplicationStatus } from '../../types/applytrack-types';

interface AppBadgeProps {
  status: ApplicationStatus;
  size?: 'sm' | 'md';
}

// Light-theme status color map
const LIGHT_STATUS_COLORS: Record<ApplicationStatus, string> = {
  applied: 'text-brand-700 bg-brand-50 border-brand-200',
  screening: 'text-blue-700 bg-blue-50 border-blue-200',
  interview: 'text-violet-700 bg-violet-50 border-violet-200',
  test: 'text-amber-700 bg-amber-50 border-amber-200',
  offering: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  rejected: 'text-red-700 bg-red-50 border-red-200',
  withdrawn: 'text-slate-600 bg-slate-100 border-slate-200',
  accepted: 'text-emerald-800 bg-emerald-100 border-emerald-300 font-semibold',
};

const DOT_COLORS: Record<ApplicationStatus, string> = {
  applied: 'bg-brand-500',
  screening: 'bg-blue-500',
  interview: 'bg-violet-500',
  test: 'bg-amber-500',
  offering: 'bg-emerald-500',
  rejected: 'bg-red-500',
  withdrawn: 'bg-slate-400',
  accepted: 'bg-emerald-600',
};

export function AppBadge({ status, size = 'md' }: AppBadgeProps) {
  const colorClass = LIGHT_STATUS_COLORS[status];
  const dotClass = DOT_COLORS[status];
  const label = STATUS_LABELS[status];

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-golden-xs' : 'px-2.5 py-1 text-golden-sm',
        colorClass,
      ].join(' ')}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClass}`} aria-hidden="true" />
      {label}
    </span>
  );
}
