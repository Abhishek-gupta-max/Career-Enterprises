import { cn } from '../../utils/cn';

const variants = {
  gold: 'bg-royal-gold text-midnight hover:bg-midnight hover:text-white shadow-lg shadow-royal-gold/20 font-black uppercase tracking-widest',
  primary: 'bg-midnight text-white hover:bg-slate-800 dark:bg-white dark:text-midnight dark:hover:bg-slate-200 font-bold',
  outline: 'border-2 border-slate-200 text-midnight hover:border-royal-gold hover:text-royal-gold dark:border-dark-border dark:text-white dark:hover:border-royal-gold dark:hover:text-royal-gold font-bold',
  ghost: 'text-midnight hover:bg-slate-100 dark:text-white dark:hover:bg-dark-card font-medium',
  danger: 'bg-red-500 text-white hover:bg-red-600 font-bold',
};

const sizes = {
  sm: 'px-4 py-2 text-xs rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-sm rounded-2xl',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </button>
  );
}
