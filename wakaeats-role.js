/* ─────────────────────────────────────────────────────────────
   WakaEats — shared role toggle + menu
   Attaches a dropdown to any element with data-role-menu
   Menu offers: Switch to other role · Sign out
   Reads/writes the current role from localStorage (default: admin)
   ────────────────────────────────────────────────────────────── */
(function(){
  const KEY = 'wakaeats.role';
  const EMAIL = 'wakaeats.email';

  // Inject menu styles (once) so staff pages don't need shell.css
  if(!document.getElementById('wakaeats-role-styles')){
    const s = document.createElement('style');
    s.id = 'wakaeats-role-styles';
    s.textContent = `
      .role-menu{background:#fff;border:1px solid #EDEBE4;border-radius:16px;box-shadow:0 18px 48px rgba(15,23,42,.14);padding:8px;z-index:200;font-family:'Inter',system-ui,sans-serif;animation:rmIn .15s ease-out}
      @keyframes rmIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
      .rm-head{display:flex;align-items:center;gap:10px;padding:10px 10px 12px}
      .rm-avatar{width:38px;height:38px;border-radius:50%;background:#08A5E3;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0}
      .rm-info{min-width:0;flex:1}
      .rm-email{font-size:13px;font-weight:600;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .rm-role{font-size:12px;color:#6B7280;margin-top:1px}
      .rm-divider{height:1px;background:#EDEBE4;margin:2px 0}
      .rm-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;font-size:14px;color:#111827;font-weight:500;transition:.2s;cursor:pointer;text-decoration:none}
      .rm-item:hover{background:#F2FAFD}
      .rm-item i{width:16px;height:16px;color:#6B7280;flex-shrink:0}
      .rm-item span{flex:1}
      .rm-item .rm-chev{margin-left:auto;width:14px;height:14px;color:#9CA3AF}
      .rm-item.danger{color:#DC2626}
      .rm-item.danger:hover{background:#FEE2E2}
      .rm-item.danger i{color:#DC2626}
    `;
    document.head.appendChild(s);
  }

  function getRole(){ return localStorage.getItem(KEY) || 'admin'; }
  function setRole(r){ localStorage.setItem(KEY, r); }

  function closeAll(){
    document.querySelectorAll('.role-menu').forEach(m => m.remove());
  }

  function openMenu(trigger){
    closeAll();
    const role = getRole();
    const email = localStorage.getItem(EMAIL) || 'cynthiaok@wakanow.com';
    const other = role === 'admin' ? 'staff' : 'admin';
    const otherDest = other === 'admin' ? 'wakaeats-dashboard.html' : 'wakaeats-staff-home.html';
    const otherLabel = other === 'admin' ? 'Switch to Admin view' : 'Switch to Staff view';
    const otherIcon = other === 'admin' ? 'shield-check' : 'user';

    const m = document.createElement('div');
    m.className = 'role-menu';
    m.innerHTML = `
      <div class="rm-head">
        <div class="rm-avatar">${initials(email)}</div>
        <div class="rm-info">
          <div class="rm-email">${email}</div>
          <div class="rm-role">${role === 'admin' ? 'Admin' : 'Employee'} · ${role === 'admin' ? 'Finance' : 'Staff'}</div>
        </div>
      </div>
      <div class="rm-divider"></div>
      <a href="${otherDest}" class="rm-item" data-switch="${other}">
        <i data-lucide="${otherIcon}"></i>
        <span>${otherLabel}</span>
        <i data-lucide="arrow-right" class="rm-chev"></i>
      </a>
      <div class="rm-divider"></div>
      <a href="wakaeats-login.html" class="rm-item danger" data-signout>
        <i data-lucide="log-out"></i>
        <span>Sign out</span>
      </a>
    `;
    document.body.appendChild(m);

    // Position relative to trigger, flipping above if no room below
    const r = trigger.getBoundingClientRect();
    const menuW = 260;
    const estH = 200;
    const left = Math.min(r.right - menuW, window.innerWidth - menuW - 12);
    const roomBelow = window.innerHeight - r.bottom;
    const flipAbove = roomBelow < estH + 16 && r.top > estH + 16;
    m.style.position = 'fixed';
    if(flipAbove){
      m.style.bottom = (window.innerHeight - r.top + 8) + 'px';
      m.style.top = 'auto';
    } else {
      m.style.top = (r.bottom + 8) + 'px';
    }
    m.style.left = Math.max(12, left) + 'px';
    m.style.width = menuW + 'px';

    // Lucide icons + wire switch
    if(window.lucide) lucide.createIcons();
    m.querySelector('[data-switch]').addEventListener('click', e => {
      setRole(e.currentTarget.dataset.switch);
    });
    m.querySelector('[data-signout]').addEventListener('click', () => {
      localStorage.removeItem(KEY);
    });
  }

  function initials(email){
    const name = email.split('@')[0].replace(/[^a-zA-Z]/g,'');
    return (name[0]||'U').toUpperCase() + (name[1]||'').toUpperCase();
  }

  // Click outside closes
  document.addEventListener('click', e => {
    if(e.target.closest('.role-menu')) return;
    if(e.target.closest('[data-role-menu]')) return;
    closeAll();
  });

  // Esc closes
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeAll(); });

  // Attach to triggers
  function attach(){
    document.querySelectorAll('[data-role-menu]').forEach(el => {
      if(el.__attached) return;
      el.__attached = true;
      el.addEventListener('click', e => {
        e.stopPropagation();
        if(document.querySelector('.role-menu')){ closeAll(); return; }
        openMenu(el);
      });
    });
  }

  // Expose
  window.WakaEatsRole = { get: getRole, set: setRole, init: attach };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }
})();
