import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { Fragment, PropsWithChildren, useEffect, useState } from 'react';

export interface SlidePanelProps {
  title: string;
  isOpen: boolean;
  onCancelClicked: () => void;
  maxWidth?: string;
}

const SlidePanel = ({
  title,
  isOpen,
  onCancelClicked,
  maxWidth = 'max-w-xl',
  children
}: PropsWithChildren<SlidePanelProps>) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const onCancel = () => {
    onCancelClicked && onCancelClicked();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCancelClicked}>
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-[0.05rem]" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-12">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-650"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-650"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className={`w-screen pointer-events-auto ${maxWidth}`}>
                  <div className="flex h-full flex-col overflow-y-scroll bg-alpha text-alpha-light-200">
                    <div className="absolute top-0 right-0">
                      <button
                        type="button"
                        className="text-gray-400 rounded-full p-6 duration-150 | hover:text-white"
                        onClick={onCancel}
                      >
                        <span className="sr-only">Close panel</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="flex-1 mt-24">{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlidePanel;
