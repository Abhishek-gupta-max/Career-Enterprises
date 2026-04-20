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
    <section id="services" className="section bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-secondary-gold font-bold uppercase tracking-widest text-sm"
          >
            What We Offer
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mt-2 text-primary-navy"
          >
            Our Core Services
          </motion.h2>
          <div className="w-20 h-1 bg-secondary-gold mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-bg-light p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center text-primary-navy mb-6 group-hover:bg-primary-navy group-hover:text-white transition-all">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-primary-navy">{service.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center text-secondary-gold font-bold text-sm cursor-pointer hover:gap-2 transition-all">
                    Learn More <ChevronRight size={16} />
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
