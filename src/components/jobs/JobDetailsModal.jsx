import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, DollarSign, Calendar, CheckCircle2, Briefcase, Share2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export const JobDetailsModal = ({ isOpen, onClose, job }) => {
  if (!job) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-midnight/80 backdrop-blur-md z-[80]"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-dark-card w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Header */}
              <div className="relative p-6 sm:p-8 border-b border-slate-100 dark:border-dark-border bg-slate-50/50 dark:bg-dark-surface/50">
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 bg-white dark:bg-dark-card rounded-2xl text-slate-400 hover:text-midnight dark:hover:text-white shadow-sm hover:shadow-md transition-all z-10"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col md:flex-row md:items-center gap-6 pr-12">
                  <div className="w-20 h-20 bg-white dark:bg-dark-card rounded-3xl border border-slate-100 dark:border-dark-border flex items-center justify-center shadow-sm shrink-0">
                    <Briefcase className="text-royal-gold" size={36} />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-midnight dark:text-white font-outfit mb-2">{job.title}</h2>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-royal-gold font-black uppercase tracking-widest text-xs">{job.company}</span>
                      <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-bold flex items-center gap-1">
                        <MapPin size={14} className="text-royal-gold" /> {job.location}, {job.country}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-grow overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column: Details */}
                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <h4 className="text-lg font-black text-midnight dark:text-white font-outfit mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-royal-gold rounded-full" /> Job Description
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm whitespace-pre-line">
                        {job.description}
                      </p>
                    </div>

                    {job.requirements && job.requirements.length > 0 && (
                      <div>
                        <h4 className="text-lg font-black text-midnight dark:text-white font-outfit mb-4 flex items-center gap-2">
                          <span className="w-1.5 h-6 bg-royal-gold rounded-full" /> Requirements
                        </h4>
                        <ul className="space-y-3">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                              <CheckCircle2 size={18} className="text-royal-gold shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {job.benefits && job.benefits.length > 0 && (
                      <div>
                        <h4 className="text-lg font-black text-midnight dark:text-white font-outfit mb-4 flex items-center gap-2">
                          <span className="w-1.5 h-6 bg-royal-gold rounded-full" /> Benefits
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {job.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-100 dark:border-dark-border text-xs font-bold text-slate-600 dark:text-slate-400">
                              <div className="w-2 h-2 bg-royal-gold rounded-full" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Quick Stats & Actions */}
                  <div className="space-y-6">
                    <div className="bg-slate-50 dark:bg-dark-surface p-6 rounded-3xl border border-slate-100 dark:border-dark-border">
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Job Overview</h4>
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white dark:bg-dark-card rounded-xl flex items-center justify-center text-royal-gold border border-slate-100 dark:border-dark-border shadow-sm">
                            <Clock size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Experience</p>
                            <p className="text-sm font-bold text-midnight dark:text-white">{job.experience || '0-2'} Years</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white dark:bg-dark-card rounded-xl flex items-center justify-center text-royal-gold border border-slate-100 dark:border-dark-border shadow-sm">
                            <DollarSign size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Salary Range</p>
                            <p className="text-sm font-bold text-midnight dark:text-white">
                              {job.salary ? `${job.salary.min} - ${job.salary.max} ${job.salary.currency}` : 'Competitive'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white dark:bg-dark-card rounded-xl flex items-center justify-center text-royal-gold border border-slate-100 dark:border-dark-border shadow-sm">
                            <Briefcase size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Job Type</p>
                            <p className="text-sm font-bold text-midnight dark:text-white">{job.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white dark:bg-dark-card rounded-xl flex items-center justify-center text-royal-gold border border-slate-100 dark:border-dark-border shadow-sm">
                            <Calendar size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Posted On</p>
                            <p className="text-sm font-bold text-midnight dark:text-white">{job.postedAt}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Link to={`/jobs/${job.id}/apply`} className="w-full">
                        <Button className="w-full flex items-center justify-center gap-2 !py-4 shadow-xl shadow-royal-gold/20">
                          Apply For This Position <Send size={18} />
                        </Button>
                      </Link>
                      <button className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-slate-200 dark:border-dark-border text-sm font-bold text-slate-500 hover:text-midnight dark:hover:text-white hover:bg-slate-50 dark:hover:bg-dark-surface transition-all">
                        <Share2 size={18} /> Share Job
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
