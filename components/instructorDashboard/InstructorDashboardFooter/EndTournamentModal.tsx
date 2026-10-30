import DealQuestModal from '@/components/shared/DealQuestModal';
import { Tournament } from '@/types/database';

interface EndTournamentModalProps {
  setEndTournamentModalOpen: (endTournamentModalOpen: boolean) => void;
  endTournamentModalOpen: boolean;
  endTournament: () => Promise<void>;
  tournament: Tournament;
}

export const EndTournamentModal: React.FC<EndTournamentModalProps> = ({
  setEndTournamentModalOpen,
  endTournamentModalOpen,
  endTournament,
  tournament
}) => {
  return (
    <DealQuestModal
      isOpen={endTournamentModalOpen}
      onCancelClicked={() => setEndTournamentModalOpen(false)}
      onButtonClicked={endTournament}
      titleText={`End all games for lobby ${tournament.lobbyCode}?`}
      buttonColour="[#B23130]"
      buttonText="I'M SURE END ALL GAMES"
    >
      <p>
        This will <strong className="text-white">end all games</strong> are you sure?
      </p>
    </DealQuestModal>
  );
};
