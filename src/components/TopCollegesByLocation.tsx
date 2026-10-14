import React, { useState } from 'react';
import { Download, Bookmark, MapPin, ChevronRight, ChevronLeft, Check, Sparkles, ChevronDown, RotateCcw, Building2 } from 'lucide-react';
import { INDIAN_STATES_CITIES, INDIAN_STATES } from '../data/indianLocations';

export interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  nirf: string;
  courses: string;
  rating: number;
  totalFees: string;
  logoLetter: string;
  logoColor: string;
  locationCategory: string;
}

const LOCATION_TABS = [
  'All India',
  'Delhi/NCR',
  'Hyderabad',
  'Bangalore',
  'Pune',
  'Chennai',
  'Mumbai (All)',
];

// Curated list of popular education hubs for the dropdown
const POPULAR_HUBS = [
  { value: 'All India', label: 'All India (All Locations)' },
  { value: 'Delhi/NCR', label: 'Delhi / NCR (New Delhi, Gurgaon, Noida, Faridabad)' },
  { value: 'Bangalore', label: 'Bengaluru / Bangalore' },
  { value: 'Mumbai', label: 'Mumbai / Navi Mumbai' },
  { value: 'Pune', label: 'Pune' },
  { value: 'Hyderabad', label: 'Hyderabad' },
  { value: 'Chennai', label: 'Chennai' },
  { value: 'Kolkata', label: 'Kolkata' },
  { value: 'Ahmedabad', label: 'Ahmedabad / Gandhinagar' },
  { value: 'Jaipur', label: 'Jaipur' },
  { value: 'Chandigarh', label: 'Chandigarh / Mohali / Punjab' },
  { value: 'Lucknow', label: 'Lucknow / Uttar Pradesh' },
  { value: 'Kochi', label: 'Kochi / Kerala' },
];

const COLLEGES_DATA: College[] = [
  {
    id: 'nit-kurukshetra',
    name: 'NIT Kurukshetra - National Institute of Technology',
    city: 'Kurukshetra',
    state: 'Haryana',
    nirf: '#85 NIRF',
    courses: '20 courses',
    rating: 4.1,
    totalFees: '₹5.00 L',
    logoLetter: 'NIT',
    logoColor: 'from-amber-600 to-amber-800',
    locationCategory: 'Delhi/NCR',
  },
  {
    id: 'niftem-sonepat',
    name: 'NIFTEM - National Institute of Food Technology...',
    city: 'Sonepat',
    state: 'Haryana',
    nirf: '101-150 NIRF',
    courses: '1 course',
    rating: 4.0,
    totalFees: '₹4.20 L',
    logoLetter: 'NF',
    logoColor: 'from-emerald-600 to-teal-800',
    locationCategory: 'Delhi/NCR',
  },
  {
    id: 'amity-gurugram',
    name: 'Amity University, Gurugram',
    city: 'Gurugram',
    state: 'Haryana',
    nirf: '101-150 NIRF',
    courses: '22 courses',
    rating: 4.0,
    totalFees: '₹8.56 L',
    logoLetter: 'AM',
    logoColor: 'from-blue-600 to-indigo-800',
    locationCategory: 'Delhi/NCR',
  },
  {
    id: 'mmu-mullana',
    name: 'Maharishi Markandeshwar University, Mullana',
    city: 'Ambala',
    state: 'Haryana',
    nirf: '101-150 NIRF',
    courses: '22 courses',
    rating: 4.0,
    totalFees: '₹3.37 L',
    logoLetter: 'MMU',
    logoColor: 'from-red-600 to-rose-800',
    locationCategory: 'Delhi/NCR',
  },
  {
    id: 'manav-rachna',
    name: 'Manav Rachna International Institute of Research &...',
    city: 'Faridabad',
    state: 'Haryana',
    nirf: '101-150 NIRF',
    courses: '7 courses',
    rating: 4.2,
    totalFees: '₹6.15 L',
    logoLetter: 'MR',
    logoColor: 'from-blue-500 to-cyan-700',
    locationCategory: 'Delhi/NCR',
  },
  {
    id: 'jamia-hamdard',
    name: 'Jamia Hamdard (Deemed-to-be-University), New Delhi',
    city: 'New Delhi',
    state: 'Delhi NCR',
    nirf: '#29 NIRF',
    courses: '34 courses',
    rating: 4.3,
    totalFees: '₹3.20 L',
    logoLetter: 'JH',
    logoColor: 'from-green-600 to-emerald-900',
    locationCategory: 'Delhi/NCR',
  },
  {
    id: 'rvce-bangalore',
    name: 'RV College of Engineering & Technology',
    city: 'Bengaluru',
    state: 'Karnataka',
    nirf: '#89 NIRF',
    courses: '15 courses',
    rating: 4.4,
    totalFees: '₹3.80 L',
    logoLetter: 'RV',
    logoColor: 'from-purple-600 to-indigo-900',
    locationCategory: 'Bangalore',
  },
  {
    id: 'jain-bangalore',
    name: 'Jain University (Deemed-to-be-University)',
    city: 'Bengaluru',
    state: 'Karnataka',
    nirf: '#68 NIRF',
    courses: '26 courses',
    rating: 4.2,
    totalFees: '₹2.75 L',
    logoLetter: 'JU',
    logoColor: 'from-indigo-600 to-blue-800',
    locationCategory: 'Bangalore',
  },
  {
    id: 'manipal-bangalore',
    name: 'Manipal Academy of Higher Education (MAHE)',
    city: 'Bengaluru',
    state: 'Karnataka',
    nirf: '#06 NIRF',
    courses: '38 courses',
    rating: 4.5,
    totalFees: '₹3.90 L',
    logoLetter: 'MA',
    logoColor: 'from-orange-600 to-amber-800',
    locationCategory: 'Bangalore',
  },
  {
    id: 'osmania-hyderabad',
    name: 'Osmania University & Technology Institute',
    city: 'Hyderabad',
    state: 'Telangana',
    nirf: '#36 NIRF',
    courses: '24 courses',
    rating: 4.3,
    totalFees: '₹1.90 L',
    logoLetter: 'OU',
    logoColor: 'from-yellow-700 to-amber-900',
    locationCategory: 'Hyderabad',
  },
  {
    id: 'hyderabad-central',
    name: 'University of Hyderabad (UoH)',
    city: 'Hyderabad',
    state: 'Telangana',
    nirf: '#10 NIRF',
    courses: '30 courses',
    rating: 4.5,
    totalFees: '₹1.40 L',
    logoLetter: 'UH',
    logoColor: 'from-blue-700 to-indigo-900',
    locationCategory: 'Hyderabad',
  },
  {
    id: 'coep-pune',
    name: 'COEP Technological University, Pune',
    city: 'Pune',
    state: 'Maharashtra',
    nirf: '#73 NIRF',
    courses: '18 courses',
    rating: 4.4,
    totalFees: '₹3.50 L',
    logoLetter: 'CP',
    logoColor: 'from-teal-600 to-slate-800',
    locationCategory: 'Pune',
  },
  {
    id: 'symbiosis-pune',
    name: 'Symbiosis International (Deemed University)',
    city: 'Pune',
    state: 'Maharashtra',
    nirf: '#32 NIRF',
    courses: '40 courses',
    rating: 4.4,
    totalFees: '₹4.80 L',
    logoLetter: 'SIU',
    logoColor: 'from-rose-600 to-red-800',
    locationCategory: 'Pune',
  },
  {
    id: 'srm-chennai',
    name: 'SRM Institute of Science and Technology',
    city: 'Chennai',
    state: 'Tamil Nadu',
    nirf: '#28 NIRF',
    courses: '32 courses',
    rating: 4.3,
    totalFees: '₹4.10 L',
    logoLetter: 'SRM',
    logoColor: 'from-blue-700 to-slate-900',
    locationCategory: 'Chennai',
  },
  {
    id: 'anna-univ-chennai',
    name: 'Anna University, Guindy Campus',
    city: 'Chennai',
    state: 'Tamil Nadu',
    nirf: '#14 NIRF',
    courses: '28 courses',
    rating: 4.4,
    totalFees: '₹1.65 L',
    logoLetter: 'AU',
    logoColor: 'from-cyan-700 to-blue-900',
    locationCategory: 'Chennai',
  },
  {
    id: 'nmims-mumbai',
    name: 'NMIMS Deemed-to-be-University, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    nirf: '#47 NIRF',
    courses: '21 courses',
    rating: 4.2,
    totalFees: '₹5.50 L',
    logoLetter: 'NM',
    logoColor: 'from-red-700 to-rose-950',
    locationCategory: 'Mumbai (All)',
  },
  {
    id: 'ict-mumbai',
    name: 'Institute of Chemical Technology (ICT), Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    nirf: '#24 NIRF',
    courses: '19 courses',
    rating: 4.5,
    totalFees: '₹3.20 L',
    logoLetter: 'ICT',
    logoColor: 'from-emerald-700 to-teal-950',
    locationCategory: 'Mumbai (All)',
  },
  {
    id: 'jadavpur-kolkata',
    name: 'Jadavpur University, Kolkata',
    city: 'Kolkata',
    state: 'West Bengal',
    nirf: '#09 NIRF',
    courses: '35 courses',
    rating: 4.6,
    totalFees: '₹1.10 L',
    logoLetter: 'JU',
    logoColor: 'from-sky-700 to-blue-950',
    locationCategory: 'Kolkata',
  },
  {
    id: 'nirma-ahmedabad',
    name: 'Nirma University, Ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    nirf: '#80 NIRF',
    courses: '22 courses',
    rating: 4.3,
    totalFees: '₹3.90 L',
    logoLetter: 'NU',
    logoColor: 'from-orange-700 to-red-900',
    locationCategory: 'Ahmedabad',
  },
  {
    id: 'manipal-jaipur',
    name: 'Manipal University, Jaipur',
    city: 'Jaipur',
    state: 'Rajasthan',
    nirf: '#79 NIRF',
    courses: '25 courses',
    rating: 4.2,
    totalFees: '₹2.10 L',
    logoLetter: 'MUJ',
    logoColor: 'from-amber-600 to-orange-800',
    locationCategory: 'Jaipur',
  },
  {
    id: 'lpu-punjab',
    name: 'Lovely Professional University (LPU), Punjab',
    city: 'Phagwara',
    state: 'Punjab',
    nirf: '#50 NIRF',
    courses: '45 courses',
    rating: 4.3,
    totalFees: '₹1.80 L',
    logoLetter: 'LPU',
    logoColor: 'from-amber-700 to-yellow-900',
    locationCategory: 'Chandigarh',
  },
  {
    id: 'chandigarh-univ',
    name: 'Chandigarh University (CU), Mohali',
    city: 'Mohali',
    state: 'Punjab',
    nirf: '#45 NIRF',
    courses: '40 courses',
    rating: 4.2,
    totalFees: '₹1.95 L',
    logoLetter: 'CU',
    logoColor: 'from-red-600 to-slate-900',
    locationCategory: 'Chandigarh',
  },
  {
    id: 'amrita-kochi',
    name: 'Amrita Vishwa Vidyapeetham, Kochi Campus',
    city: 'Kochi',
    state: 'Kerala',
    nirf: '#07 NIRF',
    courses: '24 courses',
    rating: 4.5,
    totalFees: '₹3.10 L',
    logoLetter: 'AV',
    logoColor: 'from-pink-700 to-rose-900',
    locationCategory: 'Kochi',
  },
];

interface TopCollegesByLocationProps {
  onOpenBrochure?: () => void;
}

export const TopCollegesByLocation: React.FC<TopCollegesByLocationProps> = ({ onOpenBrochure }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('All India');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [preferredLocation, setPreferredLocation] = useState<string>('Delhi/NCR');
  const [savedNotification, setSavedNotification] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<number>(0);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleLocationChange = (loc: string) => {
    setSelectedLocation(loc);
    setActivePage(0);
  };

  const handleSavePreference = (loc: string) => {
    setPreferredLocation(loc);
    setSelectedLocation(loc);
    setSavedNotification(`Location preference saved: ${loc}`);
    setTimeout(() => {
      setSavedNotification(null);
    }, 2800);
  };

  // Filter colleges based on selected location
  const filteredColleges = COLLEGES_DATA.filter((c) => {
    if (selectedLocation === 'All India') return true;

    const locLower = selectedLocation.toLowerCase().trim();
    const cityLower = c.city.toLowerCase();
    const stateLower = c.state.toLowerCase();
    const catLower = c.locationCategory.toLowerCase();

    // Check exact or partial matches
    if (catLower === locLower) return true;
    if (catLower.includes(locLower) || locLower.includes(catLower)) return true;
    if (cityLower === locLower || cityLower.includes(locLower) || locLower.includes(cityLower)) return true;
    if (stateLower === locLower || stateLower.includes(locLower) || locLower.includes(stateLower)) return true;

    // Handle aliases like Bangalore / Bengaluru
    if ((locLower.includes('bangalore') || locLower.includes('bengaluru')) && 
        (cityLower.includes('bangalore') || cityLower.includes('bengaluru') || catLower.includes('bangalore'))) {
      return true;
    }

    // Handle Mumbai / Navi Mumbai / Mumbai (All)
    if (locLower.includes('mumbai') && (cityLower.includes('mumbai') || catLower.includes('mumbai'))) {
      return true;
    }

    // Handle Delhi NCR regions
    if (locLower.includes('delhi') || locLower.includes('ncr')) {
      return catLower.includes('delhi') || stateLower.includes('delhi') || 
             ['gurugram', 'gurgaon', 'noida', 'faridabad', 'sonepat', 'kurukshetra', 'ambala', 'new delhi'].includes(cityLower);
    }

    // Handle Punjab / Chandigarh / Mohali
    if (locLower.includes('punjab') || locLower.includes('chandigarh')) {
      return stateLower.includes('punjab') || catLower.includes('chandigarh') || ['mojali', 'mohali', 'phagwara', 'jalandhar'].includes(cityLower);
    }

    // Check state in INDIAN_STATES_CITIES
    const stateCities = INDIAN_STATES_CITIES[selectedLocation];
    if (stateCities && stateCities.some(city => cityLower.includes(city.toLowerCase()) || city.toLowerCase().includes(cityLower))) {
      return true;
    }

    return false;
  });

  // Determine which tab pill is active
  const isCustomLocationActive = !LOCATION_TABS.includes(selectedLocation) && selectedLocation !== 'All India';

  return (
    <section className="bg-white dark:bg-[#111c2e] rounded-xl border border-slate-200/50 dark:border-slate-800/60 shadow-2xs p-5 sm:p-6 space-y-5 font-sans">
      {/* Header & 'Select Location' Filter Dropdown Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 pb-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center text-xl shrink-0 shadow-2xs">
            📍
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Top Colleges by location
            </h2>
            <p className="text-xs text-[#74777e] dark:text-slate-400 mt-0.5">
              Compare accredited universities and colleges across Indian cities
            </p>
          </div>
        </div>

        {/* 'Select Location' Filter Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#115eaf] dark:text-blue-400">
              <MapPin className="w-4 h-4" />
            </div>
            <select
              id="select-location-filter"
              aria-label="Select Location filter"
              value={selectedLocation}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full pl-9 pr-9 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-[#000f22] dark:text-slate-100 bg-white dark:bg-[#121c2e] border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-400 focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/15 rounded-xl transition-all cursor-pointer appearance-none shadow-2xs [background-image:none]"
              style={{ backgroundImage: 'none' }}
            >
              <optgroup label="All Locations">
                <option value="All India">📍 All India (All Cities)</option>
              </optgroup>

              <optgroup label="Popular Educational Hubs">
                {POPULAR_HUBS.filter(h => h.value !== 'All India').map(hub => (
                  <option key={hub.value} value={hub.value}>
                    {hub.label}
                  </option>
                ))}
              </optgroup>

              <optgroup label="Filter by State">
                {INDIAN_STATES.filter(s => s !== 'Other State / UT').map(state => (
                  <option key={state} value={state}>
                    State: {state}
                  </option>
                ))}
              </optgroup>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#74777e]">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {selectedLocation !== 'All India' && (
            <button
              type="button"
              onClick={() => handleLocationChange('All India')}
              title="Reset location filter to All India"
              className="p-2 sm:p-2.5 text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-xl transition-all cursor-pointer shrink-0 flex items-center gap-1 shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px] font-medium">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Location Filter Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {LOCATION_TABS.map((tab) => {
          const isActive = selectedLocation === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => handleLocationChange(tab)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'border-2 border-[#115eaf] text-[#115eaf] font-bold bg-blue-50/60 shadow-2xs scale-[1.02]'
                  : 'border border-[#d1d5db] text-[#4b5563] bg-white hover:border-[#115eaf] hover:text-[#115eaf]'
              }`}
            >
              {tab}
            </button>
          );
        })}

        {/* Custom Location Active Pill (if selected via dropdown and not in default pills) */}
        {isCustomLocationActive && (
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#115eaf] text-white shadow-2xs whitespace-nowrap shrink-0">
            <span>📍 {selectedLocation}</span>
            <button
              type="button"
              onClick={() => handleLocationChange('All India')}
              className="ml-1 text-white/80 hover:text-white cursor-pointer"
              aria-label="Clear location filter"
            >
              ×
            </button>
          </div>
        )}

        <div className="ml-auto text-xs text-[#74777e] font-medium whitespace-nowrap shrink-0 pl-2">
          {filteredColleges.length} {filteredColleges.length === 1 ? 'College' : 'Colleges'} Found
        </div>
      </div>

      {/* Notification Toast if Saved */}
      {savedNotification && (
        <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{savedNotification}</span>
        </div>
      )}

      {/* Grid of Colleges */}
      <div className="relative">
        {filteredColleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Card 1: College Item */}
            {filteredColleges.slice(0, 1).map((college) => (
              <div
                key={college.id}
                className="bg-white dark:bg-[#131f33] rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:border-[#115eaf] dark:hover:border-blue-500/60 transition-all duration-200 hover:-translate-y-0.5 p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <h3 className="text-[15px] sm:text-base font-bold text-slate-900 group-hover:text-[#115eaf] leading-snug transition-colors line-clamp-2">
                      {college.name}
                    </h3>
                    <div className="w-11 h-11 rounded-xl border border-blue-100 p-1 flex items-center justify-center shrink-0 bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] shadow-2xs">
                      <span className="text-[12px] font-extrabold text-[#115eaf] tracking-wider">
                        {college.logoLetter}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs mb-4">
                    <span className="flex items-center gap-1.5 text-slate-600 font-medium truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
                      <span className="truncate">{college.city}, {college.state}</span>
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70 shrink-0">
                      {college.nirf}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 pb-4 border-t border-slate-100 text-xs">
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">COURSES</span>
                      <div className="mt-1 flex items-center gap-1.5 font-semibold text-slate-800">
                        <span className="text-[#115eaf] font-semibold">{college.courses}</span>
                        <span className="text-slate-200">|</span>
                        <span className="inline-flex items-center gap-0.5 text-amber-500 font-medium">
                          ★ <span className="text-slate-800 font-semibold">{college.rating}</span>
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">TOTAL FEES</span>
                      <div className="mt-1 font-bold text-slate-900 text-sm tracking-tight">{college.totalFees}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => toggleBookmark(college.id)}
                    aria-label="Bookmark college"
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      bookmarkedIds.has(college.id)
                        ? 'border-amber-400 bg-amber-50 text-amber-600 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-500 hover:text-amber-600 hover:bg-slate-50 bg-white'
                    }`}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        bookmarkedIds.has(college.id) ? 'fill-amber-500 text-amber-500' : ''
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenBrochure?.()}
                    className="flex-1 py-2.5 px-3.5 bg-[#115eaf] hover:bg-[#084a8c] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Brochure</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Card 2: Interactive Location Preference Card with Frosted Glass Styling */}
            <div className="relative bg-gradient-to-br from-white/95 via-[#f8faff]/95 to-[#f0f4f8]/90 backdrop-blur-md rounded-2xl border border-blue-200/50 p-5 flex flex-col justify-between shadow-2xs overflow-hidden">
              {/* Subtle glass reflection highlight */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#115eaf]/5 rounded-full blur-xl pointer-events-none" />

              <div>
                <div className="flex items-center gap-1.5 mb-1.5 text-[#115eaf]">
                  <Sparkles className="w-3.5 h-3.5 text-[#115eaf]" />
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#115eaf]">Recommendation</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 leading-snug">
                  What is your location preference?
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {LOCATION_TABS.slice(0, 6).map((loc) => {
                    const isSel = preferredLocation === loc;
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setPreferredLocation(loc)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          isSel
                            ? 'bg-[#115eaf] text-white font-semibold shadow-xs'
                            : 'bg-white/95 backdrop-blur-xs border border-slate-200 text-slate-700 hover:border-[#115eaf] hover:text-[#115eaf]'
                        }`}
                      >
                        {loc}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => handleSavePreference(preferredLocation)}
                  className="px-5 py-2.5 rounded-full bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Save to profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Cards 3+: Remaining Colleges in row */}
            {filteredColleges.slice(1, 5).map((college) => (
              <div
                key={college.id}
                className="bg-white dark:bg-[#131f33] rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:border-[#115eaf] dark:hover:border-blue-500/60 transition-all duration-200 hover:-translate-y-0.5 p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <h3 className="text-[15px] sm:text-base font-bold text-slate-900 group-hover:text-[#115eaf] leading-snug transition-colors line-clamp-2">
                      {college.name}
                    </h3>
                    <div className="w-11 h-11 rounded-xl border border-blue-100 p-1 flex items-center justify-center shrink-0 bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] shadow-2xs">
                      <span className="text-[12px] font-extrabold text-[#115eaf] tracking-wider">
                        {college.logoLetter}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs mb-4">
                    <span className="flex items-center gap-1.5 text-slate-600 font-medium truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
                      <span className="truncate">{college.city}, {college.state}</span>
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70 shrink-0">
                      {college.nirf}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 pb-4 border-t border-slate-100 text-xs">
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">COURSES</span>
                      <div className="mt-1 flex items-center gap-1.5 font-semibold text-slate-800">
                        <span className="text-[#115eaf] font-semibold">{college.courses}</span>
                        <span className="text-slate-200">|</span>
                        <span className="inline-flex items-center gap-0.5 text-amber-500 font-medium">
                          ★ <span className="text-slate-800 font-semibold">{college.rating}</span>
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">TOTAL FEES</span>
                      <div className="mt-1 font-bold text-slate-900 text-sm tracking-tight">{college.totalFees}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => toggleBookmark(college.id)}
                    aria-label="Bookmark college"
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      bookmarkedIds.has(college.id)
                        ? 'border-amber-400 bg-amber-50 text-amber-600 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-500 hover:text-amber-600 hover:bg-slate-50 bg-white'
                    }`}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        bookmarkedIds.has(college.id) ? 'fill-amber-500 text-amber-500' : ''
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenBrochure?.()}
                    className="flex-1 py-2.5 px-3.5 bg-[#115eaf] hover:bg-[#084a8c] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Brochure</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state when no colleges match selected location */
          <div className="bg-[#f8faff] rounded-2xl border border-dashed border-[#c4c6ce] p-8 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 text-[#115eaf] flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#000f22]">
              No listed colleges found for &quot;{selectedLocation}&quot;
            </h3>
            <p className="text-xs sm:text-sm text-[#74777e] max-w-md mx-auto">
              We are constantly expanding our verified campus network. You can view all colleges across India or talk with our academic counselors for distance/online options in your city.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleLocationChange('All India')}
                className="px-4 py-2 bg-[#115eaf] hover:bg-[#0c4a8a] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs"
              >
                View All India Colleges
              </button>
              <button
                type="button"
                onClick={() => onOpenBrochure?.()}
                className="px-4 py-2 bg-white border border-[#c4c6ce] hover:border-[#115eaf] text-[#000f22] rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                Speak with Academic Advisor
              </button>
            </div>
          </div>
        )}

        {/* Carousel Next Arrow (Floating on right edge, like in design) */}
        {filteredColleges.length > 2 && (
          <button
            type="button"
            onClick={() => {
              const nextIdx = (LOCATION_TABS.indexOf(selectedLocation) + 1) % LOCATION_TABS.length;
              handleLocationChange(LOCATION_TABS[nextIdx]);
            }}
            className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg items-center justify-center text-slate-700 hover:text-black hover:scale-105 active:scale-95 transition-all z-10 cursor-pointer"
            aria-label="Next location"
            title="Next location colleges"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Slider Indicator at bottom */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <button
          type="button"
          onClick={() => setActivePage(0)}
          className={`h-1.5 rounded-full transition-all cursor-pointer ${
            activePage === 0 ? 'w-8 bg-[#115eaf]' : 'w-6 bg-slate-300'
          }`}
          aria-label="Page 1"
        />
        <button
          type="button"
          onClick={() => setActivePage(1)}
          className={`h-1.5 rounded-full transition-all cursor-pointer ${
            activePage === 1 ? 'w-8 bg-[#115eaf]' : 'w-6 bg-slate-300'
          }`}
          aria-label="Page 2"
        />
      </div>
    </section>
  );
};
