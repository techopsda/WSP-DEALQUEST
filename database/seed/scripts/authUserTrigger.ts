export const AUTH_USER_TRIGGER_SQLS = [
  `
CREATE OR REPLACE FUNCTION access.handle_new_auth_user()
RETURNS trigger
language plpgsql
security definer set search_path = public
AS $$
BEGIN

  IF (TG_OP = 'UPDATE') THEN
    IF new.raw_app_meta_data::jsonb->>'access' IS NULL THEN
      new.raw_app_meta_data = COALESCE(new.raw_app_meta_data, '{}'::jsonb) || json_build_object('access', access.get_access_claim(new.id))::jsonb;
    END IF;
  END IF;

  -- Remove stale record with same email but different id to avoid unique constraint failure
  DELETE FROM "access"."User" WHERE email = new.email AND id != new.id;

  insert into "access"."User" ("id", "email", "firstName", "lastName", "metadata")
  values (
    new.id,
    new.email,
    CASE WHEN new."raw_user_meta_data" ->> 'northStarFirstName' IS NULL
      THEN substring(new."raw_user_meta_data" ->> 'name' from '^[^ ]+') 
      ELSE new."raw_user_meta_data" ->> 'northStarFirstName' 
    END, 
    CASE WHEN new."raw_user_meta_data" ->> 'northStarFirstName' IS NULL
      THEN substring(new."raw_user_meta_data" ->> 'name' from '[^ ]+$') 
      ELSE new."raw_user_meta_data" ->> 'northStarLastName' 
    END, 
    new.raw_user_meta_data
  )
  on conflict (id) do update set email = new.email, "firstName" = EXCLUDED."firstName", "lastName" = EXCLUDED."lastName", "metadata" = EXCLUDED."metadata";
  return new;
END;
$$;
`,
  `
DROP TRIGGER IF EXISTS on_auth_user_created
ON auth.users;
`,
  `
CREATE TRIGGER on_auth_user_created
BEFORE insert on auth.users
for each row execute procedure access.handle_new_auth_user();
`,
  `
DROP TRIGGER IF EXISTS on_auth_user_updated
ON auth.users;
`,
  `
CREATE TRIGGER on_auth_user_updated
BEFORE update on auth.users
for each row execute procedure access.handle_new_auth_user();
`
];
