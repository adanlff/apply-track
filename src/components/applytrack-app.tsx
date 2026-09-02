import { useReducer, useEffect, useState, useCallback } from 'react';
import type { AppState, AppAction, JobApplication } from '../types/applytrack-types';
import type { FilterStatus, SortKey } from '../types/applytrack-types';
import { getApplications, createApplication, updateApplication, deleteApplication } from '../lib/storage';
import { SearchBar } from './molecules/search-bar';
import { FilterBar } from './molecules/filter-bar';
import { ConfirmDialog } from './molecules/confirm-dialog';
import { ApplicationList } from './organisms/application-list';
import { ApplicationForm } from './organisms/application-form';
import { ApplicationDetail } from './organisms/application-detail';
import { StatsPanel } from './organisms/stats-panel';
import { AppButton } from './atoms/app-button';
import { Plus, RotateCcw, X } from 'lucide-react';

// ─── Reducer ─────────────────────────────────────────────────────────────────

const initialState: AppState = {
  applications: [],
  viewMode: 'list',
  selectedId: null,
  searchQuery: '',
  filterStatus: 'all',
  filterDateFrom: '',
  filterDateTo: '',
  sortKey: 'appliedDate',
  sortDir: 'desc',
  isLoading: true,
  error: null,
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':        return { ...state, error: action.payload, isLoading: false };
    case 'LOAD_APPLICATIONS':return { ...state, applications: action.payload, isLoading: false, error: null };
    case 'ADD_APPLICATION':
      return { ...state, applications: [action.payload, ...state.applications], viewMode: 'list', selectedId: null };
    case 'UPDATE_APPLICATION':
      return {
        ...state,
        applications: state.applications.map((a) => (a.id === action.payload.id ? action.payload : a)),
        viewMode: 'list',
        selectedId: null,
      };
    case 'DELETE_APPLICATION':
      return {
        ...state,
        applications: state.applications.filter((a) => a.id !== action.payload),
        viewMode: 'list',
        selectedId: null,
      };
    case 'SET_VIEW':   return { ...state, viewMode: action.payload.mode, selectedId: action.payload.id ?? null };
    case 'SET_SEARCH': return { ...state, searchQuery: action.payload };
    case 'SET_FILTER_STATUS': return { ...state, filterStatus: action.payload };
    case 'SET_FILTER_DATE':   return { ...state, filterDateFrom: action.payload.from, filterDateTo: action.payload.to };
    case 'SET_SORT':          return { ...state, sortKey: action.payload.key, sortDir: action.payload.dir };
    default: return state;
  }
}

function deriveFilteredList(state: AppState): JobApplication[] {
  let list = [...state.applications];

  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(
      (a) =>
        a.company.toLowerCase().includes(q) ||
        a.position.toLowerCase().includes(q) ||
        a.location?.toLowerCase().includes(q)
    );
  }
  if (state.filterStatus !== 'all') list = list.filter((a) => a.status === state.filterStatus);
  if (state.filterDateFrom) list = list.filter((a) => a.appliedDate >= state.filterDateFrom);
  if (state.filterDateTo)   list = list.filter((a) => a.appliedDate <= state.filterDateTo);

  list.sort((a, b) => {
    let cmp = 0;
    if (state.sortKey === 'appliedDate') cmp = a.appliedDate.localeCompare(b.appliedDate);
    else if (state.sortKey === 'company') cmp = a.company.localeCompare(b.company);
    else if (state.sortKey === 'position') cmp = a.position.localeCompare(b.position);
    else if (state.sortKey === 'status') cmp = a.status.localeCompare(b.status);
    return state.sortDir === 'asc' ? cmp : -cmp;
  });

  return list;
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function ApplyTrackApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    getApplications()
      .then((data) => dispatch({ type: 'LOAD_APPLICATIONS', payload: data }))
      .catch(() => dispatch({ type: 'SET_ERROR', payload: 'Gagal memuat data. Coba muat ulang halaman.' }));
  }, []);

  const filteredList = deriveFilteredList(state);
  const hasFilters =
    state.searchQuery !== '' || state.filterStatus !== 'all' ||
    state.filterDateFrom !== '' || state.filterDateTo !== '';

  const selectedApp = state.selectedId
    ? state.applications.find((a) => a.id === state.selectedId)
    : undefined;

  const handleSave = useCallback(async (data: JobApplication) => {
    const isEdit = state.applications.some((a) => a.id === data.id);
    if (isEdit) {
      await updateApplication(data);
      dispatch({ type: 'UPDATE_APPLICATION', payload: data });
    } else {
      await createApplication(data);
      dispatch({ type: 'ADD_APPLICATION', payload: data });
      setShowAddForm(false);
    }
  }, [state.applications]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteApplication(deleteTarget);
      dispatch({ type: 'DELETE_APPLICATION', payload: deleteTarget });
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  }, [deleteTarget]);

  const handleDeleteRequest = useCallback((id: string) => {
    dispatch({ type: 'SET_VIEW', payload: { mode: 'list' } });
    setDeleteTarget(id);
  }, []);

  const handleRetry = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    getApplications()
      .then((data) => dispatch({ type: 'LOAD_APPLICATIONS', payload: data }))
      .catch(() => dispatch({ type: 'SET_ERROR', payload: 'Gagal memuat data. Coba muat ulang halaman.' }));
  }, []);

  // ── Error ──
  if (state.error && !state.isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mb-4">
          <RotateCcw size={24} className="text-red-500" />
        </div>
        <h2 className="text-golden-h4 font-semibold text-slate-900 mb-2">Terjadi Kesalahan</h2>
        <p className="text-golden-base text-slate-500 mb-6 max-w-xs">{state.error}</p>
        <AppButton variant="secondary" onClick={handleRetry}>
          <RotateCcw size={15} /> Coba Lagi
        </AppButton>
      </div>
    );
  }

  // ── Detail view ──
  if (state.viewMode === 'detail' && selectedApp) {
    return (
      <div className="min-h-screen bg-surface-base">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <ApplicationDetail
            application={selectedApp}
            onBack={() => dispatch({ type: 'SET_VIEW', payload: { mode: 'list' } })}
            onEdit={(id) => dispatch({ type: 'SET_VIEW', payload: { mode: 'edit', id } })}
            onDelete={handleDeleteRequest}
          />
        </div>
        <ConfirmDialog
          isOpen={!!deleteTarget}
          title="Hapus Lamaran"
          description="Lamaran ini akan dihapus secara permanen dan tidak bisa dikembalikan."
          confirmLabel="Hapus Lamaran"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
          loading={isDeleting}
        />
      </div>
    );
  }

  // ── Edit view ──
  if (state.viewMode === 'edit' && selectedApp) {
    return (
      <div className="min-h-screen bg-surface-base">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <ApplicationForm
            initial={selectedApp}
            onSave={handleSave}
            onCancel={() => dispatch({ type: 'SET_VIEW', payload: { mode: 'list' } })}
          />
        </div>
      </div>
    );
  }

  // ── Main dashboard ──
  return (
    <div className="min-h-screen bg-surface-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* ── Page title ── */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-golden-h3 font-bold text-slate-900 tracking-tight mb-1">
              ApplyTrack
            </h1>
            <p className="text-golden-sm text-slate-400">
              {state.applications.length > 0
                ? `${state.applications.length} lamaran tercatat`
                : 'Lacak semua lamaran kerja dalam satu tempat'}
            </p>
          </div>

          {/* Tombol tambah — hanya muncul kalau form belum terbuka */}
          {!showAddForm && (
            <AppButton
              variant="primary"
              size="md"
              onClick={() => setShowAddForm(true)}
            >
              <Plus size={16} aria-hidden="true" />
              Tambah Lamaran
            </AppButton>
          )}
        </div>

        {/* ── Statistik ── */}
        {!state.isLoading && state.applications.length > 0 && (
          <StatsPanel applications={state.applications} />
        )}

        {/* ── Form tambah — muncul langsung di bawah statistik ── */}
        {showAddForm && (
          <div className="bg-white border border-surface-border rounded-lg shadow-card">
            {/* Header form */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-surface-border">
              <div>
                <h2 className="text-golden-h4 font-bold text-slate-900">Tambah Lamaran Baru</h2>
                <p className="text-golden-sm text-slate-400 mt-0.5">Isi detail lowongan yang kamu lamar.</p>
              </div>
              <button
                onClick={() => setShowAddForm(false)}
                aria-label="Tutup form"
                className="w-9 h-9 flex items-center justify-center rounded-md text-slate-400
                  hover:text-slate-700 hover:bg-surface-panel transition-colors
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50"
              >
                <X size={16} />
              </button>
            </div>
            <div className="px-6 py-5">
              <ApplicationForm
                onSave={handleSave}
                onCancel={() => setShowAddForm(false)}
                inlineMode
              />
            </div>
          </div>
        )}

        {/* ── Search + Filter ── */}
        <div className="bg-white border border-surface-border rounded-lg shadow-card p-4 space-y-3">
          <SearchBar
            value={state.searchQuery}
            onChange={(v) => dispatch({ type: 'SET_SEARCH', payload: v })}
          />
          <FilterBar
            filterStatus={state.filterStatus}
            filterDateFrom={state.filterDateFrom}
            filterDateTo={state.filterDateTo}
            sortKey={state.sortKey}
            sortDir={state.sortDir}
            onFilterStatus={(v) => dispatch({ type: 'SET_FILTER_STATUS', payload: v })}
            onFilterDate={(from, to) => dispatch({ type: 'SET_FILTER_DATE', payload: { from, to } })}
            onSort={(key, dir) => dispatch({ type: 'SET_SORT', payload: { key, dir } })}
          />
          {!state.isLoading && hasFilters && (
            <p className="text-golden-sm text-slate-400" aria-live="polite">
              {filteredList.length === 0
                ? 'Tidak ada hasil'
                : `${filteredList.length} dari ${state.applications.length} lamaran`}
            </p>
          )}
        </div>

        {/* ── Daftar lamaran ── */}
        <ApplicationList
          applications={filteredList}
          hasFilters={hasFilters}
          isLoading={state.isLoading}
          onView={(id) => dispatch({ type: 'SET_VIEW', payload: { mode: 'detail', id } })}
          onEdit={(id) => dispatch({ type: 'SET_VIEW', payload: { mode: 'edit', id } })}
          onDelete={handleDeleteRequest}
          onAddNew={() => setShowAddForm(true)}
        />

        {/* ── Footer ── */}
        <div className="pt-4 border-t border-surface-border text-center text-golden-sm text-slate-300">
          ApplyTrack · Lacak lamaran kerja dalam satu tempat
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Hapus Lamaran"
        description="Lamaran ini akan dihapus secara permanen dan tidak bisa dikembalikan."
        confirmLabel="Hapus Lamaran"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        loading={isDeleting}
      />
    </div>
  );
}
