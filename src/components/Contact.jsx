import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section bg-white overflow-hidden py-16 md:py-32">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-24">
          <span className="text-royal-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4 block underline decoration-royal-gold/30 underline-offset-8">Direct Access</span>
          <h2 className="text-4xl md:text-5xl font-black text-midnight font-outfit">Consult With Our <br /><span className="text-royal-gold">Advisory Board</span></h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Executive Directory */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50">
               <h3 className="text-xl font-black text-midnight mb-10 font-outfit uppercase tracking-tight">Expert Directory</h3>
               
               <div className="space-y-10 font-inter">
                  <div className="flex gap-6 group">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-royal-gold shadow-md group-hover:bg-midnight group-hover:text-white transition-all duration-500">
                        <Phone size={24} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mr. Ravi Rana (Hiring)</p>
                        <p className="text-sm font-black text-midnight">+91-9805364389</p>
                     </div>
                  </div>

                  <div className="flex gap-6 group">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-royal-gold shadow-md group-hover:bg-midnight group-hover:text-white transition-all duration-500">
                        <Phone size={24} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vishal Rana (Advisor)</p>
                        <p className="text-sm font-black text-midnight">+91-8988637863</p>
                     </div>
                  </div>

                  <div className="flex gap-6 group">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-royal-gold shadow-md group-hover:bg-midnight group-hover:text-white transition-all duration-500">
                        <Phone size={24} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mr. Vikas (Lead)</p>
                        <p className="text-sm font-black text-midnight">+91-7807464389</p>
                     </div>
                  </div>

                  <div className="flex gap-6 group">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-royal-gold shadow-md group-hover:bg-midnight group-hover:text-white transition-all duration-500">
                        <Mail size={24} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Official Emails</p>
                        <p className="text-sm font-black text-midnight">careerenterprises0888@gmail.com</p>
                        <p className="text-xs font-bold text-slate-400 mt-1">careerenterprises0786@gmail.com</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-midnight p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
               <div className="relative z-10">
                  <h4 className="text-xl font-black mb-3 font-outfit">Instant Engagement</h4>
                  <p className="text-sm text-slate-400 mb-8 leading-relaxed font-inter">Our consultants are available for real-time career auditing. Start your dossier review on WhatsApp.</p>
                  <a 
                   href="https://wa.me/917657950996" 
                   target="_blank" 
                   rel="noreferrer"
                   className="btn-gold w-full !py-4 flex items-center justify-center gap-3 shadow-royal-gold/20"
                  >
                     <MessageSquare size={20} /> INITIATE CHAT
                  </a>
               </div>
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-royal-gold/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 md:p-16 rounded-[50px] border border-slate-100 shadow-2xl shadow-slate-200/50 h-full relative">
               <h3 className="text-2xl font-black text-midnight mb-12 font-outfit">Dispatch Your Message</h3>
               
               <form className="space-y-8 font-inter">
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Full Identity</label>
                        <input type="text" placeholder="EX: JOHN DOE" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-royal-gold/20 transition-all text-sm font-bold" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Email Address</label>
                        <input type="email" placeholder="EX: JOHN@DOMAIN.COM" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-royal-gold/20 transition-all text-sm font-bold" />
                     </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Direct Line</label>
                        <input type="tel" placeholder="+91 XXXX XXX XXX" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-royal-gold/20 transition-all text-sm font-bold" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Sector of Interest</label>
                        <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-royal-gold/20 transition-all text-sm font-bold appearance-none">
                           <option>GLOBAL RECRUITMENT</option>
                           <option>DOCUMENTATION SUPPORT</option>
                           <option>VISA FACILITATION</option>
                           <option>OTHER INQUIRIES</option>
                        </select>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Inquiry Narrative</label>
                     <textarea rows="5" placeholder="HOW CAN OUR ADVISORS ASSIST YOU today?" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-royal-gold/20 transition-all resize-none text-sm font-bold"></textarea>
                  </div>

                  <button type="submit" className="btn-gold w-full md:w-auto !py-5 !px-16 flex items-center justify-center gap-3">
                     DISPATCH MESSAGE <Send size={20} />
                  </button>
               </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
