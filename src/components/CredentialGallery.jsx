import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, FileCheck } from 'lucide-react';
import vikasCard from '../assets/card_vikas_legal.jpg';
import raviCard from '../assets/card_ravi.jpg';
import vishalCard from '../assets/card_vishal.jpg';
import ravinderCard from '../assets/card_ravinder.jpg';
import cert1 from '../assets/cert_1.jpg';
import cert2 from '../assets/cert_2.jpg';
import cert3 from '../assets/cert_3.jpg';
import cert4 from '../assets/cert_4.jpg';

const CredentialGallery = () => {
  const cards = [

    {
      title: "Placement Verified",
      name: "Candidate Success #1",
      img: cert1,
      imgClass: "object-cover object-center",
      desc: "Official documentation and visa processing completed for overseas placement."
    },
    {
      title: "Placement Verified",
      name: "Candidate Success #2",
      img: cert2,
      imgClass: "object-cover object-center",
      desc: "Verified placement and deployment confirmation for our candidate."
    },
    {
      title: "Placement Verified",
      name: "Candidate Success #3",
      img: cert3,
      imgClass: "object-cover object-center",
      desc: "Candidate successfully processed for international employment opportunities."
    },
    {
      title: "Placement Verified",
      name: "Candidate Success #4",
      img: cert4,
      imgClass: "object-cover object-center",
      desc: "Full transparency in recruitment: another candidate successfully deployed."
    }
  ];

  return (
    <section id="credentials" className="section bg-midnight py-6 md:py-10 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white opacity-[0.03] pointer-events-none"></div>
      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center mb-8">
          <span className="text-royal-gold font-black uppercase tracking-[0.3em] text-[10px] mb-2 block underline decoration-royal-gold/30 underline-offset-8">Verification Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-black text-white font-outfit">Official <span className="text-royal-gold">Certifications</span></h2>
          <p className="text-slate-400 mt-6 max-w-xl mx-auto font-inter text-sm">
            We operate with absolute transparency. Every member of our board is officially verified and our agency is licensed by the Ministry of External Affairs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group cursor-pointer"
            >
              <div className="relative glass-card p-2 rounded-[40px] overflow-hidden shadow-2xl group-hover:shadow-royal-gold/20 transition-all duration-700">
                <div className="aspect-[1.6/1] bg-slate-900 rounded-[35px] overflow-hidden flex items-center justify-center">
                  <img
                    src={card.img}
                    alt={card.title}
                    className={`w-full h-full transition-transform duration-1000 group-hover:scale-105 ${card.imgClass || 'object-contain p-2 object-center'}`}
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
          <div className="lg:col-span-1 flex items-stretch justify-center">
            <div className="w-full flex flex-col justify-center p-10 rounded-[40px] bg-gradient-to-br from-royal-gold/10 to-royal-gold/5 border border-royal-gold/20 hover:border-royal-gold/50 transition-all duration-700 shadow-2xl shadow-royal-gold/5">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-royal-gold/20">
                <Award size={32} className="text-royal-gold" />
                <h4 className="text-white font-black text-xl font-outfit uppercase tracking-widest text-shadow">Govt. Certified</h4>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">LIC Number</p>
                  <p className="text-royal-gold font-black font-inter tracking-wider text-sm lg:text-base break-words">B-3077/HP/PART/100/11087/2025</p>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">RA ID Number</p>
                  <p className="text-white font-black font-inter tracking-widest text-lg lg:text-xl">RA6341360</p>
                </div>

                {/* <div>
                      <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">RA ID Number</p>
                      <p className="text-white font-black font-inter tracking-widest text-lg lg:text-xl">RA6341360</p>
                   </div> */}
              </div>

              <p className="text-slate-500 text-[10px] font-inter mt-8 uppercase tracking-widest font-black leading-relaxed">
                Fully Licensed & Approved by the Ministry of External Affairs, Govt. of India
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialGallery;
