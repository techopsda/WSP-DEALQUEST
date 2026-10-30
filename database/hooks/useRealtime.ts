import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { isArray } from 'lodash';
import { useEffect, useState } from 'react';

export function useRealtime<T>(
  serverState: T[],
  channelName: string,
  schemaName: string,
  tableName: string,
  equalityFunction: (a: T, b: T) => boolean,
  filters?: string | string[]
) {
  const [data, setData] = useState<T[]>(serverState);
  const { supabase } = useSupabase<'public'>();

  const baseEventDetails = {
    schema: schemaName,
    table: tableName
  };

  useEffect(() => {
    setData(serverState);
  }, [serverState]);

  useEffect(() => {
    const channel = supabase.channel(channelName);

    const addFilterIfExistsToChannel = (filter?: string) => {
      channel
        .on('postgres_changes', { event: 'INSERT', ...baseEventDetails, filter }, (payload) =>
          setData((prev) => [...prev, payload.new as T])
        )
        .on('postgres_changes', { event: 'UPDATE', ...baseEventDetails, filter }, (payload) =>
          setData((prev) => [...prev.filter((a) => !equalityFunction(a, payload.new as T)), payload.new as T])
        )
        .on('postgres_changes', { event: 'DELETE', ...baseEventDetails, filter }, (payload) =>
          setData((prev) => [...prev.filter((prevItem) => !equalityFunction(prevItem, payload.old as T))])
        );
    };

    if (isArray(filters)) {
      filters.forEach((filter) => {
        addFilterIfExistsToChannel(filter);
      });
    } else {
      addFilterIfExistsToChannel(filters);
    }

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return data;
}
