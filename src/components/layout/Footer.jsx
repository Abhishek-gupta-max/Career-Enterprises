import { Link } from 'react-router-dom';
import { Globe, Facebook, Instagram, Linkedin, ArrowUp, Phone, Mail, MapPin } from 'lucide-react';
import logo from '../../assets/logo.jpg';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-midnight dark:bg-dark-surface text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-royal-gold/40 to-transparent" />

      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                <img src={logo} alt="CE Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-lg font-black font-outfit">CAREER <span className="text-royal-gold">ENTERPRISES</span></p>
                <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-royal-gold/70">Elite Overseas</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Government-approved overseas recruitment agency connecting Indian talent with premium global employers since 2020.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: 'https://www.instagram.com/reel/DOWDphwEvtH/?igsh=emkzcXRremZ0Zzcx', label: 'Instagram' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target={href !== '#' ? '_blank' : undefined}
                  rel={href !== '#' ? 'noopener noreferrer' : undefined} aria-label={label}
                  className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center hover:bg-royal-gold hover:text-midnight transition-all duration-300 border border-white/5">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-royal-gold mb-8">Quick Links</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              {[
                { label: 'Home', to: '/' },
                { label: 'Browse Jobs', to: '/jobs' },
                { label: 'Saved Jobs', to: '/saved' },
                { label: 'About Us', to: '/#about' },
                { label: 'Contact', to: '/#contact' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-royal-gold/40 rounded-full group-hover:bg-royal-gold transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-royal-gold mb-8">Services</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              {['Overseas Job Placement', 'Manpower Recruitment', 'Visa Facilitation', 'Document Attestation', 'Career Consultancy'].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-royal-gold/40 rounded-full" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-royal-gold mb-8">Contact</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <a href="tel:+919805523265" className="flex items-center gap-3 hover:text-white transition-colors">
                  <Phone size={14} className="text-royal-gold flex-shrink-0" /> +91-9805523265
                </a>
              </li>
              <li>
                <a href="mailto:careerenterprises0888@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors break-all">
                  <Mail size={14} className="text-royal-gold flex-shrink-0" /> careerenterprises0888@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-royal-gold flex-shrink-0 mt-0.5" />
                <span>Himachal Pradesh, India</span>
              </li>
            </ul>

            {/* Legal box */}
            <div className="mt-6 bg-white/5 rounded-2xl p-4 text-[10px] border border-white/5 space-y-2">
              <div>
                <p className="text-slate-500 uppercase tracking-widest font-bold">RA License</p>
                <p className="text-white font-bold text-xs mt-0.5 font-mono">B-3077/HP/PART/100/11087/2025</p>
              </div>
              <div>
                <p className="text-slate-500 uppercase tracking-widest font-bold">RA ID</p>
                <p className="text-white font-bold text-xs mt-0.5 font-mono">RA6341360</p>
              </div>
              <p className="text-royal-gold font-bold italic pt-1 border-t border-white/5">Ministry of External Affairs Approved</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-medium">
            © {year} Career Enterprises. All rights reserved. MEA Approved Recruitment Agency.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="flex items-center gap-2 text-xs font-bold text-royal-gold hover:text-white transition-colors group"
          >
            Back to Top <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919805523265"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-2xl shadow-2xl shadow-green-500/30 hover:scale-110 transition-all duration-300 flex items-center justify-center"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}
