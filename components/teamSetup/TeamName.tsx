import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Team } from '@/types/database';
import { useState } from 'react';
import { LobbyForm } from '../lobby/LobbyForm';
import LogoGroup from '../lobby/LogoGroup';

interface Props {
  team: Team;
  setTeam: (team: Team) => void;
  setWarningMessage: (message: string) => void;
}

export const TeamName: React.FC<Props> = ({ team, setTeam, setWarningMessage }) => {
  const [companyName, setCompanyName] = useState('');

  const { supabase } = useSupabase<'public'>();

  const onCompanyNameSubmit = async () => {
    setWarningMessage('');
    const { data, error } = await supabase
      .from('Team')
      .update({ name: companyName, status: 'awaitingTeamMembers' })
      .eq('id', team.id)
      .select()
      .maybeSingle();
    if (error || !data) {
      setWarningMessage(`Error setting company name`);
      return;
    }
    setTeam(data);
  };

  const companyNameValid = companyName.length > 0;
  return (
    <div className="flex flex-col gap-24 max-w-3xl">
      <LogoGroup />
      {/* Warning message needs plugging in */}
      <LobbyForm
        inputValue={companyName}
        title="Welcome to the game"
        text={`You have started a new investment firm, enter your firm's name. Choose wisely, there's no chance to rebrand later.`}
        subtext={'Please note that you can only use one device per team!'}
        inputPlaceholder="Enter company name"
        inputOnChange={(e) => {
          if (e.target.value.length <= 25) setCompanyName(e.target.value);
        }}
        buttonText="Submit"
        buttonOnClick={() => companyNameValid && onCompanyNameSubmit()}
        buttonDisabled={!companyNameValid}
        allowEnterPress={true}
      />
    </div>
  );
};
