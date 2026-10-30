export const ACCESS_USER_TRIGGER_SQLS = [
  `
  CREATE OR REPLACE FUNCTION access.handle_new_access_user()
  RETURNS trigger
  language plpgsql
  security definer set search_path = public
  AS $$
  BEGIN
  
  WITH organisation AS (
    insert into "access"."Organisation" ("name")
    values (new.id)
    returning id
  )
    insert into "access"."UserOrganisation" ("userId", "organisationId")
      select new.id, organisation.id from organisation;
    return NULL;
  END;
  $$;
  `,
  `
  DROP TRIGGER IF EXISTS on_access_user_created
  ON "access"."User"
  `,
  `
  CREATE TRIGGER on_access_user_created
  after insert on "access"."User"
  for each row execute procedure access.handle_new_access_user();
`
];
