import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

interface SidepanelErrorboxProps {
  message: string;
  visible: boolean;
}

export const SidepanelErrorBox: React.FC<SidepanelErrorboxProps> = ({ message, visible }) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  return (
    <>
      {show && (
        <div className="flex justify-center items-center p-6">
          <div className="text-center flex items-center gap-3 border-2 rounded-md border-white p-4 relative">
            <button onClick={() => setShow(false)} className="absolute -top-3 -right-3 bg-alpha">
              <XCircleIcon className="h-6 w-6" />
            </button>
            <ExclamationTriangleIcon className="text-error h-6 w-6" />
            <p className="text-white font-bold text-center text-lg">{message}</p>
          </div>
        </div>
      )}
    </>
  );
};
