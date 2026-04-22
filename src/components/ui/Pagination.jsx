import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = pages.filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1);

  const btn = 'w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-200';

  return (
    <div className="flex items-center justify-center gap-1 mt-10">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={cn(btn, 'text-slate-500 hover:bg-slate-100 dark:hover:bg-dark-card disabled:opacity-30 disabled:cursor-not-allowed')}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {visible.map((p, idx) => {
        const prev = visible[idx - 1];
        return (
          <span key={p} className="flex items-center gap-1">
            {prev && p - prev > 1 && (
              <span className="text-slate-400 text-sm px-1">…</span>
            )}
            <button
              onClick={() => onPageChange(p)}
              className={cn(
                btn,
                p === page
                  ? 'bg-midnight text-white dark:bg-royal-gold dark:text-midnight'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-card'
              )}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          </span>
        );
      })}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={cn(btn, 'text-slate-500 hover:bg-slate-100 dark:hover:bg-dark-card disabled:opacity-30 disabled:cursor-not-allowed')}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
