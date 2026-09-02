import type { JobApplication } from '../../types/applytrack-types';
import { STATUS_LABELS, JOB_TYPE_LABELS } from '../../types/applytrack-types';
import { AppBadge } from '../atoms/app-badge';
import { AppButton } from '../atoms/app-button';
import { formatDate, daysSince } from '../../lib/utils';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  Briefcase,
  ExternalLink,
  Edit2,
  Trash2,
  Clock,
  FileText,
} from 'lucide-react';

interface ApplicationDetailProps {
  application: JobApplication;
  onBack: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ApplicationDetail({ application, onBack, onEdit, onDelete }: ApplicationDetailProps) {
  const days = daysSince(application.appliedDate);

  return (
    <section className="max-w-2xl mx-auto">
      {/* Top nav */}
      <div className="flex items-center justify-between mb-5">
        <AppButton variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft size={15} aria-hidden="true" />
          Kembali
        </AppButton>
        <div className="flex gap-2">
          <AppButton variant="secondary" size="sm" onClick={() => onEdit(application.id)}>
            <Edit2 size={13} aria-hidden="true" />
            Edit
          </AppButton>
          <AppButton variant="danger" size="sm" onClick={() => onDelete(application.id)}>
            <Trash2 size={13} aria-hidden="true" />
            Hapus
          </AppButton>
        </div>
      </div>

      {/* Header card */}
      <div className="bg-white border border-surface-border rounded-lg shadow-card p-5 mb-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-golden-h3 font-bold text-slate-900">{application.position}</h2>
            <div className="flex items-center gap-2 mt-1.5 text-golden-base text-slate-600">
              <Building2 size={15} className="text-brand-500 shrink-0" aria-hidden="true" />
              <span>{application.company}</span>
            </div>
          </div>
          <AppBadge status={application.status} size="md" />
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 pt-4 border-t border-surface-border">
          {application.location && (
            <InfoItem icon={<MapPin size={13} />} label="Lokasi" value={application.location} />
          )}
          <InfoItem
            icon={<Calendar size={13} />}
            label="Tanggal Melamar"
            value={`${formatDate(application.appliedDate)} (${days} hari lalu)`}
          />
          <InfoItem
            icon={<Briefcase size={13} />}
            label="Jenis Pekerjaan"
            value={JOB_TYPE_LABELS[application.jobType]}
          />
          <InfoItem icon={<ExternalLink size={13} />} label="Sumber" value={application.source} />
        </div>

        {application.jobUrl && (
          <div className="mt-4 pt-4 border-t border-surface-border">
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-golden-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <ExternalLink size={13} aria-hidden="true" />
              Buka link lowongan
            </a>
          </div>
        )}
      </div>

      {/* Notes */}
      {application.notes && (
        <div className="bg-white border border-surface-border rounded-lg shadow-card p-5 mb-4">
          <div className="flex items-center gap-2 mb-2 text-golden-sm font-semibold text-slate-700">
            <FileText size={14} className="text-brand-500" aria-hidden="true" />
            <span>Catatan</span>
          </div>
          <p className="text-golden-base text-slate-600 whitespace-pre-wrap">{application.notes}</p>
        </div>
      )}

      {/* Status History */}
      {application.statusHistory && application.statusHistory.length > 0 && (
        <div className="bg-white border border-surface-border rounded-lg shadow-card p-5">
          <div className="flex items-center gap-2 mb-4 text-golden-sm font-semibold text-slate-700">
            <Clock size={14} className="text-brand-500" aria-hidden="true" />
            <span>Riwayat Status</span>
          </div>
          <ol className="relative border-l border-surface-border ml-3 space-y-4">
            {[...application.statusHistory].reverse().map((entry, idx) => (
              <li key={idx} className="ml-4">
                <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-brand-500" />
                <div className="flex items-center gap-2">
                  <AppBadge status={entry.status} size="sm" />
                  <time className="text-golden-xs text-slate-400">
                    {formatDate(entry.changedAt)}
                  </time>
                </div>
                {entry.note && (
                  <p className="text-golden-sm text-slate-500 mt-1">{entry.note}</p>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1 text-golden-xs text-slate-400 mb-0.5">
        <span className="text-brand-500">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="text-golden-sm font-medium text-slate-800 break-words">{value}</div>
    </div>
  );
}
