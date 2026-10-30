import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';

export function useBroadcast(
  channelName: string,
  broadcastEvent: string,
  onMessage: (payload: unknown) => unknown,
  config?: { ack?: boolean; self?: boolean }
) {
  const { supabase } = useSupabase<'public'>();

  const channel = supabase
    .channel(channelName, {
      config: { broadcast: config }
    })
    .subscribe();

  const sendMessage = async (payload: unknown, event?: string) => {
    channel.send({
      type: 'broadcast',
      event: event ?? broadcastEvent,
      payload: payload
    });
  };

  channel.on('broadcast', { event: broadcastEvent }, onMessage);

  return sendMessage;
}
