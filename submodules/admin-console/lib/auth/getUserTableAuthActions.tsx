import { InviteUserToProjectCustomAction } from '../../components/customActions/InviteUserToProjectCustomAction';
import { CustomAction } from '../../types/Config/CustomAction';
import { useAdminSendMagicLink } from './useAdminSendMagicLink';
import { EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';

export const getUserTableAuthActions = (redirectUrl?: string, host?: string): CustomAction[] => [
  {
    overrideComponent: (props) => <InviteUserToProjectCustomAction {...props} redirectUrl={redirectUrl} host={host} />,
    buttonDetails: {
      label: 'Invite user',
      icon: (props) => <UserIcon {...props} />
    },
    type: ['resource']
  },
  {
    useAction: (selectedIds) => useAdminSendMagicLink(selectedIds, redirectUrl, host),
    buttonDetails: {
      label: 'Send a magic link',
      icon: (props) => <EnvelopeIcon {...props} />
    },
    type: ['record']
  }
];
