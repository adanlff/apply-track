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


        {/* ── Navigation Top Bar ── */}
        <div className="flex items-center justify-between">
          <AppButton
            variant="secondary"
            size="sm"
            onClick={handleCancel}
          >
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Kembali ke Detail Lamaran</span>
          </AppButton>
        </div>

        {/* ── Form Card ── */}
        <div className="bg-white border border-surface-border rounded-lg shadow-card">
          {/* Header form */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-surface-border">
            <div>
              <h2 className="text-golden-h4 font-bold text-slate-900">Edit Lamaran</h2>
              <p className="text-golden-sm text-slate-400 mt-0.5">Perbarui informasi lamaran kerja.</p>
            </div>
            <button
              onClick={handleCancel}
              aria-label="Tutup form"
              className="w-9 h-9 flex items-center justify-center rounded-md text-slate-400
                hover:text-slate-700 hover:bg-surface-panel transition-colors
                focus-visible:outline-none"
            >
              <X size={16} />
            </button>
          </div>
          <div className="px-6 py-5">
            <ApplicationForm
              initial={application}
              onSave={handleSave}
              onCancel={handleCancel}
              inlineMode
            />
          </div>
        </div>
      </div>
    </div>
  );
}
