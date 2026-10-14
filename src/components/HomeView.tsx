import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ShieldCheck,
  ArrowRight,
  Download,
  CheckCircle,
  ChevronRight,
  Headphones,
  GraduationCap,
  Wallet,
  ChevronDown,
  Sparkles,
  FileCheck2,
  Award,
  Globe2,
  MonitorCheck,
  RefreshCw,
} from 'lucide-react';
import { HomeFaq } from './HomeFaq';
import { TopCollegesByLocation } from './TopCollegesByLocation';
import { RecommendedCollegeNews } from './RecommendedCollegeNews';
import { StudentTestimonials } from './StudentTestimonials';
import { StatutoryApprovalsHub } from './StatutoryApprovalsHub';
import { CareerRoiCalculator } from './CareerRoiCalculator';
import { OnlineDegreeJourney } from './OnlineDegreeJourney';
import { RecruiterEcosystem } from './RecruiterEcosystem';
import {
  DegreeProgramsSkeleton,
  FeaturedUniversitiesSkeleton,
  StatutoryRecognitionSkeleton,
  ComparisonMatrixSkeleton,
} from './HomeSkeleton';

interface HomeViewProps {
  onOpenApply: (courseId?: string) => void;
  onOpenHelpDesk: () => void;
}

const TRENDING_FILTERS = [
  'NAAC A++ Only',
  'Under ₹1 Lakh Total',
  'Zero-Cost EMI',
  '100% Online Exam',
];

const HERO_METRICS = [
  { value: '50+', label: 'Entitled Universities' },
  { value: '180+', label: 'Recognized Degrees' },
  { value: '5,00,000+', label: 'Students Guided', tone: 'text-[#115eaf]' },
  { value: '100%', label: 'Zero-Cost EMI Options', tone: 'text-emerald-700' },
];

const DEGREE_CATEGORIES = ["Master's (PG)", "Bachelor's (UG)", 'Executive Tracks'] as const;

const DEGREE_CARDS = [
  {
    title: 'Online MBA',
    subtitle: 'Master of Business Administration',
    duration: '2 Years • 4 Sems',
    badge: 'High Placement Rate',
    badgeTone: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    rows: [
      { label: 'Specializations:', value: '19+ (Data, Finance, Marketing, HR)' },
      { label: 'Avg Career CTC:', value: '₹7.2 - 14.5 LPA', tone: 'text-[#115eaf] font-semibold' },
    ],
    price: '₹18,500',
    explore: 'Explore 28 Unis',
  },
  {
    title: 'Online MCA',
    subtitle: 'Master of Computer Applications',
    duration: '2 Years • 4 Sems',
    badge: 'AI & Cloud Ready',
    badgeTone: 'text-purple-700 bg-purple-50 border-purple-200',
    rows: [
      { label: 'Specializations:', value: 'AI, Cloud, Full-Stack, Cyber' },
      { label: 'Avg Career CTC:', value: '₹6.5 - 16.0 LPA', tone: 'text-[#115eaf] font-semibold' },
    ],
    price: '₹22,000',
    explore: 'Explore 22 Unis',
  },
  {
    title: 'Online BBA',
    subtitle: 'Bachelor of Business Administration',
    duration: '3 Years • 6 Sems',
    badge: 'Entry Degree',
    badgeTone: 'text-blue-700 bg-blue-50 border-blue-200',
    rows: [
      { label: 'Specializations:', value: 'Digital Marketing, Finance, HR' },
      { label: 'Eligibility:', value: '10+2 with 50% Any Stream' },
    ],
    price: '₹14,000',
    explore: 'Explore 19 Unis',
  },
  {
    title: 'Online BCA',
    subtitle: 'Bachelor of Computer Applications',
    duration: '3 Years • 6 Sems',
    badge: 'Tech Career Starter',
    badgeTone: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    rows: [
      { label: 'Core Tracks:', value: 'Full-Stack, Python, Cloud' },
      { label: 'Practical Labs:', value: '100% Virtual Cloud Sandbox', tone: 'text-emerald-700 font-medium' },
    ],
    price: '₹15,000',
    explore: 'Explore 17 Unis',
  },
  {
    title: 'Online B.Com / M.Com',
    subtitle: 'Commerce & Corporate Finance',
    duration: 'UG & PG Available',
    badge: 'ACCA & US CMA Options',
    badgeTone: 'text-amber-800 bg-amber-50 border-amber-200',
    rows: [
      { label: 'Accounting Certs:', value: 'Integrated ACCA 9-Paper Exemption' },
      { label: 'Govt Exam Validity:', value: '100% Valid (UPSC/Banking)', tone: 'text-emerald-700 font-medium' },
    ],
    price: '₹12,000',
    explore: 'Explore 15 Unis',
  },
  {
    title: 'Online BA / MA',
    subtitle: 'Humanities & Social Sciences',
    duration: 'UG & PG Tracks',
    badge: 'Affordable Fee',
    badgeTone: 'text-slate-700 bg-slate-100 border-slate-300',
    rows: [
      { label: 'Disciplines:', value: 'Journalism, English, Public Policy' },
      { label: 'Best For:', value: 'Civil Services Aspirants' },
    ],
    price: '₹11,000',
    explore: 'Explore 14 Unis',
  },
];

const FEATURED_UNIS = [
  {
    id: 'lpu-online',
    name: 'Lovely Professional University',
    short: 'LPU Online',
    naac: 'NAAC A++ (3.68 CGPA)',
    rank: 'NIRF #31',
    rows: [
      { label: 'Total Fees (2 Yrs):', value: '₹1,40,000' },
      { label: 'EMI Starts:', value: '₹4,950/mo', tone: 'text-emerald-700 font-bold' },
      { label: 'Exam Mode:', value: '100% Home AI Proctored' },
      { label: 'Learning:', value: 'Live Lectures + LMS' },
    ],
  },
  {
    id: 'amity-online',
    name: 'Amity University',
    short: 'Amity Online',
    naac: 'NAAC A+',
    rank: 'NIRF Top 35',
    rows: [
      { label: 'Total Fees (2 Yrs):', value: '₹1,65,000' },
      { label: 'EMI Starts:', value: '₹5,833/mo', tone: 'text-emerald-700 font-bold' },
      { label: 'Ranking:', value: 'QS Online MBA Top 10 Asia' },
      { label: 'Campus LMS:', value: 'beSocial Academic App' },
    ],
  },
  {
    id: 'cu-online',
    name: 'Chandigarh University',
    short: 'CU Online',
    naac: 'NAAC A+',
    rank: 'QS World Ranked',
    rows: [
      { label: 'Total Fees (2 Yrs):', value: '₹1,35,000' },
      { label: 'EMI Starts:', value: '₹4,500/mo', tone: 'text-emerald-700 font-bold' },
      { label: 'Special Inclusions:', value: 'Harvard Certifications' },
      { label: 'Placement Drives:', value: '300+ Recruiters' },
    ],
  },
  {
    id: 'manipal-online',
    name: 'Manipal University Jaipur',
    short: 'Online Manipal',
    naac: 'NAAC A+ (3.59 CGPA)',
    rank: 'Legacy 70+ Yrs',
    rows: [
      { label: 'Total Fees (2 Yrs):', value: '₹1,75,000' },
      { label: 'EMI Starts:', value: '₹5,200/mo', tone: 'text-emerald-700 font-bold' },
      { label: 'Content Partner:', value: 'Coursera Access' },
      { label: 'Equivalence:', value: 'Global WES Recognized' },
    ],
  },
];

type CompareCell = { text: string; tone?: string; badge?: boolean };

const COMPARE_ROWS: { param: string; cells: CompareCell[] }[] = [
  {
    param: 'UGC-DEB Statutory Entitlement',
    cells: [
      { text: 'Category-1 Approved', tone: 'text-emerald-700 font-semibold' },
      { text: 'Category-1 Approved', tone: 'text-emerald-700 font-semibold' },
      { text: 'Category-1 Approved', tone: 'text-emerald-700 font-semibold' },
      { text: 'Category-1 Approved', tone: 'text-emerald-700 font-semibold' },
    ],
  },
  {
    param: 'NAAC Accreditation Grade',
    cells: [
      { text: 'A++ (3.68 CGPA)', badge: true },
      { text: 'A+', badge: true },
      { text: 'A+', badge: true },
      { text: 'A+ (3.59 CGPA)', badge: true },
    ],
  },
  {
    param: 'NIRF University Ranking',
    cells: [
      { text: 'Rank #31' },
      { text: 'Top 35 Band' },
      { text: 'Top 40 Band' },
      { text: 'Top 60 Band' },
    ],
  },
  {
    param: 'Total 2-Year Program Fees',
    cells: [
      { text: '₹1,40,000', tone: 'font-bold text-[#000f22]' },
      { text: '₹1,65,000', tone: 'font-bold text-[#000f22]' },
      { text: '₹1,35,000', tone: 'font-bold text-[#000f22]' },
      { text: '₹1,75,000', tone: 'font-bold text-[#000f22]' },
    ],
  },
  {
    param: 'Monthly 0-Cost EMI Option',
    cells: [
      { text: '₹4,950 / month', tone: 'text-emerald-700 font-semibold' },
      { text: '₹5,833 / month', tone: 'text-emerald-700 font-semibold' },
      { text: '₹4,500 / month', tone: 'text-emerald-700 font-semibold' },
      { text: '₹5,200 / month', tone: 'text-emerald-700 font-semibold' },
    ],
  },
  {
    param: 'Examination Methodology',
    cells: [
      { text: '100% Remote AI Web-Cam' },
      { text: '100% Remote Proctored' },
      { text: 'Online LMS Exam' },
      { text: 'Remote Web Proctored' },
    ],
  },
  {
    param: 'Global WES Recognition (Canada/US)',
    cells: [
      { text: 'Yes, Valid', tone: 'text-emerald-700' },
      { text: 'Yes, Valid', tone: 'text-emerald-700' },
      { text: 'Yes, Valid', tone: 'text-emerald-700' },
      { text: 'Yes, Valid', tone: 'text-emerald-700' },
    ],
  },
];

const STATUTORY_CARDS = [
  {
    icon: FileCheck2,
    iconColor: 'text-[#115eaf] dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/50',
    title: 'UGC-DEB 100% Equivalence',
    desc: 'Fully valid for UPSC, SSC, Banking, PSU, and State PSC examinations.',
  },
  {
    icon: Award,
    iconColor: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/50',
    title: 'NAAC A++ / A+ Quality Mandate',
    desc: 'Only universities with top institutional grades are entitled to impart online degrees.',
  },
  {
    icon: Globe2,
    iconColor: 'text-[#115eaf] dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/50',
    title: 'Global Mobility & WES Verified',
    desc: 'Recognized by WES & AIU for Canada, USA, and UK higher study credentials.',
  },
  {
    icon: MonitorCheck,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
    title: 'AI Proctored Remote Exams',
    desc: 'Take secure web examinations from home with zero physical center travel.',
  },
];

export const HomeView: React.FC<HomeViewProps> = ({ onOpenApply, onOpenHelpDesk }) => {
  const navigate = useNavigate();
  const [degreeTab, setDegreeTab] = useState<(typeof DEGREE_CATEGORIES)[number]>("Master's (PG)");
  const [selectedDegree, setSelectedDegree] = useState('Online MBA (Master of Business)');
  const [selectedBudget, setSelectedBudget] = useState('Any Budget (₹12,000 - ₹50,000)');
  const [lead, setLead] = useState({ phone: '', email: '', degree: 'Online MBA' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Subtle initial perceived performance optimization for data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleExploreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/universities');
  };

  return (
    <div className="w-full">
      {/* 1. Top Advisory Bar */}
      <div className="bg-[#0b2540] dark:bg-[#07172b] text-white py-1.5 px-3 flex items-center justify-center gap-2 border-b border-slate-700/40 text-center text-xs">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <p className="text-[11px] sm:text-xs tracking-wide font-normal truncate text-slate-100">
          UGC-DEB 2026-27 Approved • Gov. Entitled Portal
        </p>
      </div>

      {/* Full-Width Hero Section (Edge-to-Edge with ambient gradient & zero nested boxes) */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/50 to-white dark:from-[#0a1222] dark:via-[#0c1629] dark:to-[#080d19] border-b border-slate-200/70 dark:border-slate-800/80 pt-10 pb-12 sm:pt-14 sm:pb-16 md:pt-16 md:pb-20">
        {/* Ambient subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-[500px] h-[350px] bg-blue-400/10 dark:bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute -top-24 right-1/4 w-[450px] h-[320px] bg-indigo-400/10 dark:bg-indigo-600/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Statutory Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>UGC-DEB • AICTE • NAAC A++ ACCREDITED UNIVERSITIES</span>
          </div>

          {/* Hero Heading & Subtitle */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#000f22] dark:text-white tracking-tight leading-[1.15]">
              Discover, Compare &amp; Enroll in <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#115eaf] via-[#1a73e8] to-[#0d9488] bg-clip-text text-transparent">
                India's Top Online Universities
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
              Find government-recognized online degrees designed for working professionals with zero-cost EMI and 100% remote proctored exams.
            </p>
          </div>

          {/* Unified Sleek Search & Filter Bar (No Nested Box Cards) */}
          <div className="pt-2 max-w-3xl mx-auto">
            <form
              onSubmit={handleExploreSubmit}
              className="bg-white dark:bg-[#111c2e] p-2 sm:p-2.5 rounded-2xl sm:rounded-full border border-slate-200/80 dark:border-slate-800 shadow-xs dark:shadow-black/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              {/* Degree Selector */}
              <div className="flex-1 flex items-center px-3.5 py-2 sm:py-1">
                <GraduationCap className="w-5 h-5 text-[#115eaf] dark:text-blue-400 shrink-0 mr-3" />
                <div className="flex-1 text-left min-w-0">
                  <label
                    htmlFor="select-degree"
                    className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider cursor-pointer"
                  >
                    Degree Program
                  </label>
                  <div className="relative">
                    <select
                      id="select-degree"
                      value={selectedDegree}
                      onChange={(e) => setSelectedDegree(e.target.value)}
                      className="w-full bg-transparent border-0 p-0 pr-5 text-xs sm:text-sm font-semibold text-[#000f22] dark:text-slate-100 focus:ring-0 cursor-pointer outline-none appearance-none truncate [background-image:none]"
                      style={{ backgroundImage: 'none' }}
                    >
                      <option value="Online MBA (Master of Business)">Online MBA (Master of Business)</option>
                      <option value="Online MCA (Computer Applications)">Online MCA (Computer Applications)</option>
                      <option value="Online BBA (Bachelor of Business)">Online BBA (Bachelor of Business)</option>
                      <option value="Online BCA (Computer Science)">Online BCA (Computer Science)</option>
                      <option value="Online M.Com / B.Com">Online M.Com / B.Com</option>
                      <option value="Online MA / BA">Online MA / BA</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Subtle Divider */}
              <div className="hidden sm:block h-9 w-[1px] bg-slate-200 dark:bg-slate-700/80 mx-1 shrink-0" />

              {/* Budget Selector */}
              <div className="flex-1 flex items-center px-3.5 py-2 sm:py-1">
                <Wallet className="w-5 h-5 text-[#115eaf] dark:text-blue-400 shrink-0 mr-3" />
                <div className="flex-1 text-left min-w-0">
                  <label
                    htmlFor="select-budget"
                    className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider cursor-pointer"
                  >
                    Budget Per Semester
                  </label>
                  <div className="relative">
                    <select
                      id="select-budget"
                      value={selectedBudget}
                      onChange={(e) => setSelectedBudget(e.target.value)}
                      className="w-full bg-transparent border-0 p-0 pr-5 text-xs sm:text-sm font-semibold text-[#000f22] dark:text-slate-100 focus:ring-0 cursor-pointer outline-none appearance-none truncate [background-image:none]"
                      style={{ backgroundImage: 'none' }}
                    >
                      <option value="Any Budget (₹12,000 - ₹50,000)">Any Budget (₹12,000 - ₹50,000)</option>
                      <option value="Under ₹15,000 / semester">Under ₹15,000 / semester</option>
                      <option value="₹15,000 - ₹25,000 / semester">₹15,000 - ₹25,000 / semester</option>
                      <option value="₹25,000 - ₹40,000 / semester">₹25,000 - ₹40,000 / semester</option>
                      <option value="Premium Tier (> ₹40,000 / sem)">Premium Tier (&gt; ₹40,000 / sem)</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Explore Button */}
              <button
                type="submit"
                className="h-11 sm:h-12 px-6 rounded-xl sm:rounded-full bg-[#115eaf] hover:bg-[#0d4d91] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs transition-all active:scale-[0.98] shrink-0 cursor-pointer"
              >
                <Search className="w-4 h-4 shrink-0" />
                <span>Explore 50+ Universities</span>
              </button>
            </form>

            {/* Clean Floating Trending Filters */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5 mr-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Trending:
              </span>
              {TRENDING_FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => scrollTo('universities')}
                  className="cursor-pointer bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-full border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-[#115eaf] dark:hover:border-blue-400 hover:text-[#115eaf] dark:hover:text-blue-300 transition-colors font-medium text-xs shadow-2xs"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Metric Stats Strip (No Clunky Grey Tile Boxes) */}
          <div className="pt-6 sm:pt-8 border-t border-slate-200/60 dark:border-slate-800/80 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-center">
              {HERO_METRICS.map((m, idx) => (
                <div
                  key={m.label}
                  className={`text-center py-1 sm:py-2 ${
                    idx !== 0 ? 'sm:border-l sm:border-slate-200/60 dark:sm:border-slate-800/80' : ''
                  }`}
                >
                  <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${m.tone || 'text-[#000f22] dark:text-white'}`}>
                    {m.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Page Content in Standard Container */}
      <div className="w-full max-w-[1280px] mx-auto px-3.5 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6 md:space-y-8">

      {/* Statutory Approvals & Legal Recognition Hub */}
      <StatutoryApprovalsHub onOpenHelpDesk={onOpenHelpDesk} />

      {/* Degree programs */}
      <section id="degrees" className="bg-white dark:bg-[#111c2e] rounded-xl border border-slate-200/50 dark:border-slate-800/60 shadow-2xs p-5 sm:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-100 dark:border-slate-800/80 gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#000f22] dark:text-white">Popular Online Degree Programs</h2>
            <p className="text-[13px] text-[#43474d] dark:text-slate-400 font-normal mt-0.5">
              Approved under UGC Section 22 with equivalence to conventional regular degrees.
            </p>
          </div>
          <div className="inline-flex p-1 bg-slate-100/70 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-[12px] font-semibold">
            {DEGREE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setDegreeTab(cat)}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  degreeTab === cat ? 'bg-[#115eaf] text-white shadow-2xs' : 'text-[#43474d] dark:text-slate-400 hover:text-[#111c2d] dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {DEGREE_CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white dark:bg-[#131f33] rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:border-[#115eaf] dark:hover:border-blue-500/60 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs hover:shadow-xs p-5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-2 gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                    {card.duration}
                  </span>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${card.badgeTone}`}>
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#000f22] dark:text-white group-hover:text-[#115eaf] dark:group-hover:text-blue-400 transition-colors">{card.title}</h3>
                <p className="text-[12px] text-[#43474d] dark:text-slate-400 font-normal mt-1">{card.subtitle}</p>
                <div className="mt-3.5 py-2.5 border-y border-slate-100 dark:border-slate-800/80 text-[12px] space-y-1.5">
                  {card.rows.map((r) => (
                    <div key={r.label} className="flex justify-between text-[#43474d] dark:text-slate-400 gap-2">
                      <span>{r.label}</span>
                      <span className={`text-right ${r.tone || 'font-medium text-[#000f22] dark:text-slate-200'}`}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-2 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#43474d] dark:text-slate-400 block">Starts from</span>
                  <span className="text-[15px] font-bold text-[#000f22] dark:text-white">
                    {card.price} <span className="text-[11px] font-normal text-[#43474d] dark:text-slate-400">/ sem</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => scrollTo('universities')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-[12px] font-semibold transition-colors cursor-pointer shadow-2xs"
                >
                  {card.explore}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Degree Salary Booster & Interactive ROI Calculator */}
      <CareerRoiCalculator
        onOpenApply={onOpenApply}
        onOpenHelpDesk={onOpenHelpDesk}
      />

      {/* Featured universities */}
      <section id="universities" className="bg-white dark:bg-[#111c2e] rounded-xl border border-slate-200/50 dark:border-slate-800/60 shadow-2xs p-5 sm:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-100 dark:border-slate-800/80 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#115eaf]" />
              <h2 className="text-2xl font-bold text-[#000f22] dark:text-white">Featured NAAC A++ / A+ Online Universities</h2>
            </div>
            <p className="text-[13px] text-[#43474d] dark:text-slate-400 font-normal mt-0.5">
              Strictly ranked and entitled under UGC ODL &amp; Online Regulations.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/universities')}
            className="text-[12px] font-semibold text-[#115eaf] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            View All 50+ Universities
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
          {FEATURED_UNIS.map((u) => (
            <div
              key={u.id}
              className="bg-white dark:bg-[#131f33] rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:border-[#115eaf] dark:hover:border-blue-500/60 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs hover:shadow-xs p-5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3 gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
                    {u.naac}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{u.rank}</span>
                </div>
                <h3 className="text-lg font-bold text-[#000f22] dark:text-white group-hover:text-[#115eaf] dark:group-hover:text-blue-400 transition-colors">{u.name}</h3>
                <p className="text-[12px] text-[#115eaf] dark:text-blue-400 font-medium mt-0.5">{u.short}</p>
                <div className="mt-3.5 space-y-1.5 text-[12px] bg-slate-50/70 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-700/40">
                  {u.rows.map((r) => (
                    <div key={r.label} className="flex justify-between gap-2">
                      <span className="text-[#43474d] dark:text-slate-400">{r.label}</span>
                      <span className={`text-right ${r.tone || 'font-medium text-[#000f22] dark:text-slate-200'}`}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => navigate(`/universities/${u.id}`)}
                  className="w-full py-2 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-[12px] font-semibold transition-colors cursor-pointer shadow-2xs"
                >
                  View Details &amp; Apply
                </button>
                <button
                  type="button"
                  onClick={onOpenHelpDesk}
                  className="w-full py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-[12px] font-medium text-[#43474d] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Brochure
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 100% Online Learning & Examination Journey (How It Works) */}
      <OnlineDegreeJourney
        onOpenApply={onOpenApply}
        onOpenHelpDesk={onOpenHelpDesk}
      />

      {/* Top Colleges by Location */}
      <TopCollegesByLocation onOpenBrochure={onOpenHelpDesk} />

      {/* Recommended College News */}
      <RecommendedCollegeNews onOpenAdvisor={onOpenHelpDesk} />

      {/* Student Testimonials & Social Proof */}
      <StudentTestimonials onOpenCounseling={onOpenHelpDesk} />

      {/* Placement Ecosystem & Top Recruiter Network */}
      <RecruiterEcosystem
        onOpenApply={onOpenApply}
        onOpenHelpDesk={onOpenHelpDesk}
      />

      {/* Comparison matrix */}
      <section id="compare" className="bg-white dark:bg-[#111c2e] rounded-xl border border-slate-200/50 dark:border-slate-800/60 shadow-2xs p-5 sm:p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-[#000f22] dark:text-white">Statutory Equivalence &amp; University Comparison Matrix</h2>
          <p className="text-[13px] text-[#43474d] dark:text-slate-400 font-normal mt-0.5">
            Transparent comparison of key approval parameters, total budget, and examination criteria.
          </p>
        </div>
        <div className="overflow-x-auto border border-slate-200/50 dark:border-slate-700/60 rounded-xl">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/60 text-[#000f22] dark:text-slate-100 border-b border-slate-200/50 dark:border-slate-700/60 font-semibold">
                <th className="p-3">Comparison Parameter</th>
                <th className="p-3 text-[#115eaf] dark:text-blue-400">LPU Online</th>
                <th className="p-3 text-[#115eaf] dark:text-blue-400">Amity Online</th>
                <th className="p-3 text-[#115eaf] dark:text-blue-400">CU Online</th>
                <th className="p-3 text-[#115eaf] dark:text-blue-400">Manipal Jaipur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-normal">
              {COMPARE_ROWS.map((row) => (
                <tr key={row.param} className="hover:bg-blue-50/30 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-medium text-[#111c2d] dark:text-slate-200">{row.param}</td>
                  {row.cells.map((cell, i) => (
                    <td key={i} className={`p-3 ${cell.tone || 'text-[#43474d] dark:text-slate-400 font-medium'}`}>
                      {cell.badge ? (
                        <span className="bg-amber-100/90 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded text-[11px] font-bold">
                          {cell.text}
                        </span>
                      ) : cell.tone === 'text-emerald-700 font-semibold' || cell.tone === 'text-emerald-700' ? (
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          {cell.text}
                        </span>
                      ) : (
                        cell.text
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Counselling Section */}
      <section
        id="counselling"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#071d36] via-[#0d2a4d] to-[#143966] border border-[#1b4372]/60 text-white shadow-sm p-4 sm:p-8 md:p-10"
      >
        {/* Subtle ambient lighting */}
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#115eaf]/25 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Copy & Trust Highlights */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-semibold tracking-wider">
              <Headphones className="w-3.5 h-3.5 text-amber-400" />
              FREE 1-ON-1 ACADEMIC ADVISORY
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight leading-tight">
                Confused Between 50+ Universities? Speak with an Unbiased Academic Expert
              </h2>
              <p className="text-sm sm:text-[15px] text-slate-200 font-normal leading-relaxed max-w-xl">
                Choosing the right online university impacts your career and finances for years. Our certified advisors provide objective comparisons across UGC-DEB entitlements, syllabus depth, recruiter networks, and genuine fee financing — 100% free with zero sales bias.
              </p>
            </div>

            {/* Trust Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-[13px] text-slate-200">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Free &amp; Unbiased Counseling</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Official UGC-DEB &amp; NAAC Data</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>0% Interest Monthly EMI Guidance</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Spam &amp; Complete Privacy</span>
              </span>
            </div>
          </div>

          {/* Right Column: Callback Request Card */}
          <div className="lg:col-span-5 bg-white text-[#111c2d] rounded-2xl p-4 sm:p-6 md:p-7 shadow-xs border border-slate-100/90 dark:border-slate-800">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base sm:text-lg font-bold text-[#000f22] tracking-tight">
                Request Free Callback
              </h3>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Advisors Online
              </span>
            </div>
            <p className="text-xs text-[#555960] font-normal mb-4">
              Connect with a verified academic advisor within 15 minutes.
            </p>

            {!leadSubmitted ? (
              <form
                className="space-y-3.5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setLeadSubmitted(true);
                }}
              >
                <div>
                  <label className="block text-[11px] font-semibold text-[#43474d] uppercase tracking-wider mb-1">
                    Mobile Number (WhatsApp Enabled)
                  </label>
                  <div className="flex h-10 sm:h-11 rounded-lg border border-[#c4c6ce] focus-within:border-[#115eaf] focus-within:ring-2 focus-within:ring-[#115eaf]/20 overflow-hidden transition-all bg-white">
                    <span className="bg-[#f0f4f8] text-[#000f22] px-3 text-xs font-semibold border-r border-[#c4c6ce] flex items-center shrink-0">
                      +91
                    </span>
                    <input
                      className="w-full border-0 px-3 text-xs sm:text-sm text-[#000f22] placeholder:text-[#74777e] outline-none bg-white font-medium"
                      placeholder="98765 43210"
                      required
                      type="tel"
                      value={lead.phone}
                      onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#43474d] uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    className="w-full h-10 sm:h-11 rounded-lg border border-[#c4c6ce] px-3 text-xs sm:text-sm text-[#000f22] placeholder:text-[#74777e] focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 outline-none bg-white font-medium transition-all"
                    placeholder="name@example.com"
                    required
                    type="email"
                    value={lead.email}
                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#43474d] uppercase tracking-wider mb-1">
                    Program You're Exploring
                  </label>
                  <select
                    className="w-full h-10 sm:h-11 rounded-lg border border-[#c4c6ce] px-3 text-xs sm:text-sm text-[#000f22] focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 outline-none bg-white font-medium transition-all cursor-pointer"
                    value={lead.degree}
                    onChange={(e) => setLead({ ...lead, degree: e.target.value })}
                  >
                    <option>Online MBA (Master of Business)</option>
                    <option>Online MCA (Computer Applications)</option>
                    <option>Online BBA (Bachelor of Business)</option>
                    <option>Online BCA (Computer Applications)</option>
                    <option>Online M.Com / B.Com</option>
                    <option>Online MA / BA Programs</option>
                    <option>Executive PG Diploma</option>
                  </select>
                </div>

                <button
                  className="w-full h-11 sm:h-12 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
                  type="submit"
                >
                  <span>Connect with Academic Advisor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-center text-[#74777e] font-normal pt-1">
                  🔒 Strictly confidential. No marketing spam guaranteed.
                </p>
              </form>
            ) : (
              <div className="text-center py-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#000f22]">Callback Request Confirmed!</h3>
                <p className="text-xs text-[#555960] max-w-xs mx-auto">
                  A senior academic counselor will call you within 15 minutes regarding <strong>{lead.degree}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setLeadSubmitted(false)}
                  className="text-xs font-semibold text-[#115eaf] hover:underline pt-2 inline-block cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (Accordion) */}
      <HomeFaq onOpenHelpDesk={onOpenHelpDesk} />
    </div>
  </div>
);
};
