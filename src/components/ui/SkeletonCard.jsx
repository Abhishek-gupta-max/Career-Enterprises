export function SkeletonCard() {
  return (
    <div className="job-card animate-skeleton">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="h-4 bg-slate-200 dark:bg-dark-border rounded-full w-20 mb-3" />
          <div className="h-6 bg-slate-200 dark:bg-dark-border rounded-lg w-3/4 mb-2" />
          <div className="h-4 bg-slate-100 dark:bg-dark-border/60 rounded-lg w-1/2" />
        </div>
        <div className="w-10 h-10 bg-slate-200 dark:bg-dark-border rounded-xl ml-4 flex-shrink-0" />
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-slate-100 dark:bg-dark-border/60 rounded-full w-20" />
        <div className="h-6 bg-slate-100 dark:bg-dark-border/60 rounded-full w-16" />
        <div className="h-6 bg-slate-100 dark:bg-dark-border/60 rounded-full w-24" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-slate-100 dark:bg-dark-border/60 rounded w-full" />
        <div className="h-3 bg-slate-100 dark:bg-dark-border/60 rounded w-5/6" />
      </div>
      <div className="pt-4 border-t border-slate-100 dark:border-dark-border flex justify-between items-center">
        <div className="h-8 bg-slate-200 dark:bg-dark-border rounded-xl w-24" />
        <div className="h-8 bg-slate-100 dark:bg-dark-border/60 rounded-xl w-20" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
