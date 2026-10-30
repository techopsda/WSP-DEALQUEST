import generateRandomAlphanumericCode from '@/lib/shared/generateRandomAlphanumericCode';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useSettings } from '@/submodules/supabase-functions/lib/settings/useSettings';
import { JobTitle, MemberWithJobTitle, Team } from '@/types/database';
import { GameSettings } from '@/types/GameSettings';
import _ from 'lodash';
import { Crown } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import LogoGroup from '../lobby/LogoGroup';
import AddNewMemberButton from './AddNewMemberButton';
import EditMemberButton from './EditMemberButton';
import { Joyride as ReactJoyride, Step } from 'react-joyride';
import { TooltipComponent } from '../shared/TooltipComponent';

interface Props {
  team: Team;
  setTeam: (team: Team) => void;
  setWarningMessage: (message: string) => void;
}

export const TeamMembers: React.FC<Props> = ({ team, setTeam, setWarningMessage }) => {
  const [jobTitles, setJobTitles] = useState<JobTitle[]>([]);
  const [members, setMembers] = useState<MemberWithJobTitle[]>([]);

  const { getSettings } = useSettings<GameSettings>();
  const { maxMembersPerTeam } = getSettings(['maxMembersPerTeam']);

  const { supabase } = useSupabase<'public'>();
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: jobTitles } = await supabase.from('JobTitle').select();
      setJobTitles(jobTitles ?? []);
    };
    fetchData();
  }, []);

  const generateMemberId: () => string = () => {
    const code = generateRandomAlphanumericCode(6);

    if (!members.find((member) => member.id === code)) {
      return code;
    } else {
      return generateMemberId();
    }
  };

  const handleAddMember = (index: number) => {
    setMembers([...members, { id: generateMemberId(), name: '', teamId: team.id, jobTitle: null, jobTitleId: '' }]);
    setTimeout(() => {
      if (index !== undefined && inputRefs && index < inputRefs?.current?.length + 1) {
        const nextIndex = index + 1;
        inputRefs?.current[nextIndex]?.focus();
      }
    }, 50);
  };

  const randomUnusedJobTitle = useMemo(() => {
    return _.sample(
      jobTitles.filter(
        (jobTitle) =>
          !members.find((member) => member?.jobTitle?.id === jobTitle.id) &&
          (!jobTitle.name.includes('Assistant') || members.length > 2)
      )
    );
  }, [jobTitles, _.map(members, (member) => member.jobTitle)]);

  const onMembersSubmit = async () => {
    setWarningMessage('');
    let noErrors = true;
    members.forEach(async (member) => {
      if (member.jobTitle) {
        const { data: memberData, error } = await supabase
          .from('Member')
          .insert({ jobTitleId: member.jobTitle.id, teamId: team.id, name: member.name })
          .select()
          .maybeSingle();

        if (error || !memberData) {
          noErrors = false;
          setWarningMessage(`Error occured adding team member`);
        }
      }
    });

    if (noErrors) {
      const { data: teamData } = await supabase
        .from('Team')
        .update({ status: 'awaitingRegistrationCode' })
        .eq('id', team.id)
        .select()
        .maybeSingle();
      setTeam(teamData as Team);
    }
  };

  const membersValid = members.length > 0 && !members.find((member) => member.name.length < 1);

  const handleUpdateMembers = (memberIndex: number, member: MemberWithJobTitle) => {
    const newMembersDetails = members;
    newMembersDetails[memberIndex] = { ...member };
    if (member?.name.length <= 20) setMembers([...newMembersDetails]);
  };

  const handleDeleteMember = (member: MemberWithJobTitle) => {
    setMembers(
      members.filter(
        (memberArrayItem) => memberArrayItem.jobTitleId !== member.jobTitleId || memberArrayItem.name !== member.name
      )
    );
  };

  const joyrideSteps: Step[] = [
    {
      target: '#teamMemberName-0',
      skipBeacon: true,
      content: '1. Enter your first team member here',
      placement: 'top'
    },
    {
      target: '#teamAddNewMember',
      skipBeacon: true,
      content: '2. Add new team members by clicking this button',
      placement: 'top'
    },
    {
      target: '#teamMemberDelete-0',
      skipBeacon: true,
      content: '3. Click this button to remove team members',
      placement: 'top'
    },
    {
      target: '#teamAllMembersEntered',
      skipBeacon: true,
      content: '4. Click this button when all team members have been added',
      placement: 'top'
    }
  ];

  useEffect(() => {
    if (randomUnusedJobTitle && members?.length < 1) handleAddMember(0);
  }, [randomUnusedJobTitle]);

  return (
    <>
      {members.length > 0 && (
        <ReactJoyride steps={joyrideSteps} tooltipComponent={TooltipComponent} />
      )}
      <div className="w-full flex flex-col items-center gap-24">
        <LogoGroup />
        <div className="w-full flex flex-col items-center gap-12 max-w-6xl">
          <div className="flex flex-col items-center">
            <div className="text-bravo font-heading text-xl flex items-center gap-2">
              <Crown className="w-6 h-6" />
              <span>{team?.name}</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <h1 className="font-heading text-5xl text-white leading-snug">Create your team</h1>
              <p className="text-xl">Enter the first names of each member of your firm</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-6">
            {members.length <= (maxMembersPerTeam?.amount ?? 8) &&
              members.map((member, index) => {
                return (
                  <EditMemberButton
                    key={`${member}-${index}`}
                    index={index}
                    member={member}
                    handleDeleteMember={() => handleDeleteMember(member)}
                    handleUpdateMembers={(newMember) => handleUpdateMembers(index, newMember)}
                    randomUnusedJobTitle={randomUnusedJobTitle}
                    onMembersSubmit={handleAddMember}
                    maxMembersPerTeam={maxMembersPerTeam?.amount ?? 8}
                    inputRefs={inputRefs}
                  />
                );
              })}
            {members.length < (maxMembersPerTeam?.amount ?? 8) && (
              <AddNewMemberButton prevIndex={members?.length - 1} onAddMember={handleAddMember} />
            )}
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="flex justify-center">
              <button
                id="teamAllMembersEntered"
                className="[ dqButton ]"
                disabled={!membersValid}
                onClick={onMembersSubmit}
              >
                All team members entered
              </button>
            </div>
            <p>
              {members.length}/{maxMembersPerTeam?.amount ?? 8} maximum members
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
