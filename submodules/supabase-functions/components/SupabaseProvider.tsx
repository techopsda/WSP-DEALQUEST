'use client';

import { SupabaseSchemaType } from '../types/supabaseSchemaType';
import { Database } from '@/types/supabase';
import { Session, SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthChangeEvent } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { isAuthBypassEnabled } from '@/lib/auth/authBypass';

export type { Database } from '@/types/supabase';
export type { SupabaseClient } from '@supabase/auth-helpers-nextjs';

export type MaybeSession = Session | null;

export type SupabaseClientMap = Record<string, SupabaseClient<Database, any, any>>;

interface SupabaseContext {
  supabaseClients: SupabaseClientMap;
  session: MaybeSession;
}

const DATABASE_SCHEMAS: SupabaseSchemaType[] = (process.env.NEXT_PUBLIC_DATABASE_SCHEMAS ?? 'public').split(
  ','
) as SupabaseSchemaType[];

// @ts-ignore
export const Context = createContext<SupabaseContext>();

export default function SupabaseProvider({ children, session }: { children: React.ReactNode; session: MaybeSession }) {
  const router = useRouter();
  const authBypassed = isAuthBypassEnabled();
  const [supabaseClients] = useState<SupabaseClientMap>(() => {
    const supabaseClients: SupabaseClientMap = {};
    DATABASE_SCHEMAS.forEach((schema) => {
      supabaseClients[schema] = createClientComponentClient<Database, SupabaseSchemaType>({
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'http://127.0.0.1:54321',
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? 'local-auth-bypass',
        isSingleton: false,
        options: { db: { schema: schema } }
      });
    });
    return supabaseClients;
  });

  useEffect(() => {
    if (authBypassed) {
      return;
    }

    const {
      data: { subscription }
    } = supabaseClients.public.auth.onAuthStateChange((event: AuthChangeEvent) => {
      if (event === 'SIGNED_OUT' || event === 'SIGNED_IN') {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [authBypassed, router, supabaseClients]);

  return (
    <Context.Provider value={{ supabaseClients, session }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = <T extends string & keyof Database>(schema: SupabaseSchemaType = 'public') => {
  const context = useContext<SupabaseContext>(Context);

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }

  const { supabaseClients, session } = context;

  const supabaseClient = supabaseClients?.[schema];
  if (!supabaseClient) {
    throw new Error(`Didn't find supabase client for ${schema}`);
  }

  return {
    session: session,
    supabase: supabaseClient as SupabaseClient<Database, T>
  };
};
