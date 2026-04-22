import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { jobs as allJobs } from '../data/jobs';
import { JobCard } from '../components/ui/JobCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';

export default function SavedJobs() {
  const { savedJobIds, toggleSave } = useApp();
  const saved = allJobs.filter((j) => savedJobIds.includes(j.id));

  return (
    <>
      <Helmet>
        <title>Saved Jobs | Career Enterprises</title>
        <meta name="description" content="View your bookmarked job listings on Career Enterprises." />
      </Helmet>

      <div className="min-h-screen bg-off-white dark:bg-dark-surface pt-20">
        <div className="container mx-auto px-6 py-10">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-midnight dark:text-white font-outfit flex items-center gap-3">
                <Bookmark className="text-royal-gold" size={28} />
                Saved Jobs
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {saved.length} {saved.length === 1 ? 'job' : 'jobs'} saved
              </p>
            </div>
            {saved.length > 0 && (
              <button
                onClick={() => savedJobIds.forEach((id) => toggleSave(id))}
                className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-600 transition-colors px-4 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 size={14} /> Clear All
              </button>
            )}
          </div>

          {saved.length === 0 ? (
            <EmptyState
              title="No saved jobs yet"
              message="Browse jobs and click the bookmark icon to save them for later."
              action={<Link to="/jobs"><Button>Browse Jobs</Button></Link>}
            />
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 animate-fade-in">
              {saved.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
