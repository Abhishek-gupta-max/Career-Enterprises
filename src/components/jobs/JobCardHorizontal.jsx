import React from 'react';
import { MapPin, Clock, Calendar, Briefcase, ChevronRight, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export const JobCardHorizontal = ({ job, onClick }) => {
  const { 
    title, 
    company, 
    location, 
    country, 
    type, 
    salary, 
    experience, 
    postedAt, 
    description,
    urgent 
  } = job;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-dark-card rounded-2xl border border-slate-100 dark:border-dark-border p-5 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
      onClick={onClick}
    >
      {urgent && (
        <div className="absolute top-0 right-0">
          <div className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl shadow-sm animate-pulse">
            Urgent
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Company Logo / Placeholder */}
        <div className="hidden sm:flex shrink-0 w-16 h-16 bg-slate-50 dark:bg-dark-surface rounded-2xl items-center justify-center border border-slate-100 dark:border-dark-border group-hover:border-royal-gold transition-colors duration-300">
          <Briefcase className="text-slate-300 dark:text-slate-600 group-hover:text-royal-gold transition-colors" size={32} />
        </div>

        {/* Content */}
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-xl font-black text-midnight dark:text-white font-outfit leading-tight group-hover:text-royal-gold transition-colors">
                {title}
              </h3>
              <p className="text-sm font-bold text-royal-gold/80 uppercase tracking-widest mt-1">
                {company}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-slate-50 dark:bg-dark-surface text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-100 dark:border-dark-border">
                {type}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <div className="w-8 h-8 rounded-lg bg-royal-gold/5 flex items-center justify-center shrink-0">
                <MapPin size={14} className="text-royal-gold" />
              </div>
              <span className="text-xs font-bold truncate">{location}, {country}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <div className="w-8 h-8 rounded-lg bg-royal-gold/5 flex items-center justify-center shrink-0">
                <Clock size={14} className="text-royal-gold" />
              </div>
              <span className="text-xs font-bold">{experience || '0-2'} Yrs Exp.</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <div className="w-8 h-8 rounded-lg bg-royal-gold/5 flex items-center justify-center shrink-0">
                <DollarSign size={14} className="text-royal-gold" />
              </div>
              <span className="text-xs font-bold">
                {salary ? `${salary.min} - ${salary.max} ${salary.currency}` : 'Competitive'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <div className="w-8 h-8 rounded-lg bg-royal-gold/5 flex items-center justify-center shrink-0">
                <Calendar size={14} className="text-royal-gold" />
              </div>
              <span className="text-xs font-bold">{postedAt}</span>
            </div>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 italic">
            {description}
          </p>
        </div>

        {/* Action */}
        <div className="shrink-0 lg:border-l border-slate-100 dark:border-dark-border lg:pl-6 flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-4">
          <button className="flex-grow lg:flex-none btn-gold !py-3 !px-8 text-xs flex items-center justify-center gap-2 group/btn whitespace-nowrap">
            View Details <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
