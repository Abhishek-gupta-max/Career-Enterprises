import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Briefcase, ChevronRight, Search } from 'lucide-react';
import jobsData from '../data/jobs.json';

const Jobs = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(jobsData.map(job => job.category))];

  const filteredJobs = filter === 'All' 
    ? jobsData 
    : jobsData.filter(job => job.category === filter);

  return (
    <section id="jobs" className="section bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-secondary-gold font-bold uppercase tracking-widest text-sm">Opportunities</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary-navy">Current Job Openings</h2>
            <div className="w-20 h-1 bg-secondary-gold mt-4"></div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === cat 
                    ? 'bg-primary-navy text-white' 
                    : 'bg-bg-light text-text-muted hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                   <div>
                     <span className="text-xs font-bold text-secondary-gold uppercase tracking-tighter bg-secondary-gold/10 px-2 py-1 rounded">
                       {job.category}
                     </span>
                     <h3 className="text-xl font-bold text-primary-navy mt-2 group-hover:text-primary-light transition-colors">
                       {job.title}
                     </h3>
                   </div>
                   <div className="bg-bg-light p-3 rounded-xl text-primary-navy">
                      <Briefcase size={20} />
                   </div>
                </div>
                
                <div className="flex items-center gap-4 mb-6 text-sm text-text-muted">
                   <div className="flex items-center gap-1">
                      <MapPin size={16} className="text-secondary-gold" /> {job.location}
                   </div>
                   <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                   <div>Full-Time</div>
                </div>

                <p className="text-text-muted text-sm line-clamp-2 mb-6">
                  {job.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                   <a href="#contact" className="text-primary-navy font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Apply Now <ChevronRight size={16} />
                   </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-20 text-text-muted italic">
            No active openings in this category. Please check back later.
          </div>
        )}

        <div className="mt-16 bg-primary-navy p-10 rounded-3xl relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-white text-center md:text-left">
                 <h3 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h3>
                 <p className="text-blue-200">Upload your CV and we'll notify you when a matching role opens up.</p>
              </div>
              <a href="#contact" className="bg-white text-primary-navy px-8 py-4 rounded-xl font-bold hover:bg-secondary-gold hover:text-white transition-all shadow-lg">
                Submit Your CV
              </a>
           </div>
           {/* Abstract pattern */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
