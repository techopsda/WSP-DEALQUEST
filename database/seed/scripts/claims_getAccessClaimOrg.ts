export const CLAIMS_GET_ACCESS_CLAIM_ORG = [
  `
  CREATE OR REPLACE FUNCTION access.get_access_claim_org(uid uuid) RETURNS "jsonb"
  LANGUAGE "plpgsql" SECURITY DEFINER SET search_path = public
  AS $$
  BEGIN
    RETURN (
      SELECT jsonb_agg(js_object) result
      FROM (
        SELECT jsonb_build_object(
          'orgId', orgid,
          'orgName', orgname,
          'roles', jsonb_agg(rolez)
        ) js_object
        FROM (
          SELECT
            orgid,
            orgname,
            jsonb_build_object(
              'name', rname,
              'permissions', jsonb_agg(pname)
            ) rolez
          FROM (
            SELECT 
              uo."organisationId" as orgid,
              o.name as orgname,
              r.name as rname,
              p.name as pname
            FROM
              "access"."UserOrganisation" uo,
              "access"."Organisation" o,
              "access"."UserOrganisationRole" uor,
              "access"."Role" r,
              "access"."RolePermission" rp,
              "access"."Permission" p
            WHERE
              uo."organisationId" = o."id" and
              uo.id = uor."userOrganisationId" and
              uor."roleId" = r.id and
              r.id = rp."roleId" and
              rp."permissionId" = p.id and
              uo."userId" = uid 
          ) s
          group by orgid, orgname, rname
        ) s
        group by orgid, orgname
      ) t
    );
  END;
$$;
`
];
