/* Shared portal data & helpers — Wakanow Umrah customer journey */
(function (global) {
  'use strict';

  const PACKAGES = [
    {
      id: 'visa-express',
      name: 'Saudi Umrah Visa — Express',
      provider: 'Wakanow Visa Desk',
      type: 'with_visa',
      typeLabel: 'Visa + Package',
      stars: null,
      price: 185000,
      currency: 'NGN',
      dates: 'Processed in 3 – 5 business days',
      travelDates: ['2026-05-10', '2026-05-24', '2026-06-07', '2026-06-21'],
      availableSlots: 48,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
      description: 'Fast-tracked e-visa for individual travellers heading to Saudi Arabia for Umrah. Includes end-to-end application support from our visa specialists with status updates until your visa is issued.',
      included: ['Umrah e-visa', 'Application review', 'Embassy submission', 'Status SMS updates'],
      addOns: [
        { id: 'priority', label: 'Priority embassy processing', price: 45000 },
        { id: 'sim', label: 'Saudi travel SIM (4G, 10GB)', price: 18000 }
      ],
      upgrade: { id: 'umrah-plus', name: 'Umrah Plus', price: 75000, summary: 'Priority processing, dedicated WhatsApp line, Zamzam delivery, and premium travel support.' },
      gallery: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
        'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=900&q=80'
      ],
      highlights: ['E-visa sent by email', 'Dedicated visa officer', 'Status tracking SMS']
    },
    {
      id: 'visa-flight-7d',
      name: '7 Days — Umrah Essentials',
      provider: 'Wakanow Travel',
      type: 'with_visa',
      typeLabel: 'Visa + Package',
      stars: 4,
      price: 1485000,
      currency: 'NGN',
      dates: '5 – 12 March, 2026',
      travelDates: ['2026-03-05', '2026-03-19', '2026-04-02', '2026-04-16'],
      availableSlots: 12,
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200&q=80',
      description: 'Round-trip flight from Lagos to Jeddah paired with your Umrah visa and airport transfers. Ideal for travellers who prefer to arrange their own lodging in Makkah.',
      included: ['Umrah e-visa', 'Return flight LOS → JED', 'Meet-and-greet at Jeddah', 'Hotel area drop-off'],
      addOns: [
        { id: 'extra-bag', label: 'Extra checked bag (23kg)', price: 24000 },
        { id: 'upgrade', label: 'Upgrade to premium economy', price: 180000 }
      ],
      upgrade: { id: 'umrah-plus', name: 'Umrah Plus', price: 220000, summary: 'Upgraded hotel, Ziyarat tour, airport fast-track and extra luggage included.' },
      gallery: [
        'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=900&q=80',
        'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=900&q=80'
      ],
      highlights: ['Lagos → Jeddah round-trip', 'Meet-and-greet at arrival', 'Haram-area drop-off']
    },
    {
      id: 'full-10d',
      name: '10 Days — Classic Umrah Package',
      provider: 'Wakanow Umrah',
      type: 'with_visa',
      typeLabel: 'Visa + Package',
      stars: 5,
      price: 2450000,
      occupancy: { shared: 2450000, double: 2850000, single: 3450000 },
      currency: 'NGN',
      dates: '4 – 14 April, 2026',
      travelDates: ['2026-04-04', '2026-04-18', '2026-05-02', '2026-05-16'],
      availableSlots: 12,
      image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1200&q=80',
      description: 'A well-paced 10-day Umrah journey covering both Makkah and Madinah, with ample time for reflection, Ziyarat tours, and daily prayers at Masjid al-Haram and Masjid an-Nabawi.',
      included: ['Umrah e-visa', 'Return flight LOS → JED', '5-star hotel (Makkah)', '4-star hotel (Madinah)', 'Daily breakfast', 'All transfers', 'Ziyarat tour'],
      addOns: [
        { id: 'scholar', label: 'Scholar-led enrichment programme', price: 55000 },
        { id: 'zamzam', label: 'Zamzam water home delivery (10L)', price: 18000 }
      ],
      upgrade: { id: 'umrah-plus', name: 'Umrah Plus', price: 385000, summary: 'Scholar-led programme, Haram-view room upgrade, Taif day trip and Zamzam home delivery included.' },
      gallery: [
        'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=900&q=80',
        'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=900&q=80',
        'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=900&q=80'
      ],
      highlights: ['Masjid al-Haram', 'Masjid an-Nabawi', 'Jabal al-Nour & Cave of Hira']
    },
    {
      id: 'full-14d',
      name: '14 Days — Premium Umrah Package',
      provider: 'Wakanow Umrah',
      type: 'with_visa',
      typeLabel: 'Visa + Package',
      stars: 5,
      price: 3890000,
      occupancy: { shared: 3890000, double: 4490000, single: 5390000 },
      currency: 'NGN',
      dates: '10 – 24 May, 2026',
      travelDates: ['2026-05-10', '2026-05-24', '2026-06-07'],
      availableSlots: 3,
      image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1200&q=80',
      description: 'Our premium Umrah experience with 5-star lodging steps from the Haram, private transfers, Ziyarat tours of Taif and historical sites, and a dedicated group scholar to guide rites and reflections.',
      included: ['Umrah e-visa', 'Return flight LOS → JED', '5-star Haram-view hotel', 'Half-board meals', 'Private transfers', 'Taif & Ziyarat tours', 'Group scholar'],
      addOns: [
        { id: 'airport-vip', label: 'VIP Jeddah airport fast-track', price: 95000 },
        { id: 'private-tour', label: 'Private Madinah ziyarat', price: 140000 }
      ],
      upgrade: { id: 'umrah-plus', name: 'Umrah Plus', price: 560000, summary: 'VIP airport fast-track, private Madinah ziyarat, scholar companion and Jeddah city tour included.' },
      gallery: [
        'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=900&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
        'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=900&q=80'
      ],
      highlights: ['5-star lodging by the Haram', 'Taif Day Trip', 'Private Ziyarat tours']
    },
    {
      id: 'po-7d',
      name: '7 Days — Makkah Stay (Package Only)',
      provider: 'Wakanow Travel',
      type: 'without_visa',
      typeLabel: 'Package Only',
      stars: 4,
      price: 985000,
      occupancy: { shared: 985000, double: 1185000, single: 1485000 },
      currency: 'NGN',
      dates: '12 – 19 April, 2026',
      travelDates: ['2026-04-12', '2026-04-26', '2026-05-10'],
      availableSlots: 18,
      image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1200&q=80',
      description: 'Flight, 4-star hotel near the Haram and transfers for travellers who already hold a valid Umrah visa. A lean option to focus purely on the pilgrimage.',
      included: ['Return flight LOS → JED', '4-star Makkah hotel', 'Daily breakfast', 'All transfers'],
      addOns: [
        { id: 'ziyarat', label: 'Makkah ziyarat tour', price: 32000 },
        { id: 'extra-bag', label: 'Extra checked bag (23kg)', price: 24000 }
      ],
      upgrade: { id: 'umrah-plus', name: 'Umrah Plus', price: 145000, summary: 'Upgraded Haram-view room, full-board meals, Makkah ziyarat tour and airport fast-track.' },
      gallery: [
        'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=900&q=80',
        'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=900&q=80'
      ],
      highlights: ['Haram area hotel', 'Breakfast included', 'Direct Jeddah flight']
    },
    {
      id: 'po-10d',
      name: '10 Days — Madinah + Makkah (Package Only)',
      provider: 'Wakanow Travel',
      type: 'without_visa',
      typeLabel: 'Package Only',
      stars: 5,
      price: 1450000,
      occupancy: { shared: 1450000, double: 1695000, single: 2095000 },
      currency: 'NGN',
      dates: '1 – 10 May, 2026',
      travelDates: ['2026-05-01', '2026-05-15', '2026-05-29'],
      availableSlots: 9,
      image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=1200&q=80',
      description: 'Ten nights split between Madinah and Makkah with 5-star hotels and coach transfers. Valid Umrah visa required.',
      included: ['Return flight LOS → MED', '5-star Madinah hotel', '5-star Makkah hotel', 'Coach transfer MED → MKH', 'Breakfast & dinner'],
      addOns: [
        { id: 'ziyarat-double', label: 'Makkah + Madinah ziyarat combo', price: 52000 }
      ],
      upgrade: { id: 'umrah-plus', name: 'Umrah Plus', price: 210000, summary: 'Makkah + Madinah ziyarat combo, private transfers and upgraded hotel rooms with Haram views.' },
      gallery: [
        'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=900&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80'
      ],
      highlights: ['Split Madinah & Makkah', 'Half-board meals', 'Group transfer']
    }
  ];

  const STORE_KEY = 'wk_umrah_portal_v1';

  // ── Pre-qualification: nationality → tier classification ─────────────────
  // Tier 1: American, British, or any European nationality (spec)
  // Tier 2: African or any non-Tier-1 nationality (spec) — handled in classifyTier
  // Tier 3: routed to from Tier 2 (no document upload) or failed Tier 2 visa upload
  const TIER1_NATIONALITIES = [
    // American
    'United States', 'United States of America', 'USA', 'America', 'American',
    // British
    'United Kingdom', 'UK', 'Britain', 'British', 'England', 'Scotland', 'Wales', 'Northern Ireland',
    // European (EU + EEA, common ones)
    'Germany','France','Italy','Spain','Portugal','Netherlands','Belgium','Austria',
    'Ireland','Sweden','Norway','Denmark','Finland','Iceland','Switzerland',
    'Greece','Poland','Czech Republic','Hungary','Romania','Bulgaria','Croatia',
    'Slovenia','Slovakia','Estonia','Latvia','Lithuania','Luxembourg','Malta','Cyprus'
  ];
  const TIER1_SET = new Set(TIER1_NATIONALITIES.map(s => s.toLowerCase()));

  function classifyPassengerTier(passenger) {
    if (!passenger || !passenger.nationality) return 2; // unknown → safe default Tier 2
    return TIER1_SET.has(String(passenger.nationality).trim().toLowerCase()) ? 1 : 2;
  }

  // Family eligibility rule: if all PAX share the same surname AND at least one is Tier 1 → group auto-eligible
  function checkFamilyEligibility(passengers) {
    if (!passengers || passengers.length < 2) return false;
    const surnames = passengers.map(p => String(p.lastName || '').trim().toLowerCase()).filter(Boolean);
    if (surnames.length !== passengers.length) return false; // missing data
    const allSame = surnames.every(s => s === surnames[0]);
    if (!allSame) return false;
    return passengers.some(p => classifyPassengerTier(p) === 1);
  }

  // Initialize the per-booking pre-qualification record (idempotent)
  function initPreQualification(bookingId) {
    const s = load();
    const b = (s.bookings || []).find(x => x.id === bookingId);
    if (!b) return null;
    if (b.preQualification && b.preQualification.passengers && b.preQualification.passengers.length) {
      return b.preQualification; // already initialised; do not clobber in-progress state
    }
    const pax = Array.isArray(b.passengers) ? b.passengers : [];
    const groupAutoEligible = checkFamilyEligibility(pax);
    b.preQualification = {
      status: 'in_progress',
      groupAutoEligible,
      currentPaxIndex: 0,
      currentStep: groupAutoEligible ? 'group_success' : (pax.length ? 'evaluate' : 'evaluate'),
      passengers: pax.map((p, i) => {
        const tier = groupAutoEligible ? 1 : classifyPassengerTier(p);
        return {
          index: i,
          firstName: p.firstName || '',
          lastName: p.lastName || '',
          nationality: p.nationality || '',
          tier,
          currentTier: tier,
          step: tier === 1 ? 'eligible' : 'pending',
          result: tier === 1 ? 'passed' : null,
          visaUpload: null,
          docs: {
            bankStatement: null,
            employmentLetter: null,
            cac: null,
            reference: null,
            other: null
          }
        };
      }),
      startedAt: new Date().toISOString(),
      completedAt: groupAutoEligible ? new Date().toISOString() : null
    };
    if (groupAutoEligible) b.preQualification.status = 'passed';
    save(s);
    return b.preQualification;
  }

  function updatePreQualification(bookingId, patch) {
    const s = load();
    const b = (s.bookings || []).find(x => x.id === bookingId);
    if (!b || !b.preQualification) return null;
    Object.assign(b.preQualification, patch);
    save(s);
    return b.preQualification;
  }

  function updatePreQualPassenger(bookingId, paxIndex, patch) {
    const s = load();
    const b = (s.bookings || []).find(x => x.id === bookingId);
    if (!b || !b.preQualification) return null;
    const p = b.preQualification.passengers[paxIndex];
    if (!p) return null;
    Object.assign(p, patch);
    save(s);
    return p;
  }

  // Roll the pre-qual status up from per-passenger results
  function rollUpPreQualStatus(bookingId) {
    const s = load();
    const b = (s.bookings || []).find(x => x.id === bookingId);
    if (!b || !b.preQualification) return null;
    const pq = b.preQualification;
    const all = pq.passengers || [];
    const allPassed = all.length && all.every(p => p.result === 'passed');
    const anyFailed = all.some(p => p.result === 'failed');
    if (anyFailed) {
      pq.status = 'failed';
      pq.completedAt = new Date().toISOString();
    } else if (allPassed) {
      pq.status = 'passed';
      pq.completedAt = new Date().toISOString();
    } else {
      pq.status = 'in_progress';
    }
    save(s);
    return pq;
  }

  // Application Status string for the confirmation/manage views
  function applicationStatusLabel(booking) {
    if (!booking) return '—';
    if (booking.visa && booking.visa.submissionStatus === 'submitted') return 'Submitted';
    const pq = booking.preQualification;
    if (!pq || pq.status === 'not_started' || pq.status === 'in_progress') {
      return 'Pending — Eligibility Check';
    }
    if (pq.status === 'failed') return 'Under Review';
    if (pq.status === 'passed') return 'Pending — Visa Application';
    return 'Pending — Eligibility Check';
  }

  // ── Simulated document validation ────────────────────────────────────────
  // Deterministic for testing: filename keywords drive the outcome so QA can
  // exercise every error path without a real backend.
  function simulateVisaUploadValidation(fileName, customerName) {
    const f = String(fileName || '').toLowerCase();
    if (f.includes('expired'))   return { ok: false, code: 'expired',   expiry: '2024-08-15' };
    if (f.includes('mismatch') || f.includes('wrongname')) return { ok: false, code: 'name_mismatch' };
    if (f.includes('invalid') || f.includes('notvisa') || f.includes('fail')) return { ok: false, code: 'not_recognised' };
    return { ok: true };
  }

  function simulateBankStatementValidation(fileName, customerName) {
    const f = String(fileName || '').toLowerCase();
    if (f.includes('mismatch') || f.includes('wrongname')) return { ok: false, code: 'name_mismatch' };
    if (f.includes('lowbalance') || f.includes('low-balance') || f.includes('low_balance') || f.includes('insufficient')) {
      return { ok: false, code: 'low_balance', balance: '$420' };
    }
    return { ok: true };
  }

  // Payslips (3 months). Validates format/readability, that 3 consecutive
  // months were uploaded, and that the applicant name matches. The optional
  // cross-checks (employer-vs-employment-letter, salary-vs-bank-statement)
  // are NON-blocking — they surface as `warnings` so the UI can show an
  // amber heads-up without rejecting the upload.
  function simulatePayslipValidation(fileName, customerName) {
    const f = String(fileName || '').toLowerCase();
    if (f.includes('unreadable') || f.includes('corrupt')) {
      return { ok: false, code: 'unreadable' };
    }
    if (f.includes('1month') || f.includes('2months') || f.includes('partial')) {
      return { ok: false, code: 'insufficient_months' };
    }
    if (f.includes('mismatch') || f.includes('wrongname')) {
      return { ok: false, code: 'name_mismatch' };
    }
    const warnings = [];
    if (f.includes('employermismatch') || f.includes('wrongemployer')) warnings.push('employer_mismatch');
    if (f.includes('lowsalary') || f.includes('salarymismatch')) warnings.push('salary_mismatch');
    return { ok: true, warnings };
  }


  function defaultStore() {
    return {
      user: null,                 // { firstName, lastName, email } when signed in
      lead: null,                 // { type, value }
      currency: 'NGN',
      cart: {
        packageId: null,
        travelDate: null,
        quantity: 1,
        addOns: [],
        upgrade: false
      },
      qualification: null,        // { status: 'passed'|'pending'|'failed', id, expiresAt }
      bookings: [],               // [{ id, packageId, type, quantity, travelDate, totalPrice, paymentStatus, bookingStatus, createdAt, visa: {...} }]
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return defaultStore();
      return Object.assign(defaultStore(), JSON.parse(raw));
    } catch (e) { return defaultStore(); }
  }

  function save(store) {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  }

  function reset() {
    localStorage.removeItem(STORE_KEY);
  }

  function ngn(n) {
    if (n == null) return '—';
    return '₦' + Number(n).toLocaleString('en-NG');
  }

  function money(amount, currency) {
    currency = currency || 'NGN';
    if (currency === 'NGN') return '₦' + Number(amount).toLocaleString('en-NG');
    if (currency === 'USD') return '$' + Number(amount / 1500).toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (currency === 'GBP') return '£' + Number(amount / 1850).toLocaleString('en-GB', { maximumFractionDigits: 0 });
    return currency + ' ' + Number(amount).toLocaleString();
  }

  function findPackage(id) {
    return PACKAGES.find(p => p.id === id) || null;
  }

  function cartTotal(store, pkg) {
    store = store || load();
    pkg = pkg || findPackage(store.cart.packageId);
    if (!pkg) return 0;
    const q = store.cart.quantity || 1;
    const occ = store.cart.occupancy || 'shared';
    const basePrice = (pkg.occupancy && pkg.occupancy[occ]) ? pkg.occupancy[occ] : pkg.price;
    const addOns = (store.cart.addOns || []).reduce((sum, id) => {
      const a = pkg.addOns.find(x => x.id === id);
      return sum + (a ? a.price : 0);
    }, 0);
    const upgradePrice = (store.cart.upgrade && pkg.upgrade) ? pkg.upgrade.price : 0;
    return (basePrice + upgradePrice) * q + addOns * q;
  }

  function generateBookingRef() {
    return 'WKU-' + Date.now().toString(36).toUpperCase();
  }

  function createBooking(store, pkg) {
    const total = cartTotal(store, pkg);
    const booking = {
      id: generateBookingRef(),
      packageId: pkg.id,
      packageName: pkg.name,
      type: pkg.type,
      quantity: store.cart.quantity,
      travelDate: store.cart.travelDate,
      addOns: [...(store.cart.addOns || [])],
      totalPrice: total,
      currency: pkg.currency,
      paymentStatus: 'paid',
      bookingStatus: pkg.type === 'with_visa' ? 'paid_pending_visa' : 'confirmed',
      createdAt: new Date().toISOString(),
      visa: pkg.type === 'with_visa' ? {
        currentStep: 1,
        completedSteps: [],
        formData: {},
        documents: [],
        submissionStatus: 'draft',
        progress: 0
      } : null
    };
    store.bookings = store.bookings || [];
    store.bookings.push(booking);
    store.cart = { packageId: null, travelDate: null, quantity: 1, addOns: [] };
    save(store);
    return booking;
  }

  function findBooking(id) {
    const s = load();
    return (s.bookings || []).find(b => b.id === id) || null;
  }

  function updateBooking(id, patch) {
    const s = load();
    const b = (s.bookings || []).find(x => x.id === id);
    if (!b) return null;
    Object.assign(b, patch);
    save(s);
    return b;
  }

  function updateVisa(bookingId, patch) {
    const s = load();
    const b = (s.bookings || []).find(x => x.id === bookingId);
    if (!b || !b.visa) return null;
    Object.assign(b.visa, patch);
    save(s);
    return b.visa;
  }

  function statusLabel(booking) {
    if (!booking) return '—';
    if (booking.bookingStatus === 'confirmed') return 'Confirmed';
    if (!booking.visa) return 'Paid';
    const v = booking.visa;
    if (v.submissionStatus === 'approved') return 'Visa Approved · Travel Ready';
    if (v.submissionStatus === 'submitted') return 'Visa Submitted';
    if (v.progress > 0) return 'Visa In Progress';
    return 'Paid · Visa Pending';
  }

  function signIn(firstName, lastName, email) {
    const s = load();
    s.user = { firstName, lastName, email };
    save(s);
    return s.user;
  }

  function signOut() {
    const s = load();
    s.user = null;
    save(s);
  }

  // -------- Session-scoped booking auth (used by visa wizard / manage) ---------
  const SESSION_AUTH_KEY = 'wk_umrah_session_auth';
  function _readSessionAuth() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_AUTH_KEY) || '{}'); }
    catch (e) { return {}; }
  }
  function _writeSessionAuth(map) {
    try { sessionStorage.setItem(SESSION_AUTH_KEY, JSON.stringify(map)); } catch (e) {}
  }
  function setSessionAuth(bookingId) {
    if (!bookingId) return;
    const m = _readSessionAuth();
    m[bookingId] = { at: Date.now() };
    _writeSessionAuth(m);
  }
  function hasSessionAuth(bookingId) {
    if (!bookingId) return false;
    const m = _readSessionAuth();
    return !!m[bookingId];
  }
  function clearSessionAuth(bookingId) {
    const m = _readSessionAuth();
    if (bookingId) delete m[bookingId]; else Object.keys(m).forEach(k => delete m[k]);
    _writeSessionAuth(m);
  }

  global.UmrahPortal = {
    PACKAGES,
    load, save, reset,
    ngn, money,
    findPackage, cartTotal, createBooking,
    findBooking, updateBooking, updateVisa,
    statusLabel, signIn, signOut,
    generateBookingRef,
    setSessionAuth, hasSessionAuth, clearSessionAuth,
    // Pre-qualification API
    TIER1_NATIONALITIES,
    classifyPassengerTier, checkFamilyEligibility,
    initPreQualification, updatePreQualification, updatePreQualPassenger,
    rollUpPreQualStatus, applicationStatusLabel,
    simulateVisaUploadValidation, simulateBankStatementValidation,
    simulatePayslipValidation
  };
})(window);
