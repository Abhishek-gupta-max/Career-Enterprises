import React from 'react';
import { Globe, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-navy text-white pt-20 pb-10">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Globe className="text-secondary-gold" size={24} />
              </div>
              <h2 className="text-xl font-bold tracking-tight">
                CAREER <span className="text-secondary-gold">ENTERPRISES</span>
              </h2>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">
              Your trusted partner for global career opportunities. We bridge the gap between talent and global industries with integrity and excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-secondary-gold transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-secondary-gold transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-secondary-gold transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-secondary-gold transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Quick Links</h3>
            <ul className="space-y-4 text-sm text-blue-200">
              <li><a href="#home" className="hover:text-secondary-gold transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-secondary-gold transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-secondary-gold transition-colors">Our Services</a></li>
              <li><a href="#jobs" className="hover:text-secondary-gold transition-colors">Job Openings</a></li>
              <li><a href="#contact" className="hover:text-secondary-gold transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Our Services</h3>
            <ul className="space-y-4 text-sm text-blue-200">
              <li>Overseas Job Assistance</li>
              <li>Recruitment Services</li>
              <li>Documentation Support</li>
              <li>Career Consultancy</li>
              <li>Visa Processing</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Legal</h3>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-xs text-blue-100">
               <p className="font-bold text-white mb-2 uppercase tracking-widest">RA License Number</p>
               <p className="text-secondary-gold font-bold">B-3077/HP/PART/100/5/11087/2025</p>
               <p className="mt-3 opacity-60 italic">Approved by Ministry of External Affairs, India.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-blue-300">
            &copy; {currentYear} Career Enterprises. All Rights Reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm font-bold text-blue-200 hover:text-white transition-colors"
          >
            Back to top <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/917657950996" 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-8 right-8 z-40 bg-[#25d366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group flex items-center gap-2"
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 font-bold">
        Chat with us
      </span>
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path>
      </svg>
    </a>
  );
};
