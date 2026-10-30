interface InstructorLobbyHeaderProps {
  lobbyCode: string;
}

const InstructorLobbyHeader: React.FC<InstructorLobbyHeaderProps> = ({ lobbyCode }) => {
  //TODO: Add real instructor name when auth is setup and access is public facing (or another solution has been implemented)

  return (
    <>
      <div className="text-white font-heading leading-snug text-5xl">
        <span className="">Lobby: </span>
        <span className="text-bravo">{lobbyCode}</span>
      </div>
      <p className="text-lg">Waiting for teams to join and file their paperwork</p>
    </>
  );
};

export default InstructorLobbyHeader;
