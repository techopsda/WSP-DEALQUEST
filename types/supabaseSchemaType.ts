import { Database } from './supabase';

export type SupabaseSchemaType = string & keyof Database;
