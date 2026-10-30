import clsx from 'clsx';

interface EditDebtValueProps {
  debtPaidDown: number;
  setDebtPaidDown: (debtPaidDown: number) => void;
  val: { value: number; label: string; disabled: boolean };
}

export const EditDebtValue: React.FC<EditDebtValueProps> = ({ debtPaidDown, setDebtPaidDown, val }) => {
  return (
    <div
      key={val.value}
      className={clsx(
        'w-full h-full rounded-xl',
        val.disabled ? 'bg-gray-800 text-gray-500' : 'bg-[#DCD6D6] text-black'
      )}
    >
      <button
        className="relative text-2xl font-medium w-36 h-32"
        onClick={() => setDebtPaidDown(debtPaidDown + val.value)}
        disabled={val.disabled}
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{val.label}</span>
      </button>
    </div>
  );
};
