import { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { AppButton } from '../atoms/app-button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel,
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) cancelRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-sm bg-white border border-surface-border rounded-lg shadow-dialog p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-red-500" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 id="confirm-dialog-title" className="text-golden-h4 font-semibold text-slate-900">
              {title}
            </h3>
            <p id="confirm-dialog-description" className="mt-1 text-golden-base text-slate-500">
              {description}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-6 justify-end">
          <AppButton ref={cancelRef} variant="secondary" onClick={onCancel} disabled={loading}>
            Batalkan
          </AppButton>
          <AppButton variant="danger" onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </AppButton>
        </div>
      </div>
    </div>
  );
}
