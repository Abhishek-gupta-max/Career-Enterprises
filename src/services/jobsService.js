import initialData from '../data/db.json';

// Utility to manage localStorage data
const getStorage = (key, defaultData) => {
  const stored = localStorage.getItem(`ce_${key}`);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(`ce_${key}`, JSON.stringify(defaultData));
  return defaultData;
};

const setStorage = (key, data) => {
  localStorage.setItem(`ce_${key}`, JSON.stringify(data));
};

// Initialize if empty
getStorage('jobs', initialData.jobs);
getStorage('applications', initialData.applications || []);
getStorage('messages', initialData.messages || []);

// Simulate network delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchJobs({
  search = '',
  category = 'All',
  country = 'All Countries',
  type = 'All Types',
  sort = 'newest',
  page = 1,
  limit = 9,
  groupBy,
} = {}) {
  await delay();
  let results = getStorage('jobs', initialData.jobs);

  // Search
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.country.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q)
    );
  }

  // Filters
  if (category && category !== 'All') {
    results = results.filter((j) => j.category === category);
  }
  if (country && country !== 'All Countries') {
    results = results.filter((j) => j.country === country);
  }
  if (type && type !== 'All Types') {
    results = results.filter((j) => j.type === type);
  }

  // Sort
  if (sort === 'newest') {
    results.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  }

  // GroupBy
  if (groupBy === 'category') {
    const grouped = {};
    results.forEach((job) => {
      if (!grouped[job.category]) {
        grouped[job.category] = [];
      }
      grouped[job.category].push(job);
    });
    return { jobs: grouped, total: results.length, isGrouped: true };
  }

  const total = results.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + limit);

  return {
    jobs: paginated,
    total,
    totalPages,
    page: parseInt(page)
  };
}

export async function fetchJobById(id) {
  await delay();
  const jobs = getStorage('jobs', initialData.jobs);
  const job = jobs.find(j => j.id === parseInt(id));
  if (!job) throw new Error('Job not found');
  return job;
}

export async function fetchFeaturedJobs() {
  await delay();
  const jobs = getStorage('jobs', initialData.jobs);
  const featured = jobs.filter(j => j.featured).slice(0, 4);
  return featured;
}

export async function submitApplication(jobId, formData) {
  await delay();
  const apps = getStorage('applications', initialData.applications);
  const newApp = {
    id: Date.now(),
    jobId,
    ...formData,
    submittedAt: new Date().toISOString()
  };
  apps.push(newApp);
  setStorage('applications', apps);
  return { success: true, message: 'Application received!' };
}

export async function fetchApplications() {
  await delay();
  const apps = getStorage('applications', initialData.applications);
  return apps.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
}

export async function submitContactMessage(formData) {
  await delay();
  const messages = getStorage('messages', initialData.messages);
  const newMsg = {
    id: Date.now(),
    ...formData,
    submittedAt: new Date().toISOString()
  };
  messages.push(newMsg);
  setStorage('messages', messages);
  return { success: true, message: 'Message received!' };
}

export async function createJob(jobData) {
  await delay();
  const jobs = getStorage('jobs', initialData.jobs);
  const newJob = {
    id: jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1,
    ...jobData,
    postedAt: new Date().toISOString().split('T')[0],
    status: jobData.status || 'Published'
  };
  jobs.push(newJob);
  setStorage('jobs', jobs);
  return newJob;
}

export async function updateJob(id, jobData) {
  await delay();
  const jobs = getStorage('jobs', initialData.jobs);
  const index = jobs.findIndex(j => j.id === parseInt(id));
  if (index !== -1) {
    jobs[index] = { ...jobs[index], ...jobData };
    setStorage('jobs', jobs);
    return jobs[index];
  }
  throw new Error('Job not found');
}

export async function updateJobStatus(id, status) {
  await delay();
  const jobs = getStorage('jobs', initialData.jobs);
  const index = jobs.findIndex(j => j.id === parseInt(id));
  if (index !== -1) {
    jobs[index].status = status;
    setStorage('jobs', jobs);
    return jobs[index];
  }
  throw new Error('Job not found');
}

export async function deleteJob(id) {
  await delay();
  const jobs = getStorage('jobs', initialData.jobs);
  const index = jobs.findIndex(j => j.id === parseInt(id));
  if (index !== -1) {
    jobs.splice(index, 1);
    setStorage('jobs', jobs);
    return { success: true };
  }
  throw new Error('Job not found');
}
