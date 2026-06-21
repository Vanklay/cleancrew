import { createClient } from '@supabase/supabase-js';

// Anon key — safe for client; protected by RLS above.
const url = import.meta.env.PUBLIC_SUPABASE_URL;
const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = url && anon ? createClient(url, anon) : null;
