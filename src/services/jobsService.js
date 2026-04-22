import { jobs as allJobs } from '../data/jobs.js';
import { salaryToUSD } from '../utils/formatSalary.js';

const ITEMS_PER_PAGE = 9;

/**
 * Simulate async fetch with a small delay (mimics a real API).
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch all jobs with optional search/filter/sort/pagination.
 */
export async function fetchJobs({
  search = '',
  category = 'All',
  country = 'All Countries',
  type = 'All Types',
  sort = 'newest',
  page = 1,
} = {}) {
  await delay(400);

  let results = [...allJobs];

  // Search: title, company, location, category
  if (search.trim()) {
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

  // Category filter
  if (category && category !== 'All') {
    results = results.filter((j) => j.category === category);
  }

  // Country filter
  if (country && country !== 'All Countries') {
    results = results.filter((j) => j.country === country);
  }

  // Job type filter
  if (type && type !== 'All Types') {
    results = results.filter((j) => j.type === type);
  }

  // Sort
  if (sort === 'salary-high') {
    results.sort((a, b) => salaryToUSD(b.salary) - salaryToUSD(a.salary));
  } else if (sort === 'salary-low') {
    results.sort((a, b) => salaryToUSD(a.salary) - salaryToUSD(b.salary));
  } else {
    // newest first (by postedAt)
    results.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  }

  const total = results.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = results.slice(start, start + ITEMS_PER_PAGE);

  return { jobs: paginated, total, totalPages, page };
}

/**
 * Fetch a single job by ID.
 */
export async function fetchJobById(id) {
  await delay(250);
  const job = allJobs.find((j) => j.id === Number(id));
  if (!job) throw new Error('Job not found');
  return job;
}

/**
 * Fetch featured jobs for the home page.
 */
export async function fetchFeaturedJobs() {
  await delay(300);
  return allJobs.filter((j) => j.featured).slice(0, 4);
}

/**
 * Submit a job application (mock — logs to console, ready for real API).
 */
export async function submitApplication(jobId, formData) {
  await delay(1000);
  console.log('Application submitted:', { jobId, ...formData });
  return { success: true, message: 'Application received! We will contact you shortly.' };
}
