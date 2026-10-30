interface ErrorScreenProps {
  errorMessage: string;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ errorMessage }) => {
  return (
    <div className="absolute inset-0 bg-nsAdmin-800">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-24">
        <div className="flex flex-col gap-6">
          <p className="text-center text-xl text-nsAdmin-100 font-bold">{errorMessage}</p>
          <div className="w-full flex justify-center">
            <a
              className="bg-nsAdmin-400 p-4 rounded-md text-white font-bold uppercase"
              href={process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}
            >
              Return to home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
