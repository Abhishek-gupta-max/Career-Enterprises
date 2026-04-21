import React from 'react';
import { Globe, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-midnight text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-royal-gold/50 to-transparent"></div>
      <div className="container px-6 mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-royal-gold rounded-2xl flex items-center justify-center shadow-lg shadow-royal-gold/20">
                <Globe className="text-midnight" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight font-outfit">
                  CAREER <span className="text-royal-gold">ENTERPRISES</span>
                </h2>
                <p className="text-[9px] uppercase tracking-[0.3em] font-black text-royal-gold/80">Elite Overseas</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-inter">
              The premier gateway for high-impact global recruitment. Architecting excellence in documentation and international mobility.
            </p>
            <div className="flex gap-5">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "https://www.instagram.com/reel/DOWDphwEvtH/?igsh=emkzcXRremZ0Zzcx" },
                { icon: Linkedin, href: "#" }
              ].map((Social, i) => (
                <a 
                  key={i} 
                  href={Social.href} 
                  target={Social.href !== "#" ? "_blank" : undefined}
                  rel={Social.href !== "#" ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-royal-gold hover:text-midnight transition-all duration-500 border border-white/5"
                >
                  <Social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-royal-gold mb-10">Navigation</h3>
            <ul className="space-y-6 text-sm font-bold text-slate-400 font-inter">
              <li><a href="#home" className="hover:text-white transition-colors">Digital Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Our Legacy</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Bespoke Services</a></li>
              <li><a href="#jobs" className="hover:text-white transition-colors">Global Openings</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-royal-gold mb-10">Direct Access</h3>
            <ul className="space-y-6 text-sm font-bold text-slate-400 font-inter">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-royal-gold rounded-full"></span> Recruitment Search</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-royal-gold rounded-full"></span> Visa Mobility</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-royal-gold rounded-full"></span> Document Audit</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-royal-gold rounded-full"></span> Career Strategy</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-royal-gold mb-10">Legal Authority</h3>
            <div className="bg-white/5 p-8 rounded-[35px] border border-white/10 text-[10px] space-y-6 group hover:bg-white/10 transition-all duration-500">
               <div>
                  <p className="font-black text-slate-400 mb-2 uppercase tracking-widest">RA LICENSE</p>
                  <p className="text-white font-black text-xs tracking-widest">B-3077/HP/PART/100/11087/2025</p>
               </div>
               <div>
                  <p className="font-black text-slate-400 mb-2 uppercase tracking-widest">REGISTRATION ID</p>
                  <p className="text-white font-black text-xs tracking-widest uppercase">RA6341360</p>
               </div>
               <p className="pt-4 border-t border-white/5 text-[9px] text-royal-gold font-bold italic">Ministry of External Affairs Approved</p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-inter">
            &copy; {currentYear} Career Enterprises. Managed by Executive Board.
          </p>
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-royal-gold hover:text-white transition-colors"
          >
            VITAL RESET <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
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
      className="fixed bottom-10 right-10 z-40 bg-midnight text-royal-gold p-5 rounded-[25px] shadow-2xl hover:scale-110 transition-all duration-500 group flex items-center gap-3 border border-royal-gold/30 hover:bg-royal-gold hover:text-midnight"
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-700 text-[10px] font-black uppercase tracking-widest">
        DISPATCH QUERY
      </span>
      <div className="w-6 h-6 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-2.32 0-4.591 1.342-4.591 3.27 0 .462.115.924.347 1.33l-.155.54a1.32 1.32 0 0 0-.012.33 1.31 1.31 0 0 0 .152.296l.332.613c.231.432.551.812.946 1.111.455.343.91.543 1.332.603.421.06 1.05.06 1.442.222.392.162.62.585.832.964l.325.592c.15.27.34.498.56.674a1.71 1.71 0 0 0 .97.352 1.54 1.54 0 0 0 .892-.257 1.75 1.75 0 0 0 .73-.72l.44-1.077c.184-.448.24-.91.168-1.373a2.3 2.3 0 0 0-.348-1.002l-.65-1.127a3.4 3.4 0 0 0-.91-1.025 4.1 4.1 0 0 0-.853-.453l-.534-.2c-.3-.112-.62-.234-.94-.372l-.46-.2a3.8 3.8 0 0 0-.54-.2 3.7 3.7 0 0 0-.6-.088 3.4 3.4 0 0 0-.6.042l-.54.088c-.18.044-.35.1-.51.17l-.46.216z"/></svg>
      </div>
    </a>
  );
};
