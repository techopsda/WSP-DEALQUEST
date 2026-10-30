import { PrismaClient } from '@prisma/client';

export const resetBucket = async (prismaClient: PrismaClient) => {
  const policies: { policyname: string }[] = await prismaClient.$queryRawUnsafe(
    `SELECT policyName FROM pg_policies WHERE schemaname = 'storage' and tablename = 'objects'`
  );

  for (const { policyname } of policies) {
    console.log(`Removing policy ${policyname} from buckets...`);
    const dropPolicyResult = await prismaClient.$executeRawUnsafe(
      `DROP POLICY IF EXISTS "${policyname}" ON storage.objects;`
    );
    console.log(`...result was ${dropPolicyResult}`);
  }

  const emptyBucketSql = `
      DELETE FROM storage.objects WHERE bucket_id = 'filebucket';
    `;

  console.log('EMPTYING FILE BUCKET...');
  const emptyFileBucketResult = await prismaClient.$executeRawUnsafe(emptyBucketSql);
  console.log(`...result was ${emptyFileBucketResult}`);

  const deleteBucketSql = `
    DELETE FROM storage.buckets WHERE id = 'filebucket';
  `;

  console.log('DELETING FILE BUCKET...');
  const deleteFileBucketResult = await prismaClient.$executeRawUnsafe(deleteBucketSql);
  console.log(`...result was ${deleteFileBucketResult}`);
};
