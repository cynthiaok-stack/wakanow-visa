/* Floating Contact Us widget — shared across the Umrah portal flow */
(function () {
  'use strict';

  if (window.__wkContactWidgetLoaded) return;
  window.__wkContactWidgetLoaded = true;

  const CONTACTS = [
    { type: 'email', flag: '✉️', value: 'umrah@wakanow.com', label: 'Email us', href: 'mailto:umrah@wakanow.com' },
    { type: 'phone', flag: '🇳🇬', value: '+234 2017 008 200', label: 'Nigeria', href: 'tel:+2342017008200' },
    { type: 'phone', flag: '🇬🇭', value: '+233 242 435 515', label: 'Ghana', href: 'tel:+233242435515' },
    { type: 'phone', flag: '🇬🇧', value: '+44 (0) 7736 301 547', label: 'United Kingdom', href: 'tel:+4407736301547' },
    { type: 'phone', flag: '🌍', value: '1-800-359-6108', label: 'Global support', href: 'tel:18003596108' },
    { type: 'whatsapp', flag: '💬', value: 'Chat on WhatsApp', label: 'WhatsApp', href: 'https://wa.me/2342017008200' }
  ];

  const CSS = `
  .wk-contact-root{position:fixed;right:22px;bottom:22px;z-index:9999;font-family:'Rubik',system-ui,sans-serif}
  .wk-contact-head .t,.wk-contact-row .v{letter-spacing:-0.005em}
  .wk-contact-fab{height:52px;border-radius:99px;background:#08A5E3;color:#fff;border:none;display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:0 20px 0 16px;cursor:pointer;box-shadow:0 10px 28px rgba(8,165,227,.4);transition:transform .22s cubic-bezier(.4,0,.2,1), box-shadow .22s ease, background .22s ease;position:relative;font-family:inherit;font-size:14px;font-weight:600;letter-spacing:-0.005em}
  .wk-contact-fab:hover{background:#0789BF;transform:translateY(-2px);box-shadow:0 14px 34px rgba(8,165,227,.48)}
  .wk-contact-fab svg{width:20px;height:20px;flex-shrink:0}
  .wk-contact-fab .lbl{line-height:1;white-space:nowrap}
  .wk-contact-fab .pulse{position:absolute;inset:0;border-radius:99px;background:rgba(8,165,227,.35);animation:wkPulse 2s ease-out infinite;z-index:-1}
  @keyframes wkPulse{0%{transform:scale(1);opacity:.55}100%{transform:scale(1.08);opacity:0}}

  .wk-contact-panel{position:absolute;right:0;bottom:72px;width:300px;background:#fff;border-radius:14px;box-shadow:0 18px 50px rgba(15,42,51,.22);padding:14px 14px 10px;opacity:0;transform:translateY(10px) scale(.96);transform-origin:bottom right;pointer-events:none;transition:all .22s cubic-bezier(.4,0,.2,1)}
  .wk-contact-root[data-open="true"] .wk-contact-panel{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}
  .wk-contact-head{display:flex;justify-content:space-between;align-items:center;padding:4px 4px 10px;border-bottom:1px solid #E5E7EB;margin-bottom:8px}
  .wk-contact-head .t{font-size:13px;font-weight:700;color:#0F2A33}
  .wk-contact-head .s{font-size:11px;color:#6B7280;margin-top:2px}
  .wk-contact-close{width:26px;height:26px;border-radius:50%;background:#F2F3F5;color:#6B7280;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;border:none;font-size:14px;line-height:1;transition:.2s}
  .wk-contact-close:hover{background:#E5E7EB;color:#0F2A33}
  .wk-contact-list{display:flex;flex-direction:column;gap:2px}
  .wk-contact-row{display:flex;align-items:center;gap:12px;padding:10px 10px;border-radius:8px;text-decoration:none;color:#0F2A33;transition:.18s}
  .wk-contact-row:hover{background:#E8F6FD}
  .wk-contact-row.whatsapp:hover{background:#E7F9EE}
  .wk-contact-flag{width:30px;height:30px;border-radius:50%;background:#F2F3F5;display:inline-flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
  .wk-contact-body{flex:1;min-width:0}
  .wk-contact-body .l{font-size:11px;color:#6B7280;font-weight:500;margin-bottom:2px}
  .wk-contact-body .v{font-size:13px;color:#0F2A33;font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .wk-contact-row.whatsapp .v{color:#1F8B3E}
  .wk-contact-row.email .v{color:#0789BF}
  .wk-contact-row i{width:14px;height:14px;color:#9CA3AF;flex-shrink:0}

  @media(max-width:768px){
    .wk-contact-root{right:14px;bottom:14px}
    .wk-contact-panel{width:calc(100vw - 28px);max-width:320px}
    /* Collapse to icon-only round button so it doesn't block bottom CTAs */
    .wk-contact-fab{width:52px;padding:0;border-radius:50%;gap:0}
    .wk-contact-fab .lbl{display:none}
    .wk-contact-fab .pulse{border-radius:50%}
    /* When a sticky pay bar is present (Screens 03/04/05), lift FAB above it */
    body.has-mobile-pay-bar .wk-contact-root{bottom:88px}
    /* Anchor panel to the FAB so it doesn't get cut off near the bar */
    body.has-mobile-pay-bar .wk-contact-panel{bottom:64px}
  }
  `;

  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.className = 'wk-contact-root';
  root.setAttribute('data-open', 'false');
  root.innerHTML = `
    <div class="wk-contact-panel" role="dialog" aria-label="Contact Wakanow Umrah">
      <div class="wk-contact-head">
        <div>
          <div class="t">Wakanow Umrah Care</div>
          <div class="s">We're here 24/7</div>
        </div>
        <button class="wk-contact-close" aria-label="Close" type="button">×</button>
      </div>
      <div class="wk-contact-list">
        ${CONTACTS.map(c => `
          <a class="wk-contact-row ${c.type}" href="${c.href}" ${c.type === 'whatsapp' ? 'target="_blank" rel="noopener"' : ''}>
            <span class="wk-contact-flag">${c.flag}</span>
            <div class="wk-contact-body">
              <div class="l">${c.label}</div>
              <div class="v">${c.value}</div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;color:#9CA3AF"><path d="M9 6l6 6-6 6"/></svg>
          </a>
        `).join('')}
      </div>
    </div>
    <button class="wk-contact-fab" aria-label="Need Help?" aria-expanded="false" type="button">
      <span class="pulse"></span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.94.37 1.85.72 2.73a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.35-1.29a2 2 0 0 1 2.11-.45c.88.35 1.79.59 2.73.72A2 2 0 0 1 22 16.92z"/></svg>
      <span class="lbl">Need Help?</span>
    </button>
  `;
  document.body.appendChild(root);

  const fab = root.querySelector('.wk-contact-fab');
  const closeBtn = root.querySelector('.wk-contact-close');
  const panel = root.querySelector('.wk-contact-panel');

  function setOpen(open){
    root.setAttribute('data-open', open ? 'true' : 'false');
    fab.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  fab.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(root.getAttribute('data-open') !== 'true');
  });
  closeBtn.addEventListener('click', () => setOpen(false));
  document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
})();
