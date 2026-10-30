import { ValidateSendMagicLinkBody } from './ValidateSendMagicLinkBody';
import { getServerSessionUser } from '@/submodules/supabase-functions/auth/getServerSessionUser';
import { hasServerAnyOrgPermission } from '@/submodules/supabase-functions/auth/hasServerAnyOrgPermission';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import { NextResponse } from 'next/server';

export const adminConsoleAPISendMagicLink = async (requestBody: unknown) => {
  try {
    const { email, redirectUrl, host } = ValidateSendMagicLinkBody.parse(requestBody);

    const serverSession = await getServerSessionUser();
    const userOrgs: { orgId: string }[] = serverSession?.app_metadata?.access?.orgs;

    const userHasPermission = await hasServerAnyOrgPermission(
      userOrgs?.map((org) => org.orgId),
      'canManageAccess'
    );

    if (!userHasPermission) {
      return NextResponse.json(null, {
        status: 403,
        statusText: 'User does not have permission to send magic links to users'
      });
    }

    const supabase = createDangerousSupabaseServiceRoleClient<'access'>('access');
    const siteHost = host ?? process.env.NEXT_PUBLIC_SITE_URL;

    const { data: user } = await supabase.from('User').select().eq('email', email).single();

    if (!user) {
      return NextResponse.json(null, { status: 500, statusText: 'User does not exist for email' });
    }

    const { data: newAccessUser } = await supabase
      .from('User')
      .update({ metadata: { ...(user.metadata as any), lastSignInHost: siteHost } })
      .eq('id', user.id)
      .select()
      .single();

    if (!newAccessUser) {
      return NextResponse.json(null, { status: 500, statusText: 'Failed to update access user metadata' });
    }

    const { error: updateAuthUserMetadataError } = await supabase.auth.admin.updateUserById(user.id, {
      user_metadata: { ...(newAccessUser.metadata as any) }
    });

    if (updateAuthUserMetadataError) {
      return NextResponse.json(null, { status: 500, statusText: 'Failed to update auth user metadata' });
    }

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl ?? `${siteHost}/authenticated?redirectUrl=${siteHost}`
      }
    });

    return NextResponse.json({ data, error }, { status: 200 });
  } catch (e) {
    return new NextResponse('An error occurred', { status: 500, statusText: 'An error occurred' });
  }
};
