import { useGameDetails } from '@/components/hooks/useGameDetails';
import { Loading } from '@/components/shared/Loading';
import { TooltipComponent } from '@/components/shared/TooltipComponent';
import { Game, Team, Tournament } from '@/types/database';
import { useEffect, useState } from 'react';
import { Joyride as ReactJoyride } from 'react-joyride';
import { RoundTextScreen } from '../RoundTextScreen';
import { RoundWrapper } from '../RoundWrapper';
import { CompanyTable } from '../shared/CompanyTable';
import { getCompaniesToDisplay } from './getCompaniesToDisplay';
import { useAuctionCompanyData } from './useAuctionCompanyData';
import { readyUpTeam } from '@/lib/team/readyUpTeam';
import { getTooltips } from '@/lib/shared/getTooltips';
import { getCompaniesWithSlicedEarnings } from '@/lib/shared/getCompaniesWithSlicedEarnings';

interface Props {
  tournament: Tournament;
  game: Game;
  team: Team;
}

export const Analysis: React.FC<Props> = ({ tournament, game, team }) => {
  const { isLoading, companiesObject } = useAuctionCompanyData(game, team);
  const { stageTimings } = useGameDetails();
  const [isAnalysisCompleted, setIsAnalysisCompleted] = useState(
    team?.status === 'awaitingNextPeriod' && game?.periodType === 'analysis'
  );

  const buttonDisabled = isAnalysisCompleted || !stageTimings;

  const [sidebarAnimationEnded, setSidebarAnimationEnded] = useState(false);

  const companiesToDisplay = getCompaniesToDisplay(companiesObject);

  const onReadyUpClicked = async () => {
    setIsAnalysisCompleted(true);
    await readyUpTeam(game, team?.id);
  };

  useEffect(() => {
    if (game?.periodType === 'analysis') setIsAnalysisCompleted(team.status === 'awaitingNextPeriod');
  }, [team?.status]);

  const steps = getTooltips(game.periodType, game.year);

  return (
    <RoundWrapper
      tournament={tournament}
      game={game}
      team={team}
      header="Analysis"
      stageTimings={stageTimings}
      showSidebar={game.periodType === 'analysisPre' || game.periodType === 'analysisPost'}
      setSidebarAnimationEnded={setSidebarAnimationEnded}
      footerText={
        isAnalysisCompleted && game.periodType === 'analysis'
          ? 'Waiting for other teams to ready up before moving on'
          : undefined
      }
      allowSkip={game?.periodType === 'analysisPost'}
      footerSlot={
        <>
          {game.periodType === 'analysis' && (
            <div className="bg-alpha-900">
              <div className="flex items-center justify-center gap-x-12 w-full p-6">
                <button className="[ dqButton ]" onClick={onReadyUpClicked} disabled={buttonDisabled}>
                  We've finished our analysis
                </button>
              </div>
            </div>
          )}
        </>
      }
    >
      {!isLoading && (
        <>
          {game.periodType === 'analysisPre' && (
            <RoundTextScreen title="Analysis" isIntro>
              <p>Analyze the companies available in the upcoming auction.</p>
              <p>Work out which companies you want to bid on and how much you&apos;re willing to pay for them.</p>
            </RoundTextScreen>
          )}
          {game.periodType === 'analysis' && (
            <>
              <ReactJoyride
                tooltipComponent={TooltipComponent}
                run={game.year === 0 && companiesToDisplay?.length > 0 && sidebarAnimationEnded}
                steps={steps ?? []}

              />
              <div className="w-full max-w-8xl pb-24 flex flex-col gap-12">
                {isAnalysisCompleted && (
                  <p className="bg-error text-white p-6 rounded-md text-center">
                    Waiting for other teams to complete their analysis
                  </p>
                )}
                <CompanyTable
                  companiesToDisplay={getCompaniesWithSlicedEarnings(companiesToDisplay, game.year)}
                  game={game}
                  hiddenKeys={['salePrice']}
                />
              </div>
            </>
          )}

          {game.periodType === 'analysisPost' && (
            <RoundTextScreen title="Time's up!">
              <p>We hope you&apos;ve identified some great targets for the auction.</p>
              <p>But first, let&apos;s look at debt financing to give you more purchasing power.</p>
            </RoundTextScreen>
          )}
        </>
      )}
      {isLoading && <Loading />}
    </RoundWrapper>
  );
};
