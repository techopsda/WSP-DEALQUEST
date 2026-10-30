import { GlobalEventTypeEnum, interestRateSetting } from '@/types/database';
import { globalEventsData } from './EventsData/globalEventsData';
import type { PrismaClient } from '@prisma/client';

export const seedGlobalEvents = async (prismaClient: PrismaClient) => {
  console.log('Seeding global events...');
  const settings = await prismaClient.setting.findUnique({
    where: {
      key: 'interestRate'
    }
  });

  const interestRate = settings?.value as interestRateSetting;
  const globalEvents = globalEventsData(interestRate.rate * 3);

  for (const globalEvent of globalEvents) {
    const existing = await prismaClient.globalEvent.findFirst({ where: { name: globalEvent.name } });
    if (!existing) {
      await prismaClient.globalEvent.create({
        data: {
          name: globalEvent.name,
          description: globalEvent?.description ?? '',
          orderNo: globalEvent.orderNo,
          type: globalEvent.type as GlobalEventTypeEnum
        }
      });
    }
  }
};
