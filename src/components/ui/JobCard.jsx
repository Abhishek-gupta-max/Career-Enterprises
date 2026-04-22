import { Link } from 'react-router-dom';
import { MapPin, Building2, Bookmark, BookmarkCheck, Clock, ArrowRight, Zap } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './Button';
import { useApp } from '../../context/AppContext';
import { formatSalaryShort } from '../../utils/formatSalary';
import { cn } from '../../utils/cn';

const categoryColors = {
  Construction: 'slate',
  Healthcare: 'green',
  Hospitality: 'blue',
  Transport: 'slate',
  'IT & Technology': 'blue',
  Management: 'gold',
  Security: 'slate',
  Finance: 'gold',
  Education: 'green',
  'Sales & Marketing': 'blue',
};

const typeColors = { 'Full-Time': 'green', 'Part-Time': 'blue', Contract: 'gold' };

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff}d ago`;
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`;
  return `${Math.floor(diff / 30)}mo ago`;
}

export function JobCard({ job }) {
  const { isSaved, toggleSave } = useApp();
  const saved = isSaved(job.id);

  return (
    <article className={cn(
      'job-card flex flex-col group relative',
      job.featured && 'ring-1 ring-royal-gold/30'
    )}>
      {job.urgent && (
        <span className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-wider">
          <Zap size={11} className="fill-current" /> Urgent
        </span>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Company avatar */}
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-midnight to-slate-700 dark:from-dark-card dark:to-slate-800 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Building2 size={20} className="text-royal-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">{job.company}</p>
          <h3 className="text-base font-black text-midnight dark:text-white font-outfit leading-tight group-hover:text-royal-gold transition-colors duration-200 line-clamp-2">
            {job.title}
          </h3>
        </div>
      </div>

      {/* Location + date */}
      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {job.location}, {job.country}
        </span>
        <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
        <span className="flex items-center gap-1">
          <Clock size={12} /> {timeAgo(job.postedAt)}
        </span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <Badge variant={categoryColors[job.category] || 'slate'}>{job.category}</Badge>
        <Badge variant={typeColors[job.type] || 'slate'}>{job.type}</Badge>
        {job.salary && (
          <Badge variant="gold">{formatSalaryShort(job.salary)}</Badge>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4 flex-1">
        {job.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-dark-border mt-auto">
        <Link
          to={`/jobs/${job.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-midnight dark:text-white hover:text-royal-gold dark:hover:text-royal-gold transition-colors"
        >
          View Details <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
        <button
          onClick={() => toggleSave(job.id)}
          aria-label={saved ? 'Remove from saved' : 'Save job'}
          className={cn(
            'p-2 rounded-lg transition-all duration-200',
            saved
              ? 'text-royal-gold bg-royal-gold/10'
              : 'text-slate-400 hover:text-royal-gold hover:bg-royal-gold/10 dark:hover:text-royal-gold'
          )}
        >
          {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>
    </article>
  );
}
