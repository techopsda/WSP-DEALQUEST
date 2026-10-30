import { Database } from '@/types/supabase';
import { createRouteHandlerClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { PostgrestMaybeSingleResponse, PostgrestResponse, PostgrestSingleResponse } from '@supabase/postgrest-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { use } from 'react';
import { SupabaseSchemaType } from '../types/supabaseSchemaType';

export type AnyPostgrestResponse<Result> =
  | PostgrestSingleResponse<Result>
  | PostgrestMaybeSingleResponse<Result>
  | PostgrestResponse<Result>;

export const createSupabaseServerClient = async <T extends SupabaseSchemaType>(
  schema: T
): Promise<SupabaseClient<Database, T>> => {
  const cookieStore = await cookies();

  return createServerComponentClient<Database, T>(
    {
      cookies: (() => cookieStore) as unknown as typeof cookies
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      options: {
        db: {
          schema: schema
        }
      }
    }
  );
};

export const createSupabaseRouteHandlerClient = async <T extends SupabaseSchemaType>(
  schema: T
): Promise<SupabaseClient<Database, T>> => {
  const cookieStore = await cookies();

  return createRouteHandlerClient<Database, T>(
    {
      cookies: (() => cookieStore) as unknown as typeof cookies
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      options: {
        db: {
          schema: schema
        }
      }
    }
  );
};

export const useServerSupabaseSession = () => {
  const fetchSession = async () => {
    const accessSupabase = await createSupabaseServerClient<'public'>('public');
    const { data: sessionRes } = await accessSupabase.auth.getSession();
    return sessionRes?.session;
  };
  return use(fetchSession());
};

export const useServerSupabaseData = <Result>(query: PromiseLike<PostgrestResponse<Result>>) => {
  const fetchData = async () => {
    return await query;
  };
  return use(fetchData());
};
