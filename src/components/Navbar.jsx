import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Jobs', href: '#jobs' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-2xl py-3' : 'bg-transparent py-6 text-white'}`}>
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 bg-royal-gold rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
            <Globe className="text-midnight" size={28} />
          </div>
          <div>
            <h1 className={`text-2xl font-black tracking-tight font-outfit ${scrolled ? 'text-midnight' : 'text-white'}`}>
              CAREER <span className="text-royal-gold">ENTERPRISES</span>
            </h1>
            <p className={`text-[10px] uppercase tracking-[0.3em] font-black ${scrolled ? 'text-midnight/60' : 'text-royal-gold/80'}`}>
              Elite Overseas Solutions
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-[11px] uppercase tracking-widest font-black hover:text-royal-gold transition-all duration-300 ${scrolled ? 'text-midnight' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="btn-gold !text-[11px] !py-3 !px-8 shadow-royal-gold/20">
            HIRE TALENT
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`${scrolled ? 'text-midnight' : 'text-white'} transition-colors`}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-black uppercase tracking-widest text-midnight hover:text-royal-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-8 border-t border-slate-100 flex flex-col gap-6">
                <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-royal-gold">
                    <Phone size={18} />
                  </div>
                  +91-7657950996
                </div>
                <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-royal-gold">
                    <Mail size={18} />
                  </div>
                  careerenterprises0888@gmail.com
                </div>
                <a href="#contact" className="btn-gold text-center !py-4" onClick={() => setIsOpen(false)}>
                  HIRE TALENT
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
