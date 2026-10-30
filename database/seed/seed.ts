import { PrismaClient } from '@prisma/client';
import seedScripts from './scripts';
import seedSecurity from './security';
import seedData from './data';
import seedView from './views';
import { seedReplication } from '@/submodules/supabase-functions/lib/seedReplication';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  await seedScripts(prisma);
  await seedSecurity(prisma);
  await seedData(prisma);
  await seedView(prisma);
  await seedReplication(['Team', 'Game', 'Notification', 'Bid', 'TeamQuestion'], prisma);
  console.log('Finished seeding');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
