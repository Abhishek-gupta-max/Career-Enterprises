import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, LayoutGrid, List, Search, Loader2 } from 'lucide-react';
import { useJobs } from '../../hooks/useJobs';
import { JobCardHorizontal } from './JobCardHorizontal';
import { JobFilter } from './JobFilter';
import { JobFilterDrawer } from './JobFilterDrawer';
import { JobDetailsModal } from './JobDetailsModal';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export const JobListing = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    country: 'All Countries',
    type: 'All Types',
    experience: '',
    salary: ''
  });
  
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [limit, setLimit] = useState(10);

  // Use the existing hook but with a larger limit for local filtering
  // In a real app, filtering would happen on the server
  const { data, isLoading, isError } = useJobs({ page: 1, limit: 100 });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      country: 'All Countries',
      type: 'All Types',
      experience: '',
      salary: ''
    });
  };

  const openJobDetails = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  // Complex local filtering logic
  const filteredJobs = useMemo(() => {
    if (!data?.jobs) return [];

    return data.jobs.filter(job => {
      // Basic filters
      const matchSearch = !filters.search || 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase());
        
      const matchCategory = filters.category === 'All' || job.category === filters.category;
      const matchCountry = filters.country === 'All Countries' || job.country === filters.country;
      const matchType = filters.type === 'All Types' || job.type === filters.type;

      // Experience filter (simulated logic based on requirement text)
      let matchExperience = true;
      if (filters.experience) {
        const jobExp = parseInt(job.experience) || 0; // Assuming we add this field or parse it
        if (filters.experience === '0-2 Years') matchExperience = jobExp <= 2;
        else if (filters.experience === '2-5 Years') matchExperience = jobExp >= 2 && jobExp <= 5;
        else if (filters.experience === '5-8 Years') matchExperience = jobExp >= 5 && jobExp <= 8;
        else if (filters.experience === '8+ Years') matchExperience = jobExp >= 8;
      }

      // Salary filter (simulated logic)
      let matchSalary = true;
      if (filters.salary) {
        const minSalary = job.salary?.min || 0;
        if (filters.salary === '0 - 2000') matchSalary = minSalary <= 2000;
        else if (filters.salary === '2000 - 5000') matchSalary = minSalary >= 2000 && minSalary <= 5000;
        else if (filters.salary === '5000 - 10000') matchSalary = minSalary >= 5000 && minSalary <= 10000;
        else if (filters.salary === '10000+') matchSalary = minSalary >= 10000;
      }

      return matchSearch && matchCategory && matchCountry && matchType && matchExperience && matchSalary;
    });
  }, [data, filters]);

  const visibleJobs = filteredJobs.slice(0, limit);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <JobFilter 
            filters={filters} 
            setFilters={setFilters} 
            onClear={clearFilters} 
          />
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400"
              >
                <SlidersHorizontal size={16} className="text-royal-gold" /> Filters
              </button>
              <div className="text-sm font-bold text-slate-500 dark:text-slate-400">
                Showing <span className="text-midnight dark:text-white font-black">{visibleJobs.length}</span> of <span className="text-midnight dark:text-white font-black">{filteredJobs.length}</span> Results
              </div>
            </div>

            <div className="flex items-center bg-slate-100 dark:bg-dark-surface p-1 rounded-xl">
              <button className="p-2 bg-white dark:bg-dark-card text-royal-gold rounded-lg shadow-sm">
                <List size={18} />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>

          {/* Jobs List */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-royal-gold animate-spin" />
              <p className="text-sm font-black uppercase tracking-widest text-slate-400">Fetching Requirements...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-20 bg-red-50 dark:bg-red-900/10 rounded-[40px] border border-red-100 dark:border-red-900/20">
              <p className="text-red-500 font-bold">Failed to load requirements. Please try again.</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-32 bg-white dark:bg-dark-card rounded-[40px] border border-dashed border-slate-200 dark:border-dark-border">
              <div className="w-20 h-20 bg-slate-50 dark:bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-midnight dark:text-white font-outfit mb-2">No Matching Jobs</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8">
                We couldn't find any positions matching your current filter selection. Try clearing filters or searching for something else.
              </p>
              <Button onClick={clearFilters} variant="outline">Clear All Filters</Button>
            </div>
          ) : (
            <div className="space-y-5">
              {visibleJobs.map((job, index) => (
                <JobCardHorizontal 
                  key={job.id} 
                  job={job} 
                  onClick={() => openJobDetails(job)}
                />
              ))}
              
              {filteredJobs.length > limit && (
                <div className="pt-10 flex justify-center">
                  <Button 
                    onClick={() => setLimit(prev => prev + 10)}
                    className="!px-12 !py-4 shadow-xl shadow-royal-gold/10"
                  >
                    Load More Positions
                  </Button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer */}
      <JobFilterDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onClear={clearFilters}
      />

      {/* Detail Modal */}
      <JobDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        job={selectedJob}
      />
    </div>
  );
};
