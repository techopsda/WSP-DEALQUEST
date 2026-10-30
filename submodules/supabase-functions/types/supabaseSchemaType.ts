import { Database } from '@/types/supabase';

export type SupabaseSchemaType = string & keyof Database;
