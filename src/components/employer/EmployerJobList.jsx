import React, { useState, useMemo } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
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
                    <Button 
                      icon="pi pi-plus" 
                      label="Add Job" 
                      className="p-button-text p-button-sm text-royal-gold hover:bg-royal-gold/5 font-black text-xs" 
                      onClick={(e) => { e.stopPropagation(); onAddJob(category); }}
                    />
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
                          
                          <div className="flex items-center gap-2">
                            <Link to={`/jobs/${job.id}`} target="_blank">
                              <Button tooltip="Public View" tooltipOptions={{ position: 'top' }} icon={<ExternalLink size={14} />} className="p-button-text p-button-secondary rounded-xl h-9 w-9 p-0 bg-slate-50 dark:bg-dark-border/30" />
                            </Link>
                            <Button 
                              tooltip="Edit" 
                              tooltipOptions={{ position: 'top' }}
                              icon={<Edit2 size={14} />} 
                              className="p-button-text p-button-info rounded-xl h-9 w-9 p-0 bg-blue-50 dark:bg-blue-900/20" 
                              onClick={() => onEdit(job)}
                            />
                            <Button 
                              tooltip={isLive ? "Move to Draft" : "Publish to Portal"}
                              tooltipOptions={{ position: 'top' }}
                              icon={isLive ? <EyeOff size={14} /> : <Eye size={14} />}
                              className={`p-button-text rounded-xl h-9 w-9 p-0 ${isLive ? 'p-button-warning bg-orange-50 dark:bg-orange-900/20' : 'p-button-success bg-green-50 dark:bg-green-900/20'}`}
                              onClick={() => onStatusToggle(job.id, job.status)}
                            />
                            <Button 
                              tooltip="Delete" 
                              tooltipOptions={{ position: 'top' }}
                              icon={<Trash2 size={14} />} 
                              className="p-button-text p-button-danger rounded-xl h-9 w-9 p-0 bg-red-50 dark:bg-red-900/20" 
                              onClick={() => onDelete(job.id)}
                            />
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
            <p className="text-slate-500 dark:text-slate-400 text-sm">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};
