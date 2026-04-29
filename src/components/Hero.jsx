import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Users, Globe2, Award } from 'lucide-react';
import heroBg from '../assets/hero_bg.png';

const stats = [
  { value: '1000+', label: 'Candidates Placed' },
  { value: '15+', label: 'Countries' },
  { value: '100%', label: 'Compliance' },
];

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-midnight">

      {/* ── Cinematic Hero Background ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Career Enterprises team collaborating"
          className="absolute inset-0 w-full h-full object-cover object-left scale-105"
          style={{ opacity: 0.45 }}
        />
        {/* left-to-right gradient so the text on the right reads cleanly */}
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/30 via-midnight/60 to-midnight/90" />
        {/* bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
        {/* subtle gold shimmer top-right */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-royal-gold/10 to-transparent opacity-60" />
      </div>

      {/* ── Content ── */}
      <div className="container relative z-10 flex flex-col md:flex-row items-center gap-12 py-16">

        {/* Left spacer — lets the boardroom photo breathe on desktop */}
        <div className="hidden md:block md:w-5/12 lg:w-1/2" aria-hidden="true" />

        {/* Right — text panel sitting over the negative space of the image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="w-full md:w-7/12 lg:w-1/2 text-white"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-royal-gold/10 text-royal-gold px-5 py-2 rounded-full text-xs font-black mb-8 border border-royal-gold/20 backdrop-blur-sm tracking-widest uppercase"
          >
            <CheckCircle2 size={14} /> ISO 9001:2015 &amp; MEA APPROVED
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 font-outfit tracking-tight">
            Connecting{' '}
            <span className="text-gradient-gold">World-Class</span>
            <br />Talent Globally
          </h1>

          <p className="text-lg text-slate-300 mb-10 max-w-lg leading-relaxed font-inter">
            Career Enterprises delivers elite recruitment solutions for high-impact overseas roles.
            We bridge the gap between ambition and global opportunity.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <a href="#jobs" className="btn-gold group flex items-center gap-3">
              Explore Openings
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#about"
              className="px-7 py-4 rounded-xl font-bold border border-white/25 hover:bg-white/8 transition-all flex items-center gap-2 backdrop-blur-sm"
            >
              Our Legacy
            </a>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-8 flex-wrap">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-white">{s.value}</span>
                  <span className="text-[10px] text-royal-gold font-bold uppercase tracking-widest mt-1">
                    {s.label}
                  </span>
                </div>
                {i < stats.length - 1 && (
                  <div className="w-px h-10 bg-white/15" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-bold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-px h-8 bg-gradient-to-b from-royal-gold/80 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
