import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';

export const getRandomQuestion = async (gameYear: number) => {
  const supabase = await createSupabaseServerClient<'public'>('public');

  return (await supabase.from('question_random_view').select('*').eq('year', gameYear).limit(20))?.data;
};
