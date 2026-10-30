export const CLAIMS_GET_ACCESS_CLAIM = [
  `
  CREATE OR REPLACE FUNCTION access.get_access_claim(uid uuid) RETURNS "jsonb"
  LANGUAGE "plpgsql" SECURITY DEFINER SET search_path = public
  AS $$
  BEGIN
    RETURN (
      SELECT jsonb_build_object(
        'roles', (SELECT "access".get_access_claim_global(uid)),
        'orgs', (SELECT "access".get_access_claim_org(uid))
      ) claim
    );
  END;
$$;
`
];
