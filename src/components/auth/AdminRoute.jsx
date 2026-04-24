import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Lock } from 'lucide-react';

export function AdminRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(true);

  // The secret passcode for basic security (in a real app, this should be handled via a secure backend)
  const ADMIN_PASSCODE = 'admin123';

  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      sessionStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid passcode. Please try again.');
    }
  };

  if (isChecking) {
    return null; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin Login | Career Enterprises</title>
        </Helmet>
        <div className="min-h-screen bg-off-white dark:bg-dark-surface pt-32 pb-20 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-dark-card max-w-md w-full rounded-[40px] p-10 border border-slate-100 dark:border-dark-border shadow-2xl shadow-slate-200/50 dark:shadow-none text-center transform transition-all hover:scale-[1.01] duration-500">
            <div className="w-20 h-20 bg-gradient-to-br from-royal-gold to-yellow-500 rounded-3xl flex items-center justify-center mx-auto mb-8 text-white shadow-lg shadow-royal-gold/30">
              <Lock size={36} strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-midnight dark:text-white font-outfit mb-3">Admin Access</h1>
            <p className="text-sm text-slate-500 mb-10 px-4">Please enter your secure administrative passcode to access the Employer Dashboard.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-midnight dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold transition-all"
                  autoFocus
                />
                {error && <p className="text-red-500 text-sm mt-2 text-left">{error}</p>}
              </div>
              <button
                type="submit"
                className="w-full btn-gold !py-4 font-bold text-lg"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return children;
}
