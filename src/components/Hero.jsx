import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import heroBg from '../assets/hero_bg.png';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-midnight">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
          style={{ backgroundImage: `url(${heroBg})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/80 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-royal-gold/10 to-transparent opacity-50"></div>
      </div>

      <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center py-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white"
        >
          <div className="inline-flex items-center gap-2 bg-royal-gold/10 text-royal-gold px-5 py-2 rounded-full text-xs font-black mb-8 border border-royal-gold/20 backdrop-blur-sm tracking-widest uppercase">
            <CheckCircle2 size={14} className="text-royal-gold" /> 
            ISO 9001:2015 & MEA APPROVED
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8 font-outfit tracking-tight">
            Connecting <span className="text-gradient-gold">World-Class</span> <br />
            Talent Premia
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-xl leading-relaxed font-inter">
            Career Enterprises delivers elite recruitment solutions for high-impact overseas roles. We bridge the gap between ambition and global opportunity.
          </p>
          <div className="flex flex-wrap gap-5">
            <a href="#jobs" className="btn-gold group flex items-center gap-3">
              Explore Openings <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about" className="px-8 py-4 rounded-xl font-bold border border-white/20 hover:bg-white/5 transition-all flex items-center gap-2">
              OUR LEGACY
            </a>
          </div>
          
          <div className="mt-16 flex items-center gap-10">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white">1000+</span>
              <span className="text-[10px] text-royal-gold font-bold uppercase tracking-widest mt-1">Candidates Placed</span>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white">15+</span>
              <span className="text-[10px] text-royal-gold font-bold uppercase tracking-widest mt-1">Countries</span>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white">100%</span>
              <span className="text-[10px] text-royal-gold font-bold uppercase tracking-widest mt-1">Compliance</span>
            </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
           className="hidden md:block relative"
        >
          <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border border-white/10">
             <div className="absolute inset-0 bg-midnight/40 backdrop-blur-sm"></div>
             <div className="p-10 relative z-20">
                <div className="grid grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/10 h-32 flex flex-col justify-end group hover:bg-white/10 transition-all">
                       <div className="w-10 h-10 bg-royal-gold rounded-lg mb-3"></div>
                       <div className="h-2 w-12 bg-white/20 rounded mb-2"></div>
                       <div className="h-2 w-20 bg-white/10 rounded"></div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
          {/* Abstract blobs */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-royal-gold/10 blur-[80px] rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-slate-800/20 blur-[80px] rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
