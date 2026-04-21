import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Linkedin, ExternalLink } from 'lucide-react';

const Team = () => {
  const team = [
    {
      name: "Mr. Vikas",
      role: "Strategic Visionary",
      phone: "+91-7807464389",
      email: "careerenterprises0786@gmail.com",
      image: "/src/assets/card_vikas_legal.jpg", 
      imgClass: "object-cover object-top",
      bio: "Leading the global expansion and strategic partnerships of Career Enterprises."
    },
    {
      name: "Mr. Ravi Rana",
      role: "Hiring Manager",
      phone: "+91-9805364389",
      email: "careerenterprises0888@gmail.com",
      image: "/src/assets/card_ravi.jpg",
      bio: "Executive lead for high-impact candidate placements and industry relations."
    },
    {
      name: "Vishal Rana",
      role: "Senior advisor",
      phone: "+91-8988637863",
      email: "careerenterprises0888@gmail.com",
      image: "/src/assets/card_vishal.jpg",
      bio: "Consultancy expert specializing in documentation and international mobility."
    },
    {
      name: "Miss Ravinder Kaur",
      role: "Operations Manager",
      phone: "+91-9805523265",
      email: "careerenterprises0888@gmail.com",
      image: "/src/assets/card_ravinder.jpg",
      bio: "Overseeing seamless operation and compliance for all global recruitment cycles."
    }
  ];

  return (
    <section id="team" className="section bg-white py-32 overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-24">
          <span className="text-royal-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4 block underline decoration-royal-gold/30 underline-offset-8">The Advisory Board</span>
          <h2 className="text-4xl md:text-5xl font-black text-midnight font-outfit">The Minds Behind <br /><span className="text-royal-gold">Your Success</span></h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group"
            >
              <div className="relative mb-8 rounded-[40px] overflow-hidden bg-slate-100 aspect-[1.6/1] flex items-center justify-center shadow-2xl shadow-slate-200 group-hover:shadow-royal-gold/20 transition-all duration-700">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className={`w-full h-full transition-transform duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105 ${member.imgClass || 'object-contain p-2 object-center'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-white">
                    <div className="flex gap-4">
                      <a href={`tel:${member.phone}`} className="w-10 h-10 bg-royal-gold rounded-full flex items-center justify-center text-midnight hover:bg-white transition-colors">
                        <Phone size={18} />
                      </a>
                      <a href={`mailto:${member.email}`} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-royal-gold hover:text-midnight transition-colors">
                        <Mail size={18} />
                      </a>
                    </div>
                    <ExternalLink size={20} className="text-royal-gold" />
                  </div>
                </div>
              </div>
              
              <div className="px-2">
                <h3 className="text-2xl font-black text-midnight font-outfit tracking-tight mb-2 group-hover:text-royal-gold transition-colors">{member.name}</h3>
                <p className="text-royal-gold text-[10px] font-black uppercase tracking-[0.2em] mb-4">{member.role}</p>
                <p className="text-slate-400 text-sm leading-relaxed font-inter line-clamp-2">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
