import { GamePeriodEnum } from '@/types/database';
import { Step } from 'react-joyride';

type JoyRideSteps = {
  [x in GamePeriodEnum | 'accountsFiled']?: ({ year: number[] } & Step)[];
};

export const joyRideSteps: JoyRideSteps = {
  welcome: [
    {
      target: '#countdownClock',
      skipBeacon: true,
      content:
        '1. Every stage is timed and automatically progresses. Pay careful attention to your remaining time so you don\u0027t miss out.',
      placement: 'top',
      year: [0]
    },
    {
      target: '#sidebarFinancialStats',
      skipBeacon: true,
      content:
        '2. Here are your financials. These only update at the end of the year. You must keep track of the changes within the year in preparation for calculating your end-of-year accounts.',
      placement: 'left',
      year: [0]
    },
    {
      target: '#sidebarNotifications',
      skipBeacon: true,
      content:
        '3. To help you keep track, all events and their financial impact on your firm are listed here. You can calculate your end-of-year accounts with these important values.',
      placement: 'left',
      year: [0]
    },
    {
      target: '#sidebarTabs',
      skipBeacon: true,
      content: '4. See all of the companies you\u0027ve acquired, the leaderboard and further help here.',
      placement: 'right',
      year: [0]
    }
  ],
  gamePreview: [
    {
      target: '#stagesPreviewTitle',
      skipBeacon: true,
      content: 'For the practice year all stages and teams will be treated equally.',
      placement: 'right',
      year: [0]
    }
  ],
  equityInvestment: [
    {
      target: '#equityInvestmentTypeNotification',
      skipBeacon: true,
      content: 'Your cash has increased to $100m. Keep track of your cash balance throughout the year.',
      placement: 'left',
      year: [0]
    }
  ],
  questionsPre: [
    {
      target: '#preQuizRoundText',
      skipBeacon: true,
      content: 'Earn money to spend at the company auction. Get more questions right to build your empire faster.',
      placement: 'top',
      year: [0]
    }
  ],
  questionsPost: [
    {
      target: '#quizFundingTypeNotification',
      skipBeacon: true,
      content: 'Your cash has increased to $130m.',
      placement: 'left',
      year: [0]
    }
  ],
  analysis: [
    {
      target: '#analysisRow0Reserve',
      skipBeacon: true,
      content: '1. Bidding will start at the reserve price',
      placement: 'top',
      year: [0]
    },
    {
      target: '#analysisTable',
      skipBeacon: true,
      content: '2. All companies available in the practice year have the same attributes.',
      placement: 'bottom',
      blockTargetInteraction: true,
      year: [0]
    },
    {
      target: '#analysisHeader0Est',
      skipBeacon: true,
      content: '3. The practice year is Y-0',
      placement: 'top-end',
      year: [0]
    },
    {
      target: '#ebitBodySection',
      skipBeacon: true,
      content:
        '4. See each companies\u0027 estimated performance over the coming years. Actual values may differ and will be revealed at the accounting stage at year end.',
      placement: 'bottom',
      year: [0]
    }
  ],
  finance: [
    {
      target: '#financePrimaryHeader',
      skipBeacon: true,
      content: '1. Debt can be used to increase your cash available to buy companies at the auction.',
      placement: 'right',
      year: [0]
    },
    {
      target: '#borrowingComponent1',
      skipBeacon: true,
      content:
        '2. As it\u0027s the practice year, let\u0027s live a little, everyone will take on $20m. All debt has an interest rate of 10% per annum.',
      placement: 'bottom',
      year: [0]
    },
    {
      target: '#completeFinancing',
      skipBeacon: true,
      content:
        '3. Once you\u0027ve made your financing decisions above click this button to lock in your financing options.',
      placement: 'top',
      year: [0]
    }
  ],
  financePost: [
    {
      target: '#sidebarFinancialStats',
      skipBeacon: true,
      content: '1. Remember, these numbers do not update until the year end.',
      placement: 'left',
      year: [0]
    },
    {
      target: '#sidebarNotifications',
      skipBeacon: true,
      content: '2. But the notifications help you keep track. You now have $150m cash.',
      placement: 'left',
      year: [0]
    }
  ],
  auction: [
    {
      target: '#footerFinancialStats',
      skipBeacon: true,
      content:
        '1. How much cash have I got?! Remember, these numbers don\u0027t update during the year. We\u0027ll help you out in the practice year only, you have $150m to spend.',
      placement: 'top-start',
      year: [0]
    },
    {
      target: '#bidButton',
      skipBeacon: true,
      content:
        '2. This is where you bid. You bid in increments of $10m. If another team bids more, you can increase your bid.',
      placement: 'bottom',
      year: [0]
    },
    {
      target: '#outButton',
      skipBeacon: true,
      content: '3. Or you can decide “we\u0027re out”.',
      placement: 'right',
      year: [0]
    },
    {
      target: '#bid0',
      skipBeacon: true,
      content:
        '4. Keep an eye on who you are outbidding. Did you just steal their target company? They might be sat nearby, give them a cheeky grin.',
      placement: 'right',
      year: [0]
    },
    {
      target: '#bidButton',
      skipBeacon: true,
      content: '5. Let\u0027s get bidding! In the practice year let\u0027s just go up to $50m.',
      placement: 'bottom',
      year: [0]
    }
  ],
  auctionPost: [
    {
      target: '#newOwner0',
      skipBeacon: true,
      content: 'In the practice year everyone has acquired one company for $50m. Your cash has now decreased to $100m.',
      placement: 'right',
      year: [0]
    }
  ],
  auctionPostSummary: [
    {
      target: '#auctionTypeNotification',
      skipBeacon: true,
      content: 'Quick reminder, your acquisitions can be found in the notifications',
      placement: 'left',
      skipScroll: true,
      year: [0]
    }
  ],
  companyEarnings: [
    {
      target: '#companyEarningsHeader',
      skipBeacon: true,
      content: '1. All companies in the practice round have the same EBIT performance.',
      placement: 'bottom',
      year: [0]
    },

    {
      target: '#companyEarningsTable',
      skipBeacon: true,
      content:
        '2. The current year\u0027s EBIT is important for your upcoming accounts, but don\u0027t worry this information will also be available during the accounting stage.',
      placement: 'bottom',
      year: [0]
    }
  ],
  accounting: [
    {
      target: '#consolidatedEBIT',
      skipBeacon: true,
      content:
        '1. Calculate your net income. In the practice year you must input answers for each line. In future years you will only supply the net income total.',
      placement: 'top',
      skipScroll: true,
      year: [0]
    },
    {
      target: '.AccountsTab',
      skipBeacon: true,
      content: '2. Note: On smaller screens inputs may appear further down the page',
      placement: 'bottom',
      year: [0]
    },
    {
      target: '.CompaniesTab',
      skipBeacon: true,
      content:
        '3. For your consolidated EBIT in the income statement you will need to sum up the actual EBITs of your companies for this year, which can be found here.',
      placement: 'bottom',
      skipScroll: true,
      year: [0]
    },
    {
      target: '.NotificationsTab',
      skipBeacon: true,
      content:
        '4. Not been keeping track of your numbers? Your activity throughout the year can be found here. Use this to calculate the other rows.',
      placement: 'bottom',
      skipScroll: true,
      year: [0]
    },
    {
      target: '#interest',
      skipBeacon: true,
      content:
        '5. For the purposes of this game, interest payments are calculated as debt now x interest rate. The interest is not added to debt.',
      placement: 'top',
      year: [0]
    },
    {
      target: '#fileAccounts',
      skipBeacon: true,
      content:
        '6. File your accounts when ready. If you run out of time your input numbers will be submitted automatically.',
      placement: 'top',
      year: [0]
    },
    {
      target: '#consolidatedEBIT',
      skipBeacon: true,
      content:
        '7. Let\u0027s start! Click on Companies above, find your EBIT figure and input it here. Then fill out the rest of the line items.',
      placement: 'bottom',
      year: [0]
    },

    {
      target: '#equitySubtotal',
      skipBeacon: true,
      content:
        'Remeber, from this year onwards you\u0027ll only have to suply the net income of each column in the bottom row.',
      placement: 'left',
      year: [0, 1]
    }
  ],
  accountsFiled: [
    {
      target: '#IncomeStatementExtractAudit',
      skipBeacon: true,
      content: 'Compare your answers against the FEC\u0027s official numbers to see where you went right and wrong.',
      placement: 'bottom',
      year: [0]
    }
  ],
  accountingSummary: [
    {
      target: '#accountingTypeNotification',
      skipBeacon: true,
      content:
        'Your Bean Counter Funding will be added to your cash and equity. If you are tracking your calculations, update them now!',
      placement: 'left',
      skipScroll: true,
      year: [0]
    }
  ],
  yearEnd: [
    {
      target: '#sidebarFinancialStats',
      skipBeacon: true,
      content:
        '1. Your annual financials have been updated including Bean Counter Funding. Use these numbers going into the next year.',
      placement: 'left',
      year: [0]
    },
    {
      target: '#teamEquity1',
      skipBeacon: true,
      content: '2. Remember, the team with the highest equity at the end of the game will be the winner!',
      placement: 'right',
      year: [0]
    },
    {
      target: '#footerText',
      skipBeacon: true,
      content:
        '3. The instructor will discuss the year and answer any questions before moving on to the next. If everyone is waiting for the instructor please give them a gentle nudge.\n\nGood luck for the future!',
      placement: 'top',
      year: [0]
    }
  ]
};
