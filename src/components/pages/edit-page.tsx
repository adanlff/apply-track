import { useState, useEffect } from 'react';
import { ApplicationForm } from '../organisms/application-form';
import { AppButton } from '../atoms/app-button';
import { getApplicationById, updateApplication } from '../../lib/storage';
import type { JobApplication } from '../../types/applytrack-types';
import { ArrowLeft, X, AlertCircle } from 'lucide-react';

export default function EditPage() {
  const [application, setApplication] = useState<JobApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) {
      setIsLoading(false);
      return;
    }

    getApplicationById(id)
      .then((data) => {
        setApplication(data || null);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSave = async (data: JobApplication) => {
    setIsSaving(true);
    try {
      await updateApplication(data);
      window.location.href = `/detail?id=${data.id}`;
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (application) {
      window.location.href = `/detail?id=${application.id}`;
    } else {
      window.location.href = '/';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-base flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-brand-500 rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-500">Memuat data lamaran...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-surface-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          <div>
            <h1 className="text-golden-h3 font-bold text-slate-900 tracking-tight mb-1">
              ApplyTrack
            </h1>
            <p className="text-golden-sm text-slate-500">
              Platform pelacak proses rekrutmen dan pencarian kerja dalam satu tempat.
            </p>
          </div>

          <div className="bg-white border border-surface-border rounded-lg shadow-card p-12 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={22} className="text-amber-500" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Lamaran Tidak Ditemukan</h2>
            <p className="text-sm text-slate-500 mb-6">
              Data lamaran yang ingin diedit tidak ditemukan atau sudah dihapus.
            </p>
            <AppButton variant="primary" size="md" onClick={() => window.location.href = '/'}>
              Kembali ke Beranda
            </AppButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* ── Top Bar: Back ── */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <span className="w-9 h-9 rounded-lg bg-white border border-surface-border shadow-sm flex items-center justify-center text-slate-500 shrink-0">
              <ArrowLeft size={16} />
            </span>
            <span className="hidden sm:inline">Kembali ke Detail Lamaran</span>
            <span className="inline sm:hidden text-xs">Kembali</span>
          </button>
        </div>

        {/* ── Form Card ── */}
        <div className="bg-white border border-surface-border rounded-lg shadow-card p-6 sm:p-7">
          <div className="pb-5 mb-5 border-b border-surface-border">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Edit Lamaran
            </h1>
          </div>
          <ApplicationForm
            initial={application}
            onSave={handleSave}
            onCancel={handleCancel}
            inlineMode
          />
        </div>
      </div>
    </div>
  );
}
