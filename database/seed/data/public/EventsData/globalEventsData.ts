export const globalEventsData = (interestRate: number) => {
  return [
    {
      name: 'The Fast Food AI Revolution has Begun',
      description:
        'The adoption of AI and robots into fast food chains worldwide makes food truly fast! The time saved and ultimate euphoria results in a global economic boom.',
      orderNo: 0,
      type: 'positiveRisk'
    },
    {
      name: 'No, Not My Insta!',
      description:
        'It\u0027s a cybercrime wave. Everyone\u0027s Instagram and Pokémon Go accounts have been hacked. The amount of time spent re-posting photos, and refilling Pokédex has led to a global recession.',
      orderNo: 1,
      type: 'negativeRisk'
    },
    {
      name: 'Attitude Shift',
      description:
        'Gone are the days of single use plastics. Investors and consumers are focusing on responsible companies that have strong ESG values, and everyone feels better for it.',
      orderNo: 2,
      type: 'positiveRisk'
    },
    {
      name: `Inflation Risk`,
      description:
        'Central banks are setting unprecedented interest rates for this year only. Rates have tripled. You must calculate this year\u0027s interest expense using the new rate.',
      orderNo: 3,
      type: 'increaseRates'
    },
    {
      name: 'Political Disruption',
      description:
        'A wild politician of a first world country has carelessly dabbled with economic policy. Markets are afraid. Banks sensibly react by requiring companies to de-leverage. A maximum debt level of $100m will be enforced next year.',
      orderNo: 4,
      type: 'maxDebtEquity'
    },
    {
      name: 'Really?',
      description: 'Nothing happens. No drama. Everything is fine. Analysts go home early.',
      orderNo: 5,
      type: 'neutral'
    },
    {
      name: 'Can we stop blocking major trade routes...',
      description: 'Hobbyist weather balloons converge and block the Panama Canal. World trade negatively affected.',
      orderNo: 6,
      type: 'negativeRisk'
    },
    {
      name: 'White Christmas',
      description: 'A micro ice age guarantees a white Christmas for all. Holiday sales doubled around the world.',
      orderNo: 7,
      type: 'positiveRisk'
    }
  ];
};
