import { useState, useRef, useEffect, useMemo } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  isToday,
  parseISO,
} from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { StaggeredDropDown, type DropdownItem } from './staggered-dropdown';

interface DatePickerProps {
  value: string; // ISO date string: YYYY-MM-DD
  onChange: (value: string) => void;
  placeholder?: string;
  hasError?: boolean;
  id?: string;
  className?: string;
  'aria-label'?: string;
}

const MONTH_ITEMS: DropdownItem[] = [
  { text: 'Januari', value: '0' },
  { text: 'Februari', value: '1' },
  { text: 'Maret', value: '2' },
  { text: 'April', value: '3' },
  { text: 'Mei', value: '4' },
  { text: 'Juni', value: '5' },
  { text: 'Juli', value: '6' },
  { text: 'Agustus', value: '7' },
  { text: 'September', value: '8' },
  { text: 'Oktober', value: '9' },
  { text: 'November', value: '10' },
  { text: 'Desember', value: '11' },
];

// Years restricted starting from 2020 through 2030
const YEAR_ITEMS: DropdownItem[] = Array.from({ length: 11 }, (_, i) => {
  const yr = (2020 + i).toString();
  return { text: yr, value: yr };
});

const WEEKDAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

export function DatePicker({
  value,
  onChange,
  placeholder = 'Pilih tanggal',
  hasError = false,
  id,
  className,
  'aria-label': ariaLabel,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = useMemo(() => {
    if (!value) return null;
    try {
      const d = parseISO(value);
      return isNaN(d.getTime()) ? null : d;
    } catch {
      return null;
    }
  }, [value]);

  const [viewDate, setViewDate] = useState<Date>(() => selectedDate || new Date());

  // Sync viewDate when value changes
  useEffect(() => {
    if (selectedDate) {
      setViewDate(selectedDate);
    }
  }, [selectedDate]);

  // Click outside and escape handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const formattedDisplay = useMemo(() => {
    if (!selectedDate) return '';
    try {
      return format(selectedDate, 'd MMM yyyy', { locale: idLocale });
    } catch {
      return value;
    }
  }, [selectedDate, value]);

  // Build calendar matrix
  const calendarRows = useMemo(() => {
    const monthStart = startOfMonth(viewDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows: Date[][] = [];
    let days: Date[] = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        days.push(day);
        day = addDays(day, 1);
      }
      rows.push(days);
      days = [];
    }

    return rows;
  }, [viewDate]);

  const handleSelectDate = (d: Date) => {
    const isoString = format(d, 'yyyy-MM-dd');
    onChange(isoString);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  const prevMonth = () => {
    setViewDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const nextMonth = () => {
    setViewDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {/* Trigger button */}
      <button
        type="button"
        id={id}
        aria-label={ariaLabel || placeholder}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex h-11 w-full items-center justify-between gap-2 rounded-md bg-white px-3 py-2 text-slate-800 border border-neutral-300 transition-colors duration-150 shadow-none hover:bg-neutral-50 hover:border-neutral-400',
          'focus:outline-none focus:border-neutral-400 focus:ring-0 focus:shadow-none focus-visible:outline-none focus-visible:border-neutral-400 focus-visible:ring-0 focus-visible:shadow-none',
          hasError && 'border-red-400 focus:border-red-400 focus-visible:border-red-400',
          isOpen && 'border-neutral-400'
        )}
      >
        <div className="flex items-center gap-2 truncate">
          <CalendarIcon size={15} className="shrink-0 text-slate-400" aria-hidden="true" />
          <span className={cn('text-sm truncate', !formattedDisplay && 'text-slate-400')}>
            {formattedDisplay || placeholder}
          </span>
        </div>
        {value && (
          <span
            role="button"
            tabIndex={0}
            onClick={handleClear}
            onKeyDown={(e) => e.key === 'Enter' && handleClear(e as any)}
            aria-label="Hapus tanggal"
            className="rounded p-0.5 text-slate-400 hover:text-slate-700 hover:bg-neutral-100 transition-colors"
          >
            <X size={13} />
          </span>
        )}
      </button>

      {/* Calendar Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.95, y: -4 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            exit={{ opacity: 0, scaleY: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{ originY: 'top' }}
            className="absolute left-0 top-[115%] z-50 w-80 rounded-lg bg-white p-3.5 border border-neutral-300 transition-all duration-200 shadow-sm"
          >
            {/* Header: Month & Year Controls with StaggeredDropDown */}
            <div className="flex items-center justify-between gap-1.5 mb-3">
              <button
                type="button"
                onClick={prevMonth}
                aria-label="Bulan sebelumnya"
                className="h-11 w-9 shrink-0 flex items-center justify-center rounded-md border border-neutral-300 text-slate-600 hover:bg-neutral-100 hover:text-slate-900 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                {/* Month selector using StaggeredDropDown */}
                <div className="flex-1 min-w-0">
                  <StaggeredDropDown
                    items={MONTH_ITEMS}
                    selectedValue={viewDate.getMonth().toString()}
                    onSelect={(val) => {
                      const d = new Date(viewDate);
                      d.setMonth(parseInt(val, 10));
                      setViewDate(d);
                    }}
                    placeholder="Bulan"
                    className="w-full text-xs"
                  />
                </div>

                {/* Year selector using StaggeredDropDown (limited 2020-2030) */}
                <div className="w-24 shrink-0">
                  <StaggeredDropDown
                    items={YEAR_ITEMS}
                    selectedValue={viewDate.getFullYear().toString()}
                    onSelect={(val) => {
                      const d = new Date(viewDate);
                      d.setFullYear(parseInt(val, 10));
                      setViewDate(d);
                    }}
                    placeholder="Tahun"
                    className="w-full text-xs"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={nextMonth}
                aria-label="Bulan berikutnya"
                className="h-11 w-9 shrink-0 flex items-center justify-center rounded-md border border-neutral-300 text-slate-600 hover:bg-neutral-100 hover:text-slate-900 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-slate-400 mb-1">
              {WEEKDAYS.map((wd) => (
                <div key={wd} className="py-1">
                  {wd}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="space-y-1">
              {calendarRows.map((week, wIndex) => (
                <div key={wIndex} className="grid grid-cols-7 gap-1">
                  {week.map((dayItem) => {
                    const isCurrentMonth = isSameMonth(dayItem, viewDate);
                    const isSelected = selectedDate ? isSameDay(dayItem, selectedDate) : false;
                    const isTodayDate = isToday(dayItem);

                    return (
                      <button
                        key={dayItem.toISOString()}
                        type="button"
                        onClick={() => handleSelectDate(dayItem)}
                        className={cn(
                          'relative h-8 w-full rounded-md text-xs font-medium transition-all flex items-center justify-center',
                          !isCurrentMonth && 'text-slate-300 hover:bg-neutral-50',
                          isCurrentMonth && !isSelected && 'text-slate-700 hover:bg-neutral-100 hover:text-slate-900',
                          isSelected && 'bg-brand-500 text-white font-bold hover:bg-brand-600',
                          isTodayDate && !isSelected && 'border border-brand-300 font-semibold text-brand-700'
                        )}
                      >
                        {format(dayItem, 'd')}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer quick action */}
            <div className="mt-2.5 pt-2 border-t border-neutral-200 flex justify-between items-center text-xs">
              <button
                type="button"
                onClick={() => handleSelectDate(new Date())}
                className="text-brand-600 hover:text-brand-800 font-semibold transition-colors"
              >
                Hari Ini
              </button>
              {value && (
                <button
                  type="button"
                  onClick={() => {
                    onChange('');
                    setIsOpen(false);
                  }}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DatePicker;
