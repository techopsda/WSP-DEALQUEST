interface CustomActionButtonProps {
  label: string;
  onClick: () => Promise<void> | void;
  children: React.ReactNode;
}

export const CustomActionButton: React.FC<CustomActionButtonProps> = ({ label, onClick, children }) => {
  return (
    <button
      key={label}
      className="flex w-full whitespace-nowrap bg-nsAdmin-600 rounded-md p-2 items-center text-white gap-2 z-50"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
