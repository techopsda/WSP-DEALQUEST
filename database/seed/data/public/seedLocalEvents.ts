import { LocalEventType } from '@/types/database';
import { localEventsData } from './EventsData/localEventsData';
import type { PrismaClient } from '@prisma/client';

export const seedLocalEvents = async (prismaClient: PrismaClient) => {
  console.log('Seeding local events...');
  for (const event of localEventsData) {
    const existing = await prismaClient.localEvent.findFirst({ where: { name: event.name } });
    if (!existing) {
      await prismaClient.localEvent.create({
        data: {
          name: event.name,
          description: event.description,
          output: '',
          type: event.type as LocalEventType
        }
      });
    }
  }
};
