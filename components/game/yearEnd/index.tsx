import { useGameDetails } from '@/components/hooks/useGameDetails';
import Leaderboard from '@/components/shared/Leaderboard';
import { TooltipComponent } from '@/components/shared/TooltipComponent';
import { BalanceSheet, Game, Team, Tournament } from '@/types/database';
import { useEffect, useState } from 'react';
import { Joyride as ReactJoyride } from 'react-joyride';
import { RoundWrapper } from '../RoundWrapper';
import { getBalanceSheetYear } from '../shared/getBalanceSheetYear';
import { TeamStatBox } from './TeamStatBox';
import { TeamWithBalanceSheetDataAndMembers, useBalanceSheetAndCompanies } from './useBalanceSheetAndCompanies';
import { getTooltips } from '@/lib/shared/getTooltips';

interface Props {
  tournament: Tournament;
  game: Game;
  team: Team;
}

export const YearEnd: React.FC<Props> = ({ tournament, game, team }) => {
  const { stageTimings } = useGameDetails();

  const { fetchPrevBalanceSheet } = getBalanceSheetYear(game?.year, tournament?.practiceRound);
  const { isLoading, teamBalanceSheets, prevTeamBalanceSheets, isFirstYear, finalYear } = useBalanceSheetAndCompanies(
    game,
    fetchPrevBalanceSheet
  );

  const teamBalanceSheet = teamBalanceSheets.find(
    (teamBalance) => teamBalance.teamId === team.id
  ) as TeamWithBalanceSheetDataAndMembers;

  const prevTeamBalanceSheet = prevTeamBalanceSheets.find(
    (teamBalance) => teamBalance.teamId === team.id
  ) as BalanceSheet;

  const prevCash = prevTeamBalanceSheet?.cash ?? 0;
  const [cashFrom, setCashFrom] = useState(prevCash);
  const [cashTo, setCashTo] = useState(teamBalanceSheet?.cash);

  const prevEquity = prevTeamBalanceSheet?.equity ?? 0;
  const [equityFrom, setEquityFrom] = useState(prevEquity);
  const [equityTo, setEquityTo] = useState(teamBalanceSheet?.equity);

  const prevDebt = prevTeamBalanceSheet?.debt ?? 0;
  const [debtFrom, setDebtFrom] = useState(prevDebt);
  const [debtTo, setDebtTo] = useState(teamBalanceSheet?.debt);

  useEffect(() => {
    if (cashFrom !== undefined && cashTo !== undefined) {
      setCashFrom(cashTo);
      setCashTo(teamBalanceSheet?.cash);
    }
  }, [teamBalanceSheet?.cash]);

  useEffect(() => {
    if (equityFrom !== undefined && equityTo !== undefined) {
      setEquityFrom(equityFrom);
      setEquityTo(teamBalanceSheet?.equity);
    }
  }, [teamBalanceSheet?.equity]);

  useEffect(() => {
    if (debtFrom !== undefined && debtTo !== undefined) {
      setDebtFrom(debtTo);
      setDebtTo(teamBalanceSheet?.debt);
    }
  }, [teamBalanceSheet?.debt]);

  useEffect(() => {
    if (!isLoading) {
      if (cashFrom === undefined) {
        setCashFrom(prevTeamBalanceSheet?.cash ?? 0);
      }
      if (cashTo === undefined) {
        setCashTo(teamBalanceSheet?.cash ?? 0);
      }

      if (debtFrom === undefined) {
        setDebtFrom(prevTeamBalanceSheet?.debt ?? 0);
      }
      if (debtTo === undefined) {
        setDebtTo(teamBalanceSheet?.debt ?? 0);
      }

      if (equityFrom === undefined) {
        setEquityFrom(prevTeamBalanceSheet?.equity ?? 0);
      }
      if (equityTo === undefined) {
        setEquityTo(teamBalanceSheet?.equity ?? 0);
      }
    }
  }, [isLoading]);

  const steps = getTooltips(game.periodType, game.year);

  return (
    <RoundWrapper
      tournament={tournament}
      stageTimings={stageTimings}
      game={game}
      team={team}
      header="End of year results"
      justify={finalYear !== game.year ? 'justify-start' : 'justify-center'}
      footerText={tournament.finalYear === game.year ? '' : 'Waiting for instructor to start the next year'}
      hideCountdown={true}
    >
      {!isLoading && (
        <div className="w-full flex flex-col items-center gap-12 py-12">
          <ReactJoyride
            steps={steps ?? []}
            run={game.year === 0}
            tooltipComponent={TooltipComponent}

          />
          <div className="w-full grid xl:grid-cols-3 gap-6 max-w-6xl">
            {/* From and to values for all stats will need to be dynamic, we might need to alter the counter component to better hand the decimal place, it is currently set via a prop so would be good to check the number and then decide on the number of decimals, e.g. if the value is 118.5 then show 1 decimal, if it's 20 or 20.0 then show 0 decimals */}

            {/* TeamStatBox has a couple of relevant props;
            - positive (bool) sets if the change is a positive one (e.g. debt going down or cash going up)
            - valueDown (bool) sets if the value is going to be lower than it previously was
          */}

            <TeamStatBox
              statName="Cash"
              teamName={teamBalanceSheet?.Team?.name}
              from={isFirstYear ? 0 : cashFrom}
              to={cashTo}
              valueDown={(isFirstYear ? 0 : cashFrom) > cashTo}
              positive={(cashFrom ?? 0) < (cashTo ?? 0)}
            />
            <TeamStatBox
              statName="Debt"
              teamName={teamBalanceSheet?.Team?.name}
              from={isFirstYear ? 0 : cashFrom}
              to={debtTo}
              valueDown={(isFirstYear ? 0 : debtFrom) > debtTo}
              positive={(debtFrom ?? 0) > (debtTo ?? 0)}
            />
            <TeamStatBox
              statName="Equity"
              teamName={teamBalanceSheet?.Team?.name}
              from={isFirstYear ? 0 : cashFrom}
              to={equityTo}
              valueDown={(isFirstYear ? 0 : equityFrom) > equityTo}
              positive={(equityFrom ?? 0) < (equityTo ?? 0)}
            />
          </div>
          {/* If this is the last year of the game this part of the screen won't be shown */}
          {finalYear !== game.year && <Leaderboard teamId={team?.id} teamBalanceSheets={teamBalanceSheets} />}
        </div>
      )}
    </RoundWrapper>
  );
};
