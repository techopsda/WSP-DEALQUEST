export const CLAIMS_USER_ORGANISATION_ROLE_TRIGGER_SQLS = [
  `
  CREATE OR REPLACE FUNCTION access.update_claim_on_userorganisationrole_change()
  RETURNS trigger
  language plpgsql
  security definer set search_path = public
  AS $$
  BEGIN
    IF (old.id IS NOT NULL) THEN
      UPDATE auth.users u
        SET raw_app_meta_data = COALESCE(u.raw_app_meta_data, '{}'::jsonb) || json_build_object('access', access.get_access_claim(u.id))::jsonb
        WHERE u.id = (SELECT "userId" FROM "access"."UserOrganisation" WHERE id = old."userOrganisationId");
    END IF;

    IF (new.id IS NOT NULL AND (old.id IS NULL OR new.id <> old.id) ) THEN
      UPDATE auth.users u
        SET raw_app_meta_data = COALESCE(u.raw_app_meta_data, '{}'::jsonb) || json_build_object('access', access.get_access_claim(u.id))::jsonb
        WHERE u.id = (SELECT "userId" FROM "access"."UserOrganisation" WHERE id = new."userOrganisationId");
    END IF;

    RETURN NULL;
    
  END;
  $$;
  `,
  `
  DROP TRIGGER IF EXISTS on_claim_user_organisationrole_created
  ON "access"."UserOrganisationRole"
  `,
  `
  CREATE TRIGGER on_claim_user_organisationrole_created
  after insert on "access"."UserOrganisationRole"
  for each row execute procedure access.update_claim_on_userorganisationrole_change();
`,
  `
  DROP TRIGGER IF EXISTS on_claim_user_organisationrole_updated
  ON "access"."UserOrganisationRole"
  `,
  `
  CREATE TRIGGER on_claim_user_organisationrole_updated
  after update on "access"."UserOrganisationRole"
  for each row execute procedure access.update_claim_on_userorganisationrole_change();
`,
  `
  DROP TRIGGER IF EXISTS on_claim_user_organisationrole_deleted
  ON "access"."UserOrganisationRole"
`,
  `
  CREATE TRIGGER on_claim_user_organisationrole_deleted
  after delete on "access"."UserOrganisationRole"
  for each row execute procedure access.update_claim_on_userorganisationrole_change();
`
];
