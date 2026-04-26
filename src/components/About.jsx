import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Award, User } from 'lucide-react';
import ownerImg from '../assets/owner.jpg';

const About = () => {
  return (
    <section id="about" className="section bg-off-white overflow-hidden py-16 md:py-32">
      <div className="container px-6 mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="relative z-10 glass-card p-4 overflow-hidden shadow-2xl">
              <div className="aspect-square md:aspect-[4/3] bg-slate-200 flex items-center justify-center relative overflow-hidden rounded-[30px]">
                 <img 
                  src={ownerImg} 
                  alt="Mr. Vikas - Managing Director" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent"></div>
                 <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h3 className="text-3xl font-black font-outfit uppercase tracking-tight">Vikas</h3>
                    <p className="text-royal-gold font-black uppercase tracking-[0.3em] text-[10px] mt-2">Managing Director</p>
                 </div>
              </div>
          </div>
          {/* Abstract background flare */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-royal-gold/10 blur-[80px] rounded-full -z-10"></div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-midnight/5 blur-[80px] rounded-full -z-10"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col gap-10"
        >
          <div>
            <span className="text-royal-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4 block underline decoration-royal-gold/30 underline-offset-8">Our Heritage</span>
            <h2 className="text-4xl md:text-6xl font-black text-midnight font-outfit leading-tight lg:leading-[1.1] tracking-tight">
              Architecting <br /> 
              <span className="text-royal-gold">Global Legacies</span>
            </h2>
          </div>
          
          <p className="text-slate-500 leading-relaxed font-inter text-lg">
            Career Enterprises, founded by Executive Director Mr. Vikas, is a premier strategic recruitment firm. We specialize in identifying elite Indian talent for critical roles within the world's most high-impact markets.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-2">
             <div className="flex gap-5">
                <div className="flex-shrink-0 w-14 h-14 bg-midnight rounded-2xl flex items-center justify-center text-royal-gold shadow-lg">
                   <ShieldCheck size={28} />
                </div>
                <div>
                   <h4 className="font-black text-midnight font-outfit uppercase tracking-tight text-sm">Full Compliance</h4>
                   <p className="text-xs text-slate-400 mt-2 font-inter leading-relaxed">Direct adherence to MEA protocols and international labor legalities.</p>
                </div>
             </div>
             <div className="flex gap-5">
                <div className="flex-shrink-0 w-14 h-14 bg-midnight rounded-2xl flex items-center justify-center text-royal-gold shadow-lg">
                   <Target size={28} />
                </div>
                <div>
                   <h4 className="font-black text-midnight font-outfit uppercase tracking-tight text-sm">Global Precision</h4>
                   <p className="text-xs text-slate-400 mt-2 font-inter leading-relaxed">Sophisticated matchmaking between specific skills and high-demand sectors.</p>
                </div>
             </div>
          </div>

          <div className="bg-slate-50 p-10 rounded-[40px] border-l-8 border-royal-gold shadow-sm relative overflow-hidden">
             <p className="italic text-midnight font-bold font-inter text-lg leading-relaxed relative z-10 uppercase tracking-tight">
               "We catalyze human potential on a global scale. Our commitment is to the absolute trajectory of our candidates and the success of our partners."
             </p>
             <div className="mt-6 font-black text-royal-gold uppercase tracking-[0.4em] text-[10px] relative z-10">— Vikas, Strategic Director</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
