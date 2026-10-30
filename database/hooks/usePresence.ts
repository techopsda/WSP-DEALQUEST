import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { UsePresenceHook } from '@/types/usePresenceHook';
import { RealtimePresenceState } from '@supabase/supabase-js';
import _ from 'lodash';
import { useEffect, useState } from 'react';

export const usePresence: UsePresenceHook = (channelName: string) => {
  const { supabase } = useSupabase<'public'>();
  const channel = supabase.channel(channelName);

  const [presenceState, setPresenceState] = useState<RealtimePresenceState>();

  const trackTeam = async (payload: Record<string, unknown>) => {
    await channel.track(payload);
  };

  const untrackTeam = async (payload: Record<string, unknown>) => {
    await channel.untrack(payload);
  };

  useEffect(() => {
    channel
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState();
        setPresenceState({ ...newState });
      })
      .subscribe();
  }, [supabase]);

  return [presenceState, trackTeam, untrackTeam];
};
