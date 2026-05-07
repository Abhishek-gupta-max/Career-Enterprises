import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Globe, Sun, Moon, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { cn } from '../../utils/cn';
import logo from '../../assets/logo.jpg';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/#about' },
  { name: 'Jobs', to: '/jobs' },
  { name: 'Requirements', to: '/employer' },
  { name: 'Careers', to: '/careers' },
  { name: 'Contact', to: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleDarkMode, savedCount } = useApp();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [langOpen, setLangOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ar', name: 'العربية', flag: '🇦🇪' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
  ];

  const changeLanguage = (langCode) => {
    const select = document.querySelector('select.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    } else {
      console.warn('Google Translate not yet initialized');
    }
    setLangOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location.pathname]);

  const transparent = isHome && !scrolled;

  return (
    <header className={cn('fixed w-full z-50 transition-all duration-500', transparent ? 'bg-transparent' : 'bg-white/90 dark:bg-dark-surface/90 backdrop-blur-xl shadow-sm border-b border-slate-100 dark:border-dark-border')}>
      {/* Top Bar for License Info */}
      <div className="bg-midnight dark:bg-black text-white py-2 sm:py-3 px-4 sm:px-6 border-b border-royal-gold/20">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 tracking-[0.05em]">
          {/* Left: Email & Mobile in a row */}
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-6">
            <a href="mailto:careerenterprises0888@gmail.com" className="flex items-center gap-2 hover:text-royal-gold transition-colors">
              <Mail size={13} className="text-royal-gold flex-shrink-0" />
              <span className="text-[10px] md:text-[16px] font-bold">careerenterprises0888@gmail.com</span>
            </a>
            <a href="tel:+917807464389" className="flex items-center gap-2 hover:text-royal-gold transition-colors">
              <Phone size={13} className="text-royal-gold flex-shrink-0" />
              <span className="text-[14px] md:text-[16px] font-bold">+91-7807464389</span>
            </a>
          </div>

          {/* Right: Company Name & RA License in a column */}
          <div className="flex flex-col items-center sm:items-end leading-tight text-center sm:text-right">
            <span className="text-royal-gold uppercase font-black text-[10px] md:text-[13px]">Approved By Ministry of External Affairs</span>
            <span className="text-slate-400 uppercase font-bold text-[10px] md:text-[13px]">RA License No: B-3077/HP/PART/100/11087/2025</span>
          </div>
        </div>
      </div>

      <nav role="navigation" aria-label="Main navigation" className={cn('py-3 transition-all duration-500', transparent && 'py-5')}>
        <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Career Enterprises Home">
            <div className="w-12 h-12 bg-white dark:bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-500 flex-shrink-0 overflow-hidden p-1">
              <img src={logo} alt="CE Logo" className="w-full h-full object-contain" />
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
            {navLinks.map((link) => {
              const isHash = link.to.includes('#');
              const isActive = isHash
                ? location.hash === link.to.substring(link.to.indexOf('#'))
                : (link.to === '/' ? (location.pathname === '/' && !location.hash) : location.pathname === link.to);

              return isHash ? (
                <a
                  key={link.name}
                  href={link.to}
                  className={cn(
                    'text-[11px] uppercase tracking-widest font-black hover:text-royal-gold transition-colors duration-200 relative',
                    transparent ? 'text-white/90' : 'text-slate-600 dark:text-slate-300',
                    isActive && !transparent && 'text-royal-gold after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-royal-gold after:rounded-full'
                  )}
                >
                  {link.name}
                </a>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className={cn(
                    'text-[11px] uppercase tracking-widest font-black hover:text-royal-gold transition-colors duration-200 relative',
                    transparent ? 'text-white/90' : 'text-slate-600 dark:text-slate-300',
                    isActive && !transparent && 'text-royal-gold after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-royal-gold after:rounded-full'
                  )}
                >
                  {link.name}
                </NavLink>
              );
            })}

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

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={cn(
                  'flex items-center gap-2 p-2 rounded-xl transition-all duration-200 text-[11px] font-black uppercase tracking-widest',
                  transparent ? 'text-white/90 hover:bg-white/10' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-card'
                )}
              >
                <Globe size={18} className="text-royal-gold" />
                <span>Translate</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-surface border border-slate-100 dark:border-dark-border rounded-2xl shadow-2xl overflow-hidden z-[60]"
                  >
                    <div className="py-2 grid grid-cols-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-card transition-colors text-left"
                        >
                          <span className="text-base">{lang.flag}</span>
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
                {navLinks.map((link) => {
                  const isHash = link.to.includes('#');
                  const isActive = isHash
                    ? location.hash === link.to.substring(link.to.indexOf('#'))
                    : (link.to === '/' ? (location.pathname === '/' && !location.hash) : location.pathname === link.to);

                  return isHash ? (
                    <a
                      key={link.name}
                      href={link.to}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "py-3 px-4 text-base font-bold rounded-xl transition-all block",
                        isActive
                          ? "text-royal-gold bg-royal-gold/5"
                          : "text-midnight dark:text-white hover:text-royal-gold hover:bg-slate-50 dark:hover:bg-dark-card"
                      )}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <NavLink
                      key={link.name}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'py-3 px-4 text-base font-bold rounded-xl transition-all block',
                        isActive
                          ? 'text-royal-gold bg-royal-gold/5'
                          : 'text-midnight dark:text-white hover:text-royal-gold hover:bg-slate-50 dark:hover:bg-dark-card'
                      )}
                    >
                      {link.name}
                    </NavLink>
                  );
                })}

                {/* Language Selector Mobile */}
                <div className="px-4 py-4 border-t border-slate-100 dark:border-dark-border">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Select Language</p>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-card text-xs font-bold text-midnight dark:text-white border border-transparent hover:border-royal-gold transition-all"
                      >
                        <span className="text-base">{lang.flag}</span>
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-dark-border space-y-3">
                  <a href="tel:+919805523265" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 font-semibold">
                    <div className="w-8 h-8 bg-slate-50 dark:bg-dark-card rounded-full flex items-center justify-center text-royal-gold">
                      <Phone size={15} />
                    </div>
                    +91-9805523265
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
    </header>
  );
}
