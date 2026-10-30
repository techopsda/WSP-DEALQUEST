'use client';

interface Props {
  header: string;
  subheader: string;
}

export const GameContentHeader: React.FC<Props> = ({ header, subheader }) => {
  return (
    <div className="flex flex-col items-center absolute top-0 left-0 w-full">
      <p>{subheader}</p>
      <p className="text-2xl font-heading font-bold text-white">{header}</p>
    </div>
  );
};
