import type { JobApplication } from '../../types/applytrack-types';
import { JOB_TYPE_LABELS } from '../../types/applytrack-types';
import { AppBadge } from '../atoms/app-badge';
import { formatDate } from '../../lib/utils';
import {
  MapPin,
  Calendar,
  Briefcase,
  ExternalLink,
  Edit2,
  Trash2,
  Globe,
  Eye,
} from 'lucide-react';

interface ApplicationTableProps {
  applications: JobApplication[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ApplicationTable({
  applications,
  onView,
  onEdit,
  onDelete,
}: ApplicationTableProps) {
  return (
    <div className="bg-white border border-surface-border rounded-lg shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700 border-collapse">
          <thead>
            <tr className="bg-neutral-50/80 border-b border-surface-border text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th scope="col" className="px-5 py-3.5">Posisi & Perusahaan</th>
              <th scope="col" className="px-4 py-3.5">Status</th>
              <th scope="col" className="px-4 py-3.5">Lokasi</th>
              <th scope="col" className="px-4 py-3.5">Tipe Pekerjaan</th>
              <th scope="col" className="px-4 py-3.5">Sumber</th>
              <th scope="col" className="px-4 py-3.5">Tanggal Melamar</th>
              <th scope="col" className="px-5 py-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {applications.map((app) => {
              const companyInitials = app.company
                ? app.company.slice(0, 2).toUpperCase()
                : 'AT';

              return (
                <tr
                  key={app.id}
                  onClick={() => onView(app.id)}
                  className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                >
                  {/* Posisi & Perusahaan */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <div className="w-8 h-8 rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 text-slate-700 font-bold text-xs">
                        {companyInitials}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors truncate">
                          {app.position}
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                          {app.company}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <AppBadge status={app.status} size="sm" />
                  </td>

                  {/* Lokasi */}
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-600">
                    {app.location ? (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={12} className="text-slate-400 shrink-0" />
                        {app.location}
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>

                  {/* Tipe Pekerjaan */}
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase size={12} className="text-slate-400 shrink-0" />
                      {JOB_TYPE_LABELS[app.jobType] || app.jobType}
                    </span>
                  </td>

                  {/* Sumber */}
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <Globe size={12} className="text-slate-400 shrink-0" />
                      {app.source}
                    </span>
                  </td>

                  {/* Tanggal Melamar */}
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={12} className="text-slate-400 shrink-0" />
                      {formatDate(app.appliedDate)}
                    </span>
                  </td>

                  {/* Aksi */}
                  <td className="px-5 py-3.5 whitespace-nowrap text-right text-xs">
                    <div
                      className="inline-flex items-center gap-1 justify-end"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {app.jobUrl && (
                        <a
                          href={app.jobUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                          title="Buka link lowongan"
                          aria-label={`Buka link lowongan ${app.position}`}
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => onView(app.id)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-neutral-100 transition-colors"
                        title="Lihat detail"
                        aria-label={`Lihat detail ${app.position}`}
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(app.id)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-neutral-100 transition-colors"
                        title="Edit lamaran"
                        aria-label={`Edit lamaran ${app.position}`}
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(app.id)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Hapus lamaran"
                        aria-label={`Hapus lamaran ${app.position}`}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
