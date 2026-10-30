import { GetSettingsReturnType } from '../../types/GetSettingsReturnType';
import { Setting } from '../../types/Setting';
import { createSupabaseServerClient } from '../supabase-server';

export const setAsyncSetting = async <T = Record<string, any>, K extends keyof T = keyof T>(newSetting: Setting[]) => {
  const supabase = await createSupabaseServerClient<'public'>('public');

  const { data: newSettings } = await supabase.from('Setting').upsert(newSetting).select();

  return newSettings?.reduce((prev, current) => {
    return { ...prev, [current.key]: current.value };
  }, {}) as GetSettingsReturnType<T, K>;
};
