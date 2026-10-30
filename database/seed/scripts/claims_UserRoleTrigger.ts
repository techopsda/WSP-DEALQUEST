export const CLAIMS_USER_ROLE_TRIGGER_SQLS = [
  `
  CREATE OR REPLACE FUNCTION access.update_claim_on_userrole_change()
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
  DROP TRIGGER IF EXISTS on_claim_user_role_created
  ON "access"."UserRole";
  `,
  `
  CREATE TRIGGER on_claim_user_role_created
  after insert on "access"."UserRole"
  for each row execute procedure access.update_claim_on_userrole_change();
`,
  `
  DROP TRIGGER IF EXISTS on_claim_user_role_updated
  ON "access"."UserRole"
  `,
  `
  CREATE TRIGGER on_claim_user_role_updated
  after update on "access"."UserRole"
  for each row execute procedure access.update_claim_on_userrole_change();
`,
  `
  DROP TRIGGER IF EXISTS on_claim_user_role_deleted
  ON "access"."UserRole";
`,
  `
  CREATE TRIGGER on_claim_user_role_deleted
  after delete on "access"."UserRole"
  for each row execute procedure access.update_claim_on_userrole_change();
`
];
