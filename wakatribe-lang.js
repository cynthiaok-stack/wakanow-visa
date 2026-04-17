/* ─────────────────────────────────────────────────────────────
   WakaTribe — language toggle (EN ↔ FR via Google Translate)
   Auto-injects a floating language button and wires Google
   Translate. Language preference persists via googtrans cookie.
   ────────────────────────────────────────────────────────────── */
(function(){

  function getLang(){
    const m = document.cookie.match(/googtrans=\/[a-z]+\/([a-z]+)/);
    return m ? m[1] : 'en';
  }

  function setLang(lang){
    const host = location.hostname;
    // Set on root and on current host (works on localhost too)
    document.cookie = `googtrans=/en/${lang}; path=/`;
    if(host && host !== 'localhost'){
      document.cookie = `googtrans=/en/${lang}; domain=.${host}; path=/`;
    }
    localStorage.setItem('wakatribe.lang', lang);
    // Reload to let Google Translate apply
    location.reload();
  }

  // Inject Google Translate (hidden, we drive it via cookie)
  function injectGoogleTranslate(){
    if(document.getElementById('wt-gt-script')) return;

    // Target div (hidden, lets google init)
    const target = document.createElement('div');
    target.id = 'google_translate_element';
    target.style.cssText = 'position:absolute;top:-1000px;left:-1000px;height:0;overflow:hidden';
    document.body.appendChild(target);

    // Global init callback
    window.googleTranslateElementInit = function(){
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,fr',
        autoDisplay: false,
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      }, 'google_translate_element');
    };

    const s = document.createElement('script');
    s.id = 'wt-gt-script';
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.head.appendChild(s);

    // Google Translate injects a top banner — hide it
    const style = document.createElement('style');
    style.textContent = `
      .goog-te-banner-frame,.skiptranslate{display:none !important}
      body{top:0 !important}
      .goog-logo-link,.goog-te-gadget span{display:none !important}
      .goog-tooltip,.goog-tooltip:hover{display:none !important}
      .goog-text-highlight{background:transparent !important;box-shadow:none !important}
    `;
    document.head.appendChild(style);
  }

  // Inject the floating toggle UI
  function injectUI(){
    if(document.getElementById('wt-lang-toggle')) return;

    const style = document.createElement('style');
    style.id = 'wt-lang-styles';
    style.textContent = `
      .wt-lang-fab{position:fixed;bottom:20px;right:20px;z-index:180;display:flex;background:#fff;border:1px solid #E5E4DF;border-radius:999px;padding:4px;gap:2px;box-shadow:0 6px 18px rgba(15,23,42,.10);font-family:'Inter',system-ui,sans-serif;font-size:12px;font-weight:700;letter-spacing:.04em}
      .wt-lang-fab button{padding:7px 14px;border-radius:999px;color:#6B7280;transition:.2s;cursor:pointer;border:none;background:transparent;font-family:inherit;font-size:12px;font-weight:700;letter-spacing:.04em;display:inline-flex;align-items:center;gap:5px;line-height:1}
      .wt-lang-fab button:hover{color:#111827}
      .wt-lang-fab button.on{background:#08A5E3;color:#fff;box-shadow:0 2px 6px rgba(8,165,227,.3)}
      .wt-lang-fab .globe{width:12px;height:12px;opacity:.7;margin-right:2px}
      /* Don't overlap mobile tab bars */
      @media(max-width:760px){.wt-lang-fab{bottom:84px;right:14px}}
    `;
    document.head.appendChild(style);

    const current = getLang();
    const fab = document.createElement('div');
    fab.id = 'wt-lang-toggle';
    fab.className = 'wt-lang-fab';
    fab.innerHTML = `
      <button data-l="en" class="${current==='en'?'on':''}" title="English">
        <svg class="globe" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        EN
      </button>
      <button data-l="fr" class="${current==='fr'?'on':''}" title="Français">FR</button>
    `;
    fab.addEventListener('click', e => {
      const b = e.target.closest('button[data-l]');
      if(!b) return;
      const lang = b.dataset.l;
      if(lang === getLang()) return;
      setLang(lang);
    });
    // Mark translate="no" so Google doesn't translate the toggle itself
    fab.setAttribute('translate', 'no');
    fab.classList.add('notranslate');
    document.body.appendChild(fab);
  }

  function init(){
    injectGoogleTranslate();
    injectUI();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.WakaTribeLang = { get: getLang, set: setLang };
})();
