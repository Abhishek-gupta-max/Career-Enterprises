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
    <section id="jobs" className="section bg-off-white relative py-16 md:py-32">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <div>
            <span className="text-royal-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4 block underline decoration-royal-gold/30 underline-offset-8">Global Search</span>
            <h2 className="text-4xl md:text-5xl font-black text-midnight font-outfit">Current <span className="text-royal-gold">Openings</span></h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-2xl text-[10px] font-black tracking-widest uppercase transition-all duration-500 shadow-sm ${
                  filter === cat 
                    ? 'bg-midnight text-white shadow-xl shadow-midnight/20' 
                    : 'bg-white text-midnight/40 hover:bg-white hover:text-midnight border border-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-royal-gold/10 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                   <div>
                     <span className="text-[9px] font-black text-royal-gold uppercase tracking-[0.2em] bg-royal-gold/10 px-4 py-2 rounded-full">
                       {job.category}
                     </span>
                     <h3 className="text-2xl font-black text-midnight mt-6 font-outfit tracking-tight group-hover:text-royal-gold transition-colors duration-500">
                       {job.title}
                     </h3>
                   </div>
                   <div className="bg-slate-50 p-5 rounded-3xl text-midnight group-hover:bg-midnight group-hover:text-royal-gold transition-all duration-500">
                      <Briefcase size={24} />
                   </div>
                </div>
                
                <div className="flex items-center gap-6 mb-10 text-[11px] font-black text-slate-400 uppercase tracking-widest relative z-10">
                   <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-royal-gold" /> {job.location}
                   </div>
                   <div className="w-1.5 h-1.5 bg-royal-gold/20 rounded-full"></div>
                   <div>Full-Time Opportunity</div>
                </div>

                <p className="text-slate-500 text-sm font-inter leading-relaxed mb-10 line-clamp-2 relative z-10">
                  {job.description}
                </p>

                <div className="flex items-center justify-between pt-8 border-t border-slate-50 relative z-10">
                   <a href="#contact" className="text-midnight font-black text-xs uppercase tracking-widest flex items-center gap-3 group/link hover:text-royal-gold transition-all">
                      SUBMIT DOSSIER <ChevronRight size={18} className="text-royal-gold group-hover/link:translate-x-1 transition-transform" />
                   </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-32 text-slate-400 font-inter italic text-lg">
            No active positions within this sector. Please signal your interest below.
          </div>
        )}

        <div className="mt-24 bg-midnight p-1 md:p-1.5 rounded-[50px] shadow-2xl relative overflow-hidden group">
           <div className="bg-midnight h-full w-full rounded-[48px] p-12 md:p-20 relative z-10 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-royal-gold/10 to-transparent opacity-50"></div>
              
              <div className="text-white text-center md:text-left relative z-10">
                 <h3 className="text-3xl md:text-4xl font-black mb-4 font-outfit">Bespoke Talent Search?</h3>
                 <p className="text-slate-400 font-inter text-sm max-w-md">Our executive consultants can source specific roles tailored to your unique trajectory. Dispatch your profile today.</p>
              </div>
              <a href="#contact" className="btn-gold !py-5 !px-12 relative z-10 shadow-2xl">
                START YOUR JOURNEY
              </a>
           </div>
           {/* Decorative flare */}
           <div className="absolute -top-20 -right-20 w-64 h-64 bg-royal-gold/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
