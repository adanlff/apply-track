import type { InputHTMLAttributes } from 'react';

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export function AppInput({ hasError = false, className = '', ...props }: AppInputProps) {
  return (
    <input
      {...props}
      className={[
        'w-full h-11 px-3 rounded-md',
        'bg-white border text-slate-800 text-golden-base',
        'placeholder:text-slate-400',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-1 focus-visible:ring-offset-white',
        hasError
          ? 'border-red-400 focus-visible:ring-red-400/40'
          : 'border-surface-border hover:border-surface-border-strong focus-visible:border-brand-400',
        className,
      ].join(' ')}
    />
  );
}
