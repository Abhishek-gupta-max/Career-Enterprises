import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Linkedin, ExternalLink } from 'lucide-react';
import ownerImg from '../assets/owner.jpg';
import raviCard from '../assets/card_ravi.jpg';
import vishalCard from '../assets/card_vishal.jpg';
import ravinderCard from '../assets/card_ravinder.jpg';

const Team = () => {
  const team = [
    {
      name: "Mr. Vikas",
      role: "Strategic Visionary",
      phone: "+91-7807464389",
      email: "careerenterprises0786@gmail.com",
      image: ownerImg,
      imgClass: "object-cover object-center",
      bio: "Leading the global expansion and strategic partnerships of Career Enterprises."
    },
    {
      name: "Mr. Ravi Rana",
      role: "Hiring Manager",
      phone: "+91-9805364389",
      email: "careerenterprises0888@gmail.com",
      image: raviCard,
      imgClass: "object-cover object-center",
      bio: "Executive lead for high-impact candidate placements and industry relations."
    },
    {
      name: "Vishal Rana",
      role: "Senior advisor",
      phone: "+91-8988637863",
      email: "careerenterprises0888@gmail.com",
      image: vishalCard,
      imgClass: "object-cover object-center",
      bio: "Consultancy expert specializing in documentation and international mobility."
    },
    {
      name: "Miss Ravinder Kaur",
      role: "Operations Manager",
      phone: "+91-9805523265",
      email: "careerenterprises0888@gmail.com",
      image: ravinderCard,
      imgClass: "object-cover object-center",
      bio: "Overseeing seamless operation and compliance for all global recruitment cycles."
    }
  ];

  return (
    <section id="team" className="section bg-white py-6 md:py-10 overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-8">
          <span className="text-royal-gold font-black uppercase tracking-[0.3em] text-[10px] mb-2 block underline decoration-royal-gold/30 underline-offset-8">The Advisory Board</span>
          <h2 className="text-4xl md:text-5xl font-black text-midnight font-outfit">The Minds Behind <br /><span className="text-royal-gold">Your Success</span></h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group bg-black rounded-[37px] overflow-hidden shadow-2xl shadow-black/40 group-hover:shadow-royal-gold/20 transition-all duration-700"
            >
              <div className="relative aspect-[1.2/1] flex items-center justify-center bg-black">
                <img
                  src={member.image}
                  alt={member.name}
                  className={`w-full h-full transition-transform duration-1000 group-hover:scale-105 ${member.imgClass || 'object-contain p-2 object-center'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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

              <div className="px-5 py-5">
                <h3 className="text-xl font-black text-white font-outfit tracking-tight mb-1 group-hover:text-royal-gold transition-colors">{member.name}</h3>
                <p className="text-royal-gold text-[10px] font-black uppercase tracking-[0.2em] mb-3">{member.role}</p>
                <p className="text-slate-300 text-sm leading-relaxed font-inter line-clamp-2">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
