'use client';

import { InviteUserToProjectField } from './InviteUserToProjectField';
import { Dialog, Transition } from '@headlessui/react';
import axios, { AxiosError } from 'axios';
import clsx from 'clsx';
import { ValidationErrors } from 'final-form';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useNotify } from 'react-admin';
import { Form } from 'react-final-form';
import { z } from 'zod';

interface InviteUserToProjectModalProps {
  isOpen: boolean;
  closeModal: () => void;
  redirectUrl?: string;
  host?: string;
}

interface InviteUserToProjectForm {
  email: string;
  firstName: string;
  lastName: string;
}

export const InviteUserToProjectModal: React.FC<InviteUserToProjectModalProps> = ({
  isOpen,
  closeModal,
  redirectUrl,
  host
}) => {
  const notify = useNotify();

  const [open, setOpen] = useState(isOpen);
  const cancelButton = useRef(null);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const onSubmit = async ({ email, firstName, lastName }: InviteUserToProjectForm) => {
    try {
      const response = await axios.post('/api/auth/inviteUserByEmail', {
        email,
        firstName,
        lastName,
        redirectUrl,
        host
      });
      const error = response?.data?.error;

      if (error) {
        notify(error?.message, { type: 'error' });
      } else {
        notify(`Successfully invited ${email}`, { type: 'success' });
      }
    } catch (e) {
      notify((e as AxiosError)?.response?.statusText, { type: 'error' });
    } finally {
      closeModal();
    }
  };

  const validateForm = (values: InviteUserToProjectForm) => {
    const errors: ValidationErrors = {};

    if (!values?.email || !z.string().email().safeParse(values.email).success) {
      errors.email = 'A valid email address must be provided ';
    }

    if (!values.firstName) {
      errors.firstName = 'A first name must be provided';
    }

    if (!values.lastName) {
      errors.lastName = 'A last name must be provided';
    }

    return errors;
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButton} onClose={closeModal}>
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full transform overflow-hidden bg-white text-left shadow-xl transition-all sm:max-w-2xl sm:rounded-lg">
                <div className="flex h-full max-h-[35rem] flex-col">
                  <div className={`relative shrink-0`}>
                    <div className="relative flex items-center gap-3 px-3 pt-6 text-black sm:px-6">
                      <Dialog.Title as="h3" className="grow font-heading text-xl font-medium leading-none">
                        Invite a user to the application
                      </Dialog.Title>
                    </div>
                  </div>
                  <Form
                    onSubmit={onSubmit}
                    validate={validateForm}
                    render={({ handleSubmit }) => {
                      return (
                        <form onSubmit={handleSubmit}>
                          <div className="flex flex-col gap-4 overflow-y-auto px-3 py-6 text-gray-700 sm:px-6">
                            <InviteUserToProjectField
                              name="email"
                              title="Email"
                              placeholder="Enter the new users email here"
                            />
                            <InviteUserToProjectField
                              name="firstName"
                              title="First name"
                              placeholder="Enter the new users first name here"
                            />
                            <InviteUserToProjectField
                              name="lastName"
                              title="Last name"
                              placeholder="Enter the new users last name here"
                            />
                          </div>
                          <div className="flex shrink-0 items-center bg-gray-100 px-3 py-6 sm:px-6">
                            <div className="flex w-full flex-row-reverse justify-between">
                              <button
                                className={clsx([
                                  `relative rounded-md border border-black border-opacity-20 bg-white py-3 px-6 font-heading font-medium text-black duration-150 before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-black before:opacity-0 hover:before:opacity-10 focus:outline-none focus:ring-2 focus:ring-alpha focus:ring-offset-2`,
                                  false && 'bg-gray-600'
                                ])}
                              >
                                <span className="relative">Invite user</span>
                              </button>
                              <button
                                type="button"
                                className="relative rounded-md border border-black border-opacity-20 bg-white py-3 px-6 font-heading font-medium text-gray-600 duration-150 before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-black before:opacity-0 hover:before:opacity-[2.5%] focus:outline-none focus:ring-2 focus:ring-alpha focus:ring-offset-2"
                                onClick={closeModal}
                                ref={cancelButton}
                              >
                                <span className="relative">Cancel</span>
                              </button>
                            </div>
                          </div>
                        </form>
                      );
                    }}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
