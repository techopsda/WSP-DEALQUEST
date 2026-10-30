export const CLAIMS_ROLE_PERMISSION_TRIGGER_SQLS = [
  `
  CREATE OR REPLACE FUNCTION access.update_claim_on_rolepermission_change()
  RETURNS trigger
  language plpgsql
  security definer set search_path = public
  AS $$
  BEGIN
    IF (old.id IS NOT NULL) THEN
      UPDATE auth.users u
        SET raw_app_meta_data = COALESCE(u.raw_app_meta_data, '{}'::jsonb) || json_build_object('access', access.get_access_claim(u.id))::jsonb
        WHERE u.id IN (
          SELECT uo."userId" FROM "access"."UserOrganisation" uo, "access"."UserOrganisationRole" uor
          WHERE
            uo.id = uor."userOrganisationId" AND
            uor."roleId" = old."roleId"
        );
    END IF;

    IF (new.id IS NOT NULL AND (old.id IS NULL OR new.id <> old.id) ) THEN
      UPDATE auth.users u
        SET raw_app_meta_data = COALESCE(u.raw_app_meta_data, '{}'::jsonb) || json_build_object('access', access.get_access_claim(u.id))::jsonb
        WHERE u.id IN (
          SELECT uo."userId" FROM "access"."UserOrganisation" uo, "access"."UserOrganisationRole" uor
          WHERE
            uo.id = uor."userOrganisationId" AND
            uor."roleId" = new."roleId"
        );
    END IF;

    RETURN NULL;
    
  END;
  $$;
  `,
  `
  DROP TRIGGER IF EXISTS on_claim_role_permission_created
  ON "access"."RolePermission"
  `,
  `
  CREATE TRIGGER on_claim_role_permission_created
  after insert on "access"."RolePermission"
  for each row execute procedure access.update_claim_on_rolepermission_change();
`,
  `
  DROP TRIGGER IF EXISTS on_claim_role_permission_updated
  ON "access"."RolePermission"
  `,
  `
  CREATE TRIGGER on_claim_role_permission_updated
  after update on "access"."RolePermission"
  for each row execute procedure access.update_claim_on_rolepermission_change();
`,
  `
  DROP TRIGGER IF EXISTS on_claim_role_permission_deleted
  ON "access"."RolePermission"
`,
  `
  CREATE TRIGGER on_claim_role_permission_deleted
  after delete on "access"."RolePermission"
  for each row execute procedure access.update_claim_on_rolepermission_change();
`
];
