import type { JobApplication } from '../../types/applytrack-types';
import { STATUS_LABELS, JOB_TYPE_LABELS } from '../../types/applytrack-types';
import { AppBadge } from '../atoms/app-badge';
import { AppButton } from '../atoms/app-button';
import { formatDate, formatSalary, daysSince } from '../../lib/utils';
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
  DollarSign,
} from 'lucide-react';

interface ApplicationDetailProps {
  application: JobApplication;
  onBack: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ApplicationDetail({ application, onBack, onEdit, onDelete }: ApplicationDetailProps) {
  const salary = formatSalary(application.salaryMin, application.salaryMax, application.currency);
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
          {salary !== '-' && (
            <InfoItem icon={<DollarSign size={13} />} label="Estimasi Gaji" value={salary} />
          )}
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
          <h3 className="text-golden-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-3">
            <FileText size={13} aria-hidden="true" />
            Catatan
          </h3>
          <p className="text-golden-base text-slate-700 whitespace-pre-wrap break-words">
            {application.notes}
          </p>
        </div>
      )}

      {/* Status history timeline */}
      {application.statusHistory.length > 0 && (
        <div className="bg-white border border-surface-border rounded-lg shadow-card p-5">
          <h3 className="text-golden-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-4">
            <Clock size={13} aria-hidden="true" />
            Riwayat Status
          </h3>
          <ol className="relative border-l-2 border-surface-border pl-4 space-y-4">
            {[...application.statusHistory].reverse().map((entry, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[1.25rem] w-3.5 h-3.5 rounded-full bg-brand-500 border-2 border-white top-0.5 shadow-sm" aria-hidden="true" />
                <div className="text-golden-sm">
                  <span className="font-semibold text-slate-800">{STATUS_LABELS[entry.status]}</span>
                  <span className="text-slate-400 ml-2">{formatDate(entry.changedAt)}</span>
                  {entry.note && (
                    <p className="text-slate-500 mt-0.5">{entry.note}</p>
                  )}
                </div>
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
      <dt className="text-golden-xs text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
        <span aria-hidden="true" className="text-slate-400">{icon}</span>
        {label}
      </dt>
      <dd className="text-golden-sm text-slate-700 font-medium break-words">{value}</dd>
    </div>
  );
}
