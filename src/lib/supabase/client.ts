import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { config } from "@/config";
import { Database } from "@/types/supabase";

export function createClient(): SupabaseClient {
  return createBrowserClient<Database>(
    config.supabase.url!,
    config.supabase.anonKey!
  );
}
