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
        'transition-colors duration-150 shadow-none',
        'focus:outline-none focus:border-neutral-400 focus:ring-0 focus:shadow-none',
        'focus-visible:outline-none focus-visible:border-neutral-400 focus-visible:ring-0 focus-visible:shadow-none',
        hasError
          ? 'border-red-400 focus:border-red-400 focus-visible:border-red-400'
          : 'border-surface-border hover:border-surface-border-strong',
        className,
      ].join(' ')}
    />
  );
}
