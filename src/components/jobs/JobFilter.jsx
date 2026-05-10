import React from 'react';
import { Search, MapPin, Briefcase, DollarSign, Filter, X, ChevronDown } from 'lucide-react';
import { categories, countries, jobTypes, experienceLevels, salaryRanges } from '../../data/jobs';
import { cn } from '../../utils/cn';

export function JobFilter({ 
  filters, 
  setFilters, 
  isMobileOpen, 
  setIsMobileOpen,
  onClear 
}) {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Search */}
      <div className="relative group">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2.5 block group-focus-within:text-royal-gold transition-colors">
          Keywords
        </label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-royal-gold transition-colors" size={16} />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Search jobs..."
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border rounded-2xl text-sm font-bold focus:ring-4 focus:ring-royal-gold/10 focus:border-royal-gold transition-all"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block">
          Job Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleChange('category', cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                filters.category === cat
                  ? "bg-midnight text-white border-midnight shadow-lg"
                  : "bg-white dark:bg-dark-card border-slate-100 dark:border-dark-border text-slate-500 hover:border-royal-gold"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="relative group">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2.5 block">
          Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-royal-gold" size={16} />
          <select
            value={filters.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border rounded-2xl text-sm font-bold appearance-none cursor-pointer focus:ring-4 focus:ring-royal-gold/10 transition-all"
          >
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Experience */}
      <div>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block">
          Experience Level
        </label>
        <div className="grid grid-cols-1 gap-2">
          {experienceLevels.map((exp) => (
            <button
              key={exp}
              onClick={() => handleChange('experience', exp)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all border",
                filters.experience === exp
                  ? "bg-royal-gold/10 border-royal-gold text-midnight dark:text-royal-gold"
                  : "bg-white dark:bg-dark-card border-slate-100 dark:border-dark-border text-slate-500 hover:border-royal-gold"
              )}
            >
              <div className={cn(
                "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
                filters.experience === exp ? "border-royal-gold" : "border-slate-200"
              )}>
                {filters.experience === exp && <div className="w-1.5 h-1.5 bg-royal-gold rounded-full" />}
              </div>
              {exp}
            </button>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block">
          Salary Range
        </label>
        <div className="relative group">
          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-royal-gold" size={16} />
          <select
            value={filters.salary}
            onChange={(e) => handleChange('salary', e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border rounded-2xl text-sm font-bold appearance-none cursor-pointer focus:ring-4 focus:ring-royal-gold/10 transition-all"
          >
            {salaryRanges.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Job Type */}
      <div>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block">
          Contract Type
        </label>
        <div className="flex flex-wrap gap-2">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleChange('type', type)}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                filters.type === type
                  ? "bg-slate-200 dark:bg-slate-700 text-midnight dark:text-white border-transparent"
                  : "bg-white dark:bg-dark-card border-slate-100 dark:border-dark-border text-slate-400"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Action */}
      <button
        onClick={onClear}
        className="w-full py-4 mt-4 border border-dashed border-slate-200 dark:border-dark-border rounded-2xl text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all flex items-center justify-center gap-2"
      >
        <X size={14} /> Reset All
      </button>
    </div>
  );

  return (
    <div className="bg-white dark:bg-dark-card rounded-[32px] p-8 border border-slate-100 dark:border-dark-border shadow-xl shadow-slate-200/20 dark:shadow-none lg:sticky lg:top-28">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-50 dark:border-dark-border">
        <div className="w-10 h-10 bg-royal-gold/10 rounded-xl flex items-center justify-center text-royal-gold">
          <Filter size={20} />
        </div>
        <div>
          <h3 className="text-lg font-black text-midnight dark:text-white font-outfit leading-tight">Advanced Filter</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Find your match</p>
        </div>
      </div>
      <FilterContent />
    </div>
  );
}
