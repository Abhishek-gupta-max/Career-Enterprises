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
    <section className="section bg-white overflow-hidden">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-secondary-gold font-bold uppercase tracking-widest text-sm">Success Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary-navy">What Our Candidates Say</h2>
          <div className="w-20 h-1 bg-secondary-gold mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-bg-light p-8 rounded-3xl relative border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="absolute top-6 right-8 text-primary-navy/10">
                <Quote size={40} />
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} size={16} className="fill-secondary-gold text-secondary-gold" />
                ))}
              </div>
              <p className="text-text-muted italic mb-6 leading-relaxed">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-navy rounded-full flex items-center justify-center text-white font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-primary-navy leading-tight">{t.name}</h4>
                  <p className="text-xs text-text-muted">{t.role}</p>
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
