export const GET_SCHEMA_DATA_SQLS = [
  `
  create or replace function get_schema_data() returns table (
    constraint_name text,
    constraint_type text,
    self_schema text,
    self_table text,
    self_columns text,
    foreign_schema text,
    foreign_table text,
    foreign_columns text,
    definition text)
  as $$
    SELECT c.conname                                 AS constraint_name,
      c.contype                                     AS constraint_type,
      sch.nspname                                   AS "self_schema",
      tbl.relname                                   AS "self_table",
      JSON_AGG(col.attname ORDER BY u.attposition) AS "self_columns",
      f_sch.nspname                                 AS "foreign_schema",
      f_tbl.relname                                 AS "foreign_table",
      JSON_AGG(f_col.attname ORDER BY f_u.attposition) AS "foreign_columns",
      pg_get_constraintdef(c.oid)                   AS definition
    FROM pg_constraint c
      LEFT JOIN LATERAL UNNEST(c.conkey) WITH ORDINALITY AS u(attnum, attposition) ON TRUE
      LEFT JOIN LATERAL UNNEST(c.confkey) WITH ORDINALITY AS f_u(attnum, attposition) ON f_u.attposition = u.attposition
      JOIN pg_class tbl ON tbl.oid = c.conrelid
      JOIN pg_namespace sch ON sch.oid = tbl.relnamespace
      LEFT JOIN pg_attribute col ON (col.attrelid = tbl.oid AND col.attnum = u.attnum)
      LEFT JOIN pg_class f_tbl ON f_tbl.oid = c.confrelid
      LEFT JOIN pg_namespace f_sch ON f_sch.oid = f_tbl.relnamespace
      LEFT JOIN pg_attribute f_col ON (f_col.attrelid = f_tbl.oid AND f_col.attnum = f_u.attnum)
    WHERE sch.nspname NOT LIKE 'pg%'
      AND sch.nspname NOT LIKE 'graphql%'
      AND sch.nspname != 'information_schema'
      AND sch.nspname != 'extensions'
      AND sch.nspname != 'storage'
      AND sch.nspname != 'cron'
      AND sch.nspname != 'auth'
      AND sch.nspname != 'realtime'         
    GROUP BY constraint_name, constraint_type, "self_schema", "self_table", definition, "foreign_schema", "foreign_table"
    ORDER BY "self_schema", "self_table";
  $$ language sql;
`,
  `
  GRANT EXECUTE ON FUNCTION get_schema_data TO public, anon, authenticated, service_role;
  `
];
