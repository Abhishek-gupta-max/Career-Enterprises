import { useQuery } from '@tanstack/react-query';
import { fetchJobs, fetchJobById, fetchFeaturedJobs, fetchApplications } from '../services/jobsService.js';

/**
 * Hook for paginated job listing with search/filter/sort.
 */
export function useJobs(filters = {}) {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => fetchJobs(filters),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2, // 2 minutes cache
  });
}

/**
 * Hook to fetch a single job by ID.
 */
export function useJob(id) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => fetchJobById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook for featured jobs on the home page.
 */
export function useFeaturedJobs() {
  return useQuery({
    queryKey: ['featured-jobs'],
    queryFn: fetchFeaturedJobs,
    staleTime: 1000 * 60 * 10,
  });
}

/**
 * Hook for fetching all applications.
 */
export function useApplications() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications,
    staleTime: 1000 * 60 * 1, // 1 minute cache
  });
}
