import { useState } from 'react';
import type { JobApplication, ApplicationFormData, ApplicationStatus, JobType } from '../../types/applytrack-types';
import { JOB_TYPE_LABELS, SOURCE_OPTIONS, STATUS_LABELS } from '../../types/applytrack-types';
import { FormField } from '../molecules/form-field';
import { AppButton } from '../atoms/app-button';
import { StaggeredDropDown, type DropdownItem } from '../atoms/staggered-dropdown';
import { DatePicker } from '../atoms/date-picker';
import { generateId, toInputDate } from '../../lib/utils';
import { X } from 'lucide-react';

interface ApplicationFormProps {
  initial?: JobApplication;
  onSave: (data: JobApplication) => Promise<void>;
  onCancel: () => void;
  inlineMode?: boolean;
}

type FormErrors = Partial<Record<keyof ApplicationFormData, string>>;

const STATUS_ITEMS: DropdownItem[] = Object.entries(STATUS_LABELS).map(([val, label]) => ({
  text: label,
  value: val,
}));

const JOB_TYPE_ITEMS: DropdownItem[] = Object.entries(JOB_TYPE_LABELS).map(([val, label]) => ({
  text: label,
  value: val,
}));

const SOURCE_ITEMS: DropdownItem[] = SOURCE_OPTIONS.map((s) => ({
  text: s,
  value: s,
}));

function getInitialFormData(app?: JobApplication): ApplicationFormData {
  if (!app) {
    return {
      company: '',
      position: '',
      location: '',
      appliedDate: new Date().toISOString().split('T')[0],
      jobType: 'full-time',
      source: 'LinkedIn',
      jobUrl: '',
      status: 'applied',
      salaryMin: '',
      salaryMax: '',
      currency: 'IDR',
      notes: '',
    };
  }
  return {
    company: app.company,
    position: app.position,
    location: app.location,
    appliedDate: toInputDate(app.appliedDate),
    jobType: app.jobType,
    source: app.source,
    jobUrl: app.jobUrl ?? '',
    status: app.status,
    salaryMin: app.salaryMin?.toString() ?? '',
    salaryMax: app.salaryMax?.toString() ?? '',
    currency: app.currency ?? 'IDR',
    notes: app.notes ?? '',
  };
}

function validate(data: ApplicationFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.company.trim()) errors.company = 'Nama perusahaan wajib diisi.';
  if (!data.position.trim()) errors.position = 'Posisi yang dilamar wajib diisi.';
  if (!data.appliedDate) errors.appliedDate = 'Tanggal melamar wajib diisi.';
  if (data.jobUrl && !/^https?:\/\//.test(data.jobUrl)) {
    errors.jobUrl = 'URL harus diawali dengan http:// atau https://';
  }
  return errors;
}

export function ApplicationForm({ initial, onSave, onCancel, inlineMode = false }: ApplicationFormProps) {
  const [formData, setFormData] = useState<ApplicationFormData>(() => getInitialFormData(initial));
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof ApplicationFormData, boolean>>>({});

  const isEdit = !!initial;

  const set = <K extends keyof ApplicationFormData>(key: K, value: ApplicationFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (touched[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleBlur = (key: keyof ApplicationFormData) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const newErrors = validate({ ...formData });
    setErrors((prev) => ({ ...prev, [key]: newErrors[key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(Object.fromEntries(Object.keys(newErrors).map((k) => [k, true])));
      return;
    }

    setIsSaving(true);
    try {
      const now = new Date().toISOString();
      const statusChanged = initial && initial.status !== formData.status;
      const historyEntry = { status: formData.status, changedAt: now };

      const application: JobApplication = {
        id: initial?.id ?? generateId(),
        company: formData.company.trim(),
        position: formData.position.trim(),
        location: formData.location.trim(),
        appliedDate: formData.appliedDate,
        jobType: formData.jobType,
        source: formData.source,
        jobUrl: formData.jobUrl.trim() || undefined,
        status: formData.status,
        currency: 'IDR',
        notes: formData.notes.trim() || undefined,
        statusHistory: statusChanged
          ? [...(initial?.statusHistory ?? []), historyEntry]
          : (initial?.statusHistory ?? [{ status: formData.status, changedAt: now }]),
        createdAt: initial?.createdAt ?? now,
        updatedAt: now,
      };

      await onSave(application);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className={inlineMode ? '' : 'max-w-2xl mx-auto'}>
      {/* Form header — only shown in standalone (edit) mode */}
      {!inlineMode && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-golden-h3 font-bold text-slate-900">
              {isEdit ? 'Edit Lamaran' : 'Tambah Lamaran'}
            </h2>
            <p className="text-golden-sm text-slate-500 mt-0.5">
              {isEdit ? 'Perbarui informasi lamaran kerja.' : 'Isi detail lowongan yang kamu lamar.'}
            </p>
          </div>
          <AppButton variant="ghost" size="sm" onClick={onCancel} aria-label="Tutup form">
            <X size={16} />
          </AppButton>
        </div>
      )}

      {/* Form card — only in standalone mode; inline uses parent card */}
      <div className={inlineMode ? '' : 'bg-white border border-surface-border rounded-lg shadow-card p-6'}>
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Row: Company + Position */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="field-company"
              label="Nama Perusahaan"
              required
              error={errors.company}
              as="input"
              type="text"
              placeholder="Contoh: Google, Tokopedia"
              value={formData.company}
              onChange={(e) => set('company', e.target.value)}
              onBlur={() => handleBlur('company')}
            />
            <FormField
              id="field-position"
              label="Posisi yang Dilamar"
              required
              error={errors.position}
              as="input"
              type="text"
              placeholder="Contoh: Frontend Engineer"
              value={formData.position}
              onChange={(e) => set('position', e.target.value)}
              onBlur={() => handleBlur('position')}
            />
          </div>

          {/* Row: Location + Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="field-location"
              label="Lokasi / Kota"
              as="input"
              type="text"
              placeholder="Contoh: Jakarta, Surabaya, Remote"
              value={formData.location}
              onChange={(e) => set('location', e.target.value)}
            />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="field-applied-date" className="text-golden-sm font-semibold text-slate-700 flex items-center gap-1">
                Tanggal Melamar
                <span className="text-red-500 text-golden-xs" aria-hidden="true">*</span>
              </label>
              <DatePicker
                id="field-applied-date"
                aria-label="Tanggal melamar"
                placeholder="Pilih tanggal melamar"
                value={formData.appliedDate}
                onChange={(val) => set('appliedDate', val)}
                hasError={!!errors.appliedDate}
              />
              {errors.appliedDate && (
                <p role="alert" className="text-golden-sm text-red-600 flex items-center gap-1">
                  <span aria-hidden="true">⚠</span>
                  {errors.appliedDate}
                </p>
              )}
            </div>
          </div>

          {/* Row: Job Type + Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="field-job-type" className="text-golden-sm font-semibold text-slate-700">
                Jenis Pekerjaan
              </label>
              <StaggeredDropDown
                id="field-job-type"
                items={JOB_TYPE_ITEMS}
                selectedValue={formData.jobType}
                onSelect={(val) => set('jobType', val as JobType)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="field-status" className="text-golden-sm font-semibold text-slate-700">
                Status Lamaran
              </label>
              <StaggeredDropDown
                id="field-status"
                items={STATUS_ITEMS}
                selectedValue={formData.status}
                onSelect={(val) => set('status', val as ApplicationStatus)}
              />
            </div>
          </div>

          {/* Row: Source + Job URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="field-source" className="text-golden-sm font-semibold text-slate-700">
                Sumber Lowongan
              </label>
              <StaggeredDropDown
                id="field-source"
                items={SOURCE_ITEMS}
                selectedValue={formData.source}
                onSelect={(val) => set('source', val)}
              />
            </div>
            <FormField
              id="field-job-url"
              label="Link Lowongan"
              error={errors.jobUrl}
              hint="Contoh: https://linkedin.com/jobs/..."
              as="input"
              type="url"
              placeholder="https://"
              value={formData.jobUrl}
              onChange={(e) => set('jobUrl', e.target.value)}
              onBlur={() => handleBlur('jobUrl')}
            />
          </div>

          {/* Notes */}
          <FormField
            id="field-notes"
            label="Catatan"
            hint="Hal-hal penting yang ingin kamu ingat tentang lamaran ini."
            as="textarea"
            placeholder="Contoh: Ada tes coding setelah interview pertama..."
            value={formData.notes}
            onChange={(e) => set('notes', e.target.value)}
            rows={3}
          />

          {/* Divider + Actions */}
          <div className="flex gap-2 pt-4 justify-end border-t border-surface-border">
            <AppButton variant="secondary" type="button" onClick={onCancel} disabled={isSaving}>
              Batalkan
            </AppButton>
            <AppButton variant="primary" type="submit" loading={isSaving}>
              {isEdit ? 'Simpan Perubahan' : 'Tambah Lamaran'}
            </AppButton>
          </div>
        </form>
      </div>
    </section>
  );
}
