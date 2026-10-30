import { createSupabaseServerClient } from '../supabase-server';

export const getAsyncSetting = async <T = Record<string, any>, K extends keyof T = keyof T>(key: K) => {
  const supabase = await createSupabaseServerClient<'public'>('public');
  const { data: setting } = await supabase.from('Setting').select().eq('key', key).maybeSingle();

  return setting?.value as T[K];
};
