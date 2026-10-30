import { RoundTextScreen } from '../RoundTextScreen';

export const FinanceCompletedScreen = () => {
  return (
    <div className="flex flex-col items-center gap-9 text-center">
      <svg
        className="w-32 h-32 text-success-light"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="4" />
        <path d="M54 42H87" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M54 60H87" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M54 78H87" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M33 42L36 45L42 39"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M33 60L36 63L42 57"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M33 78L36 81L42 75"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <RoundTextScreen title="Financing Complete">
        <p>You have completed financing for this year</p>
        <p className="text-base">A summary will be shown when the round timer ends</p>
      </RoundTextScreen>
    </div>
  );
};
