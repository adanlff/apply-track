// Core application data types for ApplyTrack

export type ApplicationStatus =
  | 'applied'
  | 'screening'
  | 'interview'
  | 'test'
  | 'offering'
  | 'rejected'
  | 'withdrawn'
  | 'accepted';

export type JobType = 'full-time' | 'part-time' | 'internship' | 'contract' | 'freelance';

export type ViewMode = 'list' | 'add' | 'edit' | 'detail';

export type FilterStatus = ApplicationStatus | 'all';

export type SortKey = 'appliedDate' | 'company' | 'position' | 'status';

export type SortDir = 'asc' | 'desc';

export interface StatusHistoryEntry {
  status: ApplicationStatus;
  changedAt: string;
  note?: string;
}

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  appliedDate: string;
  jobType: JobType;
  source: string;
  jobUrl?: string;
  status: ApplicationStatus;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  notes?: string;
  statusHistory: StatusHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationFormData {
  company: string;
  position: string;
  location: string;
  appliedDate: string;
  jobType: JobType;
  source: string;
  jobUrl: string;
  status: ApplicationStatus;
  salaryMin: string;
  salaryMax: string;
  currency: string;
  notes: string;
}

export interface AppState {
  applications: JobApplication[];
  viewMode: ViewMode;
  selectedId: string | null;
  searchQuery: string;
  filterStatus: FilterStatus;
  filterLocation: string;
  filterDateFrom: string;
  filterDateTo: string;
  sortKey: SortKey;
  sortDir: SortDir;
  isLoading: boolean;
  error: string | null;
}

export type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_APPLICATIONS'; payload: JobApplication[] }
  | { type: 'ADD_APPLICATION'; payload: JobApplication }
  | { type: 'UPDATE_APPLICATION'; payload: JobApplication }
  | { type: 'DELETE_APPLICATION'; payload: string }
  | { type: 'SET_VIEW'; payload: { mode: ViewMode; id?: string } }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_FILTER_STATUS'; payload: FilterStatus }
  | { type: 'SET_FILTER_LOCATION'; payload: string }
  | { type: 'SET_FILTER_DATE'; payload: { from: string; to: string } }
  | { type: 'SET_SORT'; payload: { key: SortKey; dir: SortDir } };

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  applied: 'Dilamar',
  screening: 'Screening',
  interview: 'Interview',
  test: 'Tes',
  offering: 'Penawaran',
  rejected: 'Ditolak',
  withdrawn: 'Ditarik',
  accepted: 'Diterima',
};

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  applied: 'text-brand-400 bg-brand-400/10 border-brand-400/20',
  screening: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  interview: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  test: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  offering: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  rejected: 'text-red-400 bg-red-400/10 border-red-400/20',
  withdrawn: 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20',
  accepted: 'text-emerald-300 bg-emerald-500/20 border-emerald-500/30',
};

export const JOB_TYPE_LABELS: Record<JobType, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  internship: 'Magang',
  contract: 'Kontrak',
  freelance: 'Freelance',
};

export const SOURCE_OPTIONS = [
  'LinkedIn',
  'Glints',
  'JobStreet',
  'Kalibrr',
  'Indeed',
  'Website Perusahaan',
  'Referral',
  'Lainnya',
];
