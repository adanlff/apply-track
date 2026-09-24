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
            <span className="hidden sm:inline">Kembali ke Daftar Lamaran</span>
            <span className="inline sm:hidden text-xs">Kembali</span>
          </button>
        </div>

        {/* ── Form Card ── */}
        <div className="bg-white border border-surface-border rounded-lg shadow-card p-6 sm:p-7">
          <div className="pb-5 mb-5 border-b border-surface-border">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tambah Lamaran Baru
            </h1>
          </div>
          <ApplicationForm
            onSave={handleSave}
            onCancel={handleCancel}
            inlineMode
          />
        </div>
      </div>
    </div>
  );
}
