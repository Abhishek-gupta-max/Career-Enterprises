import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useJobs } from '../hooks/useJobs';
import { SkeletonGrid } from '../components/ui/SkeletonCard';
import { Button } from '../components/ui/Button';

export default function CareersPage() {
  // Fetch only open/published jobs
  const { data, isLoading, isError } = useJobs({ page: 1, limit: 100 });

  return (
    <>
      <Helmet>
        <title>Careers | Career Enterprises</title>
        <meta name="description" content="Explore exciting career opportunities at Career Enterprises and join our elite team." />
      </Helmet>

      <div className="min-h-screen bg-off-white dark:bg-dark-surface pt-20">

        {/* Welcoming Introduction (Hero Section) */}
        <section className="bg-midnight dark:bg-dark-card py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-royal-gold/10 to-transparent pointer-events-none" />
          <div className="container mx-auto text-center relative z-10">
            <span className="section-label inline-block mb-4 text-royal-gold uppercase tracking-widest font-black text-xs">Join Our Team</span>
            <h1 className="text-4xl md:text-6xl font-black text-white font-outfit mb-6">
              Build Your Future with <span className="text-royal-gold">Career Enterprises</span>
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
              We are an enterprise company dedicated to delivering elite overseas solutions. We believe in empowering our people, fostering innovation, and building careers that span the globe. Join us in shaping the future of global talent acquisition.
            </p>
          </div>
        </section>

        {/* Current Requirements Section */}
        <section className="py-20 px-6 container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-midnight dark:text-white font-outfit mb-4">Current Requirements</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Explore our active job openings below. We are always looking for passionate individuals to join our growing enterprise.
            </p>
          </div>

          {isLoading ? (
            <SkeletonGrid count={3} />
          ) : isError ? (
            <div className="text-center py-12 bg-white dark:bg-dark-card rounded-3xl border border-slate-100 dark:border-dark-border">
              <p className="text-red-500 font-bold">Failed to load current requirements. Please try again later.</p>
            </div>
          ) : data?.jobs && data.jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.jobs.map((job) => (
                <div key={job.id} className="bg-white dark:bg-dark-card p-8 rounded-3xl border border-slate-100 dark:border-dark-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                  <div className="mb-4">
                    <h3 className="text-xl font-black text-midnight dark:text-white font-outfit mb-2 group-hover:text-royal-gold transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5"><MapPin size={14} className="text-royal-gold" /> {job.location}, {job.country}</span>
                      {job.experience !== undefined && (
                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-royal-gold" /> {job.experience} Yrs Exp.</span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {job.description}
                  </p>

                  {job.requirements && job.requirements.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Key Skills Required</h4>
                      <ul className="space-y-2">
                        {job.requirements.slice(0, 3).map((req, i) => (
                          <li key={i} className="text-sm text-midnight dark:text-white flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-royal-gold shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{req}</span>
                          </li>
                        ))}
                        {job.requirements.length > 3 && (
                          <li className="text-xs font-bold text-slate-400 pl-6">+ {job.requirements.length - 3} more skills</li>
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="mt-auto pt-6 border-t border-slate-100 dark:border-dark-border">
                    <Link to={`/jobs/${job.id}/apply`} className="w-full">
                      <Button className="w-full flex items-center justify-center gap-2 group-hover:bg-midnight dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-midnight transition-colors">
                        Apply Now <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Fallback Message */
            <div className="text-center py-20 bg-white dark:bg-dark-card rounded-[40px] border border-dashed border-slate-200 dark:border-dark-border">
              <Briefcase className="mx-auto text-slate-300 dark:text-slate-700 mb-4" size={48} />
              <h3 className="text-2xl font-black text-midnight dark:text-white mb-2">No Current Openings</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                We currently do not have any open positions that match your criteria, but we are always on the lookout for exceptional talent.
              </p>
            </div>
          )}
        </section>

        {/* Closing Section (Future Opportunities) */}
        <section className="bg-slate-50 dark:bg-dark-card/50 py-20 px-6 border-t border-slate-100 dark:border-dark-border">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-3xl font-black text-midnight dark:text-white font-outfit mb-4">Don't see a perfect fit?</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
              Submit your resume to our talent pool. Our recruitment team reviews all submissions and will reach out when an opportunity aligning with your skills becomes available.
            </p>
            <Link to="/#contact" className="btn-gold inline-flex items-center gap-2 px-8 py-4 text-sm font-black tracking-widest uppercase">
              Submit Resume for Future Roles
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
