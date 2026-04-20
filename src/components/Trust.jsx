import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, History, Zap } from 'lucide-react';

const Trust = () => {
  const reasons = [
    {
      title: "100% Legal & Licensed",
      desc: "Operating with a valid Ministry of External Affairs License (RA No: B-3077/HP/PART/100/5/11087/2025).",
      icon: <Shield size={32} className="text-secondary-gold" />
    },
    {
      title: "Proven Track Record",
      desc: "Years of experience in placement across multiple industries with a high success rate.",
      icon: <History size={32} className="text-secondary-gold" />
    },
    {
      title: "Fast Visa Processing",
      desc: "Our expertise in documentation ensures minimal delays in visa and permit processing.",
      icon: <Zap size={32} className="text-secondary-gold" />
    },
    {
      title: "Candidate Focused",
      desc: "We prioritize candidate welfare and transparency throughout the recruitment cycle.",
      icon: <CheckCircle2 size={32} className="text-secondary-gold" />
    }
  ];

  return (
    <section className="section bg-primary-navy text-white overflow-hidden relative">
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Career Enterprises?</h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            We are committed to providing ethical and reliable recruitment services that benefit both the employer and the employee.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {reasons.map((item, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-secondary-gold/50 transition-all"
             >
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{item.desc}</p>
             </motion.div>
           ))}
        </div>

        {/* Prominent License Badge */}
        <div className="mt-20 flex flex-col items-center">
           <div className="inline-block bg-white text-primary-navy p-8 rounded-3xl shadow-2xl border-4 border-secondary-gold">
              <div className="text-center">
                 <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Government of India Registered</h4>
                 <div className="text-2xl md:text-3xl font-black mb-1">RA LICENSE NO:</div>
                 <div className="text-xl md:text-2xl font-bold text-secondary-gold">B-3077/HP/PART/100/5/11087/2025</div>
              </div>
           </div>
           <p className="mt-6 text-blue-200 text-xs text-center max-w-md">
             Verified agency under the Emigration Act. We strictly adhere to all guidelines set by the Ministry of External Affairs.
           </p>
        </div>
      </div>

      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full"></div>
         <div className="absolute bottom-10 right-10 w-96 h-96 border border-white rounded-full"></div>
      </div>
    </section>
  );
};

export default Trust;
