import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { JobListing } from '../components/jobs/JobListing';

export default function CareersPage() {
  return (
    <>
      <Helmet>
        <title>Careers | Career Enterprises</title>
        <meta name="description" content="Explore exciting career opportunities at Career Enterprises and join our elite team." />
      </Helmet>

      <div className="min-h-screen bg-off-white dark:bg-dark-surface pt-36 lg:pt-20">

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

        {/* Current Requirements Section (Newly Integrated Job Listing) */}
        <section className="py-20 px-6 container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-midnight dark:text-white font-outfit mb-4">Current Requirements</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Explore our active job openings below. Use the filters to find the perfect role matching your expertise.
            </p>
          </div>

          <JobListing />
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
