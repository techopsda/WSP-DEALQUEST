'use client';

import { RaceBy } from '@uiball/loaders';

interface LoadingScreenProps {
  loadingText?: string;
  customLoader?: React.ReactNode;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ loadingText, customLoader }) => {
  return (
    <div className="absolute inset-0 bg-nsAdmin-800">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-24">
        <div className="flex flex-col gap-6">
          <p className="text-center text-5xl text-nsAdmin-100 font-bold">{loadingText ?? 'Loading'}</p>
          {customLoader ? customLoader : <RaceBy size={650} lineWeight={5} speed={2.5} color="white" />}
        </div>
      </div>
    </div>
  );
};
