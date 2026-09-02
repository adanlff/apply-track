import { useMemo } from 'react';
import { StaggeredDropDown, type DropdownItem } from '../atoms/staggered-dropdown';
import { DatePicker } from '../atoms/date-picker';
import type { FilterStatus, ApplicationStatus, JobApplication } from '../../types/applytrack-types';
import { STATUS_LABELS } from '../../types/applytrack-types';
import { MapPin } from 'lucide-react';

interface FilterBarProps {
  applications: JobApplication[];
  filterStatus: FilterStatus;
  filterLocation: string;
  filterDateFrom: string;
  filterDateTo: string;
  onFilterStatus: (value: FilterStatus) => void;
  onFilterLocation: (value: string) => void;
  onFilterDate: (from: string, to: string) => void;
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
  onFilterStatus,
  onFilterLocation,
  onFilterDate,
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

      {/* Dynamic City / Location Filter with StaggeredDropDown */}
      <div className="w-48 ml-auto">
        <StaggeredDropDown
          id="filter-location"
          aria-label="Filter berdasarkan kota"
          items={locationItems}
          selectedValue={filterLocation || 'all'}
          onSelect={onFilterLocation}
          placeholder="Pilih Kota"
        />
      </div>
    </div>
  );
}
