import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section bg-bg-light">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-secondary-gold font-bold uppercase tracking-widest text-sm">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary-navy">Contact Us</h2>
          <div className="w-20 h-1 bg-secondary-gold mx-auto mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
               <h3 className="text-xl font-bold text-primary-navy mb-6">Store Details</h3>
               
               <div className="space-y-6">
                  <div className="flex gap-4">
                     <div className="w-12 h-12 bg-primary-navy/5 rounded-xl flex items-center justify-center text-primary-navy flex-shrink-0">
                        <MapPin size={24} />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Address</p>
                        <p className="text-sm font-medium mt-1">
                           3rd Floor, Una to Nangal Road, <br />
                           Opposite D.A.V. Public School, <br />
                           Una, Himachal Pradesh, India – 174303
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="w-12 h-12 bg-primary-navy/5 rounded-xl flex items-center justify-center text-primary-navy flex-shrink-0">
                        <Phone size={24} />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mobile</p>
                        <p className="text-sm font-medium mt-1">+91-7657950996</p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="w-12 h-12 bg-primary-navy/5 rounded-xl flex items-center justify-center text-primary-navy flex-shrink-0">
                        <Mail size={24} />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</p>
                        <p className="text-sm font-medium mt-1">careerenterprises0786@gmail.com</p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="w-12 h-12 bg-primary-navy/5 rounded-xl flex items-center justify-center text-primary-navy flex-shrink-0">
                        <Clock size={24} />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hours</p>
                        <p className="text-sm font-medium mt-1">Mon - Sat: 10:00 AM - 6:00 PM</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-secondary-gold p-8 rounded-3xl text-white shadow-xl">
               <h4 className="text-lg font-bold mb-2">Need Quick Assistance?</h4>
               <p className="text-sm opacity-90 mb-6">Chat with our experts directly on WhatsApp for faster response.</p>
               <a 
                href="https://wa.me/917657950996" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white text-secondary-gold w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-navy hover:text-white transition-all shadow-lg"
               >
                  <MessageSquare size={20} /> WhatsApp Us
               </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 h-full">
               <h3 className="text-xl font-bold text-primary-navy mb-8">Send Us a Message</h3>
               
               <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600">Full Name</label>
                        <input type="text" placeholder="John Doe" className="w-full bg-bg-light border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-navy transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600">Email Address</label>
                        <input type="email" placeholder="john@example.com" className="w-full bg-bg-light border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-navy transition-all" />
                     </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600">Phone Number</label>
                        <input type="tel" placeholder="+91 XXXX XXX XXX" className="w-full bg-bg-light border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-navy transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600">Subject</label>
                        <select className="w-full bg-bg-light border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-navy transition-all">
                           <option>Job Inquiry</option>
                           <option>Recruitment Services</option>
                           <option>Documentation Support</option>
                           <option>Other</option>
                        </select>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-600">Message</label>
                     <textarea rows="5" placeholder="How can we help you?" className="w-full bg-bg-light border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-navy transition-all resize-none"></textarea>
                  </div>

                  <button type="submit" className="btn-primary w-full md:w-auto px-10 py-4 flex items-center justify-center gap-2">
                     Send Message <Send size={18} />
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
