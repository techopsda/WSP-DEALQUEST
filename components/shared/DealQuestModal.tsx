import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { Fragment, useEffect, useRef, useState } from 'react';

interface IDealQuestModal {
  isOpen: boolean;
  onCancelClicked: () => void;
  onButtonClicked: () => void;
  titleText: string;
  children?: React.ReactNode;
  buttonColour: string;
  buttonText: string | React.ReactNode;
  isDisabled?: boolean;
}

const DealQuestModal: React.FC<IDealQuestModal> = ({
  isOpen,
  onCancelClicked,
  onButtonClicked,
  titleText,
  children,
  buttonColour,
  buttonText,
  isDisabled
}) => {
  const [open, setOpen] = useState(isOpen);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={onCancelClicked}>
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <button
            className="fixed bg-error w-12 h-12 top-0 right-0 translate-y-6 -translate-x-6 cursor-pointer rounded-full z-50"
            onClick={onCancelClicked}
          >
            <X
              className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white h-6 w-6"
              strokeWidth={3}
            />
          </button>
          <div className="fixed inset-0 bg-alpha-900 bg-opacity-80 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative px-16 py-12 bg-alpha-900 text-alpha-light-800 rounded-xl overflow-hidden shadow-xl w-full max-w-xl flex flex-col gap-9`}
              >
                <Dialog.Title as="h2" className="font-bold text-2xl text-center text-white">
                  {titleText}
                </Dialog.Title>
                <div className="flex flex-col gap-3">{children}</div>
                <div>
                  <button
                    type="button"
                    className={`[ dqButton ]`}
                    onClick={onButtonClicked}
                    disabled={isDisabled ?? false}
                  >
                    {buttonText}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DealQuestModal;
