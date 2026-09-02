import type { TextareaHTMLAttributes } from 'react';

interface AppTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export function AppTextarea({ hasError = false, className = '', ...props }: AppTextareaProps) {
  return (
    <textarea
      {...props}
      className={[
        'w-full px-3 py-2.5 rounded-md resize-y min-h-[100px]',
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
