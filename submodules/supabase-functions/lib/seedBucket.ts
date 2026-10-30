import { PrismaClient } from '@prisma/client';

export const seedBucket = async (
  prismaClient: PrismaClient,
  bucketConfigs?: { [bucketName: string]: { public: boolean } }
) => {
  if (bucketConfigs) {
    for (const [bucketName, bucketConfig] of Object.entries(bucketConfigs)) {
      const createBucketSql = `
        INSERT INTO storage.buckets
            (id, name, public)
        values
            ('${bucketName}', '${bucketName}', ${bucketConfig?.public ? 'TRUE' : 'FALSE'});
        `;

      console.log('CREATING FILE BUCKET...');
      const createFileBucketResult = await prismaClient.$executeRawUnsafe(createBucketSql);
      console.log(`...result was ${createFileBucketResult}`);
    }
  }
};
