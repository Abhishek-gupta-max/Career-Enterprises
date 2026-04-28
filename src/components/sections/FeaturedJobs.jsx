import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Bookmark, BookmarkCheck, Building2, MapPin, Clock, Zap } from 'lucide-react';
import { useFeaturedJobs } from '../../hooks/useJobs';
import { useApp } from '../../context/AppContext';
import { Badge } from '../ui/Badge';
import { SkeletonCard } from '../ui/SkeletonCard';
import { formatSalaryShort } from '../../utils/formatSalary';
import { cn } from '../../utils/cn';

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (diff === 0) return 'Today';
  if (diff < 7) return `${diff}d ago`;
  return `${Math.floor(diff / 7)}w ago`;
}

export default function FeaturedJobs() {
  const { data: jobs, isLoading } = useFeaturedJobs();
  const { isSaved, toggleSave } = useApp();

  return (
    <section id="jobs" className="py-10 px-6 bg-off-white dark:bg-dark-surface">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="section-label">Global Search</span>
            <h2 className="section-title">Featured <span className="text-royal-gold">Openings</span></h2>
          </div>
          <Link to="/jobs" className="flex items-center gap-2 text-sm font-bold text-midnight dark:text-white hover:text-royal-gold dark:hover:text-royal-gold transition-colors group">
            View All {jobs?.length > 0 && `(22+)`} Jobs
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : (
              <AnimatePresence>
                {jobs?.map((job, i) => {
                  const saved = isSaved(job.id);
                  return (
                    <motion.article
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="job-card group relative"
                    >
                      {job.urgent && (
                        <span className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-black text-red-600 dark:text-red-400 uppercase">
                          <Zap size={11} className="fill-current" /> Urgent
                        </span>
                      )}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-midnight to-slate-700 flex items-center justify-center flex-shrink-0">
                          <Building2 size={18} className="text-royal-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">{job.company}</p>
                          <h3 className="text-base font-black text-midnight dark:text-white font-outfit group-hover:text-royal-gold transition-colors">{job.title}</h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                        <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}, {job.country}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="flex items-center gap-1"><Clock size={11} /> {timeAgo(job.postedAt)}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <Badge variant="gold">{job.category}</Badge>
                        <Badge variant="green">{job.type}</Badge>
                        {job.salary && <Badge variant="slate">{formatSalaryShort(job.salary)}</Badge>}
                      </div>

                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">{job.description}</p>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-dark-border">
                        <Link to={`/jobs/${job.id}`}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-midnight dark:text-white hover:text-royal-gold transition-colors">
                          View Details <ArrowRight size={14} />
                        </Link>
                        <button onClick={() => toggleSave(job.id)} aria-label={saved ? 'Unsave' : 'Save'}
                          className={cn('p-2 rounded-lg transition-all', saved ? 'text-royal-gold bg-royal-gold/10' : 'text-slate-400 hover:text-royal-gold hover:bg-royal-gold/10')}>
                          {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                        </button>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            )
          }
        </div>

        {/* CTA */}
        <div className="mt-20 bg-midnight dark:bg-dark-card rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl shadow-midnight/20">
          <div className="absolute inset-0 bg-gradient-to-r from-royal-gold/10 via-transparent to-transparent opacity-50" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-royal-gold/10 rounded-full blur-[100px]" />
          
          <div className="text-white text-center md:text-left relative z-10">
            <span className="text-royal-gold font-black uppercase tracking-[0.3em] text-[10px] mb-3 block">Personalized Search</span>
            <h3 className="text-3xl md:text-4xl font-black font-outfit mb-4 leading-tight">Looking for a <span className="text-royal-gold underline decoration-royal-gold/20 underline-offset-8">specific role?</span></h3>
            <p className="text-slate-400 text-base max-w-md font-inter leading-relaxed">
              Our consultants can source exclusive positions tailored to your unique profile and aspirations.
            </p>
          </div>
          <Link to="/jobs" className="btn-gold !py-5 !px-10 relative z-10 whitespace-nowrap flex items-center gap-3 group shadow-xl shadow-royal-gold/20">
            Browse All Jobs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
