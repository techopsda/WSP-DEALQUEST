export const CLAIMS_GET_ACCESS_CLAIM_GLOBAL = [
  `
  CREATE OR REPLACE FUNCTION access.get_access_claim_global(uid uuid) RETURNS "jsonb"
  LANGUAGE "plpgsql" SECURITY DEFINER SET search_path = public
  AS $$
  BEGIN
    RETURN (
        SELECT jsonb_agg(rolez) result
        FROM (
          SELECT
            jsonb_build_object(
              'name', rname,
              'permissions', jsonb_agg(pname)
            ) rolez
          FROM (
            SELECT 
              r.name as rname,
              p.name as pname
            FROM
              "access"."UserRole" ur,
              "access"."Role" r,
              "access"."RolePermission" rp,
              "access"."Permission" p
            WHERE
              ur."roleId" = r.id and
              r.id = rp."roleId" and
              rp."permissionId" = p.id and
              ur."userId" = uid
          ) s
          group by rname
        ) t
    );
  END;
$$;
`
];
