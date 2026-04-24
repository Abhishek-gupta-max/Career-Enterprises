import React, { useState, useMemo } from 'react';
import { useApplications } from '../../hooks/useJobs';
import { SkeletonGrid } from '../ui/SkeletonCard';
import { EmptyState } from '../ui/EmptyState';
import { Badge } from '../ui/Badge';
import { Mail, Phone, Calendar, Download, Eye, Briefcase, Search, MapPin } from 'lucide-react';
import { useJobs } from '../../hooks/useJobs';

export function ApplicationList() {
  const { data: applications, isLoading, isError } = useApplications();
  const { data: jobsData } = useJobs({ limit: 1000 });

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Helper to get job object
  const getJob = (jobId) => {
    if (!jobsData?.jobs) return null;
    return jobsData.jobs.find(j => String(j.id) === String(jobId)) || null;
  };

  // Derive filter options dynamically
  const filterOptions = useMemo(() => {
    if (!applications || !jobsData?.jobs) return { roles: [], locations: [] };
    
    const roles = new Set();
    const locations = new Set();
    
    applications.forEach(app => {
      const job = getJob(app.jobId);
      if (job) {
        roles.add(job.title);
        if (job.location) locations.add(job.location);
      }
    });
    
    return {
      roles: Array.from(roles).sort(),
      locations: Array.from(locations).sort()
    };
  }, [applications, jobsData]);

  // Filtered applications
  const filteredApps = useMemo(() => {
    if (!applications) return [];
    
    return applications.filter(app => {
      const job = getJob(app.jobId);
      const appDate = new Date(app.submittedAt);
      
      // 1. Search
      const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 2. Role Filter
      const matchesRole = roleFilter ? job?.title === roleFilter : true;
      
      // 3. Location Filter
      const matchesLocation = locationFilter ? job?.location === locationFilter : true;
      
      // 4. Date Range
      let matchesDateFrom = true;
      let matchesDateTo = true;
      
      if (dateFrom) {
        const from = new Date(dateFrom);
        from.setHours(0, 0, 0, 0);
        matchesDateFrom = appDate >= from;
      }
      if (dateTo) {
        const to = new Date(dateTo);
        to.setHours(23, 59, 59, 999);
        matchesDateTo = appDate <= to;
      }
      
      return matchesSearch && matchesRole && matchesLocation && matchesDateFrom && matchesDateTo;
    });
  }, [applications, jobsData, searchTerm, roleFilter, locationFilter, dateFrom, dateTo]);

  // Export CSV
  const exportToCSV = () => {
    if (filteredApps.length === 0) return;
    
    const headers = ['Candidate Name', 'Email', 'Phone', 'Experience', 'Job Title', 'Job Location', 'Application Date', 'Cover Letter'];
    
    const csvRows = [headers.join(',')];
    
    filteredApps.forEach(app => {
      const job = getJob(app.jobId);
      const row = [
        `"${app.fullName}"`,
        `"${app.email}"`,
        `"${app.phone}"`,
        `"${app.experience}"`,
        `"${job?.title || `Job ID: ${app.jobId}`}"`,
        `"${job?.location || 'N/A'}"`,
        `"${new Date(app.submittedAt).toLocaleDateString()}"`,
        `"${(app.coverLetter || '').replace(/"/g, '""')}"`
      ];
      csvRows.push(row.join(','));
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `applications_export_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <SkeletonGrid count={3} />;
  }

  if (isError) {
    return <EmptyState title="Error" message="Failed to load applications." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Toolbar / Dashboard Controls */}
      <div className="bg-white dark:bg-dark-card rounded-[32px] border border-slate-100 dark:border-dark-border shadow-sm p-6">
        <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
          
          {/* Search */}
          <div className="relative w-full xl:w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by candidate name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-sm text-midnight dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold transition-all"
            />
          </div>

          {/* Filters & Export */}
          <div className="flex flex-wrap gap-3 w-full xl:w-auto items-center">
            
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-3.5 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-sm text-slate-700 dark:text-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold cursor-pointer transition-all hover:border-slate-300"
            >
              <option value="">All Roles</option>
              {filterOptions.roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>

            <select 
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-3.5 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-sm text-slate-700 dark:text-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold cursor-pointer transition-all hover:border-slate-300"
            >
              <option value="">All Locations</option>
              {filterOptions.locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            
            <div className="flex items-center gap-2 bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-2xl px-4 py-1.5 text-slate-700 dark:text-slate-300 text-sm shadow-sm transition-all focus-within:ring-2 focus-within:ring-royal-gold/50 focus-within:border-royal-gold hover:border-slate-300">
              <input 
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-slate-700 dark:text-slate-300"
                title="Start Date"
              />
              <span className="text-slate-400">to</span>
              <input 
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-slate-700 dark:text-slate-300"
                title="End Date"
              />
            </div>

            <button 
              onClick={exportToCSV}
              disabled={filteredApps.length === 0}
              className="btn-gold !py-3.5 !px-7 rounded-2xl flex items-center gap-2 text-sm font-bold shadow-lg shadow-royal-gold/20 hover:shadow-royal-gold/40 disabled:opacity-50 disabled:cursor-not-allowed ml-auto xl:ml-0 transition-all"
            >
              <Download size={16} /> Export CSV
            </button>
            
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white dark:bg-dark-card rounded-[32px] border border-slate-100 dark:border-dark-border shadow-sm overflow-hidden">
        {filteredApps.length === 0 ? (
          <div className="p-8">
            <EmptyState 
              title="No applications found" 
              message="Try adjusting your filters or search terms." 
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-dark-surface/50 border-b border-slate-100 dark:border-dark-border">
                  <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-400">Candidate</th>
                  <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-400">Applied Role & Location</th>
                  <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-400">Contact</th>
                  <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-400">Experience</th>
                  <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-dark-border">
                {filteredApps.map((app) => {
                  const job = getJob(app.jobId);
                  const appDate = new Date(app.submittedAt);
                  
                  return (
                  <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-dark-surface/80 transition-all duration-300 group border-l-4 border-transparent hover:border-royal-gold cursor-default">
                    <td className="p-5 align-top">
                      <div>
                        <p className="font-black text-midnight dark:text-white font-outfit text-base">{app.fullName}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                          <Calendar size={12} /> {appDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} at {appDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'})}
                        </p>
                      </div>
                    </td>
                    <td className="p-5 align-top">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Briefcase size={14} className="text-royal-gold" />
                          <span className="font-bold text-sm text-slate-700 dark:text-slate-300">
                            {job ? job.title : `Job ID: ${app.jobId}`}
                          </span>
                        </div>
                        {job?.location && (
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <MapPin size={12} />
                            <span>{job.location}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-5 align-top space-y-1">
                      <a href={`mailto:${app.email}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-royal-gold transition-colors">
                        <Mail size={12} /> {app.email}
                      </a>
                      <a href={`tel:${app.phone}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-royal-gold transition-colors">
                        <Phone size={12} /> {app.phone}
                      </a>
                    </td>
                    <td className="p-5 align-top">
                      <Badge variant="slate" className="capitalize">{app.experience}</Badge>
                    </td>
                    <td className="p-5 align-top text-right">
                      <div className="flex items-center justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button 
                          className="w-9 h-9 rounded-full bg-white dark:bg-dark-surface border border-slate-100 dark:border-dark-border text-slate-500 shadow-sm flex items-center justify-center hover:bg-royal-gold hover:text-white hover:border-royal-gold transition-all transform hover:scale-110"
                          title="View Cover Letter"
                          onClick={() => alert(`Cover Letter from ${app.fullName}:\n\n${app.coverLetter}`)}
                        >
                          <Eye size={14} />
                        </button>
                        
                        <button 
                          className="w-9 h-9 rounded-full bg-white dark:bg-dark-surface border border-slate-100 dark:border-dark-border text-slate-500 shadow-sm flex items-center justify-center hover:bg-royal-gold hover:text-white hover:border-royal-gold transition-all transform hover:scale-110"
                          title={`Download Resume: ${app.resume || 'Not provided'}`}
                          onClick={() => alert(`Downloading resume: ${app.resume || 'No resume attached'}`)}
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
