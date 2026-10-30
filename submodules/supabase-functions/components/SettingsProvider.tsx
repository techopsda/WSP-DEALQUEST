'use client';

import { useEffect, useState } from 'react';
import { SettingsContext } from '../lib/settings/SettingsContext';
import { Setting } from '../types/Setting';
import { useSupabase } from './SupabaseProvider';

interface SettingsProviderProps {
  children: React.ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Setting[] | null>();
  const { supabase } = useSupabase<'public'>('public');

  useEffect(() => {
    let isMounted = true;

    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase.from('Setting').select();

        if (error) {
          console.error('Failed to load application settings:', error.message);
        }

        if (isMounted) {
          setSettings(data ?? []);
        }
      } catch (error) {
        console.error('Failed to connect to Supabase while loading application settings:', error);

        if (isMounted) {
          setSettings([]);
        }
      }
    };

    void fetchSettings();

    return () => {
      isMounted = false;
    };
  }, [supabase]);

  return <SettingsContext.Provider value={settings ?? []}>{children}</SettingsContext.Provider>;
};
