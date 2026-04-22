import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Globe, Sun, Moon, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { cn } from '../../utils/cn';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/#about' },
  { name: 'Services', to: '/#services' },
  { name: 'Jobs', to: '/jobs' },
  { name: 'Contact', to: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleDarkMode, savedCount } = useApp();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location.pathname]);

  const transparent = isHome && !scrolled;

  return (
    <nav
      className={cn(
        'fixed w-full z-50 transition-all duration-500',
        transparent
          ? 'bg-transparent py-5'
          : 'bg-white/90 dark:bg-dark-surface/90 backdrop-blur-xl shadow-sm border-b border-slate-100 dark:border-dark-border py-3'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="Career Enterprises Home">
          <div className="w-10 h-10 bg-royal-gold rounded-xl flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform duration-500 flex-shrink-0">
            <Globe className="text-midnight" size={22} />
          </div>
          <div className="leading-none">
            <p className={cn('text-xl font-black tracking-tight font-outfit', transparent ? 'text-white' : 'text-midnight dark:text-white')}>
              CAREER <span className="text-royal-gold">ENTERPRISES</span>
            </p>
            <p className={cn('text-[9px] uppercase tracking-[0.3em] font-bold', transparent ? 'text-royal-gold/80' : 'text-slate-500 dark:text-slate-400')}>
              Elite Overseas Solutions
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.to.includes('#') ? (
              <a
                key={link.name}
                href={link.to}
                className={cn(
                  'text-[11px] uppercase tracking-widest font-black hover:text-royal-gold transition-colors duration-200',
                  transparent ? 'text-white/90' : 'text-slate-600 dark:text-slate-300'
                )}
              >
                {link.name}
              </a>
            ) : (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) => cn(
                  'text-[11px] uppercase tracking-widest font-black hover:text-royal-gold transition-colors duration-200 relative',
                  transparent ? 'text-white/90' : 'text-slate-600 dark:text-slate-300',
                  isActive && !transparent && 'text-royal-gold after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-royal-gold after:rounded-full'
                )}
              >
                {link.name}
              </NavLink>
            )
          ))}

          {/* Dark mode */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className={cn(
              'p-2 rounded-xl transition-all duration-200',
              transparent ? 'text-white/90 hover:bg-white/10' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-card'
            )}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Saved Jobs */}
          <Link
            to="/saved"
            aria-label={`Saved jobs (${savedCount})`}
            className={cn(
              'relative p-2 rounded-xl transition-all duration-200',
              transparent ? 'text-white/90 hover:bg-white/10' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-card'
            )}
          >
            <Bookmark size={18} />
            {savedCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-royal-gold text-midnight text-[9px] font-black rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </Link>

          <Link to="/jobs" className="btn-gold !text-[11px] !py-2.5 !px-6">
            Find Jobs
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleDarkMode} aria-label="Toggle dark mode"
            className={cn('p-2 rounded-xl', transparent ? 'text-white' : 'text-slate-600 dark:text-slate-300')}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/saved" className={cn('relative p-2', transparent ? 'text-white' : 'text-slate-600 dark:text-slate-300')}>
            <Bookmark size={20} />
            {savedCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-royal-gold text-midnight text-[9px] font-black rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className={cn('p-2', transparent ? 'text-white' : 'text-midnight dark:text-white')}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-white dark:bg-dark-surface border-t border-slate-100 dark:border-dark-border"
          >
            <div className="container mx-auto py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                link.to.includes('#') ? (
                  <a
                    key={link.name}
                    href={link.to}
                    onClick={() => setIsOpen(false)}
                    className="py-3 px-4 text-base font-bold text-midnight dark:text-white hover:text-royal-gold hover:bg-slate-50 dark:hover:bg-dark-card rounded-xl transition-all"
                  >
                    {link.name}
                  </a>
                ) : (
                  <NavLink
                    key={link.name}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => cn(
                      'py-3 px-4 text-base font-bold rounded-xl transition-all',
                      isActive
                        ? 'text-royal-gold bg-royal-gold/5'
                        : 'text-midnight dark:text-white hover:text-royal-gold hover:bg-slate-50 dark:hover:bg-dark-card'
                    )}
                  >
                    {link.name}
                  </NavLink>
                )
              ))}

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-dark-border space-y-3">
                <a href="tel:+917657950996" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 font-semibold">
                  <div className="w-8 h-8 bg-slate-50 dark:bg-dark-card rounded-full flex items-center justify-center text-royal-gold">
                    <Phone size={15} />
                  </div>
                  +91-7657950996
                </a>
                <a href="mailto:careerenterprises0888@gmail.com" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 font-semibold truncate">
                  <div className="w-8 h-8 bg-slate-50 dark:bg-dark-card rounded-full flex items-center justify-center text-royal-gold flex-shrink-0">
                    <Mail size={15} />
                  </div>
                  careerenterprises0888@gmail.com
                </a>
                <Link to="/jobs" onClick={() => setIsOpen(false)} className="btn-gold w-full text-center block mt-2">
                  Find Jobs
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
