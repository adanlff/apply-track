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
  Globe,
  Info,
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
    <section className="w-full space-y-6">
      {/* ── Top Bar: Back & Actions ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <AppButton variant="secondary" size="sm" onClick={onBack}>
          <ArrowLeft size={15} aria-hidden="true" />
          <span>Kembali ke Daftar Lamaran</span>
        </AppButton>
        <div className="flex items-center gap-2">
          <AppButton variant="secondary" size="sm" onClick={() => onEdit(application.id)}>
            <Edit2 size={14} aria-hidden="true" />
            <span>Edit Lamaran</span>
          </AppButton>
          <AppButton variant="danger" size="sm" onClick={() => onDelete(application.id)}>
            <Trash2 size={14} aria-hidden="true" />
            <span>Hapus</span>
          </AppButton>
        </div>
      </div>

      {/* ── Main Layout: 2 Columns ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left / Primary Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info Card */}
          <div className="bg-white border border-surface-border rounded-lg shadow-card p-6 sm:p-7">
            {/* Header: Title + Company + Status */}
            <div className="flex items-start justify-between gap-4 flex-wrap pb-6 border-b border-surface-border">
              <div className="space-y-1.5 min-w-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Detail Posisi
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight break-words">
                  {application.position}
                </h2>
                <div className="flex items-center gap-2 text-base text-slate-600 font-medium">
                  <Building2 size={18} className="text-slate-400 shrink-0" aria-hidden="true" />
                  <span>{application.company}</span>
                </div>
              </div>
              <div className="shrink-0 pt-1">
                <AppBadge status={application.status} size="md" />
              </div>
            </div>

            {/* Metadata Grid (4 Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {/* Lokasi */}
              <div className="p-4 rounded-lg bg-slate-50/80 border border-slate-100 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-md bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-600 shadow-sm">
                  <MapPin size={16} />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-slate-400 font-medium block mb-0.5">Lokasi / Kota</span>
                  <span className="text-sm font-semibold text-slate-800 break-words block">
                    {application.location || 'Tidak dicantumkan'}
                  </span>
                </div>
              </div>

              {/* Tanggal Melamar */}
              <div className="p-4 rounded-lg bg-slate-50/80 border border-slate-100 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-md bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-600 shadow-sm">
                  <Calendar size={16} />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-slate-400 font-medium block mb-0.5">Tanggal Melamar</span>
                  <span className="text-sm font-semibold text-slate-800 block">
                    {formatDate(application.appliedDate)}
                  </span>
                  <span className="text-xs text-slate-400">
                    {days === 0 ? 'Hari ini' : `${days} hari yang lalu`}
                  </span>
                </div>
              </div>

              {/* Jenis Pekerjaan */}
              <div className="p-4 rounded-lg bg-slate-50/80 border border-slate-100 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-md bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-600 shadow-sm">
                  <Briefcase size={16} />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-slate-400 font-medium block mb-0.5">Jenis Pekerjaan</span>
                  <span className="text-sm font-semibold text-slate-800 block">
                    {JOB_TYPE_LABELS[application.jobType] || application.jobType}
                  </span>
                </div>
              </div>

              {/* Sumber Lowongan */}
              <div className="p-4 rounded-lg bg-slate-50/80 border border-slate-100 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-md bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-600 shadow-sm">
                  <Globe size={16} />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-slate-400 font-medium block mb-0.5">Sumber Lowongan</span>
                  <span className="text-sm font-semibold text-slate-800 block">
                    {application.source || 'Lainnya'}
                  </span>
                </div>
              </div>
            </div>

            {/* Link Lowongan */}
            {application.jobUrl && (
              <div className="mt-6 pt-5 border-t border-surface-border">
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5 min-w-0 text-sm text-slate-600">
                    <ExternalLink size={16} className="text-slate-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-400">Tautan:</span>
                    <span className="truncate max-w-xs sm:max-w-md text-xs text-slate-700">
                      {application.jobUrl}
                    </span>
                  </div>
                  <a
                    href={application.jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-neutral-300 text-slate-700 hover:bg-neutral-100 hover:text-slate-900 text-xs font-medium shadow-none transition-colors ml-auto"
                  >
                    <span>Buka Lowongan</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Notes Card */}
          {application.notes && (
            <div className="bg-white border border-surface-border rounded-lg shadow-card p-6">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-surface-border">
                <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-slate-600">
                  <FileText size={15} aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-slate-800">Catatan Tambahan</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                {application.notes}
              </p>
            </div>
          )}
        </div>

        {/* Right / Secondary Column (1 col) */}
        <div className="space-y-6">
          {/* Status Timeline Card */}
          <div className="bg-white border border-surface-border rounded-lg shadow-card p-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-surface-border">
              <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-slate-600">
                <Clock size={15} aria-hidden="true" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">Riwayat Status</h3>
            </div>

            {application.statusHistory && application.statusHistory.length > 0 ? (
              <ol className="relative border-l-2 border-slate-200 ml-3 space-y-5 my-2">
                {[...application.statusHistory].reverse().map((entry, idx) => (
                  <li key={idx} className="ml-5">
                    <span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full border-2 border-white bg-slate-400 ring-2 ring-slate-100" />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <AppBadge status={entry.status} size="sm" />
                        <time className="text-xs text-slate-400">
                          {formatDate(entry.changedAt)}
                        </time>
                      </div>
                      {entry.note && (
                        <p className="text-xs text-slate-500 mt-0.5 bg-slate-50 p-2 rounded border border-slate-100">
                          {entry.note}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="flex items-center gap-2">
                <AppBadge status={application.status} size="sm" />
                <span className="text-xs text-slate-400">{formatDate(application.appliedDate)}</span>
              </div>
            )}
          </div>

          {/* Quick Meta Info Card */}
          <div className="bg-white border border-surface-border rounded-lg shadow-card p-6 space-y-3">
            <div className="flex items-center gap-2 mb-1 pb-2 border-b border-surface-border">
              <Info size={14} className="text-slate-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Informasi Data</h3>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">ID Lamaran</span>
              <span className="text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-medium">
                {application.id.slice(0, 8)}...
              </span>
            </div>
            {application.createdAt && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Dibuat Pada</span>
                <span className="text-slate-700 font-medium">{formatDate(application.createdAt)}</span>
              </div>
            )}
            {application.updatedAt && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Terakhir Diperbarui</span>
                <span className="text-slate-700 font-medium">{formatDate(application.updatedAt)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
