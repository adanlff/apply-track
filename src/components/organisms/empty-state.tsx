import { ClipboardList, Plus } from 'lucide-react';
import { AppButton } from '../atoms/app-button';

interface EmptyStateProps {
  hasFilters: boolean;
  onAddNew: () => void;
}

export function EmptyState({ hasFilters, onAddNew }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center mb-5">
        <ClipboardList size={28} className="text-brand-500" aria-hidden="true" />
      </div>
      {hasFilters ? (
        <>
          <h3 className="text-golden-h4 font-semibold text-slate-800 mb-2">Tidak ada hasil</h3>
          <p className="text-golden-base text-slate-500 max-w-xs text-balance">
            Tidak ada lamaran yang cocok dengan filter atau pencarian yang aktif. Coba ubah kriteria pencarian.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-golden-h4 font-semibold text-slate-800 mb-2">Belum ada lamaran</h3>
          <p className="text-golden-base text-slate-500 max-w-xs text-balance mb-6">
            Mulai lacak proses rekrutmen dengan menambahkan lamaran pertamamu.
          </p>
          <AppButton variant="primary" size="md" onClick={onAddNew}>
            <Plus size={16} aria-hidden="true" />
            Tambah Lamaran Pertama
          </AppButton>
        </>
      )}
    </div>
  );
}
