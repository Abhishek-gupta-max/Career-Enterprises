import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useJobs } from '../hooks/useJobs';
import { JobCard } from '../components/ui/JobCard';
import { SkeletonGrid } from '../components/ui/SkeletonCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Pagination } from '../components/ui/Pagination';
import { Button } from '../components/ui/Button';
import { categories, countries, jobTypes } from '../data/jobs';
import { cn } from '../utils/cn';
import { Link } from 'react-router-dom';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'salary-high', label: 'Salary: High → Low' },
  { value: 'salary-low', label: 'Salary: Low → High' },
];

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [country, setCountry] = useState('All Countries');
  const [type, setType] = useState('All Types');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filters = { search, category, country, type, sort, page };
  const { data, isLoading, isError } = useJobs(filters);

  const handleSearch = useCallback((val) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleFilter = useCallback((key, val) => {
    if (key === 'category') setCategory(val);
    if (key === 'country') setCountry(val);
    if (key === 'type') setType(val);
    if (key === 'sort') setSort(val);
    setPage(1);
  }, []);

  const clearFilters = () => {
    setSearch('');
    setCategory('All');
    setCountry('All Countries');
    setType('All Types');
    setSort('newest');
    setPage(1);
  };

  const hasActiveFilters = search || category !== 'All' || country !== 'All Countries' || type !== 'All Types';

  return (
    <>
      <Helmet>
        <title>Browse Jobs | Career Enterprises</title>
        <meta name="description" content="Browse 100+ overseas job openings in UAE, Qatar, Saudi Arabia, Kuwait, Oman. Search by title, company, location, or category." />
      </Helmet>

      <div className="min-h-screen bg-off-white dark:bg-dark-surface pt-20">

        {/* Hero Banner */}
        <div className="bg-midnight dark:bg-dark-card py-14 px-6">
          <div className="container mx-auto text-center">
            <span className="section-label text-center block">Global Opportunities</span>
            <h1 className="text-4xl md:text-5xl font-black text-white font-outfit mb-4">
              Find Your Next <span className="text-royal-gold">Career Move</span>
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto text-sm mb-8">
              Browse verified overseas positions across the Gulf, curated exclusively by our MEA-licensed recruitment experts.
            </p>

            {/* Search bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="job-search"
                type="search"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by job title, company, or location…"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-dark-card text-midnight dark:text-white border-0 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-royal-gold/50 shadow-2xl placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto py-8 px-6">

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {/* Category chips (desktop) */}
            <div className="hidden md:flex flex-wrap gap-2 flex-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilter('category', cat)}
                  className={cn('filter-chip', category === cat && 'filter-chip-active')}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mobile filters toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 filter-chip"
              aria-expanded={showFilters}
            >
              <SlidersHorizontal size={14} /> Filters
            </button>

            {/* Sort + clear */}
            <div className="flex items-center gap-2 ml-auto">
              {hasActiveFilters && (
                <button onClick={clearFilters} className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600 px-3 py-2">
                  <X size={14} /> Clear
                </button>
              )}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => handleFilter('sort', e.target.value)}
                  aria-label="Sort jobs"
                  className="appearance-none form-input !py-2 !pr-8 !w-auto text-xs font-bold cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Mobile expanded filters */}
          {showFilters && (
            <div className="md:hidden bg-white dark:bg-dark-card rounded-2xl p-4 mb-6 border border-slate-100 dark:border-dark-border shadow-sm space-y-4 animate-fade-in">
              <div>
                <p className="form-label">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => handleFilter('category', cat)}
                      className={cn('filter-chip', category === cat && 'filter-chip-active')}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="form-label">Country</p>
                <div className="flex flex-wrap gap-2">
                  {countries.map((c) => (
                    <button key={c} onClick={() => handleFilter('country', c)}
                      className={cn('filter-chip', country === c && 'filter-chip-active')}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="form-label">Job Type</p>
                <div className="flex flex-wrap gap-2">
                  {jobTypes.map((t) => (
                    <button key={t} onClick={() => handleFilter('type', t)}
                      className={cn('filter-chip', type === t && 'filter-chip-active')}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Secondary filters bar (desktop) */}
          <div className="hidden md:flex flex-wrap gap-6 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <label htmlFor="country-filter" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Country</label>
              <div className="relative">
                <select id="country-filter" value={country} onChange={(e) => handleFilter('country', e.target.value)}
                  className="appearance-none form-input !py-1.5 !pr-7 !w-auto text-xs font-bold cursor-pointer">
                  {countries.map((c) => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="type-filter" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</label>
              <div className="relative">
                <select id="type-filter" value={type} onChange={(e) => handleFilter('type', e.target.value)}
                  className="appearance-none form-input !py-1.5 !pr-7 !w-auto text-xs font-bold cursor-pointer">
                  {jobTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Results count */}
          {!isLoading && data && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              Showing <span className="font-bold text-midnight dark:text-white">{data.jobs.length}</span> of{' '}
              <span className="font-bold text-midnight dark:text-white">{data.total}</span> opportunities
            </p>
          )}

          {/* Job Grid */}
          {isLoading && <SkeletonGrid count={9} />}

          {isError && (
            <EmptyState
              title="Something went wrong"
              message="We couldn't load the jobs. Please try again."
              action={<Button onClick={() => window.location.reload()}>Retry</Button>}
            />
          )}

          {!isLoading && !isError && data?.jobs.length === 0 && (
            <EmptyState
              title="No jobs found"
              message="Try adjusting your search terms or clearing the active filters."
              action={<Button variant="outline" onClick={clearFilters}>Clear Filters</Button>}
            />
          )}

          {!isLoading && !isError && data?.jobs.length > 0 && (
            <>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 animate-fade-in">
                {data.jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} />
            </>
          )}

          {/* CTA banner */}
          <div className="mt-16 bg-midnight dark:bg-dark-card rounded-3xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-royal-gold/5 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-white font-outfit mb-3">Don't see your ideal role?</h3>
              <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">Submit your profile and let our consultants match you with exclusive opportunities not listed here.</p>
              <Link to="/#contact" className="btn-gold inline-block">Submit Your Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
