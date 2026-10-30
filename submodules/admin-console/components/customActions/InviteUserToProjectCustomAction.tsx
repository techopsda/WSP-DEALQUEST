import { CustomActionButtonDetailsProps } from '../../types/Config/CustomActionButtonDetails';
import { CustomActionProps } from '../../types/Config/CustomActionProps';
import { CustomActionButton } from '../styling/CustomActionButton';
import { CustomActionButtonDetails } from '../styling/CustomActionButtonDetails';
import { InviteUserToProjectModal } from './InviteUserToProjectModal';
import { useState } from 'react';

export const InviteUserToProjectCustomAction: React.FC<CustomActionProps & { redirectUrl?: string; host?: string }> = ({
  buttonDetails,
  redirectUrl,
  host
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { label } = buttonDetails as CustomActionButtonDetailsProps;

  return (
    <>
      <CustomActionButton label={label} onClick={() => setModalOpen(true)}>
        <CustomActionButtonDetails {...(buttonDetails as CustomActionButtonDetailsProps)} />
      </CustomActionButton>

      <InviteUserToProjectModal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        redirectUrl={redirectUrl}
        host={host}
      />
    </>
  );
};
