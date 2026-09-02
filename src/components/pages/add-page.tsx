import { useState } from 'react';
import { ApplicationForm } from '../organisms/application-form';
import { AppButton } from '../atoms/app-button';
import { createApplication } from '../../lib/storage';
import type { JobApplication } from '../../types/applytrack-types';
import { ArrowLeft, X } from 'lucide-react';

export default function AddPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (data: JobApplication) => {
    setIsSaving(true);
    try {
      await createApplication(data);
      window.location.href = '/';
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-surface-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* ── Page title ── */}
        <div>
          <h1 className="text-golden-h3 font-bold text-slate-900 tracking-tight mb-1">
            ApplyTrack
          </h1>
          <p className="text-golden-sm text-slate-500">
            Platform pelacak proses rekrutmen dan pencarian kerja dalam satu tempat.
          </p>
        </div>

        {/* ── Navigation Top Bar ── */}
        <div className="flex items-center justify-between">
          <AppButton
            variant="secondary"
            size="sm"
            onClick={handleCancel}
          >
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Kembali ke Daftar Lamaran</span>
          </AppButton>
        </div>

        {/* ── Form Card ── */}
        <div className="bg-white border border-surface-border rounded-lg shadow-card">
          {/* Header form */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-surface-border">
            <div>
              <h2 className="text-golden-h4 font-bold text-slate-900">Tambah Lamaran Baru</h2>
              <p className="text-golden-sm text-slate-400 mt-0.5">Isi detail lowongan yang kamu lamar.</p>
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
