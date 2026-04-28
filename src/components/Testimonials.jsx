import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Electrical Engineer, Dubai",
    content: "Career Enterprises made my dream of working overseas a reality. The team guided me through every step of the documentation and visa process.",
    stars: 5
  },
  {
    name: "Priya Patel",
    role: "Hospitality Professional, Qatar",
    content: "Professional, transparent, and extremely helpful. Vikas and his team are dedicated to finding the best opportunities for candidates.",
    stars: 5
  },
  {
    name: "Aman Deep",
    role: "Healthcare Professional, Saudi Arabia",
    content: "The recruitment process was smooth and ethical. I highly recommend Career Enterprises for anyone looking for legitimate overseas job assistance.",
    stars: 5
  }
];

const Testimonials = () => {
  return (
    <section className="section bg-white dark:bg-dark-surface py-6 md:py-10 overflow-hidden border-t border-slate-100 dark:border-dark-border">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-6">
          <span className="text-royal-gold font-black uppercase tracking-[0.3em] text-[10px] mb-2 block underline decoration-royal-gold/30 underline-offset-8">Success Stories</span>
          <h2 className="text-4xl md:text-5xl font-black text-midnight dark:text-white font-outfit">What Our <span className="text-royal-gold">Candidates</span> Say</h2>
          <p className="text-slate-500 mt-6 max-w-xl mx-auto font-inter text-sm leading-relaxed">
            Real stories from real people who successfully moved overseas with Career Enterprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="glass-card p-10 rounded-[40px] relative border border-slate-100 dark:border-white/5 hover:shadow-2xl hover:shadow-royal-gold/5 transition-all duration-500 group"
            >
              <div className="absolute top-8 right-10 text-royal-gold/10 group-hover:text-royal-gold/20 transition-colors">
                <Quote size={48} />
              </div>
              <div className="flex gap-1 mb-6">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} size={14} className="fill-royal-gold text-royal-gold" />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic mb-8 leading-relaxed font-medium text-sm md:text-base">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-white/5">
                <div className="w-12 h-12 bg-gradient-to-br from-midnight to-slate-800 rounded-2xl flex items-center justify-center text-royal-gold font-black text-lg shadow-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-midnight dark:text-white leading-tight font-outfit">{t.name}</h4>
                  <p className="text-[10px] font-bold text-royal-gold uppercase tracking-wider mt-1">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
