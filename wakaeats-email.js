/* ─────────────────────────────────────────────────────────────
   WakaEats — email flow helpers (UI-side only)
   Real backend (Resend/SendGrid/Supabase) is stubbed. These calls
   show toast feedback and simulate email sends so the flows can
   be demoed end-to-end on the static prototype.
   ────────────────────────────────────────────────────────────── */
(function(){
  const DIGEST_RECIPIENTS_KEY = 'wakaeats.digest.recipients';
  const DIGEST_TIME_KEY = 'wakaeats.digest.time';
  const DIGEST_ENABLED_KEY = 'wakaeats.digest.enabled';

  function getDigestRecipients(){
    return localStorage.getItem(DIGEST_RECIPIENTS_KEY) || 'cynthiaok@wakanow.com';
  }
  function getDigestTime(){
    return localStorage.getItem(DIGEST_TIME_KEY) || '18:00';
  }
  function isDigestEnabled(){
    return localStorage.getItem(DIGEST_ENABLED_KEY) !== 'false';
  }

  function fmtTime(t){
    const [h,m] = t.split(':').map(Number);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const h12 = ((h + 11) % 12) + 1;
    return `${h12}:${m.toString().padStart(2,'0')} ${suffix}`;
  }

  // Inject styles (once)
  function injectStyles(){
    if(document.getElementById('wakaeats-email-styles')) return;
    const s = document.createElement('style');
    s.id = 'wakaeats-email-styles';
    s.textContent = `
      .we-toast{position:fixed;top:24px;left:50%;transform:translateX(-50%) translateY(-8px);background:#111827;color:#fff;padding:14px 22px;border-radius:100px;font-size:13px;font-weight:500;font-family:'Inter',system-ui,sans-serif;display:flex;align-items:center;gap:10px;box-shadow:0 12px 40px rgba(0,0,0,.2);opacity:0;pointer-events:none;transition:.25s;z-index:200;max-width:calc(100vw - 40px)}
      .we-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
      .we-toast i{width:16px;height:16px;flex-shrink:0}
      .we-toast.success{background:#27AE60}
      .we-toast.success i{color:#fff}
      .we-toast.info{background:#08A5E3}
      .we-toast .we-toast-sub{opacity:.8;font-weight:400;margin-left:4px}

      .we-modal-bg{position:fixed;inset:0;background:rgba(15,23,42,.5);backdrop-filter:blur(4px);z-index:210;display:none;align-items:center;justify-content:center;padding:20px;font-family:'Inter',system-ui,sans-serif}
      .we-modal-bg.open{display:flex}
      .we-modal{background:#fff;border-radius:24px;max-width:500px;width:100%;max-height:90vh;overflow-y:auto;padding:28px;box-shadow:0 30px 80px rgba(0,0,0,.25)}
      .we-modal h2{font-size:22px;font-weight:800;color:#111827;margin-bottom:6px;letter-spacing:-.02em}
      .we-modal .we-lede{color:#6B7280;font-size:14px;margin-bottom:22px}
      .we-modal .we-field{margin-bottom:16px}
      .we-modal .we-field label{font-size:14px;font-weight:600;color:#111827;margin-bottom:8px;display:block}
      .we-modal .we-field input,.we-modal .we-field select{width:100%;height:46px;padding:0 14px;border:1px solid #E5E4DF;border-radius:12px;background:#F5F3EE;font-size:14px;font-family:inherit;color:#111827;outline:none;transition:.2s}
      .we-modal .we-field input:focus,.we-modal .we-field select:focus{border-color:#08A5E3;background:#fff;box-shadow:0 0 0 3px rgba(8,165,227,.18)}
      .we-modal .we-field textarea{width:100%;padding:12px 14px;border:1px solid #E5E4DF;border-radius:12px;background:#F5F3EE;font-size:14px;font-family:inherit;color:#111827;outline:none;min-height:80px;resize:vertical}
      .we-modal .we-hint{font-size:12px;color:#6B7280;margin-top:4px}
      .we-toggle{display:flex;align-items:center;gap:12px;padding:14px 16px;background:#F5F3EE;border-radius:12px;margin-bottom:16px}
      .we-toggle-text{flex:1}
      .we-toggle-text strong{font-size:14px;font-weight:600;color:#111827;display:block}
      .we-toggle-text span{font-size:12px;color:#6B7280}
      .we-switch{position:relative;width:44px;height:26px;background:#E5E4DF;border-radius:26px;cursor:pointer;transition:.2s;flex-shrink:0}
      .we-switch::after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:.2s}
      .we-switch.on{background:#08A5E3}
      .we-switch.on::after{left:21px}
      .we-acts{display:flex;gap:10px;margin-top:10px}
      .we-btn{flex:1;height:48px;border-radius:12px;font-weight:600;font-size:14px;display:flex;align-items:center;justify-content:center;gap:8px;transition:.2s;font-family:inherit;border:none;cursor:pointer}
      .we-btn.primary{background:#08A5E3;color:#fff}
      .we-btn.primary:hover{background:#0789BF}
      .we-btn.ghost{background:#F5F3EE;color:#111827}
      .we-btn.ghost:hover{background:#E9E6DD}

      .we-preview{background:#F5F3EE;border:1px solid #E5E4DF;border-radius:12px;padding:14px 16px;margin-bottom:16px;font-size:13px;color:#374151;line-height:1.6}
      .we-preview-head{display:flex;align-items:center;gap:8px;margin-bottom:8px;font-weight:600;color:#111827}
      .we-preview-head i{width:14px;height:14px;color:#08A5E3}
      .we-preview code{background:#fff;padding:1px 6px;border-radius:4px;font-family:'SFMono-Regular',Menlo,monospace;font-size:12px}
    `;
    document.head.appendChild(s);
  }

  let toastTimer;
  function toast(msg, subtitle, type='success', iconName='check-circle'){
    injectStyles();
    let t = document.getElementById('we-toast');
    if(!t){
      t = document.createElement('div');
      t.id = 'we-toast';
      t.className = 'we-toast';
      document.body.appendChild(t);
    }
    t.className = 'we-toast ' + type;
    t.innerHTML = `<i data-lucide="${iconName}"></i><span>${msg}${subtitle?`<span class="we-toast-sub"> — ${subtitle}</span>`:''}</span>`;
    if(window.lucide) lucide.createIcons();
    requestAnimationFrame(() => t.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 4000);
  }

  function sendWelcomeEmail(name, email){
    // In production: POST /api/auth/signup → backend sends via Resend/SendGrid
    console.log(`[stub] Welcome email → ${email}`);
    toast(`Welcome email sent to ${email}`, 'Check your inbox', 'success', 'mail-check');
  }

  function sendDailyReport(){
    const recipients = getDigestRecipients();
    // In production: POST /api/reports/daily → backend generates HTML, sends via mail provider
    console.log(`[stub] Daily report → ${recipients}`);
    toast(`Daily report sent to ${recipients.split(',')[0]}${recipients.includes(',')?` + ${recipients.split(',').length-1} more`:''}`, 'Contains dashboard link + CSV attachment', 'success', 'send');
  }

  function buildModal(){
    injectStyles();
    if(document.getElementById('we-digest-modal')) return document.getElementById('we-digest-modal');
    const bg = document.createElement('div');
    bg.id = 'we-digest-modal';
    bg.className = 'we-modal-bg';
    bg.innerHTML = `
      <div class="we-modal">
        <h2>Daily digest email</h2>
        <p class="we-lede">Schedule an end-of-day summary with today's count, trend, anomalies and a link to view the dashboard.</p>

        <div class="we-toggle">
          <div class="we-toggle-text">
            <strong>Send daily report</strong>
            <span>Auto-send every working day at the configured time</span>
          </div>
          <div class="we-switch ${isDigestEnabled()?'on':''}" id="we-enabled-sw" role="switch" aria-checked="${isDigestEnabled()}"></div>
        </div>

        <div class="we-field">
          <label>Recipients (comma-separated)</label>
          <textarea id="we-recipients" placeholder="cynthiaok@wakanow.com, admin@wakanow.com">${getDigestRecipients()}</textarea>
          <div class="we-hint">One or more work emails. They'll each receive the same digest.</div>
        </div>

        <div class="we-field">
          <label>Send at</label>
          <input id="we-time" type="time" value="${getDigestTime()}">
          <div class="we-hint">Local time — Africa/Lagos</div>
        </div>

        <div class="we-preview">
          <div class="we-preview-head"><i data-lucide="mail"></i> Email preview</div>
          <strong>Subject:</strong> WakaEats · Friday 17 April — 387 meals served (+5 vs avg)<br>
          <strong>To:</strong> <span id="we-preview-to">${getDigestRecipients()}</span><br>
          Includes: KPI summary · 30-day trend chart · link to <code>/dashboard</code> · attached <code>wakaeats_scans_2026-04-17.csv</code>
        </div>

        <div class="we-acts">
          <button class="we-btn ghost" type="button" id="we-cancel">Cancel</button>
          <button class="we-btn primary" type="button" id="we-save"><i data-lucide="check"></i> Save & test send</button>
        </div>
      </div>
    `;
    document.body.appendChild(bg);
    if(window.lucide) lucide.createIcons();

    // Wire events
    bg.addEventListener('click', e => { if(e.target === bg) bg.classList.remove('open'); });
    bg.querySelector('#we-cancel').addEventListener('click', () => bg.classList.remove('open'));
    const sw = bg.querySelector('#we-enabled-sw');
    sw.addEventListener('click', () => {
      const on = !sw.classList.contains('on');
      sw.classList.toggle('on', on);
      localStorage.setItem(DIGEST_ENABLED_KEY, on.toString());
    });
    bg.querySelector('#we-recipients').addEventListener('input', e => {
      bg.querySelector('#we-preview-to').textContent = e.target.value || '(no recipients)';
    });
    bg.querySelector('#we-save').addEventListener('click', () => {
      const recipients = bg.querySelector('#we-recipients').value.trim();
      const time = bg.querySelector('#we-time').value;
      if(!recipients){ toast('Please add at least one recipient', '', 'info', 'info'); return; }
      localStorage.setItem(DIGEST_RECIPIENTS_KEY, recipients);
      localStorage.setItem(DIGEST_TIME_KEY, time);
      bg.classList.remove('open');
      // Update dashboard recipients display if present
      const dr = document.getElementById('digest-recipients');
      if(dr) dr.textContent = recipients.split(',')[0].trim();
      const dt = document.getElementById('digest-time');
      if(dt) dt.textContent = fmtTime(time);
      toast(`Digest configured · test sent to ${recipients.split(',')[0].trim()}`, '', 'success', 'mail-check');
    });

    return bg;
  }

  function openDigestSettings(){
    const m = buildModal();
    m.classList.add('open');
    if(window.lucide) lucide.createIcons();
  }

  // Update dashboard display on load
  function refreshDigestDisplay(){
    const dr = document.getElementById('digest-recipients');
    if(dr) dr.textContent = getDigestRecipients().split(',')[0].trim();
    const dt = document.getElementById('digest-time');
    if(dt) dt.textContent = fmtTime(getDigestTime());
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', refreshDigestDisplay);
  } else {
    refreshDigestDisplay();
  }

  // Expose
  window.WakaEatsEmail = {
    sendWelcome: sendWelcomeEmail,
    sendDailyReport,
    openDigestSettings,
    toast
  };
})();
