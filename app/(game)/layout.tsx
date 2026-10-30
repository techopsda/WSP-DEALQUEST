'use client';
import GradientBackground from '@/components/shared/GradientBackground';
import '../../styles/global.css';

export default function SimpleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative overflow-hidden bg-alpha-900 text-alpha-light-800">
        <GradientBackground />
        <div className="relative min-h-screen overflow-y-auto px-12 flex flex-col">
          <div className="my-12 grow flex flex-col">{children}</div>
        </div>
      </div>
    </>
  );
}
