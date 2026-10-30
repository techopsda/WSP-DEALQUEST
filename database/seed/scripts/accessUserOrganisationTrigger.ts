export const ACCESS_USER_ORGANISATION_TRIGGER_SQLS = [
  `
  CREATE OR REPLACE FUNCTION access.handle_new_access_user_organisation()
  RETURNS trigger
  language plpgsql
  security definer set search_path = public
  AS $$
  BEGIN
  
    IF (new.id IS NOT NULL) THEN
      -- Only auto add roles for the "personal" organisation - users added to other organisations will have to be manually assigned roles
      IF (EXISTS (SELECT 1 FROM "access"."Organisation" WHERE "name" = cast(new."userId" as text) AND "id" = new."organisationId")) THEN
        IF (NOT EXISTS (SELECT 1 FROM "access"."UserOrganisationRole" WHERE "userOrganisationId" = new.id)) THEN
          INSERT INTO "access"."UserOrganisationRole" ("userOrganisationId", "roleId")
            SELECT new.id, r.id FROM "access"."Role" r WHERE r.name = 'User';
        END IF;
      END IF;        
    END IF;

    RETURN NULL;
    
  END;
  $$;
  `,
  `
  DROP TRIGGER IF EXISTS on_access_user_organisation_created
  ON "access"."UserOrganisation"
  `,
  `
  CREATE TRIGGER on_access_user_organisation_created
  after insert on "access"."UserOrganisation"
  for each row execute procedure access.handle_new_access_user_organisation();
`,
  `
  DROP TRIGGER IF EXISTS on_access_user_organisation_updated
  ON "access"."UserOrganisation"
  `,
  `
  CREATE TRIGGER on_access_user_organisation_updated
  after update on "access"."UserOrganisation"
  for each row execute procedure access.handle_new_access_user_organisation();
`
];
