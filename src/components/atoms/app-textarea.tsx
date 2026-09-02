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
