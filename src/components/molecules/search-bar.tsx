import { useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Cari perusahaan atau posisi...' }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative flex-1 min-w-0">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        id="search-input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Cari lamaran"
        className="w-full h-11 pl-9 pr-9 rounded-md bg-white border border-neutral-300
          text-slate-800 text-golden-base placeholder:text-slate-400
          hover:border-neutral-400 transition-colors duration-150 shadow-none
          focus:outline-none focus:border-neutral-400 focus:ring-0 focus:shadow-none
          focus-visible:outline-none focus-visible:border-neutral-400 focus-visible:ring-0 focus-visible:shadow-none"
      />
      {value && (
        <button
          onClick={handleClear}
          aria-label="Hapus pencarian"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700
            transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 rounded"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
