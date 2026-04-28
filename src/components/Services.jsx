import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, FileText, Briefcase, ChevronRight } from 'lucide-react';
import servicesData from '../data/services.json';

const iconMap = {
  Globe,
  Users,
  FileText,
  Briefcase
};

const Services = () => {
  return (
    <section id="services" className="section bg-midnight relative py-12 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-royal-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="container px-6 mx-auto">
        <div className="text-center mb-8">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-royal-gold font-black uppercase tracking-[0.3em] text-[10px] mb-2 block underline decoration-royal-gold/30 underline-offset-8"
          >
            Capabilities
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white font-outfit"
          >
            Bespoke <span className="text-royal-gold">Placement</span> Solutions
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group bg-white/5 backdrop-blur-md p-12 rounded-[50px] border border-white/5 hover:bg-white/10 hover:border-royal-gold/20 transition-all duration-500 relative"
              >
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-royal-gold mb-10 group-hover:bg-royal-gold group-hover:text-midnight transition-all duration-500 shadow-lg">
                  <Icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-white mb-6 font-outfit tracking-tight leading-tight">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-inter line-clamp-3">
                  {service.description}
                </p>
                <div className="mt-10 flex items-center gap-3 text-royal-gold font-black text-[10px] uppercase tracking-widest cursor-pointer group/link">
                    EXPAND DETAILS <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
