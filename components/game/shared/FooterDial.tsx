import clsx from 'clsx';

interface Props {
  label: string;
  content: string | React.ReactNode;
  borderColor?: string;
  textColor?: string;
}

export const FooterDial: React.FC<Props> = ({
  label,
  content,
  borderColor = 'border-alpha-light-800',
  textColor = 'text-white'
}) => {
  return (
    <div className="fixed z-30 bottom-0 left-1/2 -translate-y-1.5 -translate-x-1/2 w-60 h-[10rem] overflow-hidden">
      <div className={clsx('absolute w-60 aspect-square bg-alpha border-4 rounded-full duration-150', borderColor)}>
        <div className="absolute w-full text-center top-14 left-1/2 -translate-x-1/2 flex flex-col gap-2">
          <span className="text-sm">{label}</span>
          <p className={clsx('font-bold text-4xl leading-none duration-150', textColor)}>{content}</p>
        </div>
      </div>
    </div>
  );
};
