import { AdminConfig } from '../types/Config/AdminConfig';
import { useState, useEffect } from 'react';
import { getResources } from '../lib/getResources';
import { SupabaseResource } from '../types/SupabaseResource';

export const useResources = (config?: AdminConfig) => {
  return useResourcesState(config).resources;
};

export const useResourcesState = (config?: AdminConfig) => {
  const [resources, setResources] = useState<SupabaseResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedResources = await getResources(config?.schemas);
        setResources(fetchedResources.filter((r) => r.name !== '_prisma_migrations'));
      } catch (resourceError) {
        setError(resourceError instanceof Error ? resourceError : new Error('Unable to load admin resources.'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchResources();
  }, [config?.schemas]);

  return { resources, isLoading, error };
};
