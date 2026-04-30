import React from 'react';
import { motion } from 'framer-motion';
import ownerImg from '../assets/owner.jpg';
import vikasCard from '../assets/card_vikas_legal.jpg';
import raviCard from '../assets/card_ravi.jpg';
import vishalCard from '../assets/card_vishal.jpg';
import ravinderCard from '../assets/card_ravinder.jpg';
import deepakImg from '../assets/deepak_rana.jpg';

const Gallery = () => {
  const images = [
    { src: ownerImg, alt: "Office and Managing Director" },
    { src: vikasCard, alt: "MEA License and ID" },
    { src: raviCard, alt: "Hiring Manager" },
    { src: vishalCard, alt: "Advisor" },
    { src: ravinderCard, alt: "Operations Manager" },
    { src: deepakImg, alt: "Emigration Consultant" }
  ];

  return (
    <section id="gallery" className="section bg-white py-12 md:py-20">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-12">
          <span className="text-royal-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4 block underline decoration-royal-gold/30 underline-offset-8">Visual Insight</span>
          <h2 className="text-4xl md:text-5xl font-black text-midnight font-outfit">Our <span className="text-royal-gold">Gallery</span></h2>
          <p className="text-slate-500 mt-6 max-w-xl mx-auto font-inter text-sm">
            A glimpse into our professional environment and the verified team dedicated to your global career success.
          </p>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="break-inside-avoid shadow-xl shadow-slate-200/50 rounded-[30px] overflow-hidden group border border-slate-100"
            >
               <img 
                 src={img.src} 
                 alt={img.alt} 
                 className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
               />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
