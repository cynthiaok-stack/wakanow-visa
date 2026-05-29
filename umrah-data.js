/* Shared data + cart helpers for the Umrah prototype flow */
(function (global) {
  'use strict';

  const TRAVELLER = {
    firstName: 'AISHATU',
    lastName: 'BALA',
    email: 'aishatu.bala@email.com',
    phone: '+234 801 234 5678',
    passport: 'A12345678',
    passportExpiry: '2029-03-15'
  };

  const PACKAGES = [
    {
      id: 'umrah-5d-pilgrim',
      title: '5 Days - Umrah Pilgrim Package',
      type: 'Umrah',
      available: 5,
      dates: '20 March - 25 March, 2026',
      startFrom: 100,
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=75',
      description:
        'Experience the Blessings of Ramadan with a Special Umrah Journey. Embrace the sacred month of Ramadan with a spiritually enriching Umrah experience to the holy cities of Madinah and Makkah. Includes guided visits, comfortable lodging, and a dedicated group leader throughout.',
      inclusions: ['Flight', 'Visa', 'Hotel', 'Transport'],
      highlights: ['Rawdah (Riyadh al-Jannah)', 'Visit Masjid Quba', 'Explore Jabal Thawr']
    },
    {
      id: 'umrah-10d-classic',
      title: '10 Days - Classic Umrah Package',
      type: 'Umrah',
      available: 12,
      dates: '4 April - 14 April, 2026',
      startFrom: 2450000,
      image: 'https://images.unsplash.com/photo-1580418827493-3d8b9e73f9e6?w=600&q=75',
      description:
        'A well-paced 10-day Umrah journey covering both Makkah and Madinah, with ample time for reflection, Ziyarat tours, and daily prayers at Masjid al-Haram and Masjid an-Nabawi.',
      inclusions: ['Flight', 'Visa', 'Hotel', 'Transport', 'Meals'],
      highlights: ['Masjid al-Haram', 'Masjid an-Nabawi', 'Jabal al-Nour & Cave of Hira']
    },
    {
      id: 'umrah-14d-premium',
      title: '14 Days - Premium Umrah Package',
      type: 'Umrah',
      available: 3,
      dates: '10 May - 24 May, 2026',
      startFrom: 3890000,
      image: 'https://images.unsplash.com/photo-1537444961747-2d0aaae5f5e0?w=600&q=75',
      description:
        'Our premium Umrah experience with 5-star lodging steps from the Haram, private transfers, Ziyarat tours of Taif and historical sites, and a dedicated group scholar to guide rites and reflections.',
      inclusions: ['Flight', 'Visa', 'Hotel', 'Transport', 'Meals', 'Scholar Guide'],
      highlights: ['5-star lodging by the Haram', 'Taif Day Trip', 'Private Ziyarat tours']
    }
  ];

  const FLIGHTS = [
    {
      id: 'fl-sv-001',
      airline: 'Saudia',
      code: 'SV 405',
      from: 'LOS',
      fromCity: 'Lagos',
      to: 'JED',
      toCity: 'Jeddah',
      depart: '09:40',
      arrive: '18:20',
      duration: '7h 40m',
      stops: 'Non-stop',
      price: 1185000,
      logo: '🇸🇦'
    },
    {
      id: 'fl-ms-002',
      airline: 'EgyptAir',
      code: 'MS 876',
      from: 'LOS',
      fromCity: 'Lagos',
      to: 'JED',
      toCity: 'Jeddah',
      depart: '22:50',
      arrive: '11:15+1',
      duration: '11h 25m',
      stops: '1 stop · CAI',
      price: 965000,
      logo: '🇪🇬'
    },
    {
      id: 'fl-et-003',
      airline: 'Ethiopian Airlines',
      code: 'ET 901',
      from: 'LOS',
      fromCity: 'Lagos',
      to: 'MED',
      toCity: 'Madinah',
      depart: '14:15',
      arrive: '04:05+1',
      duration: '12h 50m',
      stops: '1 stop · ADD',
      price: 1048000,
      logo: '🇪🇹'
    },
    {
      id: 'fl-sv-004',
      airline: 'Saudia',
      code: 'SV 409',
      from: 'LOS',
      fromCity: 'Lagos',
      to: 'MED',
      toCity: 'Madinah',
      depart: '23:10',
      arrive: '08:40+1',
      duration: '8h 30m',
      stops: 'Non-stop',
      price: 1295000,
      logo: '🇸🇦'
    }
  ];

  const HOTELS = [
    {
      id: 'ht-makkah-hilton',
      city: 'Makkah',
      name: 'Makkah Hilton Towers',
      stars: 5,
      distance: '350 m from Masjid al-Haram',
      rating: 4.7,
      reviews: 2815,
      pricePerNight: 128000,
      amenities: ['Haram view rooms', 'Breakfast included', 'Free Wi-Fi', 'Shuttle to Haram'],
      image: 'linear-gradient(135deg,#1E3138,#0B3A52)',
      required: true
    },
    {
      id: 'ht-makkah-anjum',
      city: 'Makkah',
      name: 'Anjum Hotel Makkah',
      stars: 5,
      distance: '220 m from Masjid al-Haram',
      rating: 4.5,
      reviews: 1932,
      pricePerNight: 142000,
      amenities: ['Haram view rooms', 'Breakfast & Dinner', 'Free Wi-Fi', 'Prayer rooms'],
      image: 'linear-gradient(135deg,#4A4A00,#8A5A0C)',
      required: true
    },
    {
      id: 'ht-madinah-dar',
      city: 'Madinah',
      name: 'Dar Al Taqwa Hotel',
      stars: 5,
      distance: '80 m from Masjid an-Nabawi',
      rating: 4.8,
      reviews: 3104,
      pricePerNight: 115000,
      amenities: ['Rawdah access assist', 'Breakfast included', 'Free Wi-Fi'],
      image: 'linear-gradient(135deg,#0F766E,#14B8A6)',
      required: false
    },
    {
      id: 'ht-madinah-oberoi',
      city: 'Madinah',
      name: 'The Oberoi Madinah',
      stars: 5,
      distance: '300 m from Masjid an-Nabawi',
      rating: 4.6,
      reviews: 1448,
      pricePerNight: 148000,
      amenities: ['Spa', 'Full board', 'Free Wi-Fi', 'Prayer rooms'],
      image: 'linear-gradient(135deg,#7C2D12,#C2410C)',
      required: false
    }
  ];

  const GROUND = [
    {
      id: 'gs-jeddah-transfer',
      name: 'Jeddah Airport → Makkah Private Transfer',
      desc: 'Meet-and-greet at Jeddah airport, air-conditioned vehicle, Haram-area drop-off.',
      price: 45000,
      compulsory: true
    },
    {
      id: 'gs-madinah-transfer',
      name: 'Makkah → Madinah Coach Transfer',
      desc: 'Group coach between Makkah and Madinah hotels, with luggage handling.',
      price: 28000,
      compulsory: true
    },
    {
      id: 'gs-ziyarat-makkah',
      name: 'Makkah Ziyarat Tour',
      desc: 'Half-day guided Ziyarat — Jabal al-Nour, Mina, Arafat, Muzdalifah and more.',
      price: 32000,
      compulsory: true
    },
    {
      id: 'gs-ziyarat-madinah',
      name: 'Madinah Ziyarat Tour',
      desc: 'Half-day tour of Masjid Quba, Masjid al-Qiblatain, Uhud and Seven Mosques.',
      price: 28000,
      compulsory: true
    }
  ];

  const ADDONS = [
    {
      id: 'ad-enrichment',
      name: 'Scholar-led Enrichment Programme',
      category: 'Enrichment',
      desc: 'Daily group sessions on the spiritual rites of Umrah with a dedicated scholar.',
      price: 55000
    },
    {
      id: 'ad-zamzam',
      name: 'Zamzam Water Home Delivery (10L)',
      category: 'Extras',
      desc: '10 litres of Zamzam water shipped to your Nigerian address after your return.',
      price: 18000
    }
  ];

  const CART_KEY = 'wk_umrah_cart_v1';

  function defaultCart() {
    return {
      mode: null,           // 'predefined' | 'custom'
      packageId: null,      // when predefined
      umrahType: null,      // 'basic' | 'plus' (for custom flow)
      search: null,         // { from, to, depart, return, pax, cabin }
      pax: 1,
      flightId: null,
      hotelIds: [],
      hotelNights: {},     // { [hotelId]: number of nights }
      stayDates: null,     // { makkah: {in, out}, other: {city, in, out} } for Umrah Plus
      groundIds: [],
      addonIds: [],
      contact: null,       // { email, phone }
      passengers: [],      // [{ title, firstName, lastName, dob:{d,m,y}, gender, nationality }]
      bookingRef: null,
      paymentStatus: null,
      updatedAt: null
    };
  }

  function getCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return defaultCart();
      return Object.assign(defaultCart(), JSON.parse(raw));
    } catch (e) {
      return defaultCart();
    }
  }

  function saveCart(cart) {
    cart.updatedAt = new Date().toISOString();
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function resetCart() {
    localStorage.removeItem(CART_KEY);
  }

  function ngn(n) {
    if (n == null) return '—';
    return '₦' + Number(n).toLocaleString('en-NG');
  }

  function findPackage(id) { return PACKAGES.find(p => p.id === id) || null; }
  function findFlight(id)  { return FLIGHTS.find(f => f.id === id) || null; }
  function findHotel(id)   { return HOTELS.find(h => h.id === id) || null; }
  function findGround(id)  { return GROUND.find(g => g.id === id) || null; }
  function findAddon(id)   { return ADDONS.find(a => a.id === id) || null; }

  function cartTotal(cart) {
    cart = cart || getCart();
    let total = 0;
    const pax = cart.pax || 1;
    if (cart.mode === 'predefined' && cart.packageId) {
      const p = findPackage(cart.packageId);
      if (p) total += p.startFrom * pax;
    }
    if (cart.flightId) {
      const f = findFlight(cart.flightId);
      if (f) total += f.price * pax;
    }
    (cart.hotelIds || []).forEach(id => {
      const h = findHotel(id);
      if (h) {
        const nights = (cart.hotelNights && cart.hotelNights[id]) || 5;
        total += h.pricePerNight * nights * pax;
      }
    });
    (cart.groundIds || []).forEach(id => {
      const g = findGround(id);
      if (g) total += g.price * pax;
    });
    (cart.addonIds || []).forEach(id => {
      const a = findAddon(id);
      if (a) total += a.price * pax;
    });
    return total;
  }

  function generateBookingRef() {
    return 'WKU-' + Date.now().toString(36).toUpperCase();
  }

  global.UmrahData = {
    TRAVELLER, PACKAGES, FLIGHTS, HOTELS, GROUND, ADDONS,
    getCart, saveCart, resetCart,
    findPackage, findFlight, findHotel, findGround, findAddon,
    cartTotal, ngn, generateBookingRef
  };
})(window);
