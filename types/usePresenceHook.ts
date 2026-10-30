import { RealtimePresenceState } from '@supabase/supabase-js';

export type UsePresenceHook = (
  channelName: string,
  onJoin?: (payload: unknown) => void,
  onLeave?: (payload: unknown) => void
) => [
  RealtimePresenceState | undefined,
  (payload: Record<string, unknown>) => void,
  (payload: Record<string, unknown>) => void
];
