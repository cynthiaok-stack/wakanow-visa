/* ─────────────────────────────────────────────────────────────
   Supabase client — anon (public) key, client-safe.
   Security lives in the DB via RLS + SECURITY DEFINER functions.
   ────────────────────────────────────────────────────────────── */
(function(){
  const SUPABASE_URL = 'https://rjapylwhfatjpdlixniy.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqYXB5bHdoZmF0anBkbGl4bml5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NTc5ODUsImV4cCI6MjA5MjIzMzk4NX0.xCWAEiYqX0ndOFIw0R7JUVmocdldmufI0pMtdbcL79Y';

  // Allowed sign-in domains — mirrors the DB trigger so the UI can
  // show friendly errors before hitting the server.
  const ALLOWED_DOMAINS = ['wakanow.com', 'kalabash54.com', 'pointview.com', 'onburd.com'];

  // Map email → tenant id (keep in sync with public.tenant_from_email in the DB)
  const TENANT_FROM_DOMAIN = {
    'wakanow.com':    'wakanow',
    'kalabash54.com': 'kalabash',
    'pointview.com':  'pointview',
    'onburd.com':     'onburd',
  };

  if(!window.supabase || typeof window.supabase.createClient !== 'function'){
    console.error('[supabase-config] supabase-js is not loaded. Include <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script> before this file.');
    return;
  }

  // Shared client — persists the magic-link session across tabs + reloads.
  // JWT lifetime (30 days) is configured in Supabase dashboard → Auth → Tokens.
  window.SB = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession:    true,
      storage:           window.localStorage,
      storageKey:        'wakatribe.auth',
      autoRefreshToken:  true,
      detectSessionInUrl: true,   // picks up the magic-link code on return
    },
    realtime: { params: { eventsPerSecond: 10 } },
  });

  window.WAKATRIBE = {
    ALLOWED_DOMAINS,
    TENANT_FROM_DOMAIN,
    tenantFromEmail(email){
      const d = (email || '').split('@')[1]?.toLowerCase();
      return TENANT_FROM_DOMAIN[d] || null;
    },
    isAllowedEmail(email){
      const d = (email || '').split('@')[1]?.toLowerCase();
      return ALLOWED_DOMAINS.includes(d);
    },
  };
})();
