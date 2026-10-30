import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { resetBucket } from './resetBucket';
import readline from 'readline';
import { resetVault } from './resetVault';

require('dotenv').config();

const lineReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const prismaClient = new PrismaClient();

export const resetDb = async () => {
  await lineReader.question(
    `Are you sure you want to reset db with id: ${process.env.NEXT_PUBLIC_SUPABASE_ID}? y/n\n`,
    async (answer: string) => {
      if (answer.toLowerCase() === 'y') {
        console.log('resetting DB...');
        exec('npx prisma migrate reset --skip-seed --force', (error: unknown, result: unknown, stderr: unknown) => {
          if (error) {
            console.log('ERROR EXECUTING DB RESET', error);
            return;
          }
          if (stderr) {
            console.log('STDERR EXECUTING DB RESET', stderr);
            return;
          }
          console.log('SUCCESSFULLY RESET DB', result);
        });
        await resetBucket(prismaClient);
        await resetVault(prismaClient);
      } else {
        console.log('Cancelling db reset');
      }

      lineReader.close();
    }
  );
};

resetDb();
