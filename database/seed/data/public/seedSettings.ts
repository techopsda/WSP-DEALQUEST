import { PrismaClient } from '@prisma/client';

export const seedSettings = async (prisma: PrismaClient) => {
  console.log('Seeding settings...');

  const settings = [
    { key: 'interestRate', value: { rate: 10 } },
    { key: 'equityInvestmentEarnings', value: { amount: 100 } },
    { key: 'practiceRoundQuestionEarnings', value: { amount: 30 } },
    { key: 'maxTeamsPerGame', value: { amount: 10 } },
    { key: 'maxMembersPerTeam', value: { amount: 8 } },
    { key: 'localEventAmounts', value: { amount: 5 } },
    { key: 'questionAmounts', value: { toAward: 5, toDeduct: 2 } },
    { key: 'accountingAmounts', value: { toAward: 5, toDeduct: 0 } },
    { key: 'practiceRoundMaxBid', value: { amount: 50 } },
    { key: 'bidAmount', value: { amount: 10 } },
    { key: 'maxDebtValue', value: { amount: 100 } },
    { key: 'fineAmount', value: { amount: 300 } },
    { key: 'showFullStop', value: { visible: false } }
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting
    });
  }
};
