import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

interface AppSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export function AppSelect({ hasError = false, className = '', children, ...props }: AppSelectProps) {
  return (
    <div className="relative">
      <select
        {...props}
        className={[
          'w-full h-11 pl-3 pr-9 rounded-md appearance-none',
          'bg-white border text-slate-800 text-golden-base',
          'transition-colors duration-150 cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-1 focus-visible:ring-offset-white',
          hasError
            ? 'border-red-400 focus-visible:ring-red-400/40'
            : 'border-surface-border hover:border-surface-border-strong focus-visible:border-brand-400',
          className,
        ].join(' ')}
      >
        {children}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
