import Link from 'next/link';

export const JoinALobby: React.FC = () => {
  return (
    <div className="flex justify-center">
      <Link href={'/'} className="[ dqSecondaryButton ]">
        Join a lobby
      </Link>
    </div>
  );
};
