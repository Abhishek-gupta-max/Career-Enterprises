import React, { useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Type, Building2, MapPin, Globe, Briefcase, DollarSign, Calendar as CalendarIcon, Info, ShieldCheck, Zap, Star, Plus, Edit2 } from 'lucide-react';

const jobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  description: z.string().min(1, 'Job description is required'),
  category: z.string().min(1, 'Category is required'),
  experience: z.number().min(0, 'Experience must be 0 or more'),
  location: z.string().min(1, 'Location is required'),
  country: z.string().min(1, 'Country is required'),
  company: z.string().min(1, 'Company name is required'),
  salaryMin: z.number().nullable().default(0),
  salaryMax: z.number().nullable().default(0),
  type: z.string().min(1, 'Job type is required'),
  lastDate: z.date().optional(),
  status: z.string().default('Published'),
  featured: z.boolean().default(false),
  urgent: z.boolean().default(false),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
});

const categories = [
  { label: 'IT & Technology', value: 'IT & Technology' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Healthcare', value: 'Healthcare' },
  { label: 'Construction', value: 'Construction' },
  { label: 'Management', value: 'Management' },
  { label: 'Education', value: 'Education' },
  { label: 'Sales & Marketing', value: 'Sales & Marketing' },
];

const jobTypes = [
  { label: 'Full-Time', value: 'Full-Time' },
  { label: 'Part-Time', value: 'Part-Time' },
  { label: 'Contract', value: 'Contract' },
];

const statuses = [
  { label: 'Published', value: 'Published' },
  { label: 'Draft', value: 'Draft' },
];

export const JobDialog = ({ visible, onHide, job, onSave }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      experience: 0,
      location: '',
      country: '',
      company: '',
      salaryMin: 0,
      salaryMax: 0,
      type: 'Full-Time',
      lastDate: null,
      status: 'Published',
      featured: false,
      urgent: false,
      requirements: '',
      benefits: '',
    }
  });

  useEffect(() => {
    if (job) {
      reset({
        ...job,
        salaryMin: job.salary?.min || 0,
        salaryMax: job.salary?.max || 0,
        lastDate: job.lastDate ? new Date(job.lastDate) : null,
        requirements: job.requirements?.join('\n') || '',
        benefits: job.benefits?.join('\n') || '',
      });
    } else {
      reset({
        title: '',
        description: '',
        category: '',
        experience: 0,
        location: '',
        country: '',
        company: '',
        salaryMin: 0,
        salaryMax: 0,
        type: 'Full-Time',
        lastDate: null,
        status: 'Published',
        featured: false,
        urgent: false,
        requirements: '',
        benefits: '',
      });
    }
  }, [job, reset, visible]);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      salary: {
        min: data.salaryMin,
        max: data.salaryMax,
        currency: 'AED', // Defaulting for now
        period: 'month'
      },
      lastDate: data.lastDate ? data.lastDate.toISOString().split('T')[0] : null,
      requirements: data.requirements ? data.requirements.split('\n').filter(r => r.trim() !== '') : [],
      benefits: data.benefits ? data.benefits.split('\n').filter(b => b.trim() !== '') : [],
    };
    delete formattedData.salaryMin;
    delete formattedData.salaryMax;

    onSave(formattedData);
  };

  const footer = (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-6 md:p-8 border-t border-slate-100 dark:border-dark-border bg-slate-50/50 dark:bg-dark-surface/50">
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={onHide}
        className="p-button-text p-button-secondary w-full sm:w-auto rounded-xl font-bold order-2 sm:order-1"
      />
      <Button
        label={job ? "Update Job" : "Create Job"}
        icon="pi pi-check"
        onClick={handleSubmit(onSubmit, (errs) => {
          console.error('Validation errors:', errs);
          toast.error('Please complete all required fields correctly');
        })}
        className="btn-gold w-full sm:w-auto !py-3 !px-8 order-1 sm:order-2 shadow-lg shadow-royal-gold/20"
        autoFocus
      />
    </div>
  );

  return (
    <Dialog
      header={
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-royal-gold/10 rounded-2xl flex items-center justify-center text-royal-gold shadow-inner">
            {job ? <Edit2 size={24} /> : <Plus size={24} />}
          </div>
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-black text-midnight dark:text-white font-outfit m-0 leading-tight">
              {job ? "Edit Posting" : "New Job Posting"}
            </h3>
            <p className="text-xs md:text-sm text-slate-500 font-medium m-0 opacity-80">Overseas recruitment portal</p>
          </div>
        </div>
      }
      visible={visible}
      style={{ width: '600px' }}
      footer={footer}
      onHide={onHide}
      className="p-fluid rounded-[32px] overflow-hidden shadow-2xl"
      headerClassName="p-6 md:p-8 border-b border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card"
      contentClassName="p-0 bg-white dark:bg-dark-card"
      footerClassName="p-0"
      breakpoints={{ '960px': '75vw', '641px': '95vw' }}
    >
      <div className="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-royal-gold mb-2">
              <Info size={16} />
              <span className="text-xs font-black uppercase tracking-widest">Basic Information</span>
            </div>

            <div className="field">
              <label htmlFor="title" className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
                <Type size={14} className="text-slate-400" /> Job Title *
              </label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <InputText
                    {...field}
                    id="title"
                    placeholder="e.g. Senior Software Engineer"
                    className={cn('rounded-xl border-slate-200 py-3 shadow-sm', errors.title && 'p-invalid')}
                  />
                )}
              />
              {errors.title && <small className="p-error">{errors.title.message}</small>}
            </div>

            <div className="field">
              <label htmlFor="company" className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
                <Building2 size={14} className="text-slate-400" /> Company Name *
              </label>
              <Controller
                name="company"
                control={control}
                render={({ field }) => (
                  <InputText
                    {...field}
                    id="company"
                    placeholder="e.g. Google"
                    className={cn('rounded-xl border-slate-200 py-3 shadow-sm', errors.company && 'p-invalid')}
                  />
                )}
              />
              {errors.company && <small className="p-error">{errors.company.message}</small>}
            </div>

            <div className="field">
              <label htmlFor="category" className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
                <Zap size={14} className="text-slate-400" /> Category *
              </label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    {...field}
                    options={categories}
                    placeholder="Select a category"
                    className={cn('rounded-xl border-slate-200 shadow-sm', errors.category && 'p-invalid')}
                  />
                )}
              />
              {errors.category && <small className="p-error">{errors.category.message}</small>}
            </div>
          </div>

          <Divider className="my-0" />

          {/* Section 2: Requirements & Type */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-royal-gold mb-2">
              <Briefcase size={16} />
              <span className="text-xs font-black uppercase tracking-widest">Requirements & Type</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="field">
                <label htmlFor="experience" className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Experience (Years) *</label>
                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      id="experience"
                      value={field.value}
                      onValueChange={(e) => field.onChange(e.value)}
                      className={cn('rounded-xl border-slate-200 shadow-sm', errors.experience && 'p-invalid')}
                      min={0}
                    />
                  )}
                />
                {errors.experience && <small className="p-error">{errors.experience.message}</small>}
              </div>

              <div className="field">
                <label htmlFor="type" className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Employment Type *</label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      {...field}
                      options={jobTypes}
                      placeholder="Select job type"
                      className={cn('rounded-xl border-slate-200 shadow-sm', errors.type && 'p-invalid')}
                    />
                  )}
                />
                {errors.type && <small className="p-error">{errors.type.message}</small>}
              </div>
            </div>

            <div className="field">
              <label htmlFor="description" className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Description *</label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <InputTextarea
                    {...field}
                    id="description"
                    rows={4}
                    placeholder="Describe the role and responsibilities..."
                    className={cn('rounded-xl border-slate-200 shadow-sm', errors.description && 'p-invalid')}
                  />
                )}
              />
              {errors.description && <small className="p-error">{errors.description.message}</small>}
            </div>
          </div>

          <Divider className="my-0" />

          {/* Section 3: Location */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-royal-gold mb-2">
              <MapPin size={16} />
              <span className="text-xs font-black uppercase tracking-widest">Location</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="field">
                <label htmlFor="location" className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
                  <MapPin size={14} className="text-slate-400" /> City *
                </label>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <InputText
                      {...field}
                      id="location"
                      className={cn('rounded-xl border-slate-200 py-3 shadow-sm', errors.location && 'p-invalid')}
                    />
                  )}
                />
                {errors.location && <small className="p-error">{errors.location.message}</small>}
              </div>

              <div className="field">
                <label htmlFor="country" className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
                  <Globe size={14} className="text-slate-400" /> Country *
                </label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <InputText
                      {...field}
                      id="country"
                      className={cn('rounded-xl border-slate-200 py-3 shadow-sm', errors.country && 'p-invalid')}
                    />
                  )}
                />
                {errors.country && <small className="p-error">{errors.country.message}</small>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="field">
              <label htmlFor="requirements" className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Job Requirements (one per line)</label>
              <Controller
                name="requirements"
                control={control}
                render={({ field }) => (
                  <InputTextarea
                    {...field}
                    id="requirements"
                    rows={4}
                    placeholder="e.g. 5+ years experience&#10;Bachelor's Degree..."
                    className="rounded-xl border-slate-200 shadow-sm"
                  />
                )}
              />
            </div>

            <div className="field">
              <label htmlFor="benefits" className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Job Benefits (one per line)</label>
              <Controller
                name="benefits"
                control={control}
                render={({ field }) => (
                  <InputTextarea
                    {...field}
                    id="benefits"
                    rows={4}
                    placeholder="e.g. Health Insurance&#10;Annual Ticket..."
                    className="rounded-xl border-slate-200 shadow-sm"
                  />
                )}
              />
            </div>
          </div>

          <Divider className="my-0" />

          {/* Section 4: Compensation & Date */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-royal-gold mb-2">
              <DollarSign size={16} />
              <span className="text-xs font-black uppercase tracking-widest">Compensation & Timeline</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="field">
                <label htmlFor="salaryMin" className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Min Salary</label>
                <Controller
                  name="salaryMin"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      id="salaryMin"
                      value={field.value}
                      onValueChange={(e) => field.onChange(e.value)}
                      className="rounded-xl border-slate-200 shadow-sm"
                      placeholder="0"
                    />
                  )}
                />
              </div>

              <div className="field">
                <label htmlFor="salaryMax" className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Max Salary</label>
                <Controller
                  name="salaryMax"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      id="salaryMax"
                      value={field.value}
                      onValueChange={(e) => field.onChange(e.value)}
                      className="rounded-xl border-slate-200 shadow-sm"
                      placeholder="0"
                    />
                  )}
                />
              </div>

              <div className="field">
                <label htmlFor="lastDate" className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Apply By</label>
                <Controller
                  name="lastDate"
                  control={control}
                  render={({ field }) => (
                    <Calendar
                      {...field}
                      id="lastDate"
                      dateFormat="yy-mm-dd"
                      showIcon
                      className="rounded-xl border-slate-200 shadow-sm"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <Divider className="my-0" />

          {/* Section 5: Status & Visibility */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-royal-gold mb-2">
              <ShieldCheck size={16} />
              <span className="text-xs font-black uppercase tracking-widest">Status & Visibility</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="field">
                <label htmlFor="status" className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Listing Status</label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      {...field}
                      options={statuses}
                      placeholder="Select status"
                      className="rounded-xl border-slate-200 shadow-sm"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
