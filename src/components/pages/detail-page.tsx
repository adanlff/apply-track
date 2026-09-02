import { useState, useEffect } from 'react';
import { ApplicationDetail } from '../organisms/application-detail';
import { ConfirmDialog } from '../molecules/confirm-dialog';
import { AppButton } from '../atoms/app-button';
import { getApplicationById, deleteApplication } from '../../lib/storage';
import type { JobApplication } from '../../types/applytrack-types';
import { RotateCcw, AlertCircle } from 'lucide-react';

export default function DetailPage() {
  const [application, setApplication] = useState<JobApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const handleBack = () => {
    window.location.href = '/';
  };

  const handleEdit = (id: string) => {
    window.location.href = `/edit?id=${id}`;
  };

  const handleDeleteRequest = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!application) return;
    setIsDeleting(true);
    try {
      await deleteApplication(application.id);
      window.location.href = '/';
    } finally {
      setIsDeleting(false);
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
              Data lamaran yang kamu cari tidak ditemukan atau sudah dihapus.
            </p>
            <AppButton variant="primary" size="md" onClick={handleBack}>
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
        {/* ── Page title ── */}
        <div>
          <h1 className="text-golden-h3 font-bold text-slate-900 tracking-tight mb-1">
            ApplyTrack
          </h1>
          <p className="text-golden-sm text-slate-500">
            Platform pelacak proses rekrutmen dan pencarian kerja dalam satu tempat.
          </p>
        </div>

        <ApplicationDetail
          application={application}
          onBack={handleBack}
          onEdit={handleEdit}
          onDelete={handleDeleteRequest}
        />
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Hapus Lamaran"
        description="Lamaran ini akan dihapus secara permanen dan tidak bisa dikembalikan."
        confirmLabel="Hapus Lamaran"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        loading={isDeleting}
      />
    </div>
  );
}
