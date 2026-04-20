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
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4 text-white'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-navy rounded-lg flex items-center justify-center">
            <Globe className="text-secondary-gold" size={24} />
          </div>
          <div>
            <h1 className={`text-xl font-bold tracking-tight ${scrolled ? 'text-primary-navy' : 'text-white'}`}>
              CAREER <span className="text-secondary-gold">ENTERPRISES</span>
            </h1>
            <p className={`text-[10px] uppercase tracking-widest font-semibold ${scrolled ? 'text-primary-light' : 'text-blue-200'}`}>
              Overseas Career Solutions
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-semibold hover:text-secondary-gold transition-colors ${scrolled ? 'text-primary-navy' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="btn-secondary text-sm py-2 px-4">
            Consult Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`${scrolled ? 'text-primary-navy' : 'text-white'}`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden border-t"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold text-primary-navy hover:text-secondary-gold"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Phone size={16} /> +91-7657950996
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Mail size={16} /> careerenterprises0786@gmail.com
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
