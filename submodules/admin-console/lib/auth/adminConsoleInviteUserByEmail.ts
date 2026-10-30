import { ValidateInviteUserByEmailBody } from './ValidateInviteUserByEmailBody';
import { getServerSessionUser } from '@/submodules/supabase-functions/auth/getServerSessionUser';
import { hasServerAnyOrgPermission } from '@/submodules/supabase-functions/auth/hasServerAnyOrgPermission';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import { NextResponse } from 'next/server';

export const adminConsoleAPIInviteUserByEmails = async (requestBody: unknown) => {
  try {
    const { email, firstName, lastName, redirectUrl, host } = ValidateInviteUserByEmailBody.parse(requestBody);

    const serverSession = await getServerSessionUser();
    const userOrgs: { orgId: string }[] = serverSession?.app_metadata?.access?.orgs;

    const userHasPermission = await hasServerAnyOrgPermission(
      userOrgs?.map((org) => org.orgId),
      'canManageAccess'
    );

    if (!userHasPermission) {
      return NextResponse.json(null, { status: 403, statusText: 'User does not have permission to invite users' });
    }

    const supabase = createDangerousSupabaseServiceRoleClient('public');
    const siteHost = host ?? process.env.NEXT_PUBLIC_SITE_URL;

    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
      redirectTo: redirectUrl ?? `${siteHost}/authenticated?redirectUrl=${siteHost}`,
      data: {
        signUpHost: siteHost,
        northStarFirstName: firstName,
        northStartLastName: lastName
      }
    });

    return NextResponse.json({ data, error }, { status: 200 });
  } catch (e) {
    return new NextResponse('An error occurred', { status: 500, statusText: 'An error occurred' });
  }
};
