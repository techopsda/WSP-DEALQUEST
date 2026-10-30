export const CLAIMS_USER_ORGANISATION_TRIGGER_SQLS = [
  `
  CREATE OR REPLACE FUNCTION access.update_claim_on_userorganisation_change()
  RETURNS trigger
  language plpgsql
  security definer set search_path = public
  AS $$
  BEGIN
    IF (old.id IS NOT NULL) THEN
      UPDATE auth.users u
        SET raw_app_meta_data = COALESCE(u.raw_app_meta_data, '{}'::jsonb) || json_build_object('access', access.get_access_claim(old."userId"))::jsonb
        WHERE id = old."userId";
    END IF;

    IF (new.id IS NOT NULL AND (old.id IS NULL OR new.id <> old.id) ) THEN
      UPDATE auth.users u
        SET raw_app_meta_data = COALESCE(u.raw_app_meta_data, '{}'::jsonb) || json_build_object('access', access.get_access_claim(new."userId"))::jsonb
        WHERE id = new."userId";
    END IF;

    RETURN NULL;
    
  END;
  $$;
  `,
  `
  DROP TRIGGER IF EXISTS on_claim_user_organisation_created
  ON "access"."UserOrganisation"
  `,
  `
  CREATE TRIGGER on_claim_user_organisation_created
  after insert on "access"."UserOrganisation"
  for each row execute procedure access.update_claim_on_userorganisation_change();
`,
  `
  DROP TRIGGER IF EXISTS on_claim_user_organisation_updated
  ON "access"."UserOrganisation"
  `,
  `
  CREATE TRIGGER on_claim_user_organisation_updated
  after update on "access"."UserOrganisation"
  for each row execute procedure access.update_claim_on_userorganisation_change();
`,
  `
  DROP TRIGGER IF EXISTS on_claim_user_organisation_deleted
  ON "access"."UserOrganisation"
`,
  `
  CREATE TRIGGER on_claim_user_organisation_deleted
  after delete on "access"."UserOrganisation"
  for each row execute procedure access.update_claim_on_userorganisation_change();
`
];
