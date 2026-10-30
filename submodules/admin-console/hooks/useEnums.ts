import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { SupabaseEnum } from '../types/SupabaseEnum';

export const useEnums = () => {
  const [enums, setEnums] = useState<SupabaseEnum[]>([]);
  const { supabase } = useSupabase<'public'>();

  useEffect(() => {
    const getEnums = async () => {
      const { data: enums } = await supabase.rpc('get_enums');
      setEnums(enums ?? []);
    };
    getEnums();
  }, []);

  return enums;
};
