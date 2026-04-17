/* ─────────────────────────────────────────────────────────────
   WakaTribe — tenants (businesses) + apps config
   The single source of truth for which businesses exist,
   which apps they've subscribed to, and which apps exist
   on the platform.
   ────────────────────────────────────────────────────────────── */
(function(){

  // ── Apps available on WakaTribe ──
  const APPS = [
    { id:'wakaeats',   name:'WakaEats',   tagline:'Cafeteria consumption', icon:'utensils-crossed', color:'#08A5E3', url:'wakaeats-staff-home.html', adminUrl:'wakaeats-dashboard.html', status:'live' },
    { id:'wakabus',    name:'WakaBus',    tagline:'Staff transport',        icon:'bus',              color:'#F59E0B', url:'wakabus-placeholder.html',   adminUrl:'wakabus-placeholder.html',  status:'beta' },
    { id:'wakasecure', name:'WakaSecure', tagline:'Access & visitors',      icon:'shield-check',     color:'#8B5CF6', url:'wakasecure-placeholder.html',adminUrl:'wakasecure-placeholder.html', status:'beta' },
    { id:'wakawellness', name:'WakaWellness', tagline:'Staff wellness programs', icon:'heart-pulse',  color:'#EC4899', url:'#', adminUrl:'#', status:'coming-soon' },
  ];

  // ── Businesses (tenants) ──
  const TENANTS = [
    {
      id:'wakanow',
      name:'Wakanow',
      domain:'wakanow.com',
      color:'#08A5E3',
      logo:'W',
      status:'active',
      subscriptions:['wakaeats','wakabus','wakasecure'],
      staffCount:605,
      adminCount:3,
      primaryAdmin:'cynthiaok@wakanow.com',
      since:'2024-06-01'
    },
    {
      id:'kalabash',
      name:'Kalabash54',
      domain:'kalabash54.com',
      color:'#27AE60',
      logo:'K',
      status:'active',
      subscriptions:['wakaeats','wakabus'],
      staffCount:142,
      adminCount:1,
      primaryAdmin:'admin@kalabash54.com',
      since:'2025-01-15'
    },
    {
      id:'pointview',
      name:'Pointview',
      domain:'pointview.com',
      color:'#F59E0B',
      logo:'P',
      status:'active',
      subscriptions:['wakaeats'],
      staffCount:84,
      adminCount:1,
      primaryAdmin:'ops@pointview.com',
      since:'2025-02-20'
    },
    {
      id:'onburd',
      name:'Onburd',
      domain:'onburd.com',
      color:'#8B5CF6',
      logo:'O',
      status:'pending',
      subscriptions:['wakaeats','wakawellness'],
      staffCount:0,
      adminCount:0,
      primaryAdmin:'—',
      since:'2026-04-10'
    },
  ];

  function getTenantByEmail(email){
    if(!email) return null;
    const domain = email.split('@')[1]?.toLowerCase();
    return TENANTS.find(t => t.domain === domain) || null;
  }

  function getTenantById(id){
    return TENANTS.find(t => t.id === id) || null;
  }

  function getAppById(id){
    return APPS.find(a => a.id === id) || null;
  }

  // Current session helpers (localStorage)
  function setCurrentUser(email, role, tenantId){
    localStorage.setItem('wakatribe.email', email);
    localStorage.setItem('wakatribe.role', role);
    if(tenantId) localStorage.setItem('wakatribe.tenant', tenantId);
    // Backwards-compat with wakaeats storage
    localStorage.setItem('wakaeats.email', email);
    localStorage.setItem('wakaeats.role', role === 'super-admin' ? 'admin' : role);
  }

  function getCurrentUser(){
    return {
      email: localStorage.getItem('wakatribe.email') || localStorage.getItem('wakaeats.email') || '',
      role: localStorage.getItem('wakatribe.role') || localStorage.getItem('wakaeats.role') || 'staff',
      tenantId: localStorage.getItem('wakatribe.tenant') || 'wakanow'
    };
  }

  // Special recognition: super admin emails
  const SUPER_ADMINS = ['super@wakanow.com', 'it@wakanow.com'];
  function isSuperAdmin(email){
    return SUPER_ADMINS.includes((email||'').toLowerCase());
  }

  // ── Expose globally ──
  window.WakaTribe = {
    APPS, TENANTS,
    getTenantByEmail,
    getTenantById,
    getAppById,
    setCurrentUser,
    getCurrentUser,
    isSuperAdmin,
  };
})();
