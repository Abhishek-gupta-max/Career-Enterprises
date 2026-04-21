import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, FileCheck } from 'lucide-react';

const CredentialGallery = () => {
  const cards = [
    {
      title: "Executive ID",
      name: "Mr. Vikas",
      img: "/src/assets/card_vikas_legal.jpg",
      desc: "Top profile identifying the strategic direction and partnership lead."
    },
    {
      title: "Talent ID",
      name: "Mr. Ravi Rana",
      img: "/src/assets/card_ravi.jpg",
      desc: "Verification for our lead Hiring Manager and talent specialist."
    },
    {
      title: "Advisory ID",
      name: "Vishal Rana",
      img: "/src/assets/card_vishal.jpg",
      desc: "Certification for our senior documentation and career consultant."
    },
    {
      title: "Operational ID",
      name: "Miss Ravinder Kaur",
      img: "/src/assets/card_ravinder.jpg",
      desc: "Official recognition for our operations management lead."
    },
    {
      title: "Legal Accreditation",
      name: "MEA License",
      img: "/src/assets/card_vikas_legal.jpg", // The bottom half of this card
      desc: "Government of India registered license (B-3077/HP/PART/100/11087/2025)."
    }
  ];

  return (
    <section id="credentials" className="section bg-midnight py-32 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white opacity-[0.03] pointer-events-none"></div>
      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="text-royal-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4 block underline decoration-royal-gold/30 underline-offset-8">Verification Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-black text-white font-outfit">Official <span className="text-royal-gold">Certifications</span></h2>
          <p className="text-slate-400 mt-6 max-w-xl mx-auto font-inter text-sm">
            We operate with absolute transparency. Every member of our board is officially verified and our agency is licensed by the Ministry of External Affairs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group cursor-pointer"
            >
              <div className="relative glass-card p-2 rounded-[40px] overflow-hidden shadow-2xl group-hover:shadow-royal-gold/20 transition-all duration-700">
                <div className="aspect-[1.6/1] bg-slate-900 rounded-[35px] overflow-hidden">
                   <img 
                    src={card.img} 
                    alt={card.title} 
                    className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 object-center`}
                   />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-royal-gold text-[9px] font-black uppercase tracking-[0.2em]">{card.title}</span>
                    <ShieldCheck size={18} className="text-royal-gold" />
                  </div>
                  <h3 className="text-xl font-black text-white font-outfit tracking-tight mb-3 group-hover:text-royal-gold transition-colors">{card.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-inter">{card.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Verification Badge Callout */}
          <div className="lg:col-span-1 flex items-center justify-center">
             <div className="text-center p-12 rounded-[50px] border-2 border-dashed border-white/10 hover:border-royal-gold/30 transition-all duration-700 group">
                <div className="w-20 h-20 bg-royal-gold rounded-full flex items-center justify-center text-midnight mx-auto mb-8 shadow-xl shadow-royal-gold/20 group-hover:scale-110 transition-transform">
                   <Award size={40} />
                </div>
                <h4 className="text-white font-black text-xl font-outfit mb-4">100% Verified Agency</h4>
                <p className="text-slate-500 text-xs font-inter leading-relaxed max-w-[200px] mx-auto uppercase tracking-widest font-black">Adhering to Emigration Act Guidelines</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialGallery;
