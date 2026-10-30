import { Database } from '@/types/supabase';
import { createClient } from '@supabase/supabase-js';
import { SupabaseSchemaType } from '../types/supabaseSchemaType';

export const createDangerousSupabaseServiceRoleClient = <T extends SupabaseSchemaType>(schema: T) => {
  return createClient<Database, T>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    db: {
      schema: schema
    }
  });
};
