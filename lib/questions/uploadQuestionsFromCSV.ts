import { QuestionTypeEnum } from '@/types/database';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export interface CSVQuestionAnswers {
  Question: string;
  Year: string;
  CorrectAnswer: string;
  Type: QuestionTypeEnum;
  Metadata: string;
  Answer2: string;
  Answer3: string;
  Answer4: string;
}

export const uploadQuestionsFromCSV = async (
  csvQuestionAnswers: CSVQuestionAnswers[],
  supabase: SupabaseClient<Database, 'public'>
) => {
  csvQuestionAnswers.forEach(async (csvQuestionAnswer) => {
    const { data: question } = await supabase
      .from('Question')
      .insert({
        name: csvQuestionAnswer.Question,
        year: parseInt(csvQuestionAnswer.Year),
        metadata: JSON.parse(csvQuestionAnswer?.Metadata),
        type: csvQuestionAnswer.Type
      })
      .select()
      .maybeSingle();

    if (question) {
      const { data: correctAnswer } = await supabase
        .from('Answer')
        .insert({ answer: csvQuestionAnswer.CorrectAnswer, questionId: question.id })
        .select()
        .maybeSingle();

      if (correctAnswer) {
        await supabase.from('Question').update({ correctAnswerId: correctAnswer.id }).eq('id', question.id);
      }

      const remainingAnswers = [csvQuestionAnswer.Answer2, csvQuestionAnswer.Answer3, csvQuestionAnswer.Answer4];

      remainingAnswers.forEach(async (answer) => {
        await supabase.from('Answer').insert({ questionId: question.id, answer });
      });
    }
  });
};
