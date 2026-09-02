import type { JobApplication } from '../../types/applytrack-types';
import { JOB_TYPE_LABELS } from '../../types/applytrack-types';
import { AppBadge } from '../atoms/app-badge';
import { formatDate, daysSince, truncate } from '../../lib/utils';
import {
  Building2,
  MapPin,
  Calendar,
  Briefcase,
  ExternalLink,
  Edit2,
  Trash2,
  FileText,
  Globe,
} from 'lucide-react';

interface ApplicationCardProps {
  application: JobApplication;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ApplicationCard({ application, onView, onEdit, onDelete }: ApplicationCardProps) {
  const days = daysSince(application.appliedDate);
  const companyInitials = application.company
    ? application.company.slice(0, 2).toUpperCase()
    : 'AT';

  return (
    <article
      onClick={() => onView(application.id)}
      className="group relative bg-white border border-surface-border rounded-lg p-5
        shadow-card hover:border-neutral-400 transition-all duration-200
        cursor-pointer flex flex-col justify-between"
    >
      {/* ── Top Header: Company Avatar + Position Title + Status Badge ── */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Company Avatar Badge */}
            <div className="w-10 h-10 rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 text-slate-700 font-bold text-xs">
              {companyInitials}
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors truncate">
                {application.position}
              </h3>
              <p className="text-sm font-medium text-slate-500 truncate">
                {application.company}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <AppBadge status={application.status} size="sm" />
          </div>
        </div>

        {/* ── Meta Pills Row ── */}
        <div className="flex flex-wrap gap-1.5 my-3">
          {application.location && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-50 border border-neutral-200/80 text-slate-600 text-xs font-medium">
              <MapPin size={11} className="text-slate-400 shrink-0" aria-hidden="true" />
              <span className="truncate max-w-[140px]">{application.location}</span>
            </span>
          )}

          {application.jobType && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-50 border border-neutral-200/80 text-slate-600 text-xs font-medium">
              <Briefcase size={11} className="text-slate-400 shrink-0" aria-hidden="true" />
              <span>{JOB_TYPE_LABELS[application.jobType] || application.jobType}</span>
            </span>
          )}

          {application.source && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-50 border border-neutral-200/80 text-slate-600 text-xs font-medium">
              <Globe size={11} className="text-slate-400 shrink-0" aria-hidden="true" />
              <span>{application.source}</span>
            </span>
          )}
        </div>

        {/* ── Notes Preview (if any) ── */}
        {application.notes && (
          <div className="mt-2.5 p-2 rounded-md bg-neutral-50 border border-neutral-100 text-xs text-slate-500 flex items-start gap-1.5">
            <FileText size={12} className="text-slate-400 mt-0.5 shrink-0" aria-hidden="true" />
            <p className="line-clamp-2 leading-relaxed italic">
              {truncate(application.notes, 90)}
            </p>
          </div>
        )}
      </div>

      {/* ── Card Footer: Date & Actions ── */}
      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <Calendar size={12} className="text-slate-400" aria-hidden="true" />
          <span>
            {formatDate(application.appliedDate)}
            <span className="text-slate-300 ml-1">
              ({days === 0 ? 'Hari ini' : `${days} hari lalu`})
            </span>
          </span>
        </div>

        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {application.jobUrl && (
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
              title="Buka link lowongan"
              aria-label={`Buka link lowongan ${application.position}`}
            >
              <ExternalLink size={14} />
            </a>
          )}
          <button
            type="button"
            onClick={() => onEdit(application.id)}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-neutral-100 transition-colors"
            title="Edit lamaran"
            aria-label={`Edit lamaran ${application.position}`}
          >
            <Edit2 size={13} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(application.id)}
            className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Hapus lamaran"
            aria-label={`Hapus lamaran ${application.position}`}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}
