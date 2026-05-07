import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Lock, Mail, Key, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

export function AdminRoute({ children }) {
  const { user, isAdmin, isLoading, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-off-white dark:bg-dark-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-royal-gold animate-spin" />
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Verifying Access...</p>
        </div>
      </div>
    );
  }

  // If logged in but NOT an admin, redirect to home
  if (user && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If not logged in, show the login form
  if (!user) {
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
            <p className="text-sm text-slate-500 mb-10 px-4">Please enter your secure administrative credentials to access the Employer Dashboard.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-royal-gold transition-colors" size={20} />
                <input
                  type="email"
                  placeholder="Admin Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-5 py-4 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-midnight dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold transition-all"
                />
              </div>

              <div className="relative group">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-royal-gold transition-colors" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-5 py-4 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-midnight dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold transition-all"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm mt-2 text-left bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/20">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-gold !py-4 font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Authenticating...
                  </>
                ) : (
                  'Access Dashboard'
                )}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  // If logged in and admin, show the children (EmployerPage)
  return children;
}
