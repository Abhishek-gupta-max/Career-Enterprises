import { SearchX } from 'lucide-react';

export function EmptyState({ title = 'No results found', message = 'Try adjusting your search or filters.', action }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 bg-slate-100 dark:bg-dark-card rounded-3xl flex items-center justify-center mb-6">
        <SearchX size={36} className="text-slate-400" />
      </div>
      <h3 className="text-xl font-black text-midnight dark:text-white mb-2 font-outfit">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mb-6">{message}</p>
      {action && action}
    </div>
  );
}
