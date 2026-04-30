const API_URL = import.meta.env.PROD ? '/api' : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api');

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
  limit = 9,
  groupBy,
} = {}) {
  const params = new URLSearchParams({
    search,
    category,
    country,
    type,
    sort,
    page: page.toString(),
    limit: limit.toString()
  });

  if (groupBy) {
    params.append('groupBy', groupBy);
  }

  const response = await fetch(`${API_URL}/jobs?${params}`);
  if (!response.ok) throw new Error('Failed to fetch jobs');
  return response.json();
}

/**
 * Fetch a single job by ID.
 */
export async function fetchJobById(id) {
  const response = await fetch(`${API_URL}/jobs/${id}`);
  if (!response.ok) throw new Error('Job not found');
  return response.json();
}

/**
 * Fetch featured jobs for the home page.
 */
export async function fetchFeaturedJobs() {
  const response = await fetch(`${API_URL}/jobs/featured`);
  if (!response.ok) throw new Error('Failed to fetch featured jobs');
  return response.json();
}

/**
 * Submit a job application.
 */
export async function submitApplication(jobId, formData) {
  const response = await fetch(`${API_URL}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobId, ...formData })
  });
  
  if (!response.ok) throw new Error('Failed to submit application');
  return response.json();
}

/**
 * Fetch all applications (Admin).
 */
export async function fetchApplications() {
  const response = await fetch(`${API_URL}/applications`);
  if (!response.ok) throw new Error('Failed to fetch applications');
  return response.json();
}

/**
 * Submit a contact message.
 */
export async function submitContactMessage(formData) {
  const response = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  if (!response.ok) throw new Error('Failed to submit message');
  return response.json();
}

/**
 * Create a new job (Admin).
 */
export async function createJob(jobData) {
  const response = await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData)
  });
  
  if (!response.ok) throw new Error('Failed to create job');
  return response.json();
}

/**
 * Update an existing job (Admin).
 */
export async function updateJob(id, jobData) {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData)
  });
  
  if (!response.ok) throw new Error('Failed to update job');
  return response.json();
}

/**
 * Update job status (Admin).
 */
export async function updateJobStatus(id, status) {
  const response = await fetch(`${API_URL}/jobs/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  
  if (!response.ok) throw new Error('Failed to update job status');
  return response.json();
}

/**
 * Delete a job (Admin).
 */
export async function deleteJob(id) {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) throw new Error('Failed to delete job');
  return response.json();
}
