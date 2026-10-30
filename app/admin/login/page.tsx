import '../../../styles/admin.css';
import { redirect } from 'next/navigation';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { hasAdminAccess } from '@/lib/auth/hasAdminAccess';
import { createBypassSession, isAuthBypassEnabled } from '@/lib/auth/authBypass';

const AdminLoginPage = async () => {
  let session = isAuthBypassEnabled() ? createBypassSession() : null;

  if (!session) {
    const supabase = await createSupabaseServerClient<'public'>('public');
    const {
      data: { session: currentSession }
    } = await supabase.auth.getSession();
    session = currentSession;
  }

  if (hasAdminAccess(session)) {
    redirect('/admin');
  }

  return <AdminLoginForm />;
};

export default AdminLoginPage;
