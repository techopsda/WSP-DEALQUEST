import { Database } from './types/supabase';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_BYPASS_SUPABASE_AUTH === 'true') {
    return res;
  }

  const supabase = createMiddlewareClient<Database>(
    { req, res },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    }
  );
  await supabase.auth.getSession();
  return res;
}
