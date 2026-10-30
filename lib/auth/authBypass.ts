import type { Session } from '@supabase/supabase-js';

const DEV_USER_ID = '00000000-0000-0000-0000-000000000001';

export const isAuthBypassEnabled = () =>
  process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_BYPASS_SUPABASE_AUTH === 'true';

export const createBypassSession = (): Session => {
  const now = Math.floor(Date.now() / 1000);

  return {
    access_token: 'local-auth-bypass',
    refresh_token: 'local-auth-bypass',
    expires_in: 60 * 60 * 24,
    expires_at: now + 60 * 60 * 24,
    token_type: 'bearer',
    user: {
      id: DEV_USER_ID,
      aud: 'authenticated',
      role: 'authenticated',
      email: process.env.NEXT_PUBLIC_DEV_USER_EMAIL ?? 'jbp@yahoo.com',
      email_confirmed_at: new Date().toISOString(),
      app_metadata: {
        provider: 'email',
        providers: ['email'],
        access: { bypassed: true }
      },
      user_metadata: {
        northStarFirstName: 'JBP',
        northStarLastName: 'Test'
      },
      identities: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  } as Session;
};

export const getBypassUserId = () => DEV_USER_ID;
