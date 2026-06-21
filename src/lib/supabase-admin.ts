import { createClient } from '@supabase/supabase-js';
import { getSecret } from 'astro:env/server';

// SERVER-ONLY. Uses the service-role key, which bypasses RLS — never import
// this into client code or a client <script>. getSecret reads the key at
// runtime, so it is never inlined into any bundle.
const url = import.meta.env.PUBLIC_SUPABASE_URL;
const serviceKey = getSecret('SUPABASE_SERVICE_KEY');

export const supabaseAdmin =
  url && serviceKey
    ? createClient(url, serviceKey, { auth: { persistSession: false } })
    : null;
