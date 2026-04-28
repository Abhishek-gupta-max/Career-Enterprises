import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, History, Zap } from 'lucide-react';

const Trust = () => {
  const reasons = [
    {
      title: "Government Verified",
      desc: "Operating with a formal Ministry of External Affairs License (RA No: B-3077/HP/PART/100/11087/2025).",
      icon: <Shield size={32} />
    },
    {
      title: "Executive Reach",
      desc: "A proven track record of placing high-impact talent across global industries.",
      icon: <History size={32} />
    },
    {
      title: "Rapid Mobility",
      desc: "Our expertise in global documentation ensures elite speed in visa and permit processing.",
      icon: <Zap size={32} />
    },
    {
      title: "Radical Transparency",
      desc: "We provide absolute clarity and integrity throughout every recruitment cycle.",
      icon: <CheckCircle2 size={32} />
    }
  ];

  return (
    <section className="section bg-midnight relative py-12">
      <div className="absolute top-0 right-0 w-96 h-96 bg-royal-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="container relative z-10 px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-6">
          <div className="max-w-2xl">
            <span className="text-royal-gold font-black uppercase tracking-[0.3em] text-[10px] mb-2 block underline decoration-royal-gold/30 underline-offset-8">Why Alignment Matters</span>
            <h2 className="text-4xl md:text-5xl font-black text-white font-outfit">The Standard of <br /><span className="text-royal-gold">Excellence</span></h2>
          </div>
          <p className="text-slate-400 max-w-sm font-inter text-sm leading-relaxed">
            We don't just recruit; we architect global careers through verified legal frameworks and elite industry partnerships.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group bg-white/5 backdrop-blur-md p-10 rounded-[40px] border border-white/5 hover:border-royal-gold/30 hover:bg-white/10 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-royal-gold rounded-3xl flex items-center justify-center text-midnight mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-royal-gold/20">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-white mb-4 font-outfit tracking-tight">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-inter">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Prominent Legal Credentials */}
        <div className="mt-10">
          <div className="bg-gradient-to-br from-midnight to-slate-900 p-1 md:p-2 rounded-[50px] shadow-2xl">
            <div className="bg-midnight rounded-[45px] p-10 md:p-20 border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-royal-gold/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>

              <div className="text-center lg:text-left z-10">
                <span className="text-royal-gold text-[10px] font-black uppercase tracking-[0.4em] mb-6 block">Legal Certifications</span>
                <h4 className="text-3xl md:text-4xl font-black text-white font-outfit mb-8">Verified Authority</h4>
                <p className="text-slate-400 max-w-md text-sm font-inter leading-relaxed">
                  Career Enterprises is a fully licensed agency approved by the **Ministry of External Affairs, India**. We adhere to the highest standards of international emigration compliance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-auto z-10">
                <div className="bg-white/5 p-8 rounded-[35px] border border-white/5 hover:bg-white/10 transition-all">
                  <p className="text-[9px] font-black text-royal-gold uppercase tracking-[0.3em] mb-4">LIC Number</p>
                  <p className="text-white text-lg font-black tracking-widest font-mono">B-3077/HP/PART/100/11087/2025</p>
                  <p className="text-[9px] font-black text-royal-gold uppercase tracking-[0.3em] mb-4">RA ID Number</p>
                  <p className="text-white text-lg font-black tracking-widest font-mono">RA6341360</p>
                </div>
                {/* <div className="bg-white/5 p-8 rounded-[35px] border border-white/5 hover:bg-white/10 transition-all">
                       <p className="text-[9px] font-black text-royal-gold uppercase tracking-[0.3em] mb-4">RA ID Number</p>
                       <p className="text-white text-lg font-black tracking-widest font-mono">RA6341360</p>
                    </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;
