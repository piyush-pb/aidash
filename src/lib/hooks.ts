'use client';

import { useState, useEffect } from 'react';

interface UseDataFetchingOptions<T> {
  fetchFn: () => Promise<T>;
  dependencies?: any[];
  onError?: (error: Error) => void;
}

interface UseDataFetchingResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useDataFetching<T>({
  fetchFn,
  dependencies = [],
  onError
}: UseDataFetchingOptions<T>): UseDataFetchingResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}

// Hook for simulating real-time data updates
export function useRealTimeData<T>(
  initialData: T,
  updateInterval: number = 30000
): [T, () => void] {
  const [data, setData] = useState<T>(initialData);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateData = () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    // Simulate API call delay
    setTimeout(() => {
      // For now, just return the same data structure with slight variations
      // In a real app, this would be an API call
      setData(initialData);
      setIsUpdating(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(updateData, updateInterval);
    return () => clearInterval(interval);
  }, [updateInterval]);

  return [data, updateData];
} 