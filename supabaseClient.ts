import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase is not configured — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in web/.env. " +
      "Auth, leads, and chat memory will be unavailable until then."
  );
}

// Use placeholder values so the client can construct without throwing when unconfigured;
// isSupabaseConfigured gates all real usage (see AuthContext).
export const supabase = createClient(url || "https://placeholder.supabase.co", anonKey || "placeholder");
