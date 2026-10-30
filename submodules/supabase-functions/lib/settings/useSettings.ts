import { isArray } from 'lodash';
import { useContext, useState } from 'react';
import { useSupabase } from '../../components/SupabaseProvider';
import { GetSettingsReturnType } from '../../types/GetSettingsReturnType';
import { Setting } from '../../types/Setting';
import { SettingsContext } from './SettingsContext';

export const useSettings = <T = Record<string, any>>() => {
  const settingsContext = useContext(SettingsContext);
  const [settingsArray, setSettingsArray] = useState(settingsContext);

  const { supabase } = useSupabase<'public'>('public');

  const getSetting = <K extends keyof T>(key: K) => {
    return settingsArray.find((setting) => setting.key === key)?.value as T[K];
  };

  const getSettings = <K extends keyof T>(keys: K[]) => {
    const filteredSettings = settingsArray.filter((setting) => keys.some((key) => setting.key === key));

    return filteredSettings.reduce((prev, current) => {
      return { ...prev, [current.key]: current.value };
    }, {}) as GetSettingsReturnType<T, K>;
  };

  const setSettings = async (newSettings: Setting[] | Setting) => {
    await supabase
      .from('Setting')
      .upsert(isArray(newSettings) ? newSettings : [newSettings], { onConflict: 'key' })
      .throwOnError();

    if (isArray(newSettings)) setSettingsArray([...settingsArray, ...newSettings]);
    else setSettingsArray([...settingsArray, newSettings]);
  };

  return { getSetting, getSettings, setSettings };
};
