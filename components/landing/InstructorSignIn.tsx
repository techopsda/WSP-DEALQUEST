import Link from 'next/link';

export const InstructorSignIn: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <Link href={'/login'} className="[ dqSecondaryButton ]">
        Instructor Sign-In
      </Link>
    </div>
  );
};
