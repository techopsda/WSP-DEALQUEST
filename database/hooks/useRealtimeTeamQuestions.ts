import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import _, { isArray } from 'lodash';
import { useEffect, useState } from 'react';
import { Question, TeamQuestionsWithAnswers } from '@/types/database';

export function useRealtimeTeamQuestions(
  serverState: TeamQuestionsWithAnswers[],
  channelName: string,
  schemaName: string,
  tableName: string,
  equalityFunction: (a: TeamQuestionsWithAnswers, b: TeamQuestionsWithAnswers) => boolean,
  filters?: string | string[]
) {
  const [data, setData] = useState<TeamQuestionsWithAnswers[]>(serverState);
  const { supabase } = useSupabase<'public'>();

  const baseEventDetails = {
    schema: schemaName,
    table: tableName
  };

  useEffect(() => {
    const channel = supabase.channel(channelName);

    const addFilterIfExistsToChannel = (filter?: string) => {
      channel.on('postgres_changes', { event: 'UPDATE', ...baseEventDetails, filter }, (payload) => {
        const prevObject = data.find((teamQuestion) => (teamQuestion.id as string) === payload.new.id);
        const ommited = _.pick(prevObject, 'Question');
        setData((prev) => [
          ...prev.filter((a) => !equalityFunction(a, payload.new as TeamQuestionsWithAnswers)),
          { ...ommited, ...payload.new } as TeamQuestionsWithAnswers
        ]);
      });
    };

    if (isArray(filters)) {
      filters.forEach((filter) => {
        addFilterIfExistsToChannel(filter);
      });
    } else {
      addFilterIfExistsToChannel(filters);
    }

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const orderedTeamQuestions = _.orderBy(data, (teamQuestion) => teamQuestion.orderNumber, 'asc');

  const allAnsweredQuestions = _.filter(orderedTeamQuestions, (question) => {
    return question.selectedAnswerId !== null;
  });

  // const unAnsweredQuestions = _.filter(orderedTeamQuestions, (question) => {
  //   return question.selectedAnswerId === null;
  // });

  const currenRealtimeQuestion = _.find(orderedTeamQuestions, (teamQuestion) => {
    return teamQuestion.selectedAnswerId === null;
  }) as TeamQuestionsWithAnswers;

  const allCorrectQuestions = allAnsweredQuestions.filter(
    (teamQuestion) => teamQuestion?.Question?.correctAnswerId === teamQuestion?.selectedAnswerId
  );

  return { orderedTeamQuestions, allAnsweredQuestions, currenRealtimeQuestion, allCorrectQuestions };
}
