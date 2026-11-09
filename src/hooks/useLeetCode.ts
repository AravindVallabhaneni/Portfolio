import { useState, useEffect, useRef, useCallback } from 'react';
import { LeetCodeStats } from '../types';
import { fetchLeetCodeStats } from '../services/leetcodeAdapter';

export function useLeetCode() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchedAt, setLastFetchedAt] = useState<Date | null>(null);
  const [minutesAgo, setMinutesAgo] = useState<string>('just now');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchLeetCodeStats();
      setStats(data);
      setLastFetchedAt(new Date());
    } catch (err: unknown) {
      console.warn('Failed to load LeetCode stats:', err);
      setError('Could not retrieve live metrics. Showing cached fallback.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update "Updated X min ago" label
  useEffect(() => {
    const updateRelativeTime = () => {
      if (!lastFetchedAt) return;
      const diffMs = Date.now() - lastFetchedAt.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins <= 0) {
        setMinutesAgo('just now');
      } else if (diffMins === 1) {
        setMinutesAgo('1 min ago');
      } else {
        setMinutesAgo(`${diffMins} mins ago`);
      }
    };

    updateRelativeTime();
    const timer = setInterval(updateRelativeTime, 30000);
    return () => clearInterval(timer);
  }, [lastFetchedAt]);

  // Page Visibility API + 5-minute polling interval
  useEffect(() => {
    loadData();

    const startPolling = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      // Poll every 5 minutes (300,000ms)
      intervalRef.current = setInterval(() => {
        if (document.visibilityState === 'visible') {
          loadData();
        }
      }, 5 * 60 * 1000);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // If tab returns to focus after more than 5 minutes, refresh
        if (lastFetchedAt && Date.now() - lastFetchedAt.getTime() > 5 * 60 * 1000) {
          loadData();
        }
        startPolling();
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };

    startPolling();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [loadData, lastFetchedAt]);

  return {
    stats,
    isLoading,
    error,
    minutesAgo,
    refresh: loadData,
  };
}
