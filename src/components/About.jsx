import React from 'react';
import { motion } from 'framer-motion';
import { Check, Award } from 'lucide-react';
import ownerImg from '../assets/owner.jpg';

const About = () => {
  return (
    <section id="about" className="section bg-white dark:bg-slate-950 overflow-hidden py-20">
      <div className="container px-6 mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Image with Badge */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-900">
            <div className="aspect-[4/5] relative">
              <img 
                src={ownerImg} 
                alt="Mr. Vikas - Managing Director" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-2xl font-bold font-heading">Mr. Vikas</h3>
                <p className="text-primary font-semibold text-xs uppercase tracking-widest mt-1">Managing Director</p>
              </div>
            </div>
          </div>
          
          {/* Stats badge */}
          <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 z-20 hidden md:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Award size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main dark:text-white font-heading">15+</p>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Years Excellence</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8"
        >
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-4 block">OUR HERITAGE</span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-text-main dark:text-white leading-tight font-heading">
              Architecting <br /> 
              <span className="text-primary">Global Legacies</span>
            </h2>
          </div>
          
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-inter text-lg">
            Career Enterprises, founded by Executive Director Mr. Vikas, is a premier strategic recruitment firm. We specialize in identifying elite Indian talent for critical roles within the world's most high-impact markets.
          </p>
          
          <div className="space-y-4">
            {[
              "Direct adherence to MEA protocols",
              "Sophisticated skill-based matchmaking",
              "Ethical and transparent processes",
              "Comprehensive pre-deployment support"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="text-text-main dark:text-slate-200 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-slate-50/50 dark:bg-slate-900/50 p-8 rounded-3xl border-l-[6px] border-primary relative overflow-hidden italic shadow-sm mt-4">
             <p className="text-slate-700 dark:text-slate-200 text-lg leading-relaxed relative z-10 font-medium font-inter">
               "We catalyze human potential on a global scale. Our commitment is to the absolute trajectory of our candidates and the success of our partners."
             </p>
             <div className="mt-4 font-bold text-primary uppercase tracking-[0.2em] text-[11px] relative z-10">— VIKAS, STRATEGIC DIRECTOR</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
