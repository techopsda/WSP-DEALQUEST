const { exec } = require('child_process');
require('dotenv').config();

const generateSupabaseTypes = async () => {
  const schemas = process.env.NEXT_PUBLIC_DATABASE_SCHEMAS?.trim().split(',');
  const supabaseId = process.env.NEXT_PUBLIC_SUPABASE_ID?.trim();

  if (!schemas && !supabaseId) {
    throw new Error('ENV VARS NOT SET FOR DATABASE_SCHEMAS AND NEXT_PUBLIC_SUPABASE_ID');
  } else if (!schemas) {
    throw new Error('ENV VAR DATABASE_SCHEMAS NOT SETUP');
  } else if (!supabaseId) {
    throw new Error('ENV VAR NEXT_PUBLIC_SUPABASE_ID NOT SETUP');
  }

  exec(
    `npx supabase gen types typescript --db-url "${process.env.DATABASE_URL}" ${schemas.map(
      (schema) => `--schema ${schema.trim()}`
    )} > types/supabase.ts`.replaceAll(',', ' '),
    (error: unknown, result: unknown, stderr: unknown) => {
      if (error) {
        console.log('ERROR EXECUTING TYPE GENERATION', error);
        return;
      }
      if (stderr) {
        console.log('STDERR EXECUTING TYPE GENERATION', stderr);
        return;
      }
      console.log('SUCCESSFULLY GENERATED TYPES', result);
    }
  );
};

generateSupabaseTypes();
export {};
