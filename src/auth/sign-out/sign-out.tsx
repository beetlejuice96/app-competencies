"use client";

import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useState } from "react";
import { logger } from "@/lib/default-logger";
export default function SignOut() {
  const [supabaseClient] = useState<SupabaseClient>(createSupabaseClient());

  const handleSignOut = useCallback(async (): Promise<void> => {
    try {
      const { error } = await supabaseClient.auth.signOut();

      if (error) {
        logger.error("Sign out error", error);
        // toast.error("Something went wrong, unable to sign out");
      } else {
        // UserProvider will handle Router refresh
        // After refresh, GuestGuard will handle the redirect
      }
    } catch (err) {
      logger.error("Sign out error", err);
      // toast.error("Something went wrong, unable to sign out");
    }
  }, [supabaseClient]);
  return (
    <button
      className="text-black/30 hover:text-white transition duration-100 ease-in-out"
      onClick={handleSignOut}
    >
      Logout
    </button>
  );
}
