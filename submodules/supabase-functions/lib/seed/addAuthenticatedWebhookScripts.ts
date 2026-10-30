import { PrismaClient } from '@prisma/client';

export const addAuthenticatedWebhookScripts = async (prismaClient: PrismaClient) => {
  const seedWebhookSecretVaultKeySql = `
        SELECT vault.create_secret('${process.env.SUPABASE_WEBHOOK_SECRET}', 'webhookSecret');
    `;

  const generateWebhookHMACSql = `
        CREATE OR REPLACE FUNCTION "access"."generateWebhookHMAC"(endpoint text, "apiKey" text)
        RETURNS text AS $$
        DECLARE
            timestamp bigint := EXTRACT(EPOCH from NOW()) * 1000;
        BEGIN
            RETURN CONCAT('HMAC:', timestamp, ':', ENCODE(HMAC(CONCAT("endpoint", timestamp), "apiKey", 'sha256'),'hex'));
        END;
        $$ LANGUAGE plpgsql;
    `;

  const createWebhookCallSql = `
        CREATE OR REPLACE FUNCTION "access"."createWebhookCall"()
        RETURNS TRIGGER AS $$
        DECLARE
            path text := TG_ARGV[0]::text;
            timeout int := TG_ARGV[1]::text;
            request_id bigint;
            "headers" jsonb;
            "webhookSecret" text;
        BEGIN
            SELECT decrypted_secret FROM "vault".decrypted_secrets WHERE "name" = 'webhookSecret' INTO "webhookSecret";
            SELECT jsonb_build_object('Content-type', 'application/json', 'Authorization', "access"."generateWebhookHMAC"(path, "webhookSecret")) INTO headers;
                
            SELECT http_post INTO request_id FROM net.http_post(
                path,
                jsonb_build_object(
                    'old_record', OLD,
                    'record', NEW,
                    'type', TG_OP,
                    'table', TG_TABLE_NAME,
                    'schema', TG_TABLE_SCHEMA
                ),
                '{}'::jsonb,
                headers,
                timeout
            );
        
            INSERT INTO supabase_functions.hooks
                (hook_table_id, hook_name, request_id)
            VALUES
                (TG_RELID, TG_NAME, request_id);
        
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;

  const createAuthenticatedWebhookSql = `
        CREATE OR REPLACE FUNCTION "access"."createAuthenticatedWebhook"(name text, schema text, "triggerTable" text, event text, endpoint text, timeout int)
        RETURNS VOID AS $$
        BEGIN
            EXECUTE FORMAT(CONCAT('DROP TRIGGER IF EXISTS ', name, ' ON "', schema, '"."', "triggerTable", '"'));

            EXECUTE FORMAT(
                CONCAT(
                    'CREATE TRIGGER ', name,
                    ' AFTER ', event, ' ON "', schema, '"."', "triggerTable", '" ',
                    E'FOR EACH ROW EXECUTE FUNCTION "access"."createWebhookCall"(\\'', endpoint, E'\\', ', timeout, ')'
                )
            );
        END;
        $$ LANGUAGE plpgsql;
    `;

  console.log('Creating webhookSecret vault key...');
  const seedWebhookSecretVaultKeyResult = await prismaClient.$executeRawUnsafe(seedWebhookSecretVaultKeySql);
  console.log(`...result was ${seedWebhookSecretVaultKeyResult}`);

  console.log('Creating generateWebhookHMAC function...');
  const generateWebhookHMACResult = await prismaClient.$executeRawUnsafe(generateWebhookHMACSql);
  console.log(`...result was ${generateWebhookHMACResult}`);

  console.log('Creating createWebhookCall function...');
  const createWebhookCallResult = await prismaClient.$executeRawUnsafe(createWebhookCallSql);
  console.log(`...result was ${createWebhookCallResult}`);

  console.log('Creating createAuthenticationWebhook function...');
  const createAuthenticatedWebhookResult = await prismaClient.$executeRawUnsafe(createAuthenticatedWebhookSql);
  console.log(`...result was ${createAuthenticatedWebhookResult}`);
};
