import { StaggeredDropDown, type DropdownItem } from '../atoms/staggered-dropdown';
import { DatePicker } from '../atoms/date-picker';
import type { FilterStatus, ApplicationStatus, SortKey, SortDir } from '../../types/applytrack-types';
import { STATUS_LABELS } from '../../types/applytrack-types';
import { Calendar, Building2, Briefcase, Tag } from 'lucide-react';

interface FilterBarProps {
  filterStatus: FilterStatus;
  filterDateFrom: string;
  filterDateTo: string;
  sortKey: SortKey;
  sortDir: SortDir;
  onFilterStatus: (value: FilterStatus) => void;
  onFilterDate: (from: string, to: string) => void;
  onSort: (key: SortKey, dir: SortDir) => void;
}

const STATUS_ITEMS: DropdownItem[] = [
  { text: 'Semua Status', value: 'all' },
  ...Object.entries(STATUS_LABELS).map(([value, label]) => ({
    text: label,
    value,
  })),
];

const SORT_ITEMS: DropdownItem[] = [
  { text: 'Tanggal Melamar', value: 'appliedDate', icon: Calendar },
  { text: 'Perusahaan', value: 'company', icon: Building2 },
  { text: 'Posisi', value: 'position', icon: Briefcase },
  { text: 'Status', value: 'status', icon: Tag },
];

export function FilterBar({
  filterStatus,
  filterDateFrom,
  filterDateTo,
  sortKey,
  sortDir,
  onFilterStatus,
  onFilterDate,
  onSort,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Status filter with StaggeredDropDown */}
      <div className="w-44">
        <StaggeredDropDown
          id="filter-status"
          aria-label="Filter status lamaran"
          items={STATUS_ITEMS}
          selectedValue={filterStatus}
          onSelect={(val) => onFilterStatus(val as FilterStatus)}
          placeholder="Status"
        />
      </div>

      {/* Date from with Custom Calendar DatePicker */}
      <div className="w-40">
        <DatePicker
          id="filter-date-from"
          aria-label="Filter dari tanggal"
          placeholder="Dari tanggal"
          value={filterDateFrom}
          onChange={(val) => onFilterDate(val, filterDateTo)}
        />
      </div>

      <span className="text-slate-400 text-golden-sm shrink-0">s/d</span>

      {/* Date to with Custom Calendar DatePicker */}
      <div className="w-40">
        <DatePicker
          id="filter-date-to"
          aria-label="Filter sampai tanggal"
          placeholder="Sampai tanggal"
          value={filterDateTo}
          onChange={(val) => onFilterDate(filterDateFrom, val)}
        />
      </div>

      {/* Sort with StaggeredDropDown */}
      <div className="flex gap-1.5 ml-auto">
        <div className="w-48">
          <StaggeredDropDown
            id="sort-key"
            aria-label="Urutkan berdasarkan"
            items={SORT_ITEMS}
            selectedValue={sortKey}
            onSelect={(val) => onSort(val as SortKey, sortDir)}
            placeholder="Urutkan"
          />
        </div>
        <button
          id="sort-direction"
          onClick={() => onSort(sortKey, sortDir === 'asc' ? 'desc' : 'asc')}
          aria-label={`Urutan ${sortDir === 'asc' ? 'naik' : 'turun'}, klik untuk balik`}
          className="h-11 w-11 flex items-center justify-center rounded-md
            bg-white border border-neutral-300 text-slate-600 hover:text-slate-900
            hover:border-neutral-400 hover:bg-neutral-50 transition-all
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500
            focus-visible:ring-offset-1 focus-visible:ring-offset-white"
        >
          {sortDir === 'asc' ? '↑' : '↓'}
        </button>
      </div>
    </div>
  );
}
