-- CreateSchema
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role, postgres, supabase_admin;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA "public" TO public;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role, postgres, supabase_admin;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role, postgres, supabase_admin;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role, postgres, supabase_admin;

GRANT USAGE ON SCHEMA access TO anon, authenticated, service_role, postgres, supabase_admin;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA "access" TO public;
GRANT ALL ON ALL TABLES IN SCHEMA access TO anon, authenticated, service_role, postgres, supabase_admin;
GRANT ALL ON ALL ROUTINES IN SCHEMA access TO anon, authenticated, service_role, postgres, supabase_admin;
GRANT ALL ON ALL SEQUENCES IN SCHEMA access TO anon, authenticated, service_role, postgres, supabase_admin;

