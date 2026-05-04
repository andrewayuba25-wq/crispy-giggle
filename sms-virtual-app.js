/* ═══════════════════════════════════════════
   DRACO NATION — SMS Virtual App Logic
═══════════════════════════════════════════ */

// ─── AUTH ────────────────────────────────────────────────────────────────────
const ALLOWED_EMAIL = 'AndrewAyuba25@gmail.com';
const AUTH_KEY = 'smsapp_auth';

function attemptLogin() {
  const input = document.getElementById('login-email').value.trim();
  const errEl = document.getElementById('login-error');
  if (input.toLowerCase() === ALLOWED_EMAIL.toLowerCase()) {
    localStorage.setItem(AUTH_KEY, '1');
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    init();
  } else {
    errEl.style.display = 'block';
    setTimeout(() => { errEl.style.display = 'none'; }, 4000);
  }
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  document.getElementById('app').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('login-email').value = '';
  clearInterval(activeCountdownInterval);
  clearInterval(modalCountdownInterval);
}

document.addEventListener('keydown', (e) => {
  if (document.getElementById('login-screen').style.display !== 'none' && e.key === 'Enter') {
    attemptLogin();
  }
});

// ─── 100+ COUNTRIES ───────────────────────────────────────────────────────────
const COUNTRIES = [
  { code: 'US', label: 'United States 🇺🇸', dialCode: '+1', cities: [
    { name: 'New York', areaCode: '212' }, { name: 'Los Angeles', areaCode: '213' },
    { name: 'Chicago', areaCode: '312' }, { name: 'Houston', areaCode: '713' },
    { name: 'Phoenix', areaCode: '602' }, { name: 'Philadelphia', areaCode: '215' },
    { name: 'San Antonio', areaCode: '210' }, { name: 'San Diego', areaCode: '619' },
    { name: 'Dallas', areaCode: '214' }, { name: 'San Jose', areaCode: '408' },
    { name: 'Austin', areaCode: '512' }, { name: 'Jacksonville', areaCode: '904' },
    { name: 'Miami', areaCode: '305' }, { name: 'Seattle', areaCode: '206' }
  ]},
  { code: 'GB', label: 'United Kingdom 🇬🇧', dialCode: '+44', cities: [
    { name: 'London', areaCode: '020' }, { name: 'Manchester', areaCode: '0161' },
    { name: 'Birmingham', areaCode: '0121' }, { name: 'Leeds', areaCode: '0113' },
    { name: 'Glasgow', areaCode: '0141' }, { name: 'Liverpool', areaCode: '0151' },
    { name: 'Bristol', areaCode: '0117' }, { name: 'Edinburgh', areaCode: '0131' }
  ]},
  { code: 'CA', label: 'Canada 🇨🇦', dialCode: '+1', cities: [
    { name: 'Toronto', areaCode: '416' }, { name: 'Vancouver', areaCode: '604' },
    { name: 'Montreal', areaCode: '514' }, { name: 'Calgary', areaCode: '403' },
    { name: 'Ottawa', areaCode: '613' }, { name: 'Edmonton', areaCode: '780' },
    { name: 'Winnipeg', areaCode: '204' }, { name: 'Quebec City', areaCode: '418' }
  ]},
  { code: 'CN', label: 'China 🇨🇳', dialCode: '+86', cities: [
    { name: 'Beijing', areaCode: '010' }, { name: 'Shanghai', areaCode: '021' },
    { name: 'Guangzhou', areaCode: '020' }, { name: 'Shenzhen', areaCode: '0755' },
    { name: 'Chengdu', areaCode: '028' }, { name: 'Hangzhou', areaCode: '0571' },
    { name: 'Wuhan', areaCode: '027' }, { name: "Xi'an", areaCode: '029' },
    { name: 'Nanjing', areaCode: '025' }, { name: 'Tianjin', areaCode: '022' }
  ]},
  { code: 'IN', label: 'India 🇮🇳', dialCode: '+91', cities: [
    { name: 'Mumbai', areaCode: '022' }, { name: 'Delhi', areaCode: '011' },
    { name: 'Bangalore', areaCode: '080' }, { name: 'Hyderabad', areaCode: '040' },
    { name: 'Chennai', areaCode: '044' }, { name: 'Kolkata', areaCode: '033' },
    { name: 'Pune', areaCode: '020' }, { name: 'Ahmedabad', areaCode: '079' }
  ]},
  { code: 'DE', label: 'Germany 🇩🇪', dialCode: '+49', cities: [
    { name: 'Berlin', areaCode: '030' }, { name: 'Munich', areaCode: '089' },
    { name: 'Hamburg', areaCode: '040' }, { name: 'Frankfurt', areaCode: '069' },
    { name: 'Cologne', areaCode: '0221' }
  ]},
  { code: 'FR', label: 'France 🇫🇷', dialCode: '+33', cities: [
    { name: 'Paris', areaCode: '01' }, { name: 'Lyon', areaCode: '04' },
    { name: 'Marseille', areaCode: '04' }, { name: 'Toulouse', areaCode: '05' },
    { name: 'Bordeaux', areaCode: '05' }
  ]},
  { code: 'JP', label: 'Japan 🇯🇵', dialCode: '+81', cities: [
    { name: 'Tokyo', areaCode: '03' }, { name: 'Osaka', areaCode: '06' },
    { name: 'Yokohama', areaCode: '045' }, { name: 'Nagoya', areaCode: '052' },
    { name: 'Sapporo', areaCode: '011' }
  ]},
  { code: 'AU', label: 'Australia 🇦🇺', dialCode: '+61', cities: [
    { name: 'Sydney', areaCode: '02' }, { name: 'Melbourne', areaCode: '03' },
    { name: 'Brisbane', areaCode: '07' }, { name: 'Perth', areaCode: '08' },
    { name: 'Adelaide', areaCode: '08' }
  ]},
  { code: 'BR', label: 'Brazil 🇧🇷', dialCode: '+55', cities: [
    { name: 'São Paulo', areaCode: '011' }, { name: 'Rio de Janeiro', areaCode: '021' },
    { name: 'Brasília', areaCode: '061' }, { name: 'Salvador', areaCode: '071' },
    { name: 'Fortaleza', areaCode: '085' }
  ]},
  { code: 'KR', label: 'South Korea 🇰🇷', dialCode: '+82', cities: [
    { name: 'Seoul', areaCode: '02' }, { name: 'Busan', areaCode: '051' }, { name: 'Incheon', areaCode: '032' }
  ]},
  { code: 'MX', label: 'Mexico 🇲🇽', dialCode: '+52', cities: [
    { name: 'Mexico City', areaCode: '55' }, { name: 'Guadalajara', areaCode: '33' }, { name: 'Monterrey', areaCode: '81' }
  ]},
  { code: 'IT', label: 'Italy 🇮🇹', dialCode: '+39', cities: [
    { name: 'Rome', areaCode: '06' }, { name: 'Milan', areaCode: '02' }, { name: 'Naples', areaCode: '081' }
  ]},
  { code: 'ES', label: 'Spain 🇪🇸', dialCode: '+34', cities: [
    { name: 'Madrid', areaCode: '91' }, { name: 'Barcelona', areaCode: '93' }, { name: 'Valencia', areaCode: '96' }
  ]},
  { code: 'RU', label: 'Russia 🇷🇺', dialCode: '+7', cities: [
    { name: 'Moscow', areaCode: '495' }, { name: 'Saint Petersburg', areaCode: '812' }, { name: 'Novosibirsk', areaCode: '383' }
  ]},
  { code: 'NL', label: 'Netherlands 🇳🇱', dialCode: '+31', cities: [
    { name: 'Amsterdam', areaCode: '020' }, { name: 'Rotterdam', areaCode: '010' }, { name: 'The Hague', areaCode: '070' }
  ]},
  { code: 'SE', label: 'Sweden 🇸🇪', dialCode: '+46', cities: [
    { name: 'Stockholm', areaCode: '08' }, { name: 'Gothenburg', areaCode: '031' }, { name: 'Malmö', areaCode: '040' }
  ]},
  { code: 'CH', label: 'Switzerland 🇨🇭', dialCode: '+41', cities: [
    { name: 'Zurich', areaCode: '044' }, { name: 'Geneva', areaCode: '022' }, { name: 'Bern', areaCode: '031' }
  ]},
  { code: 'NO', label: 'Norway 🇳🇴', dialCode: '+47', cities: [
    { name: 'Oslo', areaCode: '21' }, { name: 'Bergen', areaCode: '55' }, { name: 'Trondheim', areaCode: '72' }
  ]},
  { code: 'DK', label: 'Denmark 🇩🇰', dialCode: '+45', cities: [
    { name: 'Copenhagen', areaCode: '33' }, { name: 'Aarhus', areaCode: '86' }
  ]},
  { code: 'FI', label: 'Finland 🇫🇮', dialCode: '+358', cities: [
    { name: 'Helsinki', areaCode: '09' }, { name: 'Espoo', areaCode: '09' }, { name: 'Tampere', areaCode: '03' }
  ]},
  { code: 'PL', label: 'Poland 🇵🇱', dialCode: '+48', cities: [
    { name: 'Warsaw', areaCode: '022' }, { name: 'Kraków', areaCode: '012' }, { name: 'Gdańsk', areaCode: '058' }
  ]},
  { code: 'BE', label: 'Belgium 🇧🇪', dialCode: '+32', cities: [
    { name: 'Brussels', areaCode: '02' }, { name: 'Antwerp', areaCode: '03' }, { name: 'Ghent', areaCode: '09' }
  ]},
  { code: 'AT', label: 'Austria 🇦🇹', dialCode: '+43', cities: [
    { name: 'Vienna', areaCode: '01' }, { name: 'Graz', areaCode: '0316' }, { name: 'Linz', areaCode: '0732' }
  ]},
  { code: 'PT', label: 'Portugal 🇵🇹', dialCode: '+351', cities: [
    { name: 'Lisbon', areaCode: '21' }, { name: 'Porto', areaCode: '22' }
  ]},
  { code: 'GR', label: 'Greece 🇬🇷', dialCode: '+30', cities: [
    { name: 'Athens', areaCode: '210' }, { name: 'Thessaloniki', areaCode: '2310' }
  ]},
  { code: 'TR', label: 'Turkey 🇹🇷', dialCode: '+90', cities: [
    { name: 'Istanbul', areaCode: '0212' }, { name: 'Ankara', areaCode: '0312' }, { name: 'Izmir', areaCode: '0232' }
  ]},
  { code: 'AE', label: 'UAE 🇦🇪', dialCode: '+971', cities: [
    { name: 'Dubai', areaCode: '04' }, { name: 'Abu Dhabi', areaCode: '02' }, { name: 'Sharjah', areaCode: '06' }
  ]},
  { code: 'SA', label: 'Saudi Arabia 🇸🇦', dialCode: '+966', cities: [
    { name: 'Riyadh', areaCode: '011' }, { name: 'Jeddah', areaCode: '012' }, { name: 'Mecca', areaCode: '012' }
  ]},
  { code: 'EG', label: 'Egypt 🇪🇬', dialCode: '+20', cities: [
    { name: 'Cairo', areaCode: '02' }, { name: 'Alexandria', areaCode: '03' }
  ]},
  { code: 'ZA', label: 'South Africa 🇿🇦', dialCode: '+27', cities: [
    { name: 'Johannesburg', areaCode: '011' }, { name: 'Cape Town', areaCode: '021' }, { name: 'Durban', areaCode: '031' }
  ]},
  { code: 'NG', label: 'Nigeria 🇳🇬', dialCode: '+234', cities: [
    { name: 'Lagos', areaCode: '01' }, { name: 'Abuja', areaCode: '09' }, { name: 'Kano', areaCode: '064' }
  ]},
  { code: 'KE', label: 'Kenya 🇰🇪', dialCode: '+254', cities: [
    { name: 'Nairobi', areaCode: '020' }, { name: 'Mombasa', areaCode: '041' }
  ]},
  { code: 'GH', label: 'Ghana 🇬🇭', dialCode: '+233', cities: [
    { name: 'Accra', areaCode: '030' }, { name: 'Kumasi', areaCode: '032' }
  ]},
  { code: 'PK', label: 'Pakistan 🇵🇰', dialCode: '+92', cities: [
    { name: 'Karachi', areaCode: '021' }, { name: 'Lahore', areaCode: '042' }, { name: 'Islamabad', areaCode: '051' }
  ]},
  { code: 'BD', label: 'Bangladesh 🇧🇩', dialCode: '+880', cities: [
    { name: 'Dhaka', areaCode: '02' }, { name: 'Chittagong', areaCode: '031' }
  ]},
  { code: 'ID', label: 'Indonesia 🇮🇩', dialCode: '+62', cities: [
    { name: 'Jakarta', areaCode: '021' }, { name: 'Surabaya', areaCode: '031' }, { name: 'Bandung', areaCode: '022' }
  ]},
  { code: 'VN', label: 'Vietnam 🇻🇳', dialCode: '+84', cities: [
    { name: 'Ho Chi Minh City', areaCode: '028' }, { name: 'Hanoi', areaCode: '024' }
  ]},
  { code: 'PH', label: 'Philippines 🇵🇭', dialCode: '+63', cities: [
    { name: 'Manila', areaCode: '02' }, { name: 'Cebu City', areaCode: '032' }, { name: 'Davao', areaCode: '082' }
  ]},
  { code: 'TH', label: 'Thailand 🇹🇭', dialCode: '+66', cities: [
    { name: 'Bangkok', areaCode: '02' }, { name: 'Chiang Mai', areaCode: '053' }
  ]},
  { code: 'MY', label: 'Malaysia 🇲🇾', dialCode: '+60', cities: [
    { name: 'Kuala Lumpur', areaCode: '03' }, { name: 'Penang', areaCode: '04' }, { name: 'Johor Bahru', areaCode: '07' }
  ]},
  { code: 'SG', label: 'Singapore 🇸🇬', dialCode: '+65', cities: [
    { name: 'Singapore', areaCode: '6' }
  ]},
  { code: 'HK', label: 'Hong Kong 🇭🇰', dialCode: '+852', cities: [
    { name: 'Hong Kong', areaCode: '2' }
  ]},
  { code: 'TW', label: 'Taiwan 🇹🇼', dialCode: '+886', cities: [
    { name: 'Taipei', areaCode: '02' }, { name: 'Kaohsiung', areaCode: '07' }
  ]},
  { code: 'NZ', label: 'New Zealand 🇳🇿', dialCode: '+64', cities: [
    { name: 'Auckland', areaCode: '09' }, { name: 'Wellington', areaCode: '04' }, { name: 'Christchurch', areaCode: '03' }
  ]},
  { code: 'AR', label: 'Argentina 🇦🇷', dialCode: '+54', cities: [
    { name: 'Buenos Aires', areaCode: '011' }, { name: 'Córdoba', areaCode: '0351' }
  ]},
  { code: 'CO', label: 'Colombia 🇨🇴', dialCode: '+57', cities: [
    { name: 'Bogotá', areaCode: '01' }, { name: 'Medellín', areaCode: '04' }, { name: 'Cali', areaCode: '02' }
  ]},
  { code: 'CL', label: 'Chile 🇨🇱', dialCode: '+56', cities: [
    { name: 'Santiago', areaCode: '02' }, { name: 'Valparaíso', areaCode: '032' }
  ]},
  { code: 'PE', label: 'Peru 🇵🇪', dialCode: '+51', cities: [
    { name: 'Lima', areaCode: '01' }, { name: 'Arequipa', areaCode: '054' }
  ]},
  { code: 'VE', label: 'Venezuela 🇻🇪', dialCode: '+58', cities: [
    { name: 'Caracas', areaCode: '0212' }, { name: 'Maracaibo', areaCode: '0261' }
  ]},
  { code: 'RO', label: 'Romania 🇷🇴', dialCode: '+40', cities: [
    { name: 'Bucharest', areaCode: '021' }, { name: 'Cluj-Napoca', areaCode: '0264' }
  ]},
  { code: 'HU', label: 'Hungary 🇭🇺', dialCode: '+36', cities: [
    { name: 'Budapest', areaCode: '01' }, { name: 'Debrecen', areaCode: '052' }
  ]},
  { code: 'CZ', label: 'Czech Republic 🇨🇿', dialCode: '+420', cities: [
    { name: 'Prague', areaCode: '02' }, { name: 'Brno', areaCode: '05' }
  ]},
  { code: 'UA', label: 'Ukraine 🇺🇦', dialCode: '+380', cities: [
    { name: 'Kyiv', areaCode: '044' }, { name: 'Kharkiv', areaCode: '057' }, { name: 'Odesa', areaCode: '048' }
  ]},
  { code: 'BG', label: 'Bulgaria 🇧🇬', dialCode: '+359', cities: [
    { name: 'Sofia', areaCode: '02' }, { name: 'Plovdiv', areaCode: '032' }
  ]},
  { code: 'LV', label: 'Latvia 🇱🇻', dialCode: '+371', cities: [
    { name: 'Riga', areaCode: '67' }
  ]},
  { code: 'LT', label: 'Lithuania 🇱🇹', dialCode: '+370', cities: [
    { name: 'Vilnius', areaCode: '05' }, { name: 'Kaunas', areaCode: '037' }
  ]},
  { code: 'EE', label: 'Estonia 🇪🇪', dialCode: '+372', cities: [
    { name: 'Tallinn', areaCode: '6' }
  ]},
  { code: 'KZ', label: 'Kazakhstan 🇰🇿', dialCode: '+7', cities: [
    { name: 'Almaty', areaCode: '7272' }, { name: 'Astana', areaCode: '7172' }
  ]},
  { code: 'UZ', label: 'Uzbekistan 🇺🇿', dialCode: '+998', cities: [
    { name: 'Tashkent', areaCode: '71' }, { name: 'Samarkand', areaCode: '66' }
  ]},
  { code: 'AZ', label: 'Azerbaijan 🇦🇿', dialCode: '+994', cities: [
    { name: 'Baku', areaCode: '012' }
  ]},
  { code: 'GE', label: 'Georgia 🇬🇪', dialCode: '+995', cities: [
    { name: 'Tbilisi', areaCode: '032' }
  ]},
  { code: 'AM', label: 'Armenia 🇦🇲', dialCode: '+374', cities: [
    { name: 'Yerevan', areaCode: '010' }
  ]},
  { code: 'LB', label: 'Lebanon 🇱🇧', dialCode: '+961', cities: [
    { name: 'Beirut', areaCode: '01' }
  ]},
  { code: 'IL', label: 'Israel 🇮🇱', dialCode: '+972', cities: [
    { name: 'Tel Aviv', areaCode: '03' }, { name: 'Jerusalem', areaCode: '02' }
  ]},
  { code: 'JO', label: 'Jordan 🇯🇴', dialCode: '+962', cities: [
    { name: 'Amman', areaCode: '06' }
  ]},
  { code: 'IQ', label: 'Iraq 🇮🇶', dialCode: '+964', cities: [
    { name: 'Baghdad', areaCode: '01' }, { name: 'Basra', areaCode: '040' }
  ]},
  { code: 'IR', label: 'Iran 🇮🇷', dialCode: '+98', cities: [
    { name: 'Tehran', areaCode: '021' }, { name: 'Isfahan', areaCode: '031' }
  ]},
  { code: 'KW', label: 'Kuwait 🇰🇼', dialCode: '+965', cities: [
    { name: 'Kuwait City', areaCode: '2' }
  ]},
  { code: 'QA', label: 'Qatar 🇶🇦', dialCode: '+974', cities: [
    { name: 'Doha', areaCode: '4' }
  ]},
  { code: 'BH', label: 'Bahrain 🇧🇭', dialCode: '+973', cities: [
    { name: 'Manama', areaCode: '17' }
  ]},
  { code: 'OM', label: 'Oman 🇴🇲', dialCode: '+968', cities: [
    { name: 'Muscat', areaCode: '24' }
  ]},
  { code: 'MA', label: 'Morocco 🇲🇦', dialCode: '+212', cities: [
    { name: 'Casablanca', areaCode: '0522' }, { name: 'Rabat', areaCode: '0537' }
  ]},
  { code: 'TN', label: 'Tunisia 🇹🇳', dialCode: '+216', cities: [
    { name: 'Tunis', areaCode: '71' }
  ]},
  { code: 'DZ', label: 'Algeria 🇩🇿', dialCode: '+213', cities: [
    { name: 'Algiers', areaCode: '021' }, { name: 'Oran', areaCode: '041' }
  ]},
  { code: 'ET', label: 'Ethiopia 🇪🇹', dialCode: '+251', cities: [
    { name: 'Addis Ababa', areaCode: '011' }
  ]},
  { code: 'TZ', label: 'Tanzania 🇹🇿', dialCode: '+255', cities: [
    { name: 'Dar es Salaam', areaCode: '022' }
  ]},
  { code: 'UG', label: 'Uganda 🇺🇬', dialCode: '+256', cities: [
    { name: 'Kampala', areaCode: '041' }
  ]},
  { code: 'RW', label: 'Rwanda 🇷🇼', dialCode: '+250', cities: [
    { name: 'Kigali', areaCode: '0252' }
  ]},
  { code: 'CM', label: 'Cameroon 🇨🇲', dialCode: '+237', cities: [
    { name: 'Yaoundé', areaCode: '222' }, { name: 'Douala', areaCode: '233' }
  ]},
  { code: 'CI', label: 'Ivory Coast 🇨🇮', dialCode: '+225', cities: [
    { name: 'Abidjan', areaCode: '21' }
  ]},
  { code: 'SN', label: 'Senegal 🇸🇳', dialCode: '+221', cities: [
    { name: 'Dakar', areaCode: '33' }
  ]},
  { code: 'ZW', label: 'Zimbabwe 🇿🇼', dialCode: '+263', cities: [
    { name: 'Harare', areaCode: '024' }
  ]},
  { code: 'LK', label: 'Sri Lanka 🇱🇰', dialCode: '+94', cities: [
    { name: 'Colombo', areaCode: '011' }
  ]},
  { code: 'NP', label: 'Nepal 🇳🇵', dialCode: '+977', cities: [
    { name: 'Kathmandu', areaCode: '01' }
  ]},
  { code: 'MM', label: 'Myanmar 🇲🇲', dialCode: '+95', cities: [
    { name: 'Yangon', areaCode: '01' }, { name: 'Mandalay', areaCode: '02' }
  ]},
  { code: 'KH', label: 'Cambodia 🇰🇭', dialCode: '+855', cities: [
    { name: 'Phnom Penh', areaCode: '023' }
  ]},
  { code: 'MN', label: 'Mongolia 🇲🇳', dialCode: '+976', cities: [
    { name: 'Ulaanbaatar', areaCode: '11' }
  ]},
  { code: 'CU', label: 'Cuba 🇨🇺', dialCode: '+53', cities: [
    { name: 'Havana', areaCode: '07' }
  ]},
  { code: 'DO', label: 'Dominican Republic 🇩🇴', dialCode: '+1', cities: [
    { name: 'Santo Domingo', areaCode: '809' }
  ]},
  { code: 'JM', label: 'Jamaica 🇯🇲', dialCode: '+1', cities: [
    { name: 'Kingston', areaCode: '876' }
  ]},
  { code: 'GT', label: 'Guatemala 🇬🇹', dialCode: '+502', cities: [
    { name: 'Guatemala City', areaCode: '2' }
  ]},
  { code: 'CR', label: 'Costa Rica 🇨🇷', dialCode: '+506', cities: [
    { name: 'San José', areaCode: '2' }
  ]},
  { code: 'PA', label: 'Panama 🇵🇦', dialCode: '+507', cities: [
    { name: 'Panama City', areaCode: '2' }
  ]},
  { code: 'IE', label: 'Ireland 🇮🇪', dialCode: '+353', cities: [
    { name: 'Dublin', areaCode: '01' }, { name: 'Cork', areaCode: '021' }
  ]},
  { code: 'IS', label: 'Iceland 🇮🇸', dialCode: '+354', cities: [
    { name: 'Reykjavik', areaCode: '5' }
  ]},
  { code: 'LU', label: 'Luxembourg 🇱🇺', dialCode: '+352', cities: [
    { name: 'Luxembourg City', areaCode: '47' }
  ]},
  { code: 'MT', label: 'Malta 🇲🇹', dialCode: '+356', cities: [
    { name: 'Valletta', areaCode: '21' }
  ]},
  { code: 'CY', label: 'Cyprus 🇨🇾', dialCode: '+357', cities: [
    { name: 'Nicosia', areaCode: '22' }, { name: 'Limassol', areaCode: '25' }
  ]},
  { code: 'MD', label: 'Moldova 🇲🇩', dialCode: '+373', cities: [
    { name: 'Chișinău', areaCode: '022' }
  ]},
  { code: 'BY', label: 'Belarus 🇧🇾', dialCode: '+375', cities: [
    { name: 'Minsk', areaCode: '017' }
  ]},
  { code: 'RS', label: 'Serbia 🇷🇸', dialCode: '+381', cities: [
    { name: 'Belgrade', areaCode: '011' }
  ]},
  { code: 'HR', label: 'Croatia 🇭🇷', dialCode: '+385', cities: [
    { name: 'Zagreb', areaCode: '01' }, { name: 'Split', areaCode: '021' }
  ]},
  { code: 'SK', label: 'Slovakia 🇸🇰', dialCode: '+421', cities: [
    { name: 'Bratislava', areaCode: '02' }
  ]},
  { code: 'BO', label: 'Bolivia 🇧🇴', dialCode: '+591', cities: [
    { name: 'La Paz', areaCode: '02' }, { name: 'Santa Cruz', areaCode: '03' }
  ]},
  { code: 'EC', label: 'Ecuador 🇪🇨', dialCode: '+593', cities: [
    { name: 'Quito', areaCode: '02' }, { name: 'Guayaquil', areaCode: '04' }
  ]},
  { code: 'PY', label: 'Paraguay 🇵🇾', dialCode: '+595', cities: [
    { name: 'Asunción', areaCode: '021' }
  ]},
  { code: 'UY', label: 'Uruguay 🇺🇾', dialCode: '+598', cities: [
    { name: 'Montevideo', areaCode: '02' }
  ]},
  { code: 'ZM', label: 'Zambia 🇿🇲', dialCode: '+260', cities: [
    { name: 'Lusaka', areaCode: '021' }
  ]},
  { code: 'MZ', label: 'Mozambique 🇲🇿', dialCode: '+258', cities: [
    { name: 'Maputo', areaCode: '21' }
  ]},
  { code: 'LA', label: 'Laos 🇱🇦', dialCode: '+856', cities: [
    { name: 'Vientiane', areaCode: '021' }
  ]},
  { code: 'HN', label: 'Honduras 🇭🇳', dialCode: '+504', cities: [
    { name: 'Tegucigalpa', areaCode: '22' }
  ]},
  { code: 'SV', label: 'El Salvador 🇸🇻', dialCode: '+503', cities: [
    { name: 'San Salvador', areaCode: '22' }
  ]},
  { code: 'NI', label: 'Nicaragua 🇳🇮', dialCode: '+505', cities: [
    { name: 'Managua', areaCode: '22' }
  ]},
  { code: 'TT', label: 'Trinidad & Tobago 🇹🇹', dialCode: '+1', cities: [
    { name: 'Port of Spain', areaCode: '868' }
  ]}
];

// ─── PLATFORMS ───────────────────────────────────────────────────────────────
const PLATFORMS = [
  { id: 'facebook',   name: 'Facebook',   icon: '📘' },
  { id: 'twitter',    name: 'Twitter / X', icon: '🐦' },
  { id: 'instagram',  name: 'Instagram',   icon: '📸' },
  { id: 'whatsapp',   name: 'WhatsApp',    icon: '💬' },
  { id: 'youtube',    name: 'YouTube',     icon: '▶️' },
  { id: 'gmail',      name: 'Gmail',       icon: '📧' },
  { id: 'telegram',   name: 'Telegram',    icon: '✈️' },
  { id: 'linkedin',   name: 'LinkedIn',    icon: '💼' },
  { id: 'discord',    name: 'Discord',     icon: '🎮' },
  { id: 'reddit',     name: 'Reddit',      icon: '🤖' },
  { id: 'snapchat',   name: 'Snapchat',    icon: '👻' },
  { id: 'twitch',     name: 'Twitch',      icon: '🟣' },
];

// ─── STATE ───────────────────────────────────────────────────────────────────
const KEYS = {
  numbers:       'smsapp_numbers',
  verifications: 'smsapp_verifications',
  messages:      'smsapp_messages',
};

const state = { numbers: [], verifications: [], messages: [] };

function loadState() {
  try { state.numbers       = JSON.parse(localStorage.getItem(KEYS.numbers))       || []; } catch { state.numbers       = []; }
  try { state.verifications = JSON.parse(localStorage.getItem(KEYS.verifications)) || []; } catch { state.verifications = []; }
  try { state.messages      = JSON.parse(localStorage.getItem(KEYS.messages))      || []; } catch { state.messages      = []; }
}

function saveNumbers()       { localStorage.setItem(KEYS.numbers,       JSON.stringify(state.numbers));       }
function saveVerifications() { localStorage.setItem(KEYS.verifications, JSON.stringify(state.verifications)); }
function saveMessages()      { localStorage.setItem(KEYS.messages,      JSON.stringify(state.messages));      }

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

// ─── TABS ────────────────────────────────────────────────────────────────────
function switchTab(id) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('panel-' + id).classList.add('active');
  document.getElementById('tab-btn-' + id).classList.add('active');
  if (id === 'dashboard')  renderDashboard();
  if (id === 'verify')     { refreshNumberDropdowns(); renderVerificationHistory(); }
  if (id === 'social')     renderPlatforms();
  if (id === 'messages')   renderMessages();
  if (id === 'numbers')    renderSavedNumbers();
}

// ─── COUNTRY / CITY SELECTORS ────────────────────────────────────────────────
function populateCountrySelect() {
  const sel = document.getElementById('select-country');
  sel.innerHTML = '<option value="">— Select Country —</option>';
  COUNTRIES.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.code;
    opt.textContent = c.label;
    sel.appendChild(opt);
  });
}

function populateCitySelect(countryCode) {
  const sel = document.getElementById('select-city');
  sel.innerHTML = '<option value="">— Select City —</option>';
  if (!countryCode) return;
  const country = COUNTRIES.find(c => c.code === countryCode);
  if (!country) return;
  country.cities.forEach(city => {
    const opt = document.createElement('option');
    opt.value = city.areaCode;
    opt.dataset.name = city.name;
    opt.textContent = `${city.name} (${country.dialCode} ${city.areaCode})`;
    sel.appendChild(opt);
  });
  // hide stale preview
  document.getElementById('number-preview').style.display = 'none';
  document.getElementById('btn-save-number').style.display = 'none';
  document.getElementById('btn-copy-number').style.display = 'none';
}

// ─── GENERATE NUMBER ────────────────────────────────────────────────────────
let currentGeneratedNumber = null;
let currentGeneratedMeta   = null;

function rand7() {
  return String(Math.floor(1000000 + Math.random() * 9000000));
}

function generateNumber() {
  const countryCode = document.getElementById('select-country').value;
  const citySelect  = document.getElementById('select-city');
  const areaCode    = citySelect.value;

  if (!countryCode) { showToast('Please select a country first.', 'error'); return; }
  if (!areaCode)    { showToast('Please select a city first.',    'error'); return; }

  const country  = COUNTRIES.find(c => c.code === countryCode);
  const cityOpt  = citySelect.options[citySelect.selectedIndex];
  const cityName = cityOpt.dataset.name || cityOpt.textContent.split(' (')[0];
  const num      = `${country.dialCode} ${areaCode}-${rand7().slice(0, 3)}-${rand7().slice(0, 4)}`;

  currentGeneratedNumber = num;
  currentGeneratedMeta   = { country: countryCode, countryLabel: country.label, city: cityName, areaCode, dialCode: country.dialCode };

  document.getElementById('preview-number-val').textContent = num;
  document.getElementById('number-preview').style.display   = 'flex';
  document.getElementById('btn-save-number').style.display  = 'inline-flex';
  document.getElementById('btn-copy-number').style.display  = 'inline-flex';
}

function saveNumber() {
  if (!currentGeneratedNumber) return;
  if (state.numbers.some(n => n.number === currentGeneratedNumber)) {
    showToast('This number is already saved.', 'info'); return;
  }
  const entry = {
    id: uid(),
    number: currentGeneratedNumber,
    ...currentGeneratedMeta,
    createdAt: new Date().toISOString(),
  };
  state.numbers.push(entry);
  saveNumbers();
  renderSavedNumbers();
  refreshNumberDropdowns();
  renderDashboard();
  showToast('Number saved! ✓', 'success');
  document.getElementById('btn-save-number').style.display = 'none';
}

function copyNumber() {
  if (!currentGeneratedNumber) return;
  navigator.clipboard.writeText(currentGeneratedNumber).then(() => showToast('Copied to clipboard!', 'info'));
}

function deleteNumber(id) {
  state.numbers = state.numbers.filter(n => n.id !== id);
  saveNumbers();
  renderSavedNumbers();
  refreshNumberDropdowns();
  renderDashboard();
  showToast('Number deleted.', 'info');
}

function renderSavedNumbers() {
  const container = document.getElementById('saved-numbers-list');
  document.getElementById('saved-count').textContent = state.numbers.length;
  if (!state.numbers.length) {
    container.innerHTML = '<div class="empty-state">No numbers saved yet. Generate one above!</div>';
    return;
  }
  container.innerHTML = '';
  [...state.numbers].reverse().forEach(n => {
    const div = document.createElement('div');
    div.className = 'saved-number-item';
    div.innerHTML = `
      <div class="saved-number-info">
        <span class="saved-number-val">${n.number}</span>
        <span class="saved-number-meta">${n.countryLabel} · ${n.city} · Saved ${fmtDate(n.createdAt)}</span>
      </div>
      <div class="saved-number-actions">
        <button class="btn btn-ghost btn-sm" onclick="navigator.clipboard.writeText('${n.number}').then(()=>showToast('Copied!','info'))">Copy</button>
        <button class="btn btn-danger btn-sm" onclick="deleteNumber('${n.id}')">Delete</button>
      </div>`;
    container.appendChild(div);
  });
}

// ─── VERIFICATION ────────────────────────────────────────────────────────────
let activeCountdownInterval = null;
let activeVerificationId    = null;

function refreshNumberDropdowns() {
  ['verify-number-select', 'modal-number-select'].forEach(selId => {
    const sel = document.getElementById(selId);
    if (!sel) return;
    const prev = sel.value;
    sel.innerHTML = '<option value="">— Select a saved number —</option>';
    state.numbers.forEach(n => {
      const opt = document.createElement('option');
      opt.value = n.id;
      opt.textContent = `${n.number} (${n.city})`;
      sel.appendChild(opt);
    });
    if (prev) sel.value = prev;
  });
}

function requestCode() {
  const numberId = document.getElementById('verify-number-select').value;
  const platform = document.getElementById('verify-platform-input').value.trim() || 'General';
  if (!numberId) { showToast('Please select a number first.', 'error'); return; }
  const numObj = state.numbers.find(n => n.id === numberId);
  if (!numObj) return;

  clearInterval(activeCountdownInterval);
  const code = generateCode();
  const now  = new Date().toISOString();

  const verification = { id: uid(), numberId, number: numObj.number, code, platform, requestedAt: now, confirmedAt: null, status: 'pending' };
  const message      = { id: uid(), from: 'DRACO-SMS', to: numObj.number, content: `Your ${platform} verification code is: ${code}. Valid for 5 minutes. Do not share.`, sentAt: now, status: 'delivered' };

  state.verifications.push(verification);
  state.messages.push(message);
  saveVerifications();
  saveMessages();

  activeVerificationId = verification.id;
  document.getElementById('active-code-display').textContent = code;
  document.getElementById('active-code-card').style.display = 'block';
  startCountdown(300, 'countdown-display', () => expireVerification(verification.id));
  renderVerificationHistory();
  renderDashboard();
  showToast(`Code generated for ${platform}!`, 'gold');
}

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function startCountdown(seconds, displayId, onExpire) {
  const el = document.getElementById(displayId);
  let remaining = seconds;
  if (displayId === 'countdown-display') clearInterval(activeCountdownInterval);

  const tick = () => {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    el.className = 'timer-val' + (remaining <= 60 ? (remaining <= 30 ? ' critical' : ' expiring') : '');
    if (remaining <= 0) {
      clearInterval(interval);
      el.textContent = 'Expired';
      onExpire();
    }
    remaining--;
  };

  tick();
  const interval = setInterval(tick, 1000);
  if (displayId === 'countdown-display') activeCountdownInterval = interval;
  else modalCountdownInterval = interval;
  return interval;
}

function expireVerification(id) {
  const v = state.verifications.find(v => v.id === id);
  if (v && v.status === 'pending') { v.status = 'expired'; saveVerifications(); renderVerificationHistory(); }
  if (id === activeVerificationId) {
    document.getElementById('active-code-card').style.display = 'none';
    activeVerificationId = null;
  }
}

function confirmVerification() {
  if (!activeVerificationId) return;
  clearInterval(activeCountdownInterval);
  const v = state.verifications.find(v => v.id === activeVerificationId);
  if (v) {
    v.status = 'confirmed';
    v.confirmedAt = new Date().toISOString();
    const msg = state.messages.find(m => m.to === v.number && m.content.includes(v.code));
    if (msg) msg.status = 'confirmed';
    saveVerifications();
    saveMessages();
  }
  document.getElementById('active-code-card').style.display = 'none';
  activeVerificationId = null;
  renderVerificationHistory();
  renderDashboard();
  showToast('Verification confirmed! ✓', 'success');
}

function copyActiveCode() {
  const code = document.getElementById('active-code-display').textContent;
  navigator.clipboard.writeText(code).then(() => showToast('Code copied!', 'info'));
}

function renderVerificationHistory() {
  const container = document.getElementById('verify-history-list');
  document.getElementById('verify-count').textContent = state.verifications.length;
  if (!state.verifications.length) {
    container.innerHTML = '<div class="empty-state">No verifications yet.</div>';
    return;
  }
  container.innerHTML = '';
  [...state.verifications].reverse().forEach(v => {
    const div = document.createElement('div');
    div.className = 'verify-item';
    const icon = v.status === 'confirmed' ? '✅' : v.status === 'expired' ? '❌' : '⏳';
    div.innerHTML = `
      <span class="verify-item-icon">${icon}</span>
      <div class="verify-item-info">
        <div class="verify-item-code">${v.code}</div>
        <div class="verify-item-meta">${v.platform} · ${v.number} · ${fmtDate(v.requestedAt)}</div>
      </div>
      <span class="verify-status ${v.status}">${v.status}</span>`;
    container.appendChild(div);
  });
}

// ─── SOCIAL MEDIA PLATFORMS ──────────────────────────────────────────────────
function renderPlatforms() {
  const grid = document.getElementById('platform-grid');
  grid.innerHTML = '';
  PLATFORMS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'platform-card';
    card.innerHTML = `<span class="platform-icon">${p.icon}</span><span class="platform-name">${p.name}</span>`;
    card.onclick = () => openModal(p.id);
    grid.appendChild(card);
  });
}

let currentModalPlatformId = null;
let modalCountdownInterval = null;
let modalVerificationId    = null;

function openModal(platformId) {
  if (!state.numbers.length) {
    showToast('Save a number first (Virtual Numbers tab).', 'error'); return;
  }
  const platform = PLATFORMS.find(p => p.id === platformId);
  currentModalPlatformId = platformId;
  document.getElementById('modal-platform-icon').textContent = platform.icon;
  document.getElementById('modal-platform-name').textContent = platform.name;
  document.getElementById('modal-code-section').style.display = 'none';
  refreshNumberDropdowns();
  document.getElementById('platform-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('platform-modal').style.display = 'none';
  clearInterval(modalCountdownInterval);
  currentModalPlatformId = null;
  modalVerificationId    = null;
}

function closeModalOnOverlay(e) {
  if (e.target === document.getElementById('platform-modal')) closeModal();
}

function generatePlatformCode() {
  const numberId = document.getElementById('modal-number-select').value;
  if (!numberId) { showToast('Please select a number.', 'error'); return; }
  const numObj   = state.numbers.find(n => n.id === numberId);
  const platform = PLATFORMS.find(p => p.id === currentModalPlatformId);
  if (!numObj || !platform) return;

  clearInterval(modalCountdownInterval);
  const code = generateCode();
  const now  = new Date().toISOString();

  const verification = { id: uid(), numberId, number: numObj.number, code, platform: platform.name, requestedAt: now, confirmedAt: null, status: 'pending' };
  const message      = { id: uid(), from: 'DRACO-SMS', to: numObj.number, content: `Your ${platform.name} verification code is: ${code}. Valid for 5 minutes.`, sentAt: now, status: 'delivered' };

  state.verifications.push(verification);
  state.messages.push(message);
  saveVerifications();
  saveMessages();
  modalVerificationId = verification.id;

  document.getElementById('modal-code-display').textContent = code;
  document.getElementById('modal-code-section').style.display = 'block';
  startCountdown(300, 'modal-countdown', () => expireVerification(verification.id));
  renderDashboard();
  showToast(`${platform.name} code ready!`, 'gold');
}

function copyModalCode() {
  const code = document.getElementById('modal-code-display').textContent;
  navigator.clipboard.writeText(code).then(() => showToast('Code copied!', 'info'));
}

function confirmModalVerification() {
  if (!modalVerificationId) return;
  clearInterval(modalCountdownInterval);
  const v = state.verifications.find(v => v.id === modalVerificationId);
  if (v) {
    v.status = 'confirmed';
    v.confirmedAt = new Date().toISOString();
    const msg = state.messages.find(m => m.to === v.number && m.content.includes(v.code));
    if (msg) msg.status = 'confirmed';
    saveVerifications();
    saveMessages();
  }
  closeModal();
  renderDashboard();
  showToast('Verification confirmed! ✓', 'success');
}

// ─── MESSAGES ────────────────────────────────────────────────────────────────
function renderMessages() {
  const container = document.getElementById('messages-list');
  if (!state.messages.length) {
    container.innerHTML = '<div class="empty-state">No messages yet.</div>';
    return;
  }
  container.innerHTML = '';
  [...state.messages].reverse().forEach(m => {
    const div = document.createElement('div');
    div.className = 'message-item';
    div.innerHTML = `
      <div class="message-item-header">
        <span class="message-from">${m.from} → ${m.to}</span>
        <span class="message-time">${fmtDate(m.sentAt)}</span>
      </div>
      <div class="message-content">${m.content}</div>
      <span class="message-status ${m.status}">${m.status === 'confirmed' ? '✓ Confirmed' : '✓ Delivered'}</span>`;
    container.appendChild(div);
  });
}

function clearMessages() {
  if (!state.messages.length) return;
  state.messages = [];
  saveMessages();
  renderMessages();
  renderDashboard();
  showToast('Message history cleared.', 'info');
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function renderDashboard() {
  document.getElementById('stat-numbers').textContent       = state.numbers.length;
  document.getElementById('stat-verifications').textContent = state.verifications.filter(v => v.status === 'confirmed').length;
  document.getElementById('stat-messages').textContent      = state.messages.length;
}

// ─── TOAST ───────────────────────────────────────────────────────────────────
function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toast.style.animationDuration = `0.25s, 0.25s`;
  toast.style.animationDelay = `0s, ${duration - 250}ms`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

// ─── UTILS ───────────────────────────────────────────────────────────────────
function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
function init() {
  loadState();
  populateCountrySelect();
  renderDashboard();
  renderSavedNumbers();
  refreshNumberDropdowns();
  renderPlatforms();
  renderVerificationHistory();
  renderMessages();
}

// Auto-login check on page load
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem(AUTH_KEY) === '1') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    init();
  }
});
