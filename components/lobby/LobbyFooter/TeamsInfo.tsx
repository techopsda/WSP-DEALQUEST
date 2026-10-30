interface Props {
  splitTeams: Array<Array<string>>;
  readyTeams: number;
  handleSplitTeams: () => void;
  totalTeams: number;
}

export const TeamsInfo: React.FC<Props> = ({ splitTeams, totalTeams, readyTeams, handleSplitTeams }) => {
  const getTeamsReadyString = (numberOfReadyTeams: number, totalNumberofTeams: number) => {
    if (numberOfReadyTeams > 0 && totalNumberofTeams > 0) {
      return `${numberOfReadyTeams}/${totalNumberofTeams}`;
    } else {
      return `${readyTeams}`;
    }
  };
  return (
    <div className="shrink-0 flex items-center gap-6 justify-self-end">
      <p className="text-xl font-semibold text-white">Teams ready: {getTeamsReadyString(readyTeams, totalTeams)}</p>
      <button className="[ dqButton ] shrink-0" onClick={handleSplitTeams} disabled={!(readyTeams > 1)}>
        {splitTeams.length > 1 ? 'Automatically split teams into games' : 'Create game'}
      </button>
    </div>
  );
};
