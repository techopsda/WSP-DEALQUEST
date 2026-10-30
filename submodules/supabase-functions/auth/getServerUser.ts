import { createSupabaseServerClient } from "../lib/supabase-server";

export const getServerUser = async (userId: string) => {
  const supabase = await createSupabaseServerClient<"access">("access");
  return await supabase.from("User").select().eq("id", userId).maybeSingle();
};
