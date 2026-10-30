import { redirect } from 'next/navigation';
import { AdminPageClient } from './AdminPageClient';
import { hasAdminAccess } from '@/lib/auth/hasAdminAccess';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { createBypassSession, isAuthBypassEnabled } from '@/lib/auth/authBypass';

const AdminPage = async () => {
  let session = isAuthBypassEnabled() ? createBypassSession() : null;

  if (!session) {
    const supabase = await createSupabaseServerClient<'public'>('public');
    const {
      data: { session: currentSession }
    } = await supabase.auth.getSession();
    session = currentSession;
  }

  if (!session) {
    redirect('/admin/login');
  }

  if (!hasAdminAccess(session)) {
    redirect('/admin/forbidden');
  }

  return <AdminPageClient />;
};

export default AdminPage;
