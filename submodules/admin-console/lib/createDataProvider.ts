import { SupabaseClient } from '@supabase/supabase-js';
import { DataProvider } from 'react-admin';
import { SupabaseResource } from '../types/SupabaseResource';
import { handleSupabaseCreate } from './dataProviderFunctions/handleSupabaseCreate';
import { handleSupabaseDelete } from './dataProviderFunctions/handleSupabaseDelete';
import { handleSupabaseDeleteMany } from './dataProviderFunctions/handleSupabaseDeleteMany';
import { handleSupabaseUpdate } from './dataProviderFunctions/handleSupabaseUpdate';
import { supabaseDataProvider } from './supabaseDataProvider';

export const createDataProvider: (resources: SupabaseResource[], supabase: SupabaseClient) => DataProvider<string> = (
  resources: SupabaseResource[],
  supabase: SupabaseClient
) => {
  const baseDataProvider = supabaseDataProvider({
    instanceUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    apiKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '',
    supabaseClient: supabase,
    resources
  });

  return {
    ...baseDataProvider,
    update: (resource, params) => handleSupabaseUpdate(resource, params, baseDataProvider, resources, supabase),
    create: (resource, params) => handleSupabaseCreate(resource, params, baseDataProvider, resources, supabase),
    delete: (resource, params) => handleSupabaseDelete(resource, params, baseDataProvider, supabase),
    deleteMany: (resource, params) => handleSupabaseDeleteMany(resource, params, baseDataProvider, supabase)
  };
};
