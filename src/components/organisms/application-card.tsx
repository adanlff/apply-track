import type { JobApplication } from '../../types/applytrack-types';
import { AppBadge } from '../atoms/app-badge';
import { AppButton } from '../atoms/app-button';
import { formatDate, formatSalary, daysSince, truncate } from '../../lib/utils';
import { Building2, MapPin, Calendar, Briefcase, ExternalLink, Edit2, Trash2 } from 'lucide-react';

interface ApplicationCardProps {
  application: JobApplication;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ApplicationCard({ application, onView, onEdit, onDelete }: ApplicationCardProps) {
  const days = daysSince(application.appliedDate);
  const salary = formatSalary(application.salaryMin, application.salaryMax, application.currency);

  return (
    <article
      className="group relative bg-white border border-surface-border rounded-lg p-4
        hover:border-brand-300 hover:shadow-card-hover shadow-card
        transition-all duration-200 cursor-pointer"
      onClick={() => onView(application.id)}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="min-w-0">
          <h3 className="text-golden-h4 font-semibold text-slate-900 break-words leading-snug">
            {application.position}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-golden-base text-slate-500">
            <Building2 size={13} aria-hidden="true" className="shrink-0 text-brand-500" />
            <span className="break-words">{application.company}</span>
          </div>
        </div>
        <AppBadge status={application.status} size="sm" />
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-golden-sm text-slate-400 mb-3">
        {application.location && (
          <span className="flex items-center gap-1">
            <MapPin size={11} aria-hidden="true" />
            {application.location}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Calendar size={11} aria-hidden="true" />
          {formatDate(application.appliedDate)}
          <span className="text-slate-300">· {days}h</span>
        </span>
        <span className="flex items-center gap-1">
          <Briefcase size={11} aria-hidden="true" />
          {application.source}
        </span>
      </div>

      {/* Salary & URL */}
      {(salary !== '-' || application.jobUrl) && (
        <div className="flex items-center gap-3 mb-2.5 text-golden-sm">
          {salary !== '-' && (
            <span className="text-brand-600 font-semibold">{salary}</span>
          )}
          {application.jobUrl && (
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
              aria-label={`Buka link lowongan ${application.position}`}
            >
              <ExternalLink size={11} aria-hidden="true" />
              Lihat lowongan
            </a>
          )}
        </div>
      )}

      {/* Notes preview */}
      {application.notes && (
        <p className="text-golden-sm text-slate-400 italic border-t border-surface-border pt-2 mt-2 break-words">
          {truncate(application.notes, 100)}
        </p>
      )}

      {/* Action buttons on hover */}
      <div
        className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <AppButton
          variant="ghost"
          size="sm"
          onClick={() => onEdit(application.id)}
          aria-label={`Edit lamaran ${application.position}`}
          className="h-8 w-8 p-0"
        >
          <Edit2 size={13} />
        </AppButton>
        <AppButton
          variant="ghost"
          size="sm"
          onClick={() => onDelete(application.id)}
          aria-label={`Hapus lamaran ${application.position}`}
          className="h-8 w-8 p-0 hover:text-red-500 hover:bg-red-50 hover:border-red-200"
        >
          <Trash2 size={13} />
        </AppButton>
      </div>
    </article>
  );
}
