import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Career Enterprises</title>
      </Helmet>
      <div className="min-h-screen bg-off-white dark:bg-dark-surface flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-8xl font-black text-midnight dark:text-white font-outfit mb-2">
            4<span className="text-royal-gold">0</span>4
          </div>
          <h1 className="text-2xl font-black text-midnight dark:text-white font-outfit mb-3">Page Not Found</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-gold flex items-center justify-center gap-2">
              <Home size={16} /> Go Home
            </Link>
            <Link to="/jobs" className="btn-outline flex items-center justify-center gap-2">
              <Search size={16} /> Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
