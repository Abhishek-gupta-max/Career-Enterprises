import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import heroBg from '../assets/hero_bg.png';

const Hero = () => {
  return (
    <section id="home" className="relative min-height-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-navy/95 via-primary-navy/80 to-transparent"></div>
      </div>

      <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center py-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white"
        >
          <div className="inline-flex items-center gap-2 bg-secondary-gold/20 text-secondary-gold px-4 py-2 rounded-full text-sm font-bold mb-6 border border-secondary-gold/30">
            <CheckCircle2 size={16} /> 
            MEA Approved Recruitment Agency
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Empowering Your <br />
            <span className="text-secondary-gold">Global Career</span> Dreams
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-lg leading-relaxed">
            Career Enterprises is your trusted partner for premium overseas placement and recruitment services. Join thousands of professionals who have started their global journey with us.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#jobs" className="btn-secondary px-8 py-4 flex items-center gap-2">
              Explore Jobs <ArrowRight size={20} />
            </a>
            <a href="#about" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-bold hover:bg-white/20 transition-all">
              Learn More
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div>
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-xs text-blue-200 uppercase tracking-widest">Candidates Placed</div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div>
              <div className="text-2xl font-bold">15+</div>
              <div className="text-xs text-blue-200 uppercase tracking-widest">Countries</div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div>
              <div className="text-2xl font-bold">100%</div>
              <div className="text-xs text-blue-200 uppercase tracking-widest">Compliance</div>
            </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
           className="hidden md:block relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
             <div className="absolute inset-0 bg-primary-navy/20"></div>
             <div className="p-8 bg-white/5 backdrop-blur-md">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white/10 p-4 rounded-xl border border-white/10 h-32 flex flex-col justify-end">
                       <div className="w-8 h-8 bg-secondary-gold rounded-lg mb-2"></div>
                       <div className="h-2 w-12 bg-white/30 rounded mb-1"></div>
                       <div className="h-2 w-20 bg-white/20 rounded"></div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
          {/* Abstract blobs */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary-gold/20 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-light/30 blur-3xl rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
