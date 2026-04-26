import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import { Footer, WhatsAppButton } from './components/layout/Footer';
import { AdminRoute } from './components/auth/AdminRoute';
import { Toaster } from 'react-hot-toast';

// Lazy-loaded pages (code splitting)
const Home      = lazy(() => import('./pages/Home'));
const JobsPage  = lazy(() => import('./pages/JobsPage'));
const JobDetail = lazy(() => import('./pages/JobDetail'));
const Apply     = lazy(() => import('./pages/Apply'));
const SavedJobs = lazy(() => import('./pages/SavedJobs'));
const EmployerPage = lazy(() => import('./pages/EmployerPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const NotFound  = lazy(() => import('./pages/NotFound'));

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

// Full-screen loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen bg-off-white dark:bg-dark-surface flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-slate-200 dark:border-dark-border border-t-royal-gold rounded-full animate-spin" />
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading…</p>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/jobs"           element={<JobsPage />} />
          <Route path="/jobs/:id"       element={<JobDetail />} />
          <Route path="/jobs/:id/apply" element={<Apply />} />
          <Route path="/saved"          element={<SavedJobs />} />
          <Route path="/employer"       element={<AdminRoute><EmployerPage /></AdminRoute>} />
          <Route path="/careers"        element={<CareersPage />} />
          <Route path="*"              element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-off-white dark:bg-dark-surface text-midnight dark:text-white transition-colors duration-300">
        <AppRoutes />
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </BrowserRouter>
  );
}
