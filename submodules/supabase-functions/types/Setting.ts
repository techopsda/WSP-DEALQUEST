import { Database } from '@/types/supabase';

export type Setting = Pick<Database['public']['Tables']['Setting']['Row'], 'key' | 'value'>;
