import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white border border-brand-600 hover:border-brand-700 shadow-sm focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
  secondary:
    'bg-white hover:bg-neutral-50 active:bg-neutral-100 text-slate-800 border border-neutral-300 hover:border-neutral-400 shadow-none focus:outline-none focus:border-neutral-400 focus:ring-0 focus:shadow-none focus-visible:outline-none focus-visible:border-neutral-400 focus-visible:ring-0 focus-visible:shadow-none',
  ghost:
    'bg-transparent hover:bg-surface-panel text-slate-600 hover:text-slate-800 border border-transparent hover:border-surface-border',
  danger:
    'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs h-9 gap-1.5',
  md: 'px-4 py-2 text-sm h-11 gap-2',
  lg: 'px-5 py-2.5 text-base h-12 gap-2',
};

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(function AppButton(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    children,
    className = '',
    disabled,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      ref={ref}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center font-medium rounded-md',
        'transition-colors duration-150 ease-in-out',
        'focus:outline-none focus-visible:outline-none',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : null}
      {children}
    </button>
  );
});
