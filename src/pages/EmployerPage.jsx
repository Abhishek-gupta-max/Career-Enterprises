import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useJobs } from '../hooks/useJobs';
import { EmployerJobList } from '../components/employer/EmployerJobList';
import { ApplicationList } from '../components/employer/ApplicationList';
import { JobDialog } from '../components/employer/JobDialog';
import { Briefcase, Building2, TrendingUp, Users, Plus, FileText } from 'lucide-react';
import { createJob, updateJob, deleteJob, updateJobStatus } from '../services/jobsService';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function EmployerPage() {
  const { data, isLoading, error, refetch } = useJobs({ page: 1, limit: 100, groupBy: 'category' }); // Fetch grouped jobs from API
  const queryClient = useQueryClient();
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState('jobs');

  const handleAddJob = (category = '') => {
    setSelectedJob(category ? { category } : null);
    setDialogVisible(true);
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setDialogVisible(true);
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(id);
        toast.success('Job deleted successfully');
        queryClient.invalidateQueries(['jobs']);
      } catch (err) {
        toast.error('Failed to delete job');
      }
    }
  };

  const handleSaveJob = async (jobData) => {
    try {
      if (selectedJob && selectedJob.id) {
        await updateJob(selectedJob.id, jobData);
        toast.success('Job updated successfully');
      } else {
        await createJob(jobData);
        toast.success('Job created successfully');
      }
      setDialogVisible(false);
      queryClient.invalidateQueries(['jobs']);
    } catch (err) {
      toast.error('Failed to save job');
    }
  };

  const handleStatusToggle = async (id, status) => {
    try {
      await updateJobStatus(id, status);
      toast.success(`Job ${status === 'Published' ? 'published' : 'unpublished'} successfully`);
      queryClient.invalidateQueries(['jobs']);
    } catch (err) {
      toast.error('Failed to update job status');
    }
  };

  return (
    <>
      <Helmet>
        <title>Employer Dashboard | Career Enterprises</title>
        <meta name="description" content="Manage your job openings and recruitment process." />
      </Helmet>

      <div className="min-h-screen bg-off-white dark:bg-dark-surface pt-24 pb-20">
        <div className="container mx-auto px-6">
          
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-black text-midnight dark:text-white font-outfit mb-2">Employer Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your global talent acquisition and overseas job listings.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Active Jobs', value: data?.total || 0, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { label: 'Total Applications', value: '150+', icon: Users, color: 'text-royal-gold', bg: 'bg-royal-gold/10' },
              { label: 'Partner Companies', value: '45+', icon: Building2, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
              { label: 'Placement Rate', value: '92%', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-dark-card p-6 rounded-3xl border border-slate-100 dark:border-dark-border shadow-sm flex items-center gap-5">
                <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={28} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-black text-midnight dark:text-white font-outfit">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="bg-white dark:bg-dark-card rounded-[40px] border border-slate-100 dark:border-dark-border shadow-xl shadow-slate-200/50 dark:shadow-none p-8 md:p-12">
            
            {/* Tabs & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex bg-slate-100 dark:bg-dark-surface p-1.5 rounded-2xl w-full md:w-auto">
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                    activeTab === 'jobs' 
                      ? 'bg-white dark:bg-dark-card text-royal-gold shadow-sm' 
                      : 'text-slate-500 hover:text-midnight dark:hover:text-white'
                  }`}
                >
                  <Briefcase size={16} /> Manage Jobs
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                    activeTab === 'applications' 
                      ? 'bg-white dark:bg-dark-card text-royal-gold shadow-sm' 
                      : 'text-slate-500 hover:text-midnight dark:hover:text-white'
                  }`}
                >
                  <FileText size={16} /> Applications
                </button>
              </div>

              {activeTab === 'jobs' && (
                <button 
                  className="btn-gold !py-3 !px-8 flex items-center justify-center gap-2"
                  onClick={() => handleAddJob()}
                >
                  <Plus size={20} /> Post New Job
                </button>
              )}
            </div>

            {activeTab === 'jobs' ? (
              isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-20 bg-slate-100 dark:bg-dark-surface/50 rounded-2xl animate-pulse"></div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12 text-red-500">
                  <p>Error loading jobs. Please try again later.</p>
                </div>
              ) : (
                <EmployerJobList 
                  jobs={data?.jobs || []} 
                  onEdit={handleEditJob}
                  onDelete={handleDeleteJob}
                  onAddJob={handleAddJob}
                  onStatusToggle={handleStatusToggle}
                />
              )
            ) : (
              <ApplicationList />
            )}
          </div>

          <JobDialog 
            visible={isDialogVisible} 
            onHide={() => setDialogVisible(false)} 
            job={selectedJob && selectedJob.id ? selectedJob : null}
            onSave={handleSaveJob}
          />
        </div>
      </div>
    </>
  );
}

