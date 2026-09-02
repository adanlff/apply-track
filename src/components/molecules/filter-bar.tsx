import { useMemo } from 'react';
import { StaggeredDropDown, type DropdownItem } from '../atoms/staggered-dropdown';
import { DatePicker } from '../atoms/date-picker';
import type { FilterStatus, JobApplication } from '../../types/applytrack-types';
import { STATUS_LABELS } from '../../types/applytrack-types';
import { MapPin, LayoutGrid, Table } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FilterBarProps {
  applications: JobApplication[];
  filterStatus: FilterStatus;
  filterLocation: string;
  filterDateFrom: string;
  filterDateTo: string;
  displayMode: 'cards' | 'table';
  onFilterStatus: (value: FilterStatus) => void;
  onFilterLocation: (value: string) => void;
  onFilterDate: (from: string, to: string) => void;
  onDisplayModeChange: (mode: 'cards' | 'table') => void;
}

const STATUS_ITEMS: DropdownItem[] = [
  { text: 'Semua Status', value: 'all' },
  ...Object.entries(STATUS_LABELS).map(([value, label]) => ({
    text: label,
    value,
  })),
];

export function FilterBar({
  applications,
  filterStatus,
  filterLocation,
  filterDateFrom,
  filterDateTo,
  displayMode,
  onFilterStatus,
  onFilterLocation,
  onFilterDate,
  onDisplayModeChange,
}: FilterBarProps) {
  // Extract unique locations dynamically from current applications
  const locationItems: DropdownItem[] = useMemo(() => {
    const locs = applications
      .map((a) => a.location?.trim())
      .filter((loc): loc is string => Boolean(loc));
    const unique = Array.from(new Set(locs)).sort((a, b) => a.localeCompare(b));

    return [
      { text: 'Semua Kota', value: 'all', icon: MapPin },
      ...unique.map((loc) => ({
        text: loc,
        value: loc,
        icon: MapPin,
      })),
    ];
  }, [applications]);

  return (
    <div className="flex flex-col lg:flex-row gap-2.5 lg:items-center">
      {/* ── Status & Kota (Grid di Mobile/Tablet, Inline di Desktop) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-2.5">
        {/* Status filter */}
        <div className="w-full lg:w-44">
          <StaggeredDropDown
            id="filter-status"
            aria-label="Filter status lamaran"
            items={STATUS_ITEMS}
            selectedValue={filterStatus}
            onSelect={(val) => onFilterStatus(val as FilterStatus)}
            placeholder="Status"
          />
        </div>

        {/* Dynamic City / Location Filter (Tampil di sebelah Status untuk Mobile/Tablet) */}
        <div className="w-full lg:hidden">
          <StaggeredDropDown
            id="filter-location-mobile"
            aria-label="Filter berdasarkan kota"
            items={locationItems}
            selectedValue={filterLocation || 'all'}
            onSelect={onFilterLocation}
            placeholder="Pilih Kota"
          />
        </div>
      </div>

      {/* ── Date Range (Dari tanggal s/d Sampai tanggal) ── */}
      <div className="flex items-center gap-2 w-full lg:w-auto">
        <div className="flex-1 lg:w-40 min-w-0">
          <DatePicker
            id="filter-date-from"
            aria-label="Filter dari tanggal"
            placeholder="Dari tanggal"
            value={filterDateFrom}
            onChange={(val) => onFilterDate(val, filterDateTo)}
          />
        </div>

        <span className="text-slate-400 text-xs font-medium shrink-0 px-0.5">s/d</span>

        <div className="flex-1 lg:w-40 min-w-0">
          <DatePicker
            id="filter-date-to"
            aria-label="Filter sampai tanggal"
            placeholder="Sampai tanggal"
            value={filterDateTo}
            onChange={(val) => onFilterDate(filterDateFrom, val)}
          />
        </div>
      </div>

      {/* ── Desktop Only: Kota Filter di sisi kanan ── */}
      <div className="hidden lg:block lg:w-44 lg:ml-auto">
        <StaggeredDropDown
          id="filter-location-desktop"
          aria-label="Filter berdasarkan kota"
          items={locationItems}
          selectedValue={filterLocation || 'all'}
          onSelect={onFilterLocation}
          placeholder="Pilih Kota"
        />
      </div>

      {/* ── Desktop Only: Mode Switcher: Cards vs Table ── */}
      <div className="hidden lg:inline-flex items-center p-0.5 rounded-md border border-neutral-300 bg-white h-11 shrink-0">
        <button
          type="button"
          onClick={() => onDisplayModeChange('cards')}
          className={cn(
            'flex items-center gap-1.5 h-full px-3 rounded text-xs font-medium transition-all',
            displayMode === 'cards'
              ? 'bg-neutral-100 text-slate-900 font-semibold'
              : 'text-slate-500 hover:text-slate-900 hover:bg-neutral-50'
          )}
          aria-label="Tampilan Kartu"
          title="Tampilan Kartu"
        >
          <LayoutGrid size={15} />
          <span>Kartu</span>
        </button>
        <button
          type="button"
          onClick={() => onDisplayModeChange('table')}
          className={cn(
            'flex items-center gap-1.5 h-full px-3 rounded text-xs font-medium transition-all',
            displayMode === 'table'
              ? 'bg-neutral-100 text-slate-900 font-semibold'
              : 'text-slate-500 hover:text-slate-900 hover:bg-neutral-50'
          )}
          aria-label="Tampilan Tabel"
          title="Tampilan Tabel"
        >
          <Table size={15} />
          <span>Tabel</span>
        </button>
      </div>
    </div>
  );
}
