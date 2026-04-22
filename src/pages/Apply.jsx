import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Upload, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useJob } from '../hooks/useJobs';
import { submitApplication } from '../services/jobsService';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

const schema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number too long'),
  experience: z.string().min(1, 'Please select your experience level'),
  coverLetter: z.string().min(50, 'Cover letter must be at least 50 characters').max(1000, 'Keep it under 1000 characters'),
  resume: z.instanceof(FileList).refine((f) => f.length > 0, 'Resume is required')
    .refine((f) => f[0]?.size <= 5 * 1024 * 1024, 'File must be under 5 MB')
    .refine((f) => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(f[0]?.type), 'Only PDF or Word files accepted'),
});

export default function Apply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: job, isLoading } = useJob(id);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const resumeFile = watch('resume');
  const coverLetter = watch('coverLetter') || '';

  const onSubmit = async (data) => {
    try {
      await submitApplication(id, { ...data, resume: data.resume[0]?.name });
      setSubmitted(true);
      toast.success('Application submitted successfully!');
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-off-white dark:bg-dark-surface pt-20 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-midnight dark:text-white font-outfit mb-3">Application Sent!</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
            Thank you for applying. Our team will review your profile and contact you within 2–3 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate('/jobs')}>Browse More Jobs</Button>
            <Button variant="outline" onClick={() => navigate('/')}>Go Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Apply — {job?.title || 'Job'} | Career Enterprises</title>
        <meta name="description" content={`Apply for ${job?.title} at ${job?.company}. Submit your application through Career Enterprises.`} />
      </Helmet>

      <div className="min-h-screen bg-off-white dark:bg-dark-surface pt-20">
        <div className="container mx-auto px-6 py-10 max-w-2xl">

          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-midnight dark:hover:text-white transition-colors mb-8">
            <ArrowLeft size={16} /> Back
          </button>

          {/* Job summary */}
          {job && (
            <div className="bg-white dark:bg-dark-card rounded-2xl p-5 border border-slate-100 dark:border-dark-border shadow-sm mb-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-midnight to-slate-700 flex items-center justify-center flex-shrink-0">
                <span className="text-royal-gold font-black text-lg">{job.company[0]}</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{job.company}</p>
                <p className="font-black text-midnight dark:text-white font-outfit">{job.title}</p>
                <p className="text-xs text-slate-400">{job.location}, {job.country}</p>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border border-slate-100 dark:border-dark-border shadow-sm">
            <h1 className="text-2xl font-black text-midnight dark:text-white font-outfit mb-2">Submit Application</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">All fields marked * are required.</p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fullName" className="form-label">Full Name *</label>
                  <input id="fullName" type="text" placeholder="e.g. Rahul Sharma"
                    className={cn('form-input', errors.fullName && 'border-red-400 focus:ring-red-400/30')}
                    {...register('fullName')} />
                  {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input id="email" type="email" placeholder="you@example.com"
                    className={cn('form-input', errors.email && 'border-red-400 focus:ring-red-400/30')}
                    {...register('email')} />
                  {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>
              </div>

              {/* Phone + Experience */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="form-label">Phone Number *</label>
                  <input id="phone" type="tel" placeholder="+91 XXXXX XXXXX"
                    className={cn('form-input', errors.phone && 'border-red-400 focus:ring-red-400/30')}
                    {...register('phone')} />
                  {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                </div>
                <div>
                  <label htmlFor="experience" className="form-label">Experience Level *</label>
                  <select id="experience"
                    className={cn('form-input', errors.experience && 'border-red-400 focus:ring-red-400/30')}
                    {...register('experience')}>
                    <option value="">Select level…</option>
                    <option value="fresher">Fresher (0–1 yr)</option>
                    <option value="junior">Junior (1–3 yrs)</option>
                    <option value="mid">Mid-Level (3–5 yrs)</option>
                    <option value="senior">Senior (5+ yrs)</option>
                  </select>
                  {errors.experience && <p className="form-error">{errors.experience.message}</p>}
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="coverLetter" className="form-label mb-0">Cover Letter *</label>
                  <span className={cn('text-xs font-medium', coverLetter.length > 900 ? 'text-red-500' : 'text-slate-400')}>
                    {coverLetter.length}/1000
                  </span>
                </div>
                <textarea id="coverLetter" rows={5} placeholder="Tell us why you're a great fit for this role…"
                  className={cn('form-input resize-none', errors.coverLetter && 'border-red-400 focus:ring-red-400/30')}
                  {...register('coverLetter')} />
                {errors.coverLetter && <p className="form-error">{errors.coverLetter.message}</p>}
              </div>

              {/* Resume Upload */}
              <div>
                <label htmlFor="resume" className="form-label">Resume / CV * <span className="normal-case font-normal text-slate-400">(PDF or Word, max 5 MB)</span></label>
                <label htmlFor="resume"
                  className={cn(
                    'flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all duration-200',
                    errors.resume ? 'border-red-400 bg-red-50 dark:bg-red-900/10' : 'border-slate-200 dark:border-dark-border hover:border-royal-gold hover:bg-royal-gold/5 dark:hover:border-royal-gold'
                  )}>
                  <Upload size={28} className={errors.resume ? 'text-red-400' : 'text-slate-400 mb-2'} />
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mt-2">
                    {resumeFile?.[0] ? resumeFile[0].name : 'Click to upload or drag & drop'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">PDF, DOC, DOCX up to 5 MB</p>
                  <input id="resume" type="file" accept=".pdf,.doc,.docx" className="hidden" {...register('resume')} />
                </label>
                {errors.resume && <p className="form-error">{errors.resume.message}</p>}
              </div>

              <Button type="submit" variant="gold" size="lg" loading={isSubmitting} className="w-full">
                {isSubmitting ? 'Submitting…' : 'Submit Application'}
              </Button>

              <p className="text-xs text-center text-slate-400">
                By submitting, you agree to our{' '}
                <Link to="/#contact" className="text-royal-gold hover:underline">privacy policy</Link>.
                We'll never share your data without consent.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
