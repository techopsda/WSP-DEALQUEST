'use client';

import { RaceBy } from '@uiball/loaders';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import LogoGroup from '../lobby/LogoGroup';
import GradientBackground from './GradientBackground';

const fullConfig = resolveConfig(tailwindConfig) as any;
const loadingColor = fullConfig?.theme?.colors?.success.DEFAULT;

export const Loading: React.FC = () => {
  return (
    <div className="absolute inset-0">
      <GradientBackground />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-24">
        <LogoGroup feHeight="max-h-9" dqHeight="max-h-20" gap="gap-9" />
        <div className="flex flex-col gap-6">
          <RaceBy size={960} lineWeight={5} speed={2.5} color={loadingColor} />
          <p className="text-center text-xl text-alpha-light-800">Dotting the I&apos;s and Crossing the T&apos;s</p>
        </div>
      </div>
    </div>
  );
};
