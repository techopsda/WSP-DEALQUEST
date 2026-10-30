import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';

export const useIsInstructor = () => {
  const { session } = useSupabase<'public'>();
  return session?.user?.id;
};

export default useIsInstructor;
