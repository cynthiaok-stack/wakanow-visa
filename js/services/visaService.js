'use strict';

angular.module('wakanowVisa')
  .service('VisaService', ['$rootScope', function($rootScope) {
    var svc = this;

    // ── Booking state (persists across steps) ─────────────────────────────────
    svc.booking = {
      country: null,
      departureDate: null,
      returnDate: null,
      selectedTravellers: [],
      documents: {},
      contactEmail: '',
      contactPhone: '',
      paymentStatus: null,
      bookingRef: null
    };

    // ── Saved travellers (like MMT's account travellers) ──────────────────────
    svc.savedTravellers = [
      { id: 1, firstName: 'Adaeze', lastName: 'Okafor', age: 34, gender: 'F', dob: '1990-03-15', passport: 'A12345678', passportExpiry: '2029-03-15', nationality: 'Nigerian' },
      { id: 2, firstName: 'Chukwu', lastName: 'Okafor', age: 7,  gender: 'M', dob: '2018-06-20', passport: 'A87654321', passportExpiry: '2028-06-20', nationality: 'Nigerian' }
    ];

    // ── Countries ──────────────────────────────────────────────────────────────
    svc.countries = [
      {
        code: 'AE', name: 'United Arab Emirates', shortName: 'Dubai / UAE', flag: '🇦🇪',
        heroEmoji: '🏙️', region: 'Middle East', popular: true,
        visaFeeNGN: 85000, serviceFeeNGN: 11500,
        processingDays: '3-4', maxStay: 30,
        visaType: 'E-VISA', visaPlan: '30-Day Single Entry Visa',
        serviceType: 'Normal', validity: '60 Days from issuance date',
        deliveryDays: 5,
        description: 'Apply today and explore the UAE — Dubai, Abu Dhabi, Sharjah & more.',
        whyUs: ['Quick & Easy Process', '100k+ Visas Processed', 'Expert Guidance'],
        process: [
          { icon: '📝', title: 'Start your Visa Application', desc: 'Fill your travel details', docs: ['First and last page of the passport', 'Photo with white background', 'Onward and Return Flight Ticket', 'Accommodation Voucher (if staying at a hotel)', "Host's Tenancy Contract and Emirates ID (if staying with friends/family)"] },
          { icon: '💳', title: 'Pay Online', desc: "You can also upload your documents on MyTrips after booking. Our visa consultant will review them and reach out, if required." },
          { icon: '🏛️', title: 'Application Submission to Immigration', desc: 'Applications with travel dates beyond 30 days are submitted closer to the travel date, as per UAE immigration norms.' },
          { icon: '✅', title: 'Get Visa Decision in 3-4 Working Days', desc: 'Track your visa status on MyTrips & receive your e-Visa on email' }
        ],
        importantInfo: [
          { title: 'Stay with Family or Friends', body: "Applicants must provide a copy of the host's tenancy contract and Emirates ID as proof of accommodation. In case the host owns the property, a copy of the Title Deed is required. For properties in Dubai, the Ejari certificate serves as the official tenancy contract." },
          { title: 'Minors Travel Consent', body: "It is recommended that minors must be accompanied by their parents or a legal guardian. It is mandatory for minors to travel with the parent with whom his/her visa application has been processed." }
        ],
        faqs: [
          { q: 'What is OK to Board?', a: 'OK to Board is required by certain airlines if your passport has an Emigration Check Required stamp. You need to apply for OK to Board around 72 hours before your flight boarding time.' },
          { q: 'Is the OK to Board fee included in the visa application fee?', a: 'This fee is not included in the visa application fees. Wakanow can help with the service at an additional cost.' },
          { q: 'Which destinations can I visit with the UAE visa?', a: 'The UAE visa grants entry to all 7 emirates: Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al-Quwain, Fujairah, and Ras Al Khaimah.' },
          { q: 'Why is the Ejari document required for a UAE visa invitation?', a: 'The Ejari document serves as proof of a valid rental contract, confirming that the sponsor has a legal residence in the UAE.' },
          { q: 'Why is the Emirates ID required by invitee?', a: 'The Emirates ID is needed to verify the identity and legal status of the person inviting you to stay in the UAE.' }
        ],
        documents: [
          { key: 'passport', label: 'Passport', desc: 'Upload your passport copies', slots: ['Passport Front', 'Passport Back'], required: true },
          { key: 'photograph', label: 'Photograph', desc: 'Click a picture or choose an image from your gallery', slots: ['Photo'], required: true },
          { key: 'flight_ticket', label: 'Round Trip Flight Ticket', desc: 'In case of multiple attachments, click "+ ADD" to upload', slots: ['Flight Ticket'], required: true },
          { key: 'proof_of_stay', label: 'Proof of Stay', desc: 'All passenger names must appear on your voucher', slots: ['Hotel Booking / Invitation'], required: true },
          { key: 'visa_form', label: 'Visa Application Form', desc: 'Tap here to finish your visa application form', slots: [], required: false, isForm: true }
        ]
      },
      {
        code: 'SG', name: 'Singapore', shortName: 'Singapore', flag: '🇸🇬',
        heroEmoji: '🏝️', region: 'South East Asia', popular: true,
        visaFeeNGN: 52000, serviceFeeNGN: 8500,
        processingDays: '3-7', maxStay: 30,
        visaType: 'E-VISA', visaPlan: '30-Day Single Entry Visa',
        serviceType: 'Normal', validity: '30 Days from issuance date', deliveryDays: 7,
        description: 'Apply today and experience Singapore — the Lion City.',
        whyUs: ['100% Online Process', '50k+ Visas Processed', 'Fast Processing'],
        process: [
          { icon: '📝', title: 'Start your Visa Application', desc: 'Fill your travel details', docs: ['Valid Passport (min 6 months validity)', 'Passport-size photograph', 'Return flight tickets', 'Hotel bookings'] },
          { icon: '💳', title: 'Pay Online', desc: 'Secure online payment. Documents can be uploaded after booking.' },
          { icon: '🏛️', title: 'Submission to ICA', desc: 'We file your application with the Immigration & Checkpoints Authority.' },
          { icon: '✅', title: 'Get Visa in 3-7 Working Days', desc: 'Receive your e-Visa on your registered email.' }
        ],
        importantInfo: [
          { title: 'Passport Validity', body: 'Your passport must be valid for at least 6 months beyond your intended stay in Singapore.' },
          { title: 'Social Visit Pass', body: 'The Singapore Tourist Visa (SVP) is an e-Visa and does not require a physical stamp on your passport.' }
        ],
        faqs: [
          { q: 'Do I need a visa to visit Singapore?', a: 'Nigerian passport holders require a visa to visit Singapore. Wakanow can process this for you entirely online.' },
          { q: 'How long can I stay in Singapore on a tourist visa?', a: 'You may stay for up to 30 days on a single entry tourist visa.' }
        ],
        documents: [
          { key: 'passport', label: 'Passport', desc: 'Upload your passport copies', slots: ['Passport Front', 'Passport Back'], required: true },
          { key: 'photograph', label: 'Photograph', desc: 'Recent photo, white background', slots: ['Photo'], required: true },
          { key: 'flight_ticket', label: 'Round Trip Flight Ticket', desc: 'Confirmed return flight booking', slots: ['Flight Ticket'], required: true },
          { key: 'hotel', label: 'Hotel Booking', desc: 'Confirmed hotel reservation', slots: ['Hotel Voucher'], required: true }
        ]
      },
      {
        code: 'GB', name: 'United Kingdom', shortName: 'UK', flag: '🇬🇧',
        heroEmoji: '🏰', region: 'Europe', popular: true,
        visaFeeNGN: 250000, serviceFeeNGN: 35000,
        processingDays: '15-21', maxStay: 180,
        visaType: 'STICKER VISA', visaPlan: 'Standard Visitor Visa (6 months)',
        serviceType: 'Normal', validity: '6 months', deliveryDays: 21,
        description: 'Apply for your UK Standard Visitor Visa with expert guidance.',
        whyUs: ['UK Visa Specialists', 'High Approval Rate', 'Document Review Service'],
        process: [
          { icon: '📝', title: 'Start your Visa Application', desc: 'Fill your travel details', docs: ['Valid passport', 'Bank statements (6 months)', 'Employment/sponsorship letter', 'Flight & hotel booking'] },
          { icon: '💳', title: 'Pay & Book Biometrics', desc: 'Pay online and book your biometrics appointment at the UK Visa Application Centre.' },
          { icon: '🏛️', title: 'Attend Biometrics & Submit', desc: 'Visit the VAC to submit documents and biometrics. We guide you throughout.' },
          { icon: '✅', title: 'Receive Decision in 15-21 Working Days', desc: 'Passport returned with visa stamp after approval.' }
        ],
        importantInfo: [
          { title: 'Biometrics Required', body: 'All UK visa applicants must provide biometric data (fingerprints + photo) at a UK Visa Application Centre.' },
          { title: 'Financial Proof', body: 'You must demonstrate sufficient funds to cover your trip. Bank statements for the last 6 months are required.' }
        ],
        faqs: [
          { q: 'Do I need to attend a visa appointment?', a: 'Yes, UK visa applicants must visit a Visa Application Centre to submit biometrics. Wakanow will guide you on the nearest centre and appointment booking.' },
          { q: 'How long is the UK Standard Visitor Visa valid?', a: 'The UK Standard Visitor Visa is typically valid for 6 months and allows multiple entries.' }
        ],
        documents: [
          { key: 'passport', label: 'Passport', desc: 'Current and all old passports', slots: ['Passport Front', 'Previous Passports'], required: true },
          { key: 'photograph', label: 'Photograph', desc: 'UK-spec passport photo', slots: ['Photo'], required: true },
          { key: 'bank_statement', label: 'Bank Statement', desc: 'Last 6 months', slots: ['Statement'], required: true },
          { key: 'flight_ticket', label: 'Flight Booking', desc: 'Confirmed onward & return flights', slots: ['Booking'], required: true },
          { key: 'hotel', label: 'Accommodation Proof', desc: 'Hotel booking or invitation letter', slots: ['Proof'], required: true },
          { key: 'employment', label: 'Employment / Sponsorship Letter', desc: 'Letter from employer or sponsor', slots: ['Letter'], required: true }
        ]
      },
      {
        code: 'US', name: 'United States', shortName: 'USA', flag: '🇺🇸',
        heroEmoji: '🗽', region: 'Americas', popular: true,
        visaFeeNGN: 400000, serviceFeeNGN: 50000,
        processingDays: '60-90', maxStay: 180,
        visaType: 'STICKER VISA', visaPlan: 'B1/B2 Tourist & Business Visa',
        serviceType: 'Normal', validity: '10 years (multiple entry)', deliveryDays: 90,
        description: 'Apply for the US B1/B2 Visa — valid for 10 years.',
        whyUs: ['Interview Preparation', 'DS-160 Assistance', 'Expert Support'],
        process: [
          { icon: '📝', title: 'Complete DS-160 Form', desc: 'Fill your online non-immigrant visa application', docs: ['Valid passport', 'Digital photograph', 'Travel itinerary', 'Financial documents'] },
          { icon: '💳', title: 'Pay MRV Fee & Schedule Interview', desc: 'Pay the Machine Readable Visa fee and book your interview at the US Embassy.' },
          { icon: '🏛️', title: 'Attend Embassy Interview', desc: 'Attend your scheduled interview at the US Embassy. Wakanow provides interview coaching.' },
          { icon: '✅', title: 'Receive Passport with Visa', desc: 'Approved passport returned via courier within the processing timeframe.' }
        ],
        importantInfo: [
          { title: 'Interview Required', body: 'Most US visa applicants aged 14-79 must attend an in-person interview at a US Embassy or Consulate.' },
          { title: 'MRV Fee Non-Refundable', body: 'The Machine Readable Visa (MRV) fee is non-refundable even if the visa is denied.' }
        ],
        faqs: [
          { q: 'How long does a US visa interview take?', a: 'The interview itself is usually brief (2-5 minutes), but you should allow 2-3 hours for the entire appointment due to security checks and waiting.' },
          { q: 'Can I apply for a 10-year US visa?', a: 'Yes, most B1/B2 visas are issued for 10 years with multiple entries, subject to the consular officer\'s discretion.' }
        ],
        documents: [
          { key: 'passport', label: 'Passport', desc: 'Current passport + all old passports', slots: ['Current Passport', 'Old Passports'], required: true },
          { key: 'photograph', label: 'Photograph', desc: 'US visa spec photo (5cm × 5cm)', slots: ['Photo'], required: true },
          { key: 'ds160', label: 'DS-160 Confirmation Page', desc: 'Printed confirmation barcode page', slots: ['DS-160'], required: true },
          { key: 'bank_statement', label: 'Bank Statement', desc: 'Last 6 months', slots: ['Statement'], required: true },
          { key: 'flight_ticket', label: 'Travel Itinerary', desc: 'Intended travel plans', slots: ['Itinerary'], required: false }
        ]
      },
      {
        code: 'TH', name: 'Thailand', shortName: 'Thailand', flag: '🇹🇭',
        heroEmoji: '🏖️', region: 'South East Asia', popular: true,
        visaFeeNGN: 35000, serviceFeeNGN: 6500,
        processingDays: '2-4', maxStay: 60,
        visaType: 'E-VISA', visaPlan: '60-Day Tourist Visa',
        serviceType: 'Normal', validity: '3 months from issuance', deliveryDays: 4,
        description: 'Apply for your Thailand Tourist Visa — beaches, temples & more.',
        whyUs: ['Fast Processing', 'Easy Online Apply', 'Affordable Fees'],
        process: [
          { icon: '📝', title: 'Start your Visa Application', desc: 'Fill your travel details', docs: ['Valid passport', 'Passport photograph', 'Return flight tickets', 'Hotel booking'] },
          { icon: '💳', title: 'Pay Online', desc: 'Secure payment. Upload documents after booking if needed.' },
          { icon: '🏛️', title: 'Submission to Thai Embassy', desc: 'We submit your application to the Royal Thai Embassy.' },
          { icon: '✅', title: 'Get Visa in 2-4 Working Days', desc: 'Receive your Thailand e-Visa by email.' }
        ],
        importantInfo: [
          { title: 'Proof of Onward Travel', body: 'Thai immigration requires proof of onward or return travel. Ensure you have confirmed return tickets.' },
          { title: 'Sufficient Funds', body: 'You should have at least THB 20,000 per person or THB 40,000 per family as proof of funds.' }
        ],
        faqs: [
          { q: 'Can I extend my Thailand visa?', a: 'Yes, you can extend your tourist visa by 30 days at any immigration office in Thailand by paying a fee of THB 1,900.' }
        ],
        documents: [
          { key: 'passport', label: 'Passport', desc: 'Upload your passport copies', slots: ['Passport Front', 'Passport Back'], required: true },
          { key: 'photograph', label: 'Photograph', desc: '4×6cm photo, white background', slots: ['Photo'], required: true },
          { key: 'flight_ticket', label: 'Round Trip Flight Ticket', desc: 'Confirmed return booking', slots: ['Flight Ticket'], required: true },
          { key: 'hotel', label: 'Hotel Booking', desc: 'Confirmed accommodation', slots: ['Booking'], required: true }
        ]
      },
      {
        code: 'KE', name: 'Kenya', shortName: 'Kenya', flag: '🇰🇪',
        heroEmoji: '🦁', region: 'Africa', popular: true,
        visaFeeNGN: 28000, serviceFeeNGN: 5000,
        processingDays: '1-3', maxStay: 90,
        visaType: 'E-VISA', visaPlan: 'Single Entry Tourist Visa',
        serviceType: 'Express', validity: '3 months from issuance', deliveryDays: 3,
        description: 'Apply for Kenya e-Visa — safaris, Nairobi & the Maasai Mara.',
        whyUs: ['Fast e-Visa', 'Africa Specialist', 'Expert Support'],
        process: [
          { icon: '📝', title: 'Start your Application', desc: 'Fill your travel details online', docs: ['Valid passport', 'Passport photograph', 'Return tickets', 'Yellow fever certificate'] },
          { icon: '💳', title: 'Pay Online', desc: 'Secure payment through our portal.' },
          { icon: '🏛️', title: 'Submission to eCitizen Kenya', desc: 'We submit your application on the official Kenya eCitizen portal.' },
          { icon: '✅', title: 'Receive e-Visa in 1-3 Days', desc: 'e-Visa sent to your registered email.' }
        ],
        importantInfo: [
          { title: 'Yellow Fever Certificate', body: 'Nigerian passport holders must present a valid Yellow Fever vaccination certificate upon arrival in Kenya.' }
        ],
        faqs: [
          { q: 'Do Nigerians need a visa for Kenya?', a: 'Yes, Nigerian passport holders require a visa for Kenya. The Kenya e-Visa can be obtained entirely online.' }
        ],
        documents: [
          { key: 'passport', label: 'Passport', desc: 'Upload your passport copies', slots: ['Passport Front', 'Passport Back'], required: true },
          { key: 'photograph', label: 'Photograph', desc: 'Passport-size photo, white background', slots: ['Photo'], required: true },
          { key: 'flight_ticket', label: 'Return Flight Ticket', desc: 'Confirmed return booking', slots: ['Flight Ticket'], required: true },
          { key: 'yellow_fever', label: 'Yellow Fever Certificate', desc: 'Valid YF vaccination card', slots: ['Certificate'], required: true }
        ]
      },
      {
        code: 'ZA', name: 'South Africa', shortName: 'South Africa', flag: '🇿🇦',
        heroEmoji: '🐘', region: 'Africa', popular: false,
        visaFeeNGN: 65000, serviceFeeNGN: 9500,
        processingDays: '7-10', maxStay: 90,
        visaType: 'STICKER VISA', visaPlan: 'Tourist Visa',
        serviceType: 'Normal', validity: '90 days', deliveryDays: 10,
        description: 'Visit South Africa — wildlife, Cape Town & the Garden Route.',
        whyUs: ['Expert Guidance', 'Document Checklist', 'High Approval Rate'],
        process: [
          { icon: '📝', title: 'Fill Application', desc: 'Complete your travel details', docs: ['Valid passport', 'Bank statements', 'Return tickets', 'Hotel booking', 'Yellow fever certificate'] },
          { icon: '💳', title: 'Pay Online', desc: 'Secure payment.' },
          { icon: '🏛️', title: 'Submission to South African Embassy', desc: 'We submit your application to the SA High Commission.' },
          { icon: '✅', title: 'Visa Decision in 7-10 Days', desc: 'Passport returned with visa stamp.' }
        ],
        importantInfo: [
          { title: 'Biometrics at High Commission', body: 'South Africa visa requires submission of biometrics and documents at the South African High Commission in Abuja or Lagos.' }
        ],
        faqs: [
          { q: 'Do Nigerians need a visa for South Africa?', a: 'Yes, Nigerian passport holders require a visa for South Africa. Wakanow can assist with the full application process.' }
        ],
        documents: [
          { key: 'passport', label: 'Passport', desc: 'Upload your passport copies', slots: ['Passport Front', 'Passport Back'], required: true },
          { key: 'photograph', label: 'Photograph', desc: 'SA spec photo', slots: ['Photo'], required: true },
          { key: 'bank_statement', label: 'Bank Statement', desc: 'Last 3 months', slots: ['Statement'], required: true },
          { key: 'flight_ticket', label: 'Flight Booking', desc: 'Return flights', slots: ['Booking'], required: true },
          { key: 'hotel', label: 'Hotel Booking', desc: 'Confirmed accommodation', slots: ['Voucher'], required: true }
        ]
      },
      {
        code: 'CA', name: 'Canada', shortName: 'Canada', flag: '🇨🇦',
        heroEmoji: '🍁', region: 'Americas', popular: false,
        visaFeeNGN: 350000, serviceFeeNGN: 45000,
        processingDays: '30-60', maxStay: 180,
        visaType: 'STICKER VISA', visaPlan: 'Temporary Resident Visa (TRV)',
        serviceType: 'Normal', validity: 'Up to 10 years', deliveryDays: 60,
        description: 'Apply for Canada TRV — explore Toronto, Vancouver & the Rockies.',
        whyUs: ['Canada Visa Experts', 'Document Review', 'High Approval Support'],
        process: [
          { icon: '📝', title: 'Fill Online Application', desc: 'Complete IMM 5257 form online', docs: ['Valid passport', 'Financial documents', 'Invitation letter (if applicable)', 'Travel history'] },
          { icon: '💳', title: 'Pay & Submit Biometrics', desc: 'Pay application fee and submit biometrics at a VAC.' },
          { icon: '🏛️', title: 'IRCC Processing', desc: 'Canada IRCC processes your application. We monitor on your behalf.' },
          { icon: '✅', title: 'Receive TRV', desc: 'e-TRV or sticker visa returned.' }
        ],
        importantInfo: [
          { title: 'Biometrics Required', body: 'Most Canadian visa applicants must provide biometrics at a Visa Application Centre.' }
        ],
        faqs: [
          { q: 'How long does Canada visa processing take for Nigerians?', a: 'Processing times vary but typically range from 30-60 working days for Nigerian applicants.' }
        ],
        documents: [
          { key: 'passport', label: 'Passport', desc: 'Current and old passports', slots: ['Passport Front'], required: true },
          { key: 'photograph', label: 'Photograph', desc: 'Canada-spec photo', slots: ['Photo'], required: true },
          { key: 'bank_statement', label: 'Bank Statement', desc: 'Last 6 months', slots: ['Statement'], required: true },
          { key: 'financial_proof', label: 'Proof of Funds', desc: 'Evidence of financial capability', slots: ['Documents'], required: true }
        ]
      }
    ];

    // ── Methods ────────────────────────────────────────────────────────────────
    svc.getCountry = function(code) {
      return svc.countries.find(function(c) { return c.code === code; }) || null;
    };

    svc.popularCountries = function() {
      return svc.countries.filter(function(c) { return c.popular; });
    };

    svc.formatDates = function() {
      var dep = svc.booking.departureDate;
      var ret = svc.booking.returnDate;
      if (!dep || !ret) return '';
      var d1 = new Date(dep), d2 = new Date(ret);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return d1.getDate() + ' ' + months[d1.getMonth()] + ' - ' + d2.getDate() + ' ' + months[d2.getMonth()];
    };

    svc.getEstimatedDelivery = function(country) {
      var d = new Date();
      d.setDate(d.getDate() + (country ? country.deliveryDays : 7));
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return d.getDate() + ' ' + months[d.getMonth()];
    };

    svc.getDocDeadline = function() {
      var d = new Date();
      d.setDate(d.getDate() + 3);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return d.getDate() + ' ' + months[d.getMonth()];
    };

    svc.calcTotal = function(country, count) {
      if (!country) return 0;
      count = count || 1;
      return (country.visaFeeNGN * count) + country.serviceFeeNGN;
    };

    svc.generateRef = function() {
      return 'WKV-' + Date.now().toString(36).toUpperCase();
    };

    svc.getUploadedCount = function(countryCode) {
      var country = svc.getCountry(countryCode);
      if (!country) return 0;
      return country.documents.filter(function(d) {
        return svc.booking.documents[d.key] && svc.booking.documents[d.key].length > 0;
      }).length;
    };

    svc.isDocComplete = function(docKey) {
      return svc.booking.documents[docKey] && svc.booking.documents[docKey].length > 0;
    };
  }]);
