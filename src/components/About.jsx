import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Award, User } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section bg-bg-light overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="relative z-10 bg-primary-navy rounded-3xl overflow-hidden shadow-2xl">
              {/* Profile Image Placeholder */}
              <div className="aspect-[4/5] bg-slate-800 flex items-center justify-center relative overflow-hidden">
                 <User size={120} className="text-white/20" />
                 <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-primary-navy to-transparent text-white">
                    <h3 className="text-2xl font-bold">Vikas</h3>
                    <p className="text-secondary-gold font-semibold uppercase tracking-wider text-sm">Managing Partner</p>
                 </div>
              </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-secondary-gold rounded-3xl -z-10"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-primary-light rounded-3xl -z-10"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-6"
        >
          <span className="text-secondary-gold font-bold uppercase tracking-widest text-sm">About Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-navy">
            Your Trusted Partner in <br /> 
            <span className="gradient-text">Global Talent Migration</span>
          </h2>
          <p className="text-text-muted leading-relaxed">
            Career Enterprises, led by Partner Vikas, is a premier recruitment firm based in Una, Himachal Pradesh. We specialize in bridging the gap between exceptional Indian talent and global opportunities across the UAE, Qatar, Saudi Arabia, and beyond.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
             <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary-navy shadow-sm">
                   <ShieldCheck size={24} />
                </div>
                <div>
                   <h4 className="font-bold text-primary-navy">Fully Licensed</h4>
                   <p className="text-xs text-text-muted mt-1">MEA Approved agency with valid RA License.</p>
                </div>
             </div>
             <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary-navy shadow-sm">
                   <Target size={24} />
                </div>
                <div>
                   <h4 className="font-bold text-primary-navy">Global Network</h4>
                   <p className="text-xs text-text-muted mt-1">Partnerships with top employers worldwide.</p>
                </div>
             </div>
             <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary-navy shadow-sm">
                   <Award size={24} />
                </div>
                <div>
                   <h4 className="font-bold text-primary-navy">Ethical Practice</h4>
                   <p className="text-xs text-text-muted mt-1">Transparency and integrity in every placement.</p>
                </div>
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border-l-4 border-secondary-gold shadow-sm mt-4">
             <p className="italic text-text-dark font-medium">
               "Our mission is to empower professionals by providing them with the right platform to showcase their skills on a global stage while ensuring total compliance and quality."
             </p>
             <div className="mt-4 font-bold text-primary-navy">— Vikas, Partner</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
