import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Filters {
  cloudType: string;
  region: string;
  minRam: number;
  maxRam: number;
  minCpu: number;
  maxCpu: number;
}

interface Instance {
  id: string;
  name: string;
  cloudProvider: string;
  region: string;
  ram: number;
  cpu: number;
}

interface ApiResponse {
  data: Instance[];
  nextPage?: number;
  hasMore: boolean;
}

const fetchInstances = async ({
  pageParam = 0,
  filters,
}: {
  pageParam?: number;
  filters: Filters;
}) => {
  try {
    const { data } = await axios.get<ApiResponse>(
      `${API_BASE_URL}/api/v1/instances/filter`,
      {
        params: {
          page: pageParam,
          limit: 30,
          ...filters,
        },
      },
    );
    console.log('data', data);
    return data;
  } catch (error) {
    console.error('Error fetching instances:', error);
    throw new Error('Failed to fetch instances');
  }
};

export const useSearchInstances = (filters: Filters) => {
  const queryKey = useMemo(
    () => [
      'search-instances',
      filters.cloudType,
      filters.region,
      filters.minRam,
      filters.maxRam,
      filters.minCpu,
      filters.maxCpu,
    ],
    [filters],
  );

  return useInfiniteQuery<ApiResponse>({
    queryKey,
    queryFn: ({ pageParam = 0 }) => fetchInstances({ pageParam, filters }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage && !lastPage.hasMore) {
        return undefined;
      }
      return pages?.length;
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};
