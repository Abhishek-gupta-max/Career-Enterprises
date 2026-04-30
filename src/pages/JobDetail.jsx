import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Building2, Clock, Bookmark, BookmarkCheck, ArrowLeft, CheckCircle2, Briefcase, DollarSign, AlertCircle } from 'lucide-react';
import { useJob } from '../hooks/useJobs';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatSalary } from '../utils/formatSalary';
import { cn } from '../utils/cn';

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff} days ago`;
  return `${Math.floor(diff / 7)} weeks ago`;
}

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSaved, toggleSave } = useApp();
  const { data: job, isLoading, isError } = useJob(id);
  const saved = job ? isSaved(job.id) : false;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-off-white dark:bg-dark-surface pt-36 lg:pt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="animate-skeleton space-y-6 max-w-4xl mx-auto">
            <div className="h-4 bg-slate-200 dark:bg-dark-border rounded w-40" />
            <div className="h-10 bg-slate-200 dark:bg-dark-border rounded-xl w-2/3" />
            <div className="h-6 bg-slate-100 dark:bg-dark-border/60 rounded w-1/3" />
            <div className="grid md:grid-cols-3 gap-4">
              {[1,2,3].map(i => <div key={i} className="h-24 bg-slate-100 dark:bg-dark-border/60 rounded-2xl" />)}
            </div>
            <div className="space-y-3">
              {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-slate-100 dark:bg-dark-border/60 rounded" />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="min-h-screen bg-off-white dark:bg-dark-surface pt-36 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-midnight dark:text-white mb-2">Job Not Found</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">This listing may have been filled or removed.</p>
          <Button onClick={() => navigate('/jobs')}>Browse All Jobs</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{job.title} at {job.company} | Career Enterprises</title>
        <meta name="description" content={`${job.title} opportunity at ${job.company} in ${job.location}, ${job.country}. ${job.description.slice(0, 120)}…`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": job.title,
          "hiringOrganization": { "@type": "Organization", "name": job.company },
          "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressLocality": job.location, "addressCountry": job.country } },
          "employmentType": job.type.toUpperCase().replace('-', '_'),
          "datePosted": job.postedAt,
          "description": job.description,
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-off-white dark:bg-dark-surface pt-36 lg:pt-20">
        <div className="container mx-auto px-6 py-10 max-w-5xl">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8">
            <Link to="/" className="hover:text-royal-gold transition-colors">Home</Link>
            <span>/</span>
            <Link to="/jobs" className="hover:text-royal-gold transition-colors">Jobs</Link>
            <span>/</span>
            <span className="text-midnight dark:text-white font-semibold truncate max-w-xs">{job.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">

              {/* Header card */}
              <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border border-slate-100 dark:border-dark-border shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-midnight to-slate-700 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Building2 size={28} className="text-royal-gold" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">{job.company}</p>
                    <h1 className="text-2xl md:text-3xl font-black text-midnight dark:text-white font-outfit leading-tight">{job.title}</h1>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="gold">{job.category}</Badge>
                  <Badge variant={job.type === 'Full-Time' ? 'green' : job.type === 'Contract' ? 'gold' : 'blue'}>{job.type}</Badge>
                  {job.urgent && <Badge variant="red">🔥 Urgent Hire</Badge>}
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: MapPin, label: 'Location', value: `${job.location}, ${job.country}` },
                    { icon: DollarSign, label: 'Salary', value: formatSalary(job.salary) },
                    { icon: Clock, label: 'Posted', value: timeAgo(job.postedAt) },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-slate-50 dark:bg-dark-surface rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon size={14} className="text-royal-gold" />
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</p>
                      </div>
                      <p className="text-sm font-bold text-midnight dark:text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border border-slate-100 dark:border-dark-border shadow-sm">
                <h2 className="text-lg font-black text-midnight dark:text-white font-outfit mb-4">Job Description</h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{job.description}</p>
              </div>

              {/* Requirements */}
              {job.requirements?.length > 0 && (
                <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border border-slate-100 dark:border-dark-border shadow-sm">
                  <h2 className="text-lg font-black text-midnight dark:text-white font-outfit mb-4">Requirements</h2>
                  <ul className="space-y-3">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 size={16} className="text-royal-gold flex-shrink-0 mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {job.benefits?.length > 0 && (
                <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border border-slate-100 dark:border-dark-border shadow-sm">
                  <h2 className="text-lg font-black text-midnight dark:text-white font-outfit mb-4">Benefits</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.benefits.map((b, i) => (
                      <span key={i} className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold px-3 py-1.5 rounded-full">
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-slate-100 dark:border-dark-border shadow-sm sticky top-24">
                <Link to={`/jobs/${job.id}/apply`} className="btn-gold w-full text-center block mb-3">
                  Apply Now
                </Link>
                <button
                  onClick={() => toggleSave(job.id)}
                  className={cn(
                    'w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl border-2 text-sm font-bold transition-all duration-200',
                    saved
                      ? 'border-royal-gold text-royal-gold bg-royal-gold/5'
                      : 'border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-400 hover:border-royal-gold hover:text-royal-gold'
                  )}
                >
                  {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  {saved ? 'Saved' : 'Save Job'}
                </button>

                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-dark-border space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase size={15} className="text-royal-gold flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-400">{job.type}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin size={15} className="text-royal-gold flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-400">{job.location}, {job.country}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <DollarSign size={15} className="text-royal-gold flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-400">{formatSalary(job.salary)}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-dark-border text-center">
                  <p className="text-xs text-slate-400 mb-3">Have questions? Contact us directly</p>
                  <a href="https://wa.me/917657950996" target="_blank" rel="noreferrer"
                    className="text-xs font-bold text-green-600 hover:text-green-700 transition-colors">
                    WhatsApp Us →
                  </a>
                </div>
              </div>

              <button onClick={() => navigate(-1)}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-midnight dark:hover:text-white transition-colors">
                <ArrowLeft size={16} /> Back to Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
