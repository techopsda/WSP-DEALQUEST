import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useRef, useState } from 'react';

interface Props {
  isOpen: boolean;
  title: string;
  iconComponent: React.ReactChild;
  buttonText: string;
  onCancelClicked: () => void;
  onButtonClicked: () => void;
  children?: React.ReactNode;
  hideCancelButton?: boolean;
  maxWidth?: string; // Adding a new max-width requires updating the tailwind config safelist to include the new modal max width (e.g. "sm:max-w-5xl")
}

export const Modal: React.FC<Props> = ({
  isOpen,
  title,
  iconComponent,
  buttonText,
  children,
  onCancelClicked,
  onButtonClicked,
  hideCancelButton = false,
  maxWidth = '2xl'
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
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
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
                className={`relative bg-gray-50 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-6/12 sm:max-w-${maxWidth} sm:mx-6 sm:w-6/12`}
              >
                <div className="bg-gray-50">
                  <div className={`bg-nsAdmin-900`}>
                    <div className="bg-black bg-opacity-20 flex items-center justify-end p-2">
                      <button type="button" className="" onClick={onCancelClicked} ref={cancelButtonRef}>
                        <XMarkIcon className="text-white w-4 h-4" />
                        <span className="sr-only">Cancel</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 p-6 text-white">
                      <div className="w-6 h-6 shrink-0 flex items-center justify-center" aria-hidden="true">
                        {iconComponent}
                      </div>
                      <Dialog.Title as="h3" className="font-medium text-xl">
                        {title}
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 p-6 text-gray-900">{children}</div>
                </div>
                <div className="bg-gray-50 p-6 flex gap-6 flex-row-reverse mt-6">
                  <button
                    type="button"
                    className={`relative bg-nsAdmin-600 flex items-center gap-1 py-3 px-4 border border-black border-opacity-20 text-white rounded font-medium [ before:absolute before:top-0 before:left-0 before:w-6/12 before:h-full before:bg-black before:opacity-0 hover:before:opacity-10 ] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-alpha | duration-150`}
                    onClick={onButtonClicked}
                  >
                    <span className="relative">{buttonText}</span>
                  </button>
                  {!hideCancelButton && (
                    <button
                      type="button"
                      className="relative bg-white py-3 px-4 border border-black border-opacity-20 text-gray-600 rounded font-medium [ before:absolute before:top-0 before:left-0 before:w-6/12 before:h-full before:bg-black before:opacity-0 hover:before:opacity-[2.5%] ] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-alpha | duration-150"
                      onClick={onCancelClicked}
                      ref={cancelButtonRef}
                    >
                      <span className="relative">Cancel</span>
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
