import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

const contacts = [
  { label: 'Mr. Ravi Rana (Hiring)', value: '+91-9805364389', href: 'tel:+919805364389', icon: Phone },
  { label: 'Vishal Rana (Advisor)', value: '+91-8988637863', href: 'tel:+918988637863', icon: Phone },
  { label: 'Miss Ravinder Kaur (Operations Manager)', value: '+91-9805523265', href: 'tel:+919805523265', icon: Phone },
  // { label: 'Deepak Rana (Consultant)', value: '+91-7657350996', href: 'tel:+917657350996', icon: Phone },
  { label: 'Mr. Vikas (Lead)', value: '+91-7807464389', href: 'tel:+917807464389', icon: Phone },
  { label: 'Official Email', value: 'careerenterprises0888@gmail.com', href: 'mailto:careerenterprises0888@gmail.com', icon: Mail },
];

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 800));
    console.log('Contact form:', data);
    toast.success('Message sent! We\'ll get back to you shortly.');
    reset();
  };

  return (
    <section id="contact" className="py-10 px-6 bg-white dark:bg-dark-card overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <span className="section-label text-center block">Direct Access</span>
          <h2 className="section-title">
            Speak With Our <span className="text-royal-gold">Team</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="space-y-5">
            <div className="bg-slate-50 dark:bg-dark-surface p-8 rounded-2xl border border-slate-100 dark:border-dark-border">
              <h3 className="text-base font-black text-midnight dark:text-white font-outfit uppercase tracking-tight mb-6">Our Team</h3>
              <div className="space-y-6">
                {contacts.map(({ label, value, href, icon: Icon }) => (
                  <a key={label} href={href}
                    className="flex gap-4 group hover:text-royal-gold transition-colors">
                    <div className="w-10 h-10 bg-white dark:bg-dark-card rounded-xl flex items-center justify-center text-royal-gold shadow-sm flex-shrink-0 group-hover:bg-midnight group-hover:text-white transition-all duration-300">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
                      <p className="text-sm font-bold text-midnight dark:text-white group-hover:text-royal-gold transition-colors break-all">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-midnight dark:bg-dark-surface p-8 rounded-2xl text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-base font-black mb-2 font-outfit">Instant WhatsApp Chat</h4>
                <p className="text-sm text-slate-400 mb-6">Get an instant response from our consultants on WhatsApp.</p>
                <a href="https://wa.me/7657350996" target="_blank" rel="noreferrer"
                  className="btn-gold w-full flex items-center justify-center gap-2">
                  <MessageSquare size={16} /> Chat Now
                </a>
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-royal-gold/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-dark-surface p-8 md:p-12 rounded-2xl border border-slate-100 dark:border-dark-border shadow-sm">
              <h3 className="text-xl font-black text-midnight dark:text-white font-outfit mb-8">Send Us a Message</h3>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="form-label">Full Name *</label>
                    <input id="contact-name" type="text" placeholder="Your full name"
                      className={cn('form-input', errors.name && 'border-red-400')}
                      {...register('name')} />
                    {errors.name && <p className="form-error">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="form-label">Email Address *</label>
                    <input id="contact-email" type="email" placeholder="you@example.com"
                      className={cn('form-input', errors.email && 'border-red-400')}
                      {...register('email')} />
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-phone" className="form-label">Phone Number *</label>
                    <input id="contact-phone" type="tel" placeholder="+91 XXXXX XXXXX"
                      className={cn('form-input', errors.phone && 'border-red-400')}
                      {...register('phone')} />
                    {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-service" className="form-label">Service Needed *</label>
                    <select id="contact-service"
                      className={cn('form-input', errors.service && 'border-red-400')}
                      {...register('service')}>
                      <option value="">Select a service…</option>
                      <option>Global Recruitment</option>
                      <option>Documentation Support</option>
                      <option>Visa Facilitation</option>
                      <option>Career Consultancy</option>
                      <option>Other</option>
                    </select>
                    {errors.service && <p className="form-error">{errors.service.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="form-label">Message *</label>
                  <textarea id="contact-message" rows={5} placeholder="How can we help you today?"
                    className={cn('form-input resize-none', errors.message && 'border-red-400')}
                    {...register('message')} />
                  {errors.message && <p className="form-error">{errors.message.message}</p>}
                </div>

                <Button type="submit" variant="gold" size="lg" loading={isSubmitting}
                  className="w-full md:w-auto">
                  <Send size={16} />
                  {isSubmitting ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
