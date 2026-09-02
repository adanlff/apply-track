import type { JobApplication } from '../../types/applytrack-types';
import { ApplicationCard } from './application-card';
import { EmptyState } from './empty-state';

interface ApplicationListProps {
  applications: JobApplication[];
  hasFilters: boolean;
  isLoading: boolean;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-surface-border rounded-lg p-4 shadow-card space-y-3 animate-pulse">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2 flex-1">
          <div className="h-5 bg-slate-100 rounded w-3/4" />
          <div className="h-4 bg-slate-100 rounded w-1/2" />
        </div>
        <div className="h-6 bg-slate-100 rounded-full w-20" />
      </div>
      <div className="flex gap-4">
        <div className="h-3 bg-slate-100 rounded w-24" />
        <div className="h-3 bg-slate-100 rounded w-28" />
      </div>
    </div>
  );
}

export function ApplicationList({
  applications,
  hasFilters,
  isLoading,
  onView,
  onEdit,
  onDelete,
  onAddNew,
}: ApplicationListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" aria-busy="true" aria-label="Memuat lamaran">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return <EmptyState hasFilters={hasFilters} onAddNew={onAddNew} />;
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      role="list"
      aria-label={`${applications.length} lamaran kerja`}
    >
      {applications.map((app) => (
        <div key={app.id} role="listitem">
          <ApplicationCard
            application={app}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}
