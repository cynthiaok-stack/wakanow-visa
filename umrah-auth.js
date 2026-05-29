/* Visa application entry / Manage Application auth modal — shared across portal */
/*  - Step 1: Booking ID  -> verify exists, "send" 6-digit email code
 *  - Step 2: 6-digit code -> verify, sign-in, callback
 *  Mobile: full-screen sheet. Desktop: centered card.
 *  Usage:
 *    UmrahAuth.open({
 *      title: 'Manage Application',         // optional — defaults to 'Sign in to continue'
 *      subtitle: 'Enter your booking ID …', // optional
 *      prefillId: 'WKU-XXX',                // optional
 *      onSuccess: (booking) => { ... }
 *    });
 */
(function (global) {
  'use strict';

  if (global.UmrahAuth) return;

  const CSS = `
  .wk-auth-overlay{position:fixed;inset:0;background:rgba(15,42,51,.55);backdrop-filter:blur(4px);z-index:1000;display:none;align-items:center;justify-content:center;padding:20px;font-family:'Rubik',system-ui,sans-serif}
  .wk-auth-overlay.on{display:flex;animation:wkAuthFade .2s ease}
  @keyframes wkAuthFade{from{opacity:0}to{opacity:1}}
  .wk-auth-card{background:#fff;border-radius:16px;box-shadow:0 24px 60px rgba(15,42,51,.32);width:100%;max-width:440px;max-height:calc(100vh - 40px);overflow:auto;animation:wkAuthSlide .26s cubic-bezier(.4,0,.2,1) both}
  @keyframes wkAuthSlide{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}

  .wk-auth-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;padding:24px 26px 0}
  .wk-auth-head .ico{width:42px;height:42px;border-radius:11px;background:#E8F6FD;color:#08A5E3;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
  .wk-auth-head .ico i{width:22px;height:22px}
  .wk-auth-head .h{flex:1;min-width:0}
  .wk-auth-head h3{font-size:17px;color:#0F2A33;margin:0 0 4px;font-weight:700;line-height:1.3;letter-spacing:-.005em}
  .wk-auth-head p{font-size:12.5px;color:#6B7280;margin:0;line-height:1.5}
  .wk-auth-close{width:30px;height:30px;border-radius:50%;background:#F2F3F5;color:#6B7280;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;border:none;flex-shrink:0;transition:.2s}
  .wk-auth-close:hover{background:#E5E7EB;color:#0F2A33}
  .wk-auth-close i{width:14px;height:14px}

  .wk-auth-body{padding:18px 26px 22px}
  .wk-auth-step-pill{display:inline-flex;align-items:center;gap:6px;background:#F2F3F5;color:#6B7280;font-size:11px;font-weight:600;padding:5px 11px;border-radius:999px;margin-bottom:14px;letter-spacing:.04em;text-transform:uppercase}

  .wk-auth-field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}
  .wk-auth-field label{font-size:12px;color:#0F2A33;font-weight:600}
  .wk-auth-field input{padding:13px 14px;border:1.5px solid #E5E7EB;border-radius:9px;font-size:14px;font-family:inherit;color:#0F2A33;transition:.18s;background:#fff;font-variant-numeric:tabular-nums;width:100%}
  .wk-auth-field input:focus{outline:none;border-color:#08A5E3;box-shadow:0 0 0 3px rgba(8,165,227,.15)}
  .wk-auth-field input.invalid{border-color:#DC2626;background:#FEF2F2}
  .wk-auth-field .hint{font-size:11px;color:#6B7280}
  .wk-auth-field .err{font-size:11.5px;color:#DC2626;display:none;align-items:center;gap:4px;font-weight:500}
  .wk-auth-field .err.on{display:inline-flex}
  .wk-auth-field .err i{width:12px;height:12px}

  /* OTP boxes */
  .wk-otp-row{display:flex;gap:8px;justify-content:space-between;margin-bottom:6px}
  .wk-otp{width:100%;height:52px;text-align:center;font-size:20px;font-weight:700;border:1.5px solid #E5E7EB;border-radius:10px;background:#fff;color:#0F2A33;font-family:inherit;font-variant-numeric:tabular-nums}
  .wk-otp:focus{outline:none;border-color:#08A5E3;box-shadow:0 0 0 3px rgba(8,165,227,.15)}
  .wk-otp.filled{border-color:#08A5E3;background:#F4FAFE}
  .wk-otp.invalid{border-color:#DC2626;background:#FEF2F2}

  .wk-auth-meta{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#6B7280;margin:8px 0 16px;flex-wrap:wrap;gap:8px}
  .wk-auth-meta strong{color:#0F2A33;font-weight:600}
  .wk-auth-resend{background:none;border:none;color:#08A5E3;font-size:12px;font-weight:600;cursor:pointer;padding:0;font-family:inherit}
  .wk-auth-resend:disabled{color:#9CA3AF;cursor:not-allowed}
  .wk-auth-resend:not(:disabled):hover{color:#0789BF;text-decoration:underline}

  .wk-auth-actions{display:flex;flex-direction:column;gap:10px}
  .wk-auth-btn{padding:13px 20px;border-radius:11px;font-size:14px;font-weight:600;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:7px;transition:.18s;font-family:inherit;width:100%;min-height:46px}
  .wk-auth-btn-primary{background:#F58220;color:#fff;box-shadow:0 6px 14px rgba(245,130,32,.28)}
  .wk-auth-btn-primary:hover:not(:disabled){background:#E07318;box-shadow:0 8px 18px rgba(245,130,32,.36)}
  .wk-auth-btn-primary:disabled{background:#D1D5DB;cursor:not-allowed;box-shadow:none}
  .wk-auth-btn-ghost{background:transparent;color:#0F2A33;border:1.5px solid #E5E7EB}
  .wk-auth-btn-ghost:hover{border-color:#D1D5DB;background:#F9FAFB}
  .wk-auth-btn i{width:14px;height:14px}

  .wk-auth-foot{padding:14px 26px 22px;border-top:1px solid #F2F3F5;font-size:11.5px;color:#6B7280;display:flex;align-items:center;gap:8px;line-height:1.5}
  .wk-auth-foot i{width:14px;height:14px;color:#27AE60;flex-shrink:0}
  .wk-auth-foot a{color:#08A5E3;font-weight:600}

  .wk-auth-spin{width:14px;height:14px;border-radius:50%;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;animation:wkAuthSpin .8s linear infinite;display:inline-block}
  @keyframes wkAuthSpin{to{transform:rotate(360deg)}}

  /* Mobile full-screen sheet */
  @media(max-width:560px){
    .wk-auth-overlay{padding:0;align-items:stretch}
    .wk-auth-card{max-width:none;max-height:none;height:100%;border-radius:0;display:flex;flex-direction:column;animation:wkAuthSheet .3s cubic-bezier(.4,0,.2,1) both}
    @keyframes wkAuthSheet{from{transform:translateY(20px);opacity:.6}to{transform:translateY(0);opacity:1}}
    .wk-auth-body{flex:1}
    .wk-auth-head{padding:18px 20px 0}
    .wk-auth-body{padding:16px 20px 22px}
    .wk-auth-foot{padding:14px 20px 22px}
  }
  `;

  // ---- styles -----------------------------------------------------------------
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  // ---- markup -----------------------------------------------------------------
  const root = document.createElement('div');
  root.className = 'wk-auth-overlay';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-hidden', 'true');
  root.innerHTML = `
    <div class="wk-auth-card">
      <div class="wk-auth-head">
        <div class="ico"><i data-lucide="lock"></i></div>
        <div class="h">
          <h3 id="wkAuthTitle">Sign in to continue</h3>
          <p id="wkAuthSub">For your security, please verify your booking before continuing.</p>
        </div>
        <button class="wk-auth-close" type="button" aria-label="Close" id="wkAuthClose"><i data-lucide="x"></i></button>
      </div>
      <div class="wk-auth-body" id="wkAuthBody"></div>
      <div class="wk-auth-foot">
        <i data-lucide="shield-check"></i>
        <span>Encrypted &amp; PCI-DSS compliant. Your details are never shared. <a href="mailto:umrah@wakanow.com">Need help?</a></span>
      </div>
    </div>
  `;
  document.body.appendChild(root);

  const titleEl = root.querySelector('#wkAuthTitle');
  const subEl   = root.querySelector('#wkAuthSub');
  const bodyEl  = root.querySelector('#wkAuthBody');
  root.querySelector('#wkAuthClose').addEventListener('click', close);
  root.addEventListener('click', (e) => { if (e.target === root) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.classList.contains('on')) close(); });

  // session-only sent codes (regenerate per open)
  const sentCodes = new Map();   // bookingId -> { code, sentAt }
  let resendTimer = null;
  let state = { booking: null, onSuccess: null };

  function rebuildIcons(){ if (window.lucide && window.lucide.createIcons) window.lucide.createIcons(); }

  function open(opts){
    opts = opts || {};
    state.onSuccess = typeof opts.onSuccess === 'function' ? opts.onSuccess : null;
    titleEl.textContent = opts.title || 'Sign in to continue';
    subEl.textContent   = opts.subtitle || 'Enter your booking reference and verify it with the email code we send you.';
    renderStep1(opts.prefillId || '');
    root.classList.add('on');
    root.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    rebuildIcons();
    setTimeout(() => {
      const f = root.querySelector('#wkAuthBookingId');
      if (f) f.focus();
    }, 60);
  }

  function close(){
    root.classList.remove('on');
    root.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (resendTimer){ clearInterval(resendTimer); resendTimer = null; }
  }

  // ---- Step 1: booking id -----------------------------------------------------
  function renderStep1(prefill){
    bodyEl.innerHTML = `
      <span class="wk-auth-step-pill">Step 1 of 2 · Booking ID</span>
      <div class="wk-auth-field">
        <label for="wkAuthBookingId">Booking reference</label>
        <input id="wkAuthBookingId" type="text" autocomplete="off" spellcheck="false" autocapitalize="characters" placeholder="e.g. WKU-LXYZ12" value="${(prefill || '').toUpperCase()}">
        <span class="hint">Find this in your booking confirmation email or receipt.</span>
        <span class="err" id="wkAuthBookingIdErr"><i data-lucide="alert-circle"></i> <span></span></span>
      </div>
      <div class="wk-auth-actions">
        <button class="wk-auth-btn wk-auth-btn-primary" id="wkAuthVerifyBtn" type="button">
          <i data-lucide="mail"></i> Send verification code
        </button>
        <button class="wk-auth-btn wk-auth-btn-ghost" type="button" onclick="UmrahAuth.close()">Cancel</button>
      </div>
    `;
    rebuildIcons();
    const input = bodyEl.querySelector('#wkAuthBookingId');
    const btn   = bodyEl.querySelector('#wkAuthVerifyBtn');
    input.addEventListener('input', () => { input.value = input.value.toUpperCase().replace(/\s+/g,''); clearErr(input); });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') btn.click(); });
    btn.addEventListener('click', () => submitStep1(input, btn));
  }

  function clearErr(input){
    input.classList.remove('invalid');
    const err = input.parentElement.querySelector('.err');
    if (err) err.classList.remove('on');
  }
  function showErr(input, msg){
    input.classList.add('invalid');
    const err = input.parentElement.querySelector('.err');
    if (err){ err.querySelector('span').textContent = msg; err.classList.add('on'); rebuildIcons(); }
  }

  function submitStep1(input, btn){
    const id = input.value.trim().toUpperCase();
    if (!id){ showErr(input, 'Enter your booking reference'); return; }
    if (!/^WKU-[A-Z0-9]{4,}$/.test(id)){ showErr(input, 'That doesn\'t look like a valid booking reference. It should start with WKU-'); return; }
    const booking = (window.UmrahPortal && UmrahPortal.findBooking) ? UmrahPortal.findBooking(id) : null;
    if (!booking){ showErr(input, 'No booking found with this reference. Please check and try again.'); return; }

    // simulate sending code
    btn.disabled = true; btn.innerHTML = '<span class="wk-auth-spin"></span> Sending code…';
    setTimeout(() => {
      const code = String(Math.floor(100000 + Math.random() * 900000));
      sentCodes.set(id, { code, sentAt: Date.now() });
      // Dev convenience: log for testing
      if (window.console) console.log('[UmrahAuth] Verification code for', id, '=', code);
      state.booking = booking;
      renderStep2(booking, code);
    }, 700);
  }

  // ---- Step 2: code -----------------------------------------------------------
  function maskEmail(email){
    if (!email) return 'your registered email';
    const [u, d] = email.split('@');
    if (!d) return email;
    const masked = u.length <= 2 ? u[0] + '***' : u.slice(0,2) + '***' + u.slice(-1);
    return masked + '@' + d;
  }

  function renderStep2(booking, devCode){
    const contactEmail = (booking.contact && booking.contact.email)
      || (window.UmrahPortal && UmrahPortal.load().user && UmrahPortal.load().user.email)
      || '';
    const masked = maskEmail(contactEmail);
    bodyEl.innerHTML = `
      <span class="wk-auth-step-pill">Step 2 of 2 · Verification code</span>
      <div class="wk-auth-field">
        <label>Enter the 6-digit code</label>
        <div class="wk-otp-row" id="wkOtpRow">
          ${[0,1,2,3,4,5].map(i => `<input class="wk-otp" data-i="${i}" type="text" inputmode="numeric" maxlength="1" autocomplete="one-time-code" aria-label="Digit ${i+1}">`).join('')}
        </div>
        <span class="err" id="wkOtpErr"><i data-lucide="alert-circle"></i> <span></span></span>
      </div>
      <div class="wk-auth-meta">
        <span>Sent to <strong>${masked}</strong></span>
        <button class="wk-auth-resend" id="wkAuthResend" type="button" disabled>Resend in <span id="wkResendTimer">30</span>s</button>
      </div>
      <div class="wk-auth-actions">
        <button class="wk-auth-btn wk-auth-btn-primary" id="wkAuthSubmitBtn" type="button" disabled>
          <i data-lucide="check-circle"></i> Verify &amp; continue
        </button>
        <button class="wk-auth-btn wk-auth-btn-ghost" type="button" id="wkAuthBackBtn">
          <i data-lucide="arrow-left"></i> Use a different booking
        </button>
      </div>
      <p style="margin-top:12px;font-size:11px;color:#9CA3AF;text-align:center">Demo: code is <strong style="color:#08A5E3;font-family:monospace">${devCode}</strong> (also in console)</p>
    `;
    rebuildIcons();

    const inputs = [...bodyEl.querySelectorAll('.wk-otp')];
    const errEl  = bodyEl.querySelector('#wkOtpErr');
    const submit = bodyEl.querySelector('#wkAuthSubmitBtn');
    const back   = bodyEl.querySelector('#wkAuthBackBtn');
    const resend = bodyEl.querySelector('#wkAuthResend');
    const timer  = bodyEl.querySelector('#wkResendTimer');

    inputs.forEach((inp, i) => {
      inp.addEventListener('input', () => {
        inp.value = inp.value.replace(/\D/g,'').slice(0,1);
        inp.classList.toggle('filled', !!inp.value);
        if (inp.value && i < inputs.length - 1) inputs[i+1].focus();
        const all = inputs.map(x => x.value).join('');
        submit.disabled = all.length !== 6;
        clearOtpErr();
      });
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !inp.value && i > 0) inputs[i-1].focus();
        if (e.key === 'Enter') submit.click();
      });
      inp.addEventListener('paste', (e) => {
        const text = (e.clipboardData || window.clipboardData).getData('text');
        const digits = (text || '').replace(/\D/g,'').slice(0,6);
        if (!digits) return;
        e.preventDefault();
        digits.split('').forEach((d, j) => { if (inputs[j]){ inputs[j].value = d; inputs[j].classList.add('filled'); } });
        const next = Math.min(digits.length, inputs.length - 1);
        inputs[next].focus();
        submit.disabled = digits.length !== 6;
      });
    });
    setTimeout(() => inputs[0].focus(), 60);

    function clearOtpErr(){
      errEl.classList.remove('on');
      inputs.forEach(x => x.classList.remove('invalid'));
    }
    function showOtpErr(msg){
      errEl.querySelector('span').textContent = msg;
      errEl.classList.add('on');
      inputs.forEach(x => x.classList.add('invalid'));
      rebuildIcons();
    }

    submit.addEventListener('click', () => {
      const entered = inputs.map(x => x.value).join('');
      const stored  = sentCodes.get(state.booking.id);
      if (!stored){ showOtpErr('Code expired. Please request a new one.'); return; }
      if (entered !== stored.code){ showOtpErr('That code didn\'t match. Double-check and try again.'); return; }
      submit.disabled = true; submit.innerHTML = '<span class="wk-auth-spin"></span> Verifying…';
      setTimeout(() => {
        // sign in lightweight if email is known
        if (window.UmrahPortal && UmrahPortal.signIn){
          const email = (state.booking.contact && state.booking.contact.email) || '';
          const lead  = (state.booking.passengers && state.booking.passengers[0]) || {};
          if (email) UmrahPortal.signIn(lead.firstName || 'Traveller', lead.lastName || '', email);
        }
        sentCodes.delete(state.booking.id);
        close();
        if (state.onSuccess) state.onSuccess(state.booking);
      }, 600);
    });

    back.addEventListener('click', () => renderStep1(state.booking ? state.booking.id : ''));

    // resend cooldown
    let secs = 30;
    if (resendTimer) clearInterval(resendTimer);
    resendTimer = setInterval(() => {
      secs--;
      timer.textContent = secs;
      if (secs <= 0){
        clearInterval(resendTimer); resendTimer = null;
        resend.disabled = false;
        resend.innerHTML = '<i data-lucide="rotate-ccw"></i> Resend code';
        rebuildIcons();
      }
    }, 1000);
    resend.addEventListener('click', () => {
      if (resend.disabled) return;
      const code = String(Math.floor(100000 + Math.random() * 900000));
      sentCodes.set(state.booking.id, { code, sentAt: Date.now() });
      if (window.console) console.log('[UmrahAuth] Resent code for', state.booking.id, '=', code);
      // restart timer
      secs = 30;
      resend.disabled = true;
      resend.textContent = ''; // rebuild text
      resend.innerHTML = 'Resend in <span id="wkResendTimer">30</span>s';
      const t2 = bodyEl.querySelector('#wkResendTimer');
      if (resendTimer) clearInterval(resendTimer);
      resendTimer = setInterval(() => {
        secs--; t2.textContent = secs;
        if (secs <= 0){ clearInterval(resendTimer); resendTimer = null; resend.disabled = false; resend.innerHTML = '<i data-lucide="rotate-ccw"></i> Resend code'; rebuildIcons(); }
      }, 1000);
    });
  }

  global.UmrahAuth = { open, close };
})(window);
