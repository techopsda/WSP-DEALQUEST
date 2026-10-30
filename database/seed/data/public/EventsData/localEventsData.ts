const positiveLocalEvents = [
  {
    name: 'Hyperloop is in Town',
    description:
      'Recent upgrades to local infrastructure have resulted in reduced commute times. Productivity is on the up.',
    type: 'positive'
  },

  {
    name: 'The Sun Shines on You',
    description:
      'A sustained spell of glorious summer weather in your region boosts staycations boosts the local economy for your companies.',
    type: 'positive'
  },

  {
    name: '3 Day Weekend',
    description: 'You experiment with a 4-day working week across your firms and see huge productivity gains.',
    type: 'positive'
  },

  {
    name: 'Wedding of the Year',
    description:
      'The company suggestion scheme recommends changing the radio station in your warehouses from gentle classical to drum and bass. 180 bpm tracks lead to a noticeable rise in productivity.',
    type: 'positive'
  },

  {
    name: 'Not Sub Focus Any More',
    description:
      'The company suggestion scheme recommends changing the radio station in your warehouse from gentle classical music to drum and bass. 180 bpm tracks lead to a noticeable rise in staff productivity.',
    type: 'positive'
  },

  {
    name: 'Copycats Pay Up',
    description:
      'A competitor launches a product that is almost identical to your most popular product. The judge finds in your favor leading to significant reparations.',
    type: 'positive'
  },

  {
    name: 'Free Trade',
    description:
      'A free trade deal is negotiated with a neighboring country leading to lower imported material costs and improved sales.',
    type: 'positive'
  },

  {
    name: 'Lost in Translation',
    description:
      'A new product is launched but its name translates to \u0022Don\u0027t Buy This\u0022 in the language of one of your key export markets.  The story goes viral and sales of the product go through the roof.',
    type: 'positive'
  },

  {
    name: 'Godzilla Attacks!',
    description: '\u0022Godzilla Attacks\u0022 is the name of a festival in your region and leads to a boost in sales.',
    type: 'positive'
  },

  {
    name: 'Taxes, but Good',
    description: 'There\u0027s been a tax error in your favor.',
    type: 'positive'
  },

  {
    name: 'Did the Right Thing',
    description:
      'After battling a case of unwarranted allegations the judge has found in your favor and you have been compensated.',
    type: 'positive'
  },

  {
    name: 'Surplus Lands Sold',
    description: 'Some of your unused land has sold for more than expected!',
    type: 'positive'
  },

  {
    name: 'Lucky Family',
    description: 'Your second aunt, twice removed, has reconnected, and she brought a generous gift.',
    type: 'positive'
  },

  {
    name: 'Lottery Win',
    description:
      'You\u0027ve won big and passed it on. Your staff are enjoying their champagne breakfasts, productivity and sales are up!',
    type: 'positive'
  },

  {
    name: 'Future Vision',
    description: 'You invested in new AR/VR headset technology and it\u0027s paying off.',
    type: 'positive'
  },

  {
    name: 'Would you like to form an alliance with me?',
    description: 'You have formed a harmonious relationship with an old adversary and sales have benefitted.',
    type: 'positive'
  }
];

const negativeLocalEvents = [
  {
    name: 'Too Many Minerals',
    description:
      'Discovery of huge swathes of rare earth mineral deposits has led to them being renamed common earth mineral deposits, resulting in jitters in commodity markets, leading to reduced margins for your company.',
    type: 'negative'
  },
  {
    name: 'People Need to Breath',
    description:
      'The governor of your state introduces stringent new CO2 regulations leading to enforced upgrade costs for your business.',
    type: 'negative'
  },

  {
    name: 'Train Strikes',
    description:
      'Chaos on public transport! Your business suffers reduced productivity as staff spend more time on trains and buses than at work.',
    type: 'negative'
  },

  {
    name: 'Love Is Hygiene',
    description:
      'One of your companies\u0027 CEOs appears on the hottest new Netflix dating show. It goes viral but for the wrong reasons, their terrible personal hygiene has led to a collapse in sales.',
    type: 'negative'
  },

  {
    name: 'I\u0027m Not Saying it was Aliens...',
    description:
      'One of your companies\u0027 CEOs posts a bizarre conspiracy theory causing a significant decline in sales of its products.',
    type: 'negative'
  },

  {
    name: 'Fake Reviews',
    description:
      'Fake reviews stating your customer service as \u0022worst in the country\u0022 distracts management from more important goals, leading to a reduction in performance.',
    type: 'negative'
  },

  {
    name: 'Hot Out',
    description:
      'A heatwave causes a suspicious spike in worker sickness rates, particularly on Monday and Fridays reducing industrial output.',
    type: 'negative'
  },

  {
    name: 'Burned Bridges',
    description:
      'A junior manager that recently joined you has been caught posting fake reviews about their previous employer. They sue and you settle out of court.',
    type: 'negative'
  },

  {
    name: 'So Long, and Thanks for All the Fish',
    description:
      'Your head of R&D leaves to go to a competitor taking 5 key staff with her.  The effort to replace them and the overtime worked to catch up costs your company.',
    type: 'negative'
  },

  {
    name: 'The Classics are the Best',
    description:
      'The company launches a new \u0022improved\u0022 version of their most popular item in a blaze of publicity.  There is a huge social media backlash and sales slump, the company quietly launches a \u0022classic\u0022 version in an attempt to recover but sales are still down.',
    type: 'negative'
  },

  {
    name: 'Expensive Experts',
    description: 'M&A advisory fees need to be paid.',
    type: 'negative'
  },

  {
    name: 'Fire!',
    description:
      'One of your warehouses caught fire! Fortunately, no one was hurt and the insurance covers most of the cost, but sales have been disrupted.',
    type: 'negative'
  },

  {
    name: 'Earthquake!',
    description: 'But not a big one, still enough to knock the fence down. You\u0027ll have to repair the damage.',
    type: 'negative'
  },

  {
    name: 'Soft Play',
    description:
      'Everyone enjoyed their time at the makeshift soft play center in the warehouse, except for the 13 members of staff who now have lower leg injuries. The compensation claim will not be cheap, put some money aside.',
    type: 'negative'
  },

  {
    name: 'Give them the Tools',
    description:
      'Complaints about work laptops have reached a crescendo. You can\u0027t expect people to do their jobs with Windows 95. Spend some money on upgrades! ',
    type: 'negative'
  },

  {
    name: 'Letter to the Lawyers',
    description:
      'A mountain of legal correspondence has been found after your latest acquisition. Nobody will take responsibility, but it\u0027s ultimately going to cost you.',
    type: 'negative'
  }
];

export const localEventsData = [...positiveLocalEvents, ...negativeLocalEvents];
