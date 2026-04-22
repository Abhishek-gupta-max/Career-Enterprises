import { cn } from '../../utils/cn';

const variants = {
  gold: 'bg-royal-gold/15 text-yellow-700 dark:bg-royal-gold/20 dark:text-royal-gold',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  slate: 'bg-slate-100 text-slate-600 dark:bg-dark-card dark:text-slate-400',
  midnight: 'bg-midnight text-white dark:bg-white dark:text-midnight',
};

export function Badge({ children, variant = 'slate', className = '' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
