import React, { useState, useMemo } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, Plus, ExternalLink, Trash2, Edit2, Eye, EyeOff, Clock, TrendingUp, Building2 } from 'lucide-react';

export const EmployerJobList = ({ jobs = [], onEdit, onDelete, onAddJob, onStatusToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // 2. Group jobs by category and apply filters
  const groupedJobs = useMemo(() => {
    const groups = {};
    const isPreGrouped = !Array.isArray(jobs);

    if (isPreGrouped) {
      // Handle pre-grouped API response
      for (const [category, categoryJobs] of Object.entries(jobs)) {
        const filtered = categoryJobs.filter(job => {
          const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                job.company?.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesLocation = job.location?.toLowerCase().includes(locationFilter.toLowerCase()) ||
                                  job.country?.toLowerCase().includes(locationFilter.toLowerCase());
          return matchesSearch && matchesLocation;
        });
        if (filtered.length > 0) {
          groups[category] = filtered;
        }
      }
    } else {
      // Handle flat list -> group on frontend
      const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              job.company?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = job.location?.toLowerCase().includes(locationFilter.toLowerCase()) ||
                                job.country?.toLowerCase().includes(locationFilter.toLowerCase());
        return matchesSearch && matchesLocation;
      });

      filteredJobs.forEach(job => {
        if (!groups[job.category]) {
          groups[job.category] = [];
        }
        groups[job.category].push(job);
      });
    }
    return groups;
  }, [jobs, searchTerm, locationFilter]);

  const categories = Object.keys(groupedJobs).sort();

  return (
    <div className="employer-job-list space-y-6">
      {/* Filters Card */}
      <div className="bg-slate-50 dark:bg-dark-surface/50 p-4 rounded-3xl border border-slate-100 dark:border-dark-border grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-royal-gold transition-colors" size={18} />
          <InputText 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search by job title or company..." 
            className="w-full pl-12 py-3 rounded-2xl border-slate-200 dark:border-dark-border dark:bg-dark-card dark:text-white focus:ring-2 focus:ring-royal-gold/20 transition-all shadow-sm"
          />
        </div>
        <div className="relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-royal-gold transition-colors" size={18} />
          <InputText 
            value={locationFilter} 
            onChange={(e) => setLocationFilter(e.target.value)} 
            placeholder="Filter by city or country..." 
            className="w-full pl-12 py-3 rounded-2xl border-slate-200 dark:border-dark-border dark:bg-dark-card dark:text-white focus:ring-2 focus:ring-royal-gold/20 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="rounded-[32px] overflow-hidden border border-slate-100 dark:border-dark-border">
        {categories.length > 0 ? (
          <Accordion multiple activeIndex={[0]} className="custom-employer-accordion">
            {categories.map((category) => (
              <AccordionTab 
                key={category} 
                header={
                  <div className="flex items-center justify-between w-full pr-4 py-1">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-royal-gold/10 rounded-lg flex items-center justify-center text-royal-gold">
                        <Briefcase size={16} />
                      </div>
                      <span className="font-black text-midnight dark:text-white text-sm md:text-base uppercase tracking-tight">{category}</span>
                      <span className="bg-slate-100 dark:bg-dark-border px-2 py-0.5 rounded-md text-[10px] font-black text-slate-500">
                        {groupedJobs[category].length}
                      </span>
                    </div>
                    <button 
                      className="flex items-center gap-1.5 text-royal-gold hover:bg-royal-gold/10 px-3 py-1.5 rounded-lg font-black text-[11px] uppercase tracking-wider transition-colors ml-2 flex-shrink-0"
                      onClick={(e) => { e.stopPropagation(); onAddJob(category); }}
                    >
                      <Plus size={14} strokeWidth={3} />
                      <span>Add Job</span>
                    </button>
                  </div>
                }
              >
                <div className="grid grid-cols-1 gap-3 py-2">
                  {groupedJobs[category].map((job) => {
                    const isLive = job.status === 'Published' || job.status === 'Open';
                    return (
                      <div key={job.id} className="group p-4 rounded-2xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-surface hover:border-royal-gold/30 transition-all duration-300">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-midnight dark:text-white group-hover:text-royal-gold transition-colors">{job.title}</h4>
                              <Badge 
                                value={job.status || 'Open'} 
                                severity={
                                  job.status === 'Closed' ? 'danger' : 
                                  job.status === 'Draft' ? 'warning' : 
                                  'success'
                                } 
                                className="text-[9px] uppercase font-black px-2 py-0.5"
                              />
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 font-medium">
                              <span className="flex items-center gap-1"><MapPin size={12} className="text-royal-gold" /> {job.location}, {job.country}</span>
                              <span className="flex items-center gap-1 font-bold text-slate-600 dark:text-slate-300"><Building2 size={12} /> {job.company}</span>
                              {job.type && <span className="flex items-center gap-1"><Clock size={12} /> {job.type}</span>}
                              {job.experience !== undefined && <span className="flex items-center gap-1"><TrendingUp size={12} /> {job.experience}Y Exp</span>}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-3 md:mt-0 justify-end">
                            <Link 
                              to={`/jobs/${job.id}`} 
                              target="_blank"
                              title="Public View"
                              className="flex items-center justify-center h-9 w-9 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-dark-border/30 dark:hover:bg-dark-border transition-colors text-slate-500"
                            >
                              <ExternalLink size={14} />
                            </Link>
                            
                            <button 
                              title="Edit" 
                              onClick={() => onEdit(job)}
                              className="flex items-center justify-center h-9 w-9 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 transition-colors text-blue-500"
                            >
                              <Edit2 size={14} />
                            </button>
                            
                            <button 
                              title={isLive ? "Move to Draft" : "Publish to Portal"}
                              onClick={() => onStatusToggle(job.id, job.status)}
                              className={`flex items-center justify-center h-9 w-9 rounded-xl transition-colors ${
                                isLive 
                                  ? 'bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/40 text-orange-500' 
                                  : 'bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 text-green-500'
                              }`}
                            >
                              {isLive ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                            
                            <button 
                              title="Delete" 
                              onClick={() => {
                                confirmDialog({
                                  message: 'Are you sure you want to delete this job?',
                                  header: 'Delete Confirmation',
                                  icon: 'pi pi-exclamation-triangle',
                                  acceptClassName: 'p-button-danger',
                                  accept: () => onDelete(job.id),
                                });
                              }}
                              className="flex items-center justify-center h-9 w-9 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 transition-colors text-red-500"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AccordionTab>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-20 bg-slate-50 dark:bg-dark-card rounded-[40px] border border-dashed border-slate-200 dark:border-dark-border">
            <Briefcase className="mx-auto text-slate-300 dark:text-slate-700 mb-4" size={48} />
            <h3 className="text-xl font-bold text-midnight dark:text-white mb-2">No jobs available</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">You haven't posted any jobs yet.</p>
            <button 
              onClick={() => onAddJob()} 
              className="btn-gold !py-3 !px-8 flex items-center justify-center gap-2 mx-auto"
            >
              <Plus size={18} /> Post New Job
            </button>
          </div>
        )}
      </div>
      <ConfirmDialog />
    </div>
  );
};
