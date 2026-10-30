interface IGamePanelButtons {
  setEndGameModalOpen: (endGameModalOpen: boolean) => void;
  setMoveGameModalOpen: (moveGameModalOpen: boolean) => void;
  status?: string;
}

const GamePanelButtons: React.FC<IGamePanelButtons> = ({ setEndGameModalOpen, setMoveGameModalOpen, status }) => {
  const inProgress = status === 'notStarted';
  return (
    <div className="p-6 w-full flex  justify-between ">
      <button
        className=" bg-warning px-8 py-4 rounded-md text-white font-semibold"
        onClick={() => setMoveGameModalOpen(true)}
      >
        Move Game To Next Screen
      </button>
      <button
        className={`${inProgress ? 'bg-gray-500' : 'bg-[#B23130]'} px-8 py-4 rounded-md text-white font-semibold`}
        disabled={inProgress}
        onClick={() => setEndGameModalOpen(true)}
      >
        End Game
      </button>
    </div>
  );
};

export default GamePanelButtons;
