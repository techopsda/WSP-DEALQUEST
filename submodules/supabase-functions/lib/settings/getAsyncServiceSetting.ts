import { createDangerousSupabaseServiceRoleClient } from '../supabase-service-server';

export const getAsyncServiceSetting = async <T = Record<string, any>, K extends keyof T = keyof T>(key: K) => {
  const supabase = createDangerousSupabaseServiceRoleClient<'public'>('public');
  const { data: setting } = await supabase.from('Setting').select().eq('key', key).maybeSingle();

  return setting?.value as T[K];
};
