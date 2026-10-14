import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  SlidersHorizontal,
  MapPin,
  Star,
  BadgeCheck,
  CreditCard,
  Monitor,
  Clock,
  Video,
  TrendingUp,
  Download,
  ArrowLeftRight,
  ChevronDown,
  ExternalLink,
  HelpCircle,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  List,
  LayoutGrid,
  Award,
  Globe,
  ClipboardCheck,
  Laptop,
  Hourglass,
  BarChart3,
  Smartphone,
  Handshake,
  Building2,
  Users,
  Brain,
  PiggyBank,
  Briefcase,
  Fuel,
  Trophy,
} from 'lucide-react';
import { DEGREEFYD_LPU_API } from '../data/apiData';

interface UniversitiesViewProps {
  onOpenApply: (courseId?: string) => void;
  onOpenHelpDesk: () => void;
  onOpenBrochure: () => void;
}

const TRENDING = [
  { icon: '🔥', label: 'NAAC A++ Only', id: 'naac' },
  { icon: '📜', label: 'UGC-DEB 100% Entitled', id: 'ugc' },
  { icon: '💰', label: 'Fees under ₹1 Lakh', id: 'fees' },
  { icon: '🎓', label: 'Online MBA Top Picks', id: 'mba' },
  { icon: '💼', label: '100% Placement Support', id: 'placement' },
  { icon: '💳', label: 'Zero Cost EMI', id: 'emi' },
];

const DEGREE_FILTERS = [
  'Postgraduate (MBA, MCA, M.Com)',
  'Undergraduate (BBA, BCA, BA)',
  'Executive & PG Diploma',
];

const APPROVAL_FILTERS = [
  { label: 'UGC-DEB Approved', count: 48, checked: true },
  { label: 'NAAC A++ Grade', count: 18, checked: true },
  { label: 'NAAC A+ Grade', count: 24, checked: false },
  { label: 'AICTE Approved', count: 36, checked: true },
  { label: 'NIRF Top 50 Ranked', count: 12, checked: false },
  { label: 'WES / Global Recognized', count: 15, checked: false },
];

const FEE_RANGES = [
  'Under ₹80,000',
  '₹80,000 - ₹1,50,000',
  '₹1,50,000 - ₹2,50,000',
  'Above ₹2,50,000',
];

const EXAM_MODES = ['100% Online Proctored', 'Designated Center Based'];
const PAYMENT_MODES = ['No-Cost Monthly EMI', 'Pay-Per-Semester Plan'];

const DEGREES = [
  {
    level: 'Postgraduate',
    tone: 'blue' as const,
    price: 'From ₹18,500/sem',
    title: 'Online MBA',
    duration: 'Duration: 2 Years (4 Semesters)',
    count: 'Explore 24+ Universities',
    tracks: ['Finance', 'Marketing', 'Business Analytics', 'HR Management'],
  },
  {
    level: 'Postgraduate',
    tone: 'indigo' as const,
    price: 'From ₹22,000/sem',
    title: 'Online MCA',
    duration: 'Duration: 2 Years (4 Semesters)',
    count: 'Explore 18+ Universities',
    tracks: ['AI & Machine Learning', 'Cloud Computing', 'Full Stack', 'Cyber Security'],
  },
  {
    level: 'Undergraduate',
    tone: 'emerald' as const,
    price: 'From ₹14,000/sem',
    title: 'Online BBA',
    duration: 'Duration: 3 Years (6 Semesters)',
    count: 'Explore 20+ Universities',
    tracks: ['Digital Marketing', 'International Business', 'Banking & Finance', 'General Mgmt'],
  },
  {
    level: 'Undergraduate',
    tone: 'emerald' as const,
    price: 'From ₹15,000/sem',
    title: 'Online BCA',
    duration: 'Duration: 3 Years (6 Semesters)',
    count: 'Explore 16+ Universities',
    tracks: ['Data Science', 'Cyber Security', 'Cloud Architecture', 'Web Dev'],
  },
  {
    level: 'Postgraduate',
    tone: 'blue' as const,
    price: 'From ₹12,000/sem',
    title: 'Online M.Com',
    duration: 'Duration: 2 Years (4 Semesters)',
    count: 'Explore 12+ Universities',
    tracks: ['Accounting & Finance', 'FinTech', 'International Trade', 'Taxation'],
  },
  {
    level: 'Postgraduate',
    tone: 'amber' as const,
    price: 'From ₹11,000/sem',
    title: 'Online MA',
    duration: 'Duration: 2 Years (4 Semesters)',
    count: 'Explore 15+ Universities',
    tracks: ['English', 'Economics', 'Journalism & Mass Comm', 'Psychology'],
  },
];

const VERIFICATION = [
  {
    icon: ShieldCheck,
    tone: 'blue' as const,
    title: 'UGC-DEB Entitlement',
    body: 'Verify whether the university is specifically listed on deb.ugc.ac.in for the specific academic year. Both Category-I institutions and universities with NAAC score ≥ 3.26 are eligible.',
  },
  {
    icon: Award,
    tone: 'amber' as const,
    title: 'NAAC Grading Significance',
    body: 'Institutions holding NAAC A++ (CGPA > 3.51) and NAAC A+ (CGPA > 3.26) maintain the highest pedagogical standard, faculty ratio, digital LMS infrastructure, and research citations.',
  },
  {
    icon: Globe,
    tone: 'emerald' as const,
    title: 'WES & Global Acceptance',
    body: 'Degrees evaluated by World Education Services (WES) are recognized across Canada, USA, UK, and European immigration and postgraduate admission systems identically to on-campus credentials.',
  },
];

const toneMap: Record<string, { badge: string; border: string; text: string; solid: string }> = {
  blue: { badge: 'bg-[#f0f3ff]', border: 'border-[#d5e3ff]', text: 'text-[#115eaf]', solid: 'bg-[#115eaf]' },
  indigo: { badge: 'bg-[#e0e7ff]', border: 'border-[#c7d2fe]', text: 'text-[#3730a3]', solid: 'bg-[#4f46e5]' },
  emerald: { badge: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', solid: 'bg-emerald-600' },
  amber: { badge: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', solid: 'bg-amber-500' },
};

const specIconByLabel: Record<string, typeof Monitor> = {
  'Exam Mode': Monitor,
  Examination: ClipboardCheck,
  Exams: Laptop,
  'Exam Pattern': Laptop,
  'Degree Duration': Clock,
  'Course Duration': Hourglass,
  'Live Sessions': Video,
  'Live Masterclasses': Video,
  'Highest CTC Record': TrendingUp,
  'Avg Package': BarChart3,
  'LMS Delivery': Smartphone,
  'Hiring Partners': Handshake,
  'Corporate Tie-ups': Building2,
  'Global Alumni': Globe,
  'Career Assistance': Users,
  Mentorship: Brain,
  Scholarships: PiggyBank,
  'Job Fair Access': Briefcase,
  Specialization: Fuel,
  'Alumni Status': Trophy,
};

export const UniversitiesView: React.FC<UniversitiesViewProps> = ({
  onOpenApply,
  onOpenHelpDesk,
  onOpenBrochure,
}) => {
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [compared, setCompared] = useState<string[]>(['lpu-online', 'cu-online']);
  const [activeTrending, setActiveTrending] = useState<string | null>(null);
  const [degreeChecked, setDegreeChecked] = useState<boolean[]>([true, true, false]);
  const [approvalChecked, setApprovalChecked] = useState<boolean[]>(
    APPROVAL_FILTERS.map((a) => a.checked)
  );
  const [feeRange, setFeeRange] = useState<number>(1);
  const [examChecked, setExamChecked] = useState<boolean[]>([true, false]);
  const [paymentChecked, setPaymentChecked] = useState<boolean[]>([true, true]);

  const toggleCompare = (id: string) => {
    setCompared((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  return (
    <div className="pb-20 md:pb-8">
      {/* ================= HERO & DISCOVERY SEARCH BAR ================= */}
      <section className="bg-gradient-to-b from-[#f0f3ff] via-white to-[#f9f9ff] border-b border-[#e7eeff] pt-4 sm:pt-8 pb-4 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-7">
            <h1 className="font-sans text-2xl sm:text-[32px] lg:text-[36px] font-bold text-[#000f22] tracking-tight leading-snug">
              Explore Top UGC-DEB Approved Online Universities in India
            </h1>
            <p className="font-sans text-sm text-[#43474d] font-normal leading-relaxed mt-2.5 max-w-2xl mx-auto">
              Compare verified universities, programs, fees,
              <br className="hidden sm:block" /> and admission details — all in one place.
            </p>
          </div>

          {/* Search Console */}
          <div className="bg-white rounded-2xl p-4 md:p-5 border border-[#d5e3ff] shadow-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-6 relative flex items-center">
                <Search className="absolute left-3.5 text-[#115eaf] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search university, degree (e.g. LPU, Amity, Online MBA)..."
                  className="w-full pl-10 pr-4 py-3 bg-[#f9f9ff] rounded-xl border border-[#c4c6ce] text-[#000f22] placeholder:text-[#74777e] text-sm focus:outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 transition-all font-normal"
                />
              </div>

              <div className="md:col-span-4 relative flex items-center">
                <span className="absolute left-3.5 text-[#115eaf] pointer-events-none">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                    <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
                  </svg>
                </span>
                <select className="w-full pl-10 pr-8 py-3 bg-[#f9f9ff] rounded-xl border border-[#c4c6ce] text-[#000f22] text-sm focus:outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 transition-all appearance-none cursor-pointer font-normal">
                  <option value="all">All Degree Categories</option>
                  <option value="management">Management (MBA, BBA, Executive)</option>
                  <option value="technology">Technology &amp; IT (MCA, BCA, M.Sc)</option>
                  <option value="commerce">Commerce &amp; Finance (M.Com, B.Com)</option>
                  <option value="arts">Arts &amp; Humanities (MA, BA, Journalism)</option>
                </select>
                <ChevronDown className="absolute right-3 text-[#74777e] pointer-events-none w-4 h-4" />
              </div>

              <div className="md:col-span-2">
                <button className="w-full h-full py-3 px-4 bg-[#115eaf] hover:bg-[#004689] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all">
                  <span>Find Univs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Trending pills */}
            <div className="flex items-center gap-2 pt-3.5 mt-3 border-t border-[#e7eeff] overflow-x-auto hide-scrollbar">
              <span className="text-[11px] text-[#74777e] uppercase font-semibold whitespace-nowrap">
                Trending:
              </span>
              {TRENDING.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTrending(activeTrending === t.id ? null : t.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] transition-colors whitespace-nowrap font-medium border ${
                    activeTrending === t.id
                      ? 'bg-[#115eaf] text-white border-[#115eaf]'
                      : 'bg-white text-[#000f22] border-[#d5e3ff] hover:bg-[#f0f3ff] hover:border-[#115eaf]'
                  }`}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN: FILTERS + LISTING ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDEBAR FILTERS */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-[#d5e3ff] p-5 shadow-xs sticky top-20 hidden lg:block">
            <div className="flex items-center justify-between pb-4 border-b border-[#e7eeff]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#115eaf]" />
                <span className="text-sm font-bold text-[#000f22]">Filters</span>
                <span className="bg-[#f0f3ff] text-[#115eaf] text-[11px] font-bold px-2 py-0.5 rounded-full">
                  5 Active
                </span>
              </div>
              <button
                onClick={() => {
                  setDegreeChecked([true, true, false]);
                  setApprovalChecked(APPROVAL_FILTERS.map((a) => a.checked));
                  setFeeRange(1);
                  setExamChecked([true, false]);
                  setPaymentChecked([true, true]);
                }}
                className="text-[#115eaf] text-xs hover:underline font-semibold"
              >
                Reset
              </button>
            </div>

            <div className="pt-4 divide-y divide-[#e7eeff]">
              {/* Degree Level */}
              <div className="pb-5">
                <h2 className="text-xs font-bold text-[#000f22] uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Degree Level</span>
                  <ChevronDown className="w-4 h-4 text-[#74777e]" />
                </h2>
                <div className="space-y-2.5">
                  {DEGREE_FILTERS.map((d, i) => (
                    <label key={d} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={degreeChecked[i]}
                        onChange={() =>
                          setDegreeChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
                        }
                        className="w-4 h-4 rounded text-[#115eaf] border-[#c4c6ce]"
                      />
                      <span className="text-[13px] font-normal text-[#000f22]">{d}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Approvals */}
              <div className="py-5">
                <h2 className="text-xs font-bold text-[#000f22] uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Approvals &amp; Accreditations</span>
                  <ChevronDown className="w-4 h-4 text-[#74777e]" />
                </h2>
                <div className="space-y-2.5">
                  {APPROVAL_FILTERS.map((a, i) => (
                    <label key={a.label} className="flex items-center justify-between cursor-pointer">
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={approvalChecked[i]}
                          onChange={() =>
                            setApprovalChecked((prev) =>
                              prev.map((v, idx) => (idx === i ? !v : v))
                            )
                          }
                          className="w-4 h-4 rounded text-[#115eaf] border-[#c4c6ce]"
                        />
                        <span className="text-[13px] font-normal text-[#000f22]">{a.label}</span>
                      </span>
                      <span className="text-[11px] font-semibold text-[#74777e] bg-[#f0f3ff] px-2 py-0.5 rounded-full">
                        {a.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fee */}
              <div className="py-5">
                <h2 className="text-xs font-bold text-[#000f22] uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Total Course Fee</span>
                  <ChevronDown className="w-4 h-4 text-[#74777e]" />
                </h2>
                <div className="space-y-2">
                  {FEE_RANGES.map((f, i) => (
                    <label key={f} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="radio"
                        name="fee_filter"
                        checked={feeRange === i}
                        onChange={() => setFeeRange(i)}
                        className="w-4 h-4 text-[#115eaf] border-[#c4c6ce]"
                      />
                      <span className="text-[13px] font-normal text-[#000f22]">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Exam Mode */}
              <div className="py-5">
                <h2 className="text-xs font-bold text-[#000f22] uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Examination Mode</span>
                  <ChevronDown className="w-4 h-4 text-[#74777e]" />
                </h2>
                <div className="space-y-2.5">
                  {EXAM_MODES.map((m, i) => (
                    <label key={m} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={examChecked[i]}
                        onChange={() =>
                          setExamChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
                        }
                        className="w-4 h-4 rounded text-[#115eaf] border-[#c4c6ce]"
                      />
                      <span className="text-[13px] font-normal text-[#000f22]">{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div className="pt-5">
                <h2 className="text-xs font-bold text-[#000f22] uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Payment Flexibility</span>
                  <ChevronDown className="w-4 h-4 text-[#74777e]" />
                </h2>
                <div className="space-y-2.5">
                  {PAYMENT_MODES.map((m, i) => (
                    <label key={m} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={paymentChecked[i]}
                        onChange={() =>
                          setPaymentChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
                        }
                        className="w-4 h-4 rounded text-[#115eaf] border-[#c4c6ce]"
                      />
                      <span className="text-[13px] font-normal text-[#000f22]">{m}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar promo */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-[#f0f3ff] to-[#e7eeff] border border-[#d5e3ff] shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#115eaf] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#000f22]">Confused about approvals?</h3>
                  <p className="text-xs font-normal text-[#43474d] mt-1 leading-snug">
                    Talk to an unbiased UGC counsellor to verify your degree validity and fee waivers.
                  </p>
                  <button
                    onClick={onOpenHelpDesk}
                    className="mt-2.5 text-xs font-semibold text-[#115eaf] hover:underline inline-flex items-center"
                  >
                    <span>Book 1-on-1 Call</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT LISTINGS */}
          <section className="lg:col-span-9 space-y-4 sm:space-y-5" id="university-listings-container">
            {/* Toolbar */}
            <div className="bg-white p-3.5 px-4 rounded-xl border border-[#d5e3ff] flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#000f22]">
                  Showing {DEGREEFYD_LPU_API.onlineUniversities.length} Verified Universities
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c4c6ce]" />
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                  100% Entitled
                </span>
              </div>
              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#74777e] font-medium hidden sm:inline">
                    Sort By:
                  </span>
                  <select className="py-1.5 px-3 bg-white rounded-lg border border-[#c4c6ce] text-[#000f22] text-xs font-medium focus:ring-1 focus:ring-[#115eaf] cursor-pointer">
                    <option>NIRF Ranking (Top First)</option>
                    <option>Fee: Low to High</option>
                    <option>Student Rating</option>
                    <option>Most Applied Programs</option>
                  </select>
                </div>
                <div className="flex items-center border border-[#c4c6ce] rounded-lg p-0.5 bg-[#f0f3ff]">
                  <button
                    onClick={() => setView('list')}
                    title="List View"
                    aria-label="Switch to List View"
                    className={`p-1.5 rounded-md transition-all duration-150 cursor-pointer flex items-center justify-center ${
                      view === 'list'
                        ? 'bg-[#115eaf] text-white shadow-xs'
                        : 'text-[#74777e] hover:text-[#000f22] hover:bg-[#dee8ff]'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView('grid')}
                    title="Grid View"
                    aria-label="Switch to Grid View"
                    className={`p-1.5 rounded-md transition-all duration-150 cursor-pointer flex items-center justify-center ${
                      view === 'grid'
                        ? 'bg-[#115eaf] text-white shadow-xs'
                        : 'text-[#74777e] hover:text-[#000f22] hover:bg-[#dee8ff]'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* University cards */}
            <div
              className={
                view === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-5 transition-all duration-300'
                  : 'space-y-5'
              }
            >
              {DEGREEFYD_LPU_API.onlineUniversities.map((u) => (
                <article
                  key={u.id}
                  onClick={() => navigate(`/universities/${u.id}`)}
                  className="bg-white rounded-2xl border border-[#d5e3ff] p-5 md:p-6 shadow-xs hover:shadow-xl hover:border-[#115eaf] transition-all duration-300 relative flex flex-col cursor-pointer"
                >
                  {/* Top row: identity + fee */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#e7eeff]">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#f0f3ff] border border-[#d5e3ff] flex flex-col items-center justify-center shrink-0 shadow-xs overflow-hidden">
                        {u.logoImage ? (
                          <img
                            src={u.logoImage}
                            alt={`${u.short} Logo`}
                            className="w-14 h-14 object-contain rounded-lg bg-white p-1"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : u.isLpu ? (
                          <img
                            src={DEGREEFYD_LPU_API.hero.logoImage}
                            alt="LPU Logo"
                            className="w-14 h-14 object-contain rounded-lg bg-white p-1"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <>
                            <span className="text-lg font-bold text-[#115eaf] tracking-tight">
                              {u.short}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider font-semibold text-[#43474d] -mt-0.5">
                              Online
                            </span>
                          </>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h2 className="text-base sm:text-lg font-bold text-[#000f22] leading-snug">
                            {u.name}
                          </h2>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
                              toneMap[u.highlight.tone].badge
                            } ${toneMap[u.highlight.tone].text} ${toneMap[u.highlight.tone].border}`}
                          >
                            <BadgeCheck className="w-3 h-3" />
                            {u.highlight.text}
                          </span>
                        </div>

                        <p className="text-[13px] font-normal text-[#43474d] flex items-center gap-2 flex-wrap">
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3.5 h-3.5 text-[#74777e]" />
                            {u.location}
                          </span>
                          <span>•</span>
                          <span>{u.established}</span>
                          <span>•</span>
                          <span className="text-[#B45309] font-semibold">{u.rankNote}</span>
                        </p>

                        <div className={`flex flex-wrap items-center ${u.isLpu || u.id === 'cu-online' ? 'gap-1.5' : 'gap-2'} mt-2.5`}>
                          <span className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-[11px] font-semibold flex items-center gap-1 shadow-xs">
                            <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
                            {u.naac}
                          </span>
                          {u.approvals.map((a) => (
                            <span
                              key={a}
                              className="px-2.5 py-1 bg-[#f0f3ff] text-[#115eaf] border border-[#d5e3ff] rounded-lg text-[11px] font-semibold"
                            >
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Fee box */}
                    <div className="text-left md:text-right bg-[#f9f9ff] md:bg-transparent p-3.5 md:p-0 rounded-xl shrink-0 border md:border-0 border-[#e7eeff]">
                      <span className="block text-[11px] text-[#74777e] font-semibold uppercase">
                        Total Program Fee
                      </span>
                      <div className="text-xl font-bold text-[#000f22]">
                        {u.feeLabel}{' '}
                        <span className="text-xs text-[#43474d] font-normal">onwards</span>
                      </div>
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 mt-1 bg-emerald-50 text-emerald-800 rounded-full text-[11px] font-semibold border border-emerald-200/60 shadow-xs">
                        <CreditCard className="w-3 h-3" />
                        EMI starts {u.emi}
                      </div>
                    </div>
                  </div>

                  {/* Spec grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3.5 my-2 bg-[#f9f9ff] rounded-xl px-4 border border-[#e7eeff] text-center sm:text-left">
                    {u.specs.map((s) => {
                      const Icon = specIconByLabel[s.label] || Monitor;
                      return (
                        <div key={s.label}>
                          <span className="text-[11px] text-[#74777e] font-semibold uppercase block">
                            {s.label}
                          </span>
                          <span
                            className={`text-[13px] font-medium flex items-center justify-center sm:justify-start gap-1 mt-0.5 ${
                              s.highlight ? 'text-emerald-700' : 'text-[#000f22]'
                            }`}
                          >
                            <Icon
                              className={`w-3.5 h-3.5 ${
                                s.highlight ? 'text-emerald-600' : 'text-[#115eaf]'
                              }`}
                            />
                            {s.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tracks + CTAs */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-[#74777e] uppercase font-semibold mr-1">
                        Popular Tracks:
                      </span>
                      {u.tracks.map((t) => (
                        <span
                          key={t}
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-1 bg-white border border-[#d5e3ff] rounded-full text-xs font-medium text-[#000f22] hover:border-[#115eaf] transition-colors cursor-pointer"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <label 
                        className="flex items-center gap-1.5 text-[13px] font-medium text-[#43474d] cursor-pointer mr-2 select-none hover:text-[#000f22]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={compared.includes(u.id)}
                          onChange={() => toggleCompare(u.id)}
                          className="w-4 h-4 rounded text-[#115eaf] border-[#c4c6ce]"
                        />
                        <span>Compare</span>
                      </label>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBrochure();
                        }}
                        className="px-3.5 py-2 rounded-xl bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#000f22] text-xs font-semibold border border-[#d5e3ff] transition-colors flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        <span>Brochure</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenApply();
                        }}
                        className="px-4 py-2 rounded-xl bg-[#115eaf] hover:bg-[#004689] text-white text-xs font-semibold transition-all shadow-sm active:scale-95 flex items-center gap-1"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-6 border-t border-[#e7eeff]">
              <button className="px-4 py-2 rounded-lg bg-white border border-[#d5e3ff] text-[#43474d] hover:text-[#000f22] text-xs font-medium flex items-center gap-1 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              <div className="flex items-center gap-1">
                <button className="w-9 h-9 rounded-lg bg-[#115eaf] text-white text-xs font-semibold">1</button>
                <button className="w-9 h-9 rounded-lg hover:bg-[#f0f3ff] text-[#000f22] text-xs font-medium">
                  2
                </button>
                <button className="w-9 h-9 rounded-lg hover:bg-[#f0f3ff] text-[#000f22] text-xs font-medium">
                  3
                </button>
                <span className="px-2 text-[#74777e]">...</span>
                <button className="w-9 h-9 rounded-lg hover:bg-[#f0f3ff] text-[#000f22] text-xs font-medium">
                  8
                </button>
              </div>
              <button className="px-4 py-2 rounded-lg bg-white border border-[#d5e3ff] text-[#115eaf] text-xs font-medium flex items-center gap-1 hover:bg-[#f0f3ff] transition-colors">
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* ================= COMPARISON MATRIX PREVIEW ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-3 sm:pb-4">
        <div className="bg-white rounded-2xl border border-[#d5e3ff] p-5 md:p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#e7eeff]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f0f3ff] text-[#115eaf] text-[11px] font-semibold mb-1">
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>Quick Decision Matrix</span>
              </div>
              <h2 className="text-lg font-bold text-[#000f22]">
                Side-by-Side Comparison: Top Online Universities
              </h2>
              <p className="text-[13px] font-normal text-[#43474d] mt-0.5">
                Analyze accreditations, total fee structures, exam patterns, and LMS delivery across
                leading contenders.
              </p>
            </div>
            <button
              onClick={onOpenHelpDesk}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#115eaf] text-white text-xs font-semibold hover:bg-[#004689] shadow-sm transition-all active:scale-95 shrink-0 self-start md:self-auto"
            >
              <span>Compare Full Details</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {DEGREEFYD_LPU_API.onlineUniversities.slice(0, 3).map((u) => (
              <div
                key={`matrix-${u.id}`}
                className="rounded-xl p-4 bg-[#f9f9ff] border border-[#e7eeff] hover:border-[#d5e3ff] transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#d5e3ff] flex items-center justify-center shrink-0">
                    {u.isLpu ? (
                      <img
                        src={DEGREEFYD_LPU_API.hero.logoImage}
                        alt="LPU Logo"
                        className="w-9 h-9 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-xs font-bold text-[#115eaf]">{u.short}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#000f22] leading-snug">
                      {u.name.split(' (')[0]}
                    </h3>
                    <span className="text-[11px] text-[#115eaf] font-semibold">{u.naac}</span>
                  </div>
                </div>
                <div className="space-y-2 text-xs border-t border-[#e7eeff] pt-3">
                  <div className="flex justify-between">
                    <span className="text-[#74777e]">Total Fee:</span>
                    <span className="font-semibold text-[#000f22]">{u.feeLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#74777e]">Monthly EMI:</span>
                    <span className="font-semibold text-emerald-700">{u.emi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#74777e]">Exam Mode:</span>
                    <span className="font-medium text-[#000f22]">{u.specs[0].value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#74777e]">Location:</span>
                    <span className="font-medium text-[#000f22]">{u.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => onOpenApply()}
                  className="w-full mt-3 py-1.5 px-3 rounded-lg bg-white hover:bg-[#115eaf] hover:text-white text-[#115eaf] text-xs font-semibold border border-[#d5e3ff] transition-colors flex items-center justify-center gap-1"
                >
                  <span>View {u.short} Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DEGREES GRID ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="bg-white rounded-2xl border border-[#d5e3ff] p-5 md:p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] text-[#115eaf] uppercase font-bold tracking-wider">
                High-Impact Academic Degrees
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#000f22] mt-1">
                Explore Top Online Degrees &amp; Specializations
              </h2>
              <p className="text-sm font-normal text-[#43474d] mt-1.5">
                Find UGC-DEB entitled programs recognized by corporates and global licensing boards
                across industries.
              </p>
            </div>
            <button
              onClick={onOpenHelpDesk}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f0f3ff] hover:bg-[#115eaf] hover:text-white text-[#115eaf] text-xs font-semibold transition-colors self-start md:self-auto"
            >
              <span>Degree Advisory</span>
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEGREES.map((d) => {
              const tone = toneMap[d.tone];
              return (
                <div
                  key={d.title}
                  className="p-5 rounded-2xl bg-[#f9f9ff] border border-[#e7eeff] hover:shadow-md hover:border-[#115eaf] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${tone.badge} ${tone.text} ${tone.border}`}
                      >
                        {d.level}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700">{d.price}</span>
                    </div>
                    <h3 className="text-[17px] font-bold text-[#000f22]">{d.title}</h3>
                    <p className="text-xs text-[#74777e] font-normal mt-0.5">{d.duration}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                      {d.tracks.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-white border border-[#e7eeff] rounded-md text-[11px] text-[#43474d]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenApply()}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#115eaf] hover:text-white text-[#115eaf] text-xs font-semibold border border-[#d5e3ff] transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    <span>{d.count}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= VERIFICATION EXPLAINER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 md:py-12">
        <div className="bg-white rounded-2xl border border-[#d5e3ff] p-6 md:p-8 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] text-[#115eaf] uppercase font-bold tracking-wider">
              Government Regulatory Framework
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#000f22] mt-1">
              How to Verify Online Degree Entitlements
            </h2>
            <p className="text-sm font-normal text-[#43474d] mt-2 leading-relaxed">
              As per the UGC (Open and Distance Learning Programmes and Online Programmes)
              Regulations, online degrees from entitled higher education institutions have full
              equivalence with conventional on-campus degrees for govt jobs, higher studies, and
              global corporate employment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VERIFICATION.map((v) => {
              const tone = toneMap[v.tone];
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="p-5 rounded-xl bg-[#f9f9ff] border border-[#e7eeff]"
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${tone.badge} ${tone.text} flex items-center justify-center mb-3`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#000f22]">{v.title}</h3>
                  <p className="text-[13px] font-normal text-[#43474d] mt-1.5 leading-relaxed">
                    {v.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FLOATING COMPARE DOCK ================= */}
      {compared.length > 0 && (
        <div className="fixed bottom-16 md:bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-4xl bg-[#0b2540] text-white rounded-xl shadow-2xl p-3 md:p-4 border border-[#314865] flex items-center justify-between transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#115eaf] text-white flex items-center justify-center">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">University Comparison Tray</span>
                <span className="bg-amber-400 text-[#2f1500] font-bold text-[11px] px-2 py-0.5 rounded-full">
                  {compared.length} Selected
                </span>
              </div>
              <span className="text-xs font-normal text-[#b1c8eb] hidden sm:block">
                Select up to 3 universities to compare approvals, fees, and semesters
                side-by-side.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCompared([])}
              className="text-xs text-[#c4c6ce] hover:text-white underline px-2 hidden sm:inline"
            >
              Clear
            </button>
            <button
              onClick={onOpenHelpDesk}
              className="px-4 py-2 bg-[#115eaf] hover:bg-[#dee8ff] hover:text-[#004689] text-white text-xs font-semibold rounded-lg shadow-sm transition-all active:scale-95 flex items-center gap-1"
            >
              <span>Compare Now</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* hide-scrollbar utility */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};
