import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  Newspaper,
  Flame,
  Clock,
  Bookmark,
  Share2,
  ThumbsUp,
  ArrowRight,
  X,
  Search,
  Check,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Bell,
  ShieldCheck,
  Award,
  Layers,
  ExternalLink,
} from 'lucide-react';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  category: 'Admissions' | 'Exams' | 'UGC Updates' | 'Placements' | 'Scholarships';
  source: string;
  imageUrl: string;
  publishedAt: string;
  readTime: string;
  isTrending?: boolean;
  isBreaking?: boolean;
  upvotes: number;
  tags: string[];
  keyTakeaways: string[];
  deadline?: string;
  verifiedOfficial?: boolean;
}

const NEWS_DATA: NewsArticle[] = [
  {
    id: 'ugc-online-equivalence-2026',
    title: 'UGC Re-affirms 100% Equivalence: Online & Distance Degrees at Par with Conventional On-Campus Programs',
    summary: 'The University Grants Commission has issued an advisory clarifying that degrees acquired through UGC-DEB entitled Online & ODL modes are legally identical to conventional degrees for UPSC, SSC, and corporate recruitments.',
    fullContent: `In its latest institutional gazette notification, the University Grants Commission (UGC) reiterated Regulation 22 of the UGC (Open and Distance Learning Programmes and Online Programmes) Regulations. 

Key clarification points include:
1. Complete Employment Validity: Degrees awarded by UGC-recognized higher educational institutions through online/distance mode hold equal status as physical campus degrees across all Central & State government job applications, including UPSC Civil Services, Banking (IBPS), State PSCs, and Defense exams.
2. Higher Education Admissions: Students completing online undergraduate or postgraduate programs are fully eligible to apply for Master's, M.Phil, or Ph.D. programs at any recognized university in India and abroad.
3. Transcript Standardization: Institutions are strictly prohibited from adding discriminatory notations that degrade the degree's statutory standing on grade sheets or final degree certificates.`,
    category: 'UGC Updates',
    source: 'UGC Official Gazette',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    publishedAt: '25 mins ago',
    readTime: '3 min read',
    isTrending: true,
    isBreaking: true,
    upvotes: 184,
    tags: ['UGC-DEB', 'Govt Jobs', 'Equivalence', 'Career Security'],
    keyTakeaways: [
      'Legal parity with regular campus degrees for all UPSC and Govt exams.',
      'Recognized by Indian and international universities for higher studies.',
      'Institutions must maintain strict quality benchmarks equivalent to NAAC A+ standards.'
    ],
    verifiedOfficial: true,
  },
  {
    id: 'online-mba-placement-report-2026',
    title: 'Top Online MBA Colleges Report 38% Hike in Average CTC: Tech & BFSI Lead Hiring Surge',
    summary: 'Graduates from accredited online MBA institutions such as Manipal, Amity, and NMIMS witnessed strong corporate demand, with average salary packages reaching ₹8.5 LPA and top offers touching ₹22 LPA.',
    fullContent: `The annual Placement & Executive Career Mobility Report 2026 reveals unprecedented hiring demand for working professionals holding accredited online MBA credentials. 

Leading recruiters from consulting, enterprise tech, and fintech reported high satisfaction with distance learners who demonstrate self-discipline and simultaneous on-the-job experience.

Key Insights:
- Average Salary Surge: Learners experienced an average compensation hike of 38% within 6 months of graduation.
- Top Specializations: Data Analytics, FinTech, Digital Marketing, and Supply Chain Management topped the recruiter preference index.
- Corporate Tie-Ups: Over 450 Fortune-500 and mid-market firms now actively host dedicated virtual placement drives for online MBA cohorts.`,
    category: 'Placements',
    source: 'Degreefyed Analytics Bureau',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    publishedAt: '1 hour ago',
    readTime: '4 min read',
    isTrending: true,
    upvotes: 142,
    tags: ['Online MBA', 'Placement Record', 'ROI', 'Highest CTC'],
    keyTakeaways: [
      'Average compensation jump of 38% post-course completion.',
      'Fintech and Data Science specializations attracted the highest compensation packages.',
      'Virtual placement drives organized with 450+ verified corporate hiring partners.'
    ],
    verifiedOfficial: true,
  },
  {
    id: 'cuet-nimcet-admission-window-2026',
    title: 'Spring 2026 Admissions: Final Call for Manipal, Jain, and LPU Online Priority Applications',
    summary: 'Universities have opened their scholarship-backed priority intake window for 2026 semesters. Early applicants are eligible for up to 30% tuition waivers under early bird institutional schemes.',
    fullContent: `Top NAAC A++ and A+ accredited online universities have entered the final cycle of their Spring 2026 admissions. Candidates seeking entry into MCA, BCA, MBA, BBA, and M.Com can avail structured installments and zero-cost EMI plans.

Important Guidelines for Applicants:
- Documentation Needed: Scanned copies of 10th/12th marks card, graduation degree certificate (for PG), and government photo ID (Aadhaar).
- Zero Cost EMI: Pre-approved 0% interest educational financing with tenures between 6 to 24 months available without collateral.
- LMS Orientation: Enrolled candidates receive immediate preview access to interactive virtual lecture halls, recorded sessions, and global digital libraries.`,
    category: 'Admissions',
    source: 'University Admissions Desk',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    publishedAt: '3 hours ago',
    readTime: '2 min read',
    isBreaking: false,
    upvotes: 96,
    tags: ['Admissions 2026', 'Zero Cost EMI', 'Manipal', 'Amity', 'LPU'],
    deadline: 'April 30, 2026',
    keyTakeaways: [
      'Early bird scholarship grants between 15% and 30% available on first semester tuition.',
      'Flexible 0% interest monthly installment plans without collateral.',
      'Instant document verification & LMS preview access.'
    ],
    verifiedOfficial: true,
  },
  {
    id: 'scholarship-women-in-tech-2026',
    title: 'National Women in Tech & Defense Personnel Scholarships Announced for Online MCA & BCA',
    summary: 'A new ₹12 Crore national scholarship corpus has been instituted across partner universities, offering up to 50% tuition subsidies for women coders and armed forces dependents.',
    fullContent: `To foster gender diversity in STEM and honor armed forces personnel, partner universities have unveiled special scholarship categories for the 2026 academic calendar.

Eligible Beneficiaries:
1. Women in Technology Scholarship: 25% to 50% flat fee discount for female candidates applying to Online BCA, MCA, and M.Sc Computer Science.
2. Defense & Paramilitary Concession: 20% lifetime concession across all semester fees for active personnel, veterans, and their direct dependents.
3. Merit-Cum-Means Grant: Students with 75%+ in prior qualifying degrees receive automatic merit tier upgrades.`,
    category: 'Scholarships',
    source: 'National Higher Ed Fund',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    publishedAt: '5 hours ago',
    readTime: '3 min read',
    isTrending: false,
    upvotes: 88,
    tags: ['Scholarships', 'Women in Tech', 'Defense Concession', 'MCA/BCA'],
    deadline: 'Rolling Admissions',
    keyTakeaways: [
      'Tuition waivers from 25% up to 50% for eligible female IT aspirants.',
      'Special 20% concession across all semesters for military/defense personnel.',
      'Simple online document submission with instant eligibility verification.'
    ],
    verifiedOfficial: true,
  },
  {
    id: 'exam-reform-proctored-anywhere-2026',
    title: 'AI-Proctored Exams: UGC Approves Flexible Weekend Testing Windows for Working Professionals',
    summary: 'Students enrolled in accredited online degree programs can now schedule term-end examinations on Saturdays and Sundays from home using dual-camera AI proctoring systems.',
    fullContent: `In a landmark move to assist working executives and remote learners, educational boards have standardized secure home-based AI proctoring protocols for semester exams.

How the Testing Works:
- Flexible Slot Selection: Students choose their preferred examination time slots between Friday 6:00 PM and Sunday 10:00 PM.
- Secure 360° AI Monitoring: Dual video feeds monitor workspace integrity, with human proctors available via live chat for instant support.
- Re-Attempt Window: Provision for technical disruption recovery ensures zero candidate disadvantage in case of power or connectivity loss.`,
    category: 'Exams',
    source: 'UGC Examination Committee',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    publishedAt: '1 day ago',
    readTime: '3 min read',
    isTrending: true,
    upvotes: 119,
    tags: ['Online Exams', 'AI Proctoring', 'Weekend Slots', 'Working Execs'],
    keyTakeaways: [
      'Take semester finals from home during convenient weekend time slots.',
      'Continuous AI and human proctoring ensures strict institutional integrity.',
      'Frees students from visiting distant physical examination centers.'
    ],
    verifiedOfficial: true,
  },
  {
    id: 'foreign-university-credit-transfer',
    title: 'Credit Transfer Accord: Online Degree Credits Now Recognized by 40+ UK & US Universities',
    summary: 'Indian online bachelor’s and master’s degree holders can now transfer credits into foreign postgraduate diploma and master’s programs under the National Credit Framework (NCrF).',
    fullContent: `The internationalization of Indian higher education reached a new milestone as over 40 prominent universities across the United Kingdom, United States, Canada, and Australia recognized course credits earned via approved Indian online degrees.

Key Benefits for Students:
- Seamless Pathway to Abroad Studies: Complete Year 1 online in India at 1/5th the cost, transfer credits, and finish Year 2 abroad on campus.
- Post-Study Work Visa Eligibility: Fulfills international university credit prerequisite equivalences.
- Verified WES Accreditation: Degrees qualify for World Education Services (WES) credential evaluation for immigration and higher studies.`,
    category: 'UGC Updates',
    source: 'Global Higher Ed Council',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2 days ago',
    readTime: '4 min read',
    isTrending: false,
    upvotes: 165,
    tags: ['Global Recognition', 'Credit Transfer', 'Study Abroad', 'WES Validated'],
    keyTakeaways: [
      'Transfer credits from Indian online degrees directly to overseas Master’s.',
      'Save up to 60% on total tuition costs via blended pathway models.',
      'Full WES and international equivalence for visa and employment.'
    ],
    verifiedOfficial: true,
  },
  {
    id: 'nirf-2026-online-standings',
    title: 'NIRF 2026 Rankings: Multi-Disciplinary Digital Learning Centers See Landmark Score Boost',
    summary: 'The Ministry of Education highlighted enhanced digital infrastructure, peer engagement, and placement outcomes as key factors powering the rise of online university divisions.',
    fullContent: `In the latest annual release of the National Institutional Ranking Framework (NIRF), universities investing in cutting-edge LMS portals, live virtual labs, and corporate masterclasses registered the highest gains.`,
    category: 'Admissions',
    source: 'NIRF Analytics Wing',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    publishedAt: '3 days ago',
    readTime: '3 min read',
    isTrending: false,
    upvotes: 94,
    tags: ['NIRF Ranking', 'Top Colleges', 'Accreditation', 'Government Report'],
    keyTakeaways: [
      'Rigorous evaluation metrics ensuring student support quality.',
      'Focus on LMS infrastructure and faculty accessibility.',
      'Verified NAAC A++ institutions lead nationwide adoption.'
    ],
    verifiedOfficial: true,
  },
  {
    id: 'ai-data-science-curriculum-upgrade',
    title: 'AI & Data Science Modules Integrated Across Accredited Online MCA & BCA Curriculums',
    summary: 'Leading universities have revamped tech syllabuses with hands-on GenAI, Cloud Computing, and Machine Learning labs co-designed with top tier technology employers.',
    fullContent: `In response to rising demand for job-ready software engineers, partner universities have modernized their computer applications curriculum to include industry-aligned project portfolios and capstone challenges.`,
    category: 'Placements',
    source: 'Industry Tech Forum',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    publishedAt: '4 days ago',
    readTime: '3 min read',
    isTrending: true,
    upvotes: 128,
    tags: ['GenAI', 'Online MCA', 'Tech Careers', 'Capstone Projects'],
    keyTakeaways: [
      'Practical GenAI & Cloud Computing modules included in standard tuition.',
      'Industry capstones evaluated by senior tech architects.',
      'Prepares candidates for high-paying remote and hybrid software roles.'
    ],
    verifiedOfficial: true,
  },
];

const CATEGORIES = [
  'All News',
  'Admissions',
  'Exams',
  'UGC Updates',
  'Placements',
  'Scholarships',
] as const;

interface RecommendedCollegeNewsProps {
  onOpenAdvisor?: () => void;
}

export const RecommendedCollegeNews: React.FC<RecommendedCollegeNewsProps> = ({ onOpenAdvisor }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All News');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [tickerIndex, setTickerIndex] = useState<number>(0);
  const [isExpandedView, setIsExpandedView] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  // Carousel ref and scroll states
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Article removed from saved bookmarks');
      } else {
        next.add(id);
        showToast('Article saved to reading list 🔖');
      }
      return next;
    });
  };

  const toggleUpvote = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setUpvotedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        showToast('Marked as helpful 👍');
      }
      return next;
    });
  };

  const handleShare = (article: NewsArticle, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${article.title} - Read more on Degreefyed`);
      showToast('Article link copied to clipboard! 📋');
    } else {
      showToast('Sharing link prepared');
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    setNewsletterSubscribed(true);
    showToast('Subscribed to Live Admission & UGC Alerts! 🔔');
  };

  // Filtered news items
  const filteredArticles = useMemo(() => {
    return NEWS_DATA.filter((article) => {
      const matchesCategory =
        activeCategory === 'All News' || article.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Update carousel scroll buttons state
  const checkScrollState = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(scrollLeft / maxScroll);
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    checkScrollState();
    el.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);
    return () => {
      el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, [filteredArticles, isExpandedView]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const offset = direction === 'left' ? -380 : 380;
    carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Breaking ticker items
  const tickerItems = useMemo(
    () => NEWS_DATA.filter((n) => n.isBreaking || n.isTrending),
    []
  );

  const nextTicker = () => {
    setTickerIndex((prev) => (prev + 1) % tickerItems.length);
  };

  const prevTicker = () => {
    setTickerIndex((prev) => (prev - 1 + tickerItems.length) % tickerItems.length);
  };

  const currentTicker = tickerItems[tickerIndex] || tickerItems[0];

  const getCategoryBadgeColor = (category: NewsArticle['category']) => {
    switch (category) {
      case 'UGC Updates':
        return 'bg-purple-600/90 text-white';
      case 'Placements':
        return 'bg-emerald-600/90 text-white';
      case 'Admissions':
        return 'bg-[#115eaf]/90 text-white';
      case 'Exams':
        return 'bg-amber-600/90 text-white';
      case 'Scholarships':
        return 'bg-rose-600/90 text-white';
      default:
        return 'bg-slate-700/90 text-white';
    }
  };

  return (
    <section className="bg-white dark:bg-[#111c2e] rounded-xl border border-slate-200/50 dark:border-slate-800/60 shadow-2xs p-5 sm:p-6 space-y-5 font-sans">
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#000f22] text-white px-4 py-3 rounded-xl shadow-md flex items-center gap-2.5 text-xs sm:text-sm font-medium animate-fadeIn border border-white/10">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#eff6ff] dark:bg-blue-950/60 border border-[#dbeafe] dark:border-blue-900/60 flex items-center justify-center text-xl shrink-0 shadow-2xs text-[#115eaf] dark:text-blue-400">
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1e1338] dark:text-white tracking-tight">
                  Recommended College News
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/60 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  Live Updates
                </span>
              </div>
              <p className="text-xs text-[#74777e] dark:text-slate-400 mt-0.5">
                Verified UGC notices, admission cycles, exam dates, and placement reports
              </p>
            </div>
          </div>

          {/* Quick Search & View Mode Controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#74777e] dark:text-slate-400">
                <Search className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search college news..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/50 text-[#000f22] dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-400 focus:border-[#115eaf] focus:bg-white dark:focus:bg-[#121c2e] focus:ring-2 focus:ring-[#115eaf]/15 rounded-xl transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Carousel navigation buttons (shown when in carousel view) */}
            {!isExpandedView && (
              <div className="hidden md:flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollCarousel('left')}
                  disabled={!canScrollLeft}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    canScrollLeft
                      ? 'border-[#c4c6ce] text-[#000f22] hover:bg-[#f0f4f8] hover:border-[#115eaf]'
                      : 'border-slate-200 text-slate-300 opacity-50 cursor-not-allowed'
                  }`}
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel('right')}
                  disabled={!canScrollRight}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    canScrollRight
                      ? 'border-[#c4c6ce] text-[#000f22] hover:bg-[#f0f4f8] hover:border-[#115eaf]'
                      : 'border-slate-200 text-slate-300 opacity-50 cursor-not-allowed'
                  }`}
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live Breaking News Marquee Banner */}
        {currentTicker && (
          <div className="bg-gradient-to-r from-red-50/90 via-rose-50/60 to-white border border-red-200/80 rounded-xl p-2.5 sm:px-3.5 flex items-center justify-between gap-3 text-xs shadow-2xs">
            <div
              className="flex items-center gap-2.5 overflow-hidden cursor-pointer flex-1"
              onClick={() => setSelectedArticle(currentTicker)}
            >
              <span className="flex items-center gap-1 font-bold text-red-700 bg-red-100/90 px-2 py-0.5 rounded-md text-[11px] tracking-wide shrink-0">
                <Flame className="w-3 h-3 text-red-600" />
                FLASH
              </span>
              <p className="font-semibold text-[#000f22] truncate hover:text-[#115eaf] transition-colors">
                {currentTicker.title}
              </p>
              <span className="hidden md:inline text-[11px] text-[#74777e] shrink-0">
                • {currentTicker.publishedAt}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={prevTicker}
                aria-label="Previous headline"
                className="p-1 hover:bg-red-100 text-slate-600 rounded cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] text-slate-500 font-medium px-1">
                {tickerIndex + 1}/{tickerItems.length}
              </span>
              <button
                type="button"
                onClick={nextTicker}
                aria-label="Next headline"
                className="p-1 hover:bg-red-100 text-slate-600 rounded cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#1e1338] text-white font-bold shadow-2xs scale-[1.02]'
                  : 'bg-white border border-[#d1d5db] text-[#4b5563] hover:border-[#1e1338] hover:text-[#1e1338]'
              }`}
            >
              {cat}
            </button>
          );
        })}

        {bookmarkedIds.size > 0 && (
          <button
            type="button"
            onClick={() => showToast(`Showing ${bookmarkedIds.size} saved articles`)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 border border-amber-300 text-amber-800 ml-auto cursor-pointer shrink-0"
          >
            <Bookmark className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Saved ({bookmarkedIds.size})</span>
          </button>
        )}
      </div>

      {/* Main News Display: Carousel Mode or Expanded Grid Mode */}
      {filteredArticles.length > 0 ? (
        <div className="relative">
          {/* CAROUSEL VIEW */}
          {!isExpandedView ? (
            <div className="relative">
              {/* Horizontal Scroll Carousel Container */}
              <div
                ref={carouselRef}
                className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-3 pt-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {filteredArticles.map((article) => {
                  const isBookmarked = bookmarkedIds.has(article.id);
                  const isUpvoted = upvotedIds.has(article.id);
                  const totalUpvotes = article.upvotes + (isUpvoted ? 1 : 0);

                  return (
                    <div
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="group flex-none w-[285px] sm:w-[330px] md:w-[350px] snap-start bg-white dark:bg-[#131f33] rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:border-[#115eaf] dark:hover:border-blue-500/60 flex flex-col justify-between shadow-2xs hover:shadow-xs hover:-translate-y-1 transition-all duration-200 ease-out cursor-pointer overflow-hidden"
                    >
                      {/* Card Image Banner */}
                      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                        {/* Gradient Shadow Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Floating Badges on Image */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs backdrop-blur-xs ${getCategoryBadgeColor(
                              article.category
                            )}`}
                          >
                            {article.category}
                          </span>

                          <div className="flex items-center gap-1">
                            {article.isTrending && (
                              <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-900 bg-amber-400/95 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-xs">
                                <Flame className="w-2.5 h-2.5 text-amber-950" />
                                Trending
                              </span>
                            )}
                            {article.verifiedOfficial && (
                              <span className="flex items-center gap-0.5 text-[10px] font-bold text-white bg-emerald-600/90 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-xs">
                                <ShieldCheck className="w-2.5 h-2.5" />
                                Verified
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Time & Read duration at bottom of image */}
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-white/80" />
                            {article.publishedAt}
                          </span>
                          <span className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px]">
                            {article.readTime}
                          </span>
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Headline */}
                          <h3 className="font-bold text-sm sm:text-[15px] text-[#000f22] group-hover:text-[#115eaf] leading-snug transition-colors line-clamp-2 mb-2">
                            {article.title}
                          </h3>

                          {/* Summary */}
                          <p className="text-xs text-[#43474d] line-clamp-2 leading-relaxed mb-3 font-normal">
                            {article.summary}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {article.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] text-slate-600 bg-[#f0f4f8] px-2 py-0.5 rounded-md font-medium"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                          <span className="text-[11px] text-[#74777e] font-medium truncate">
                            By <strong className="text-[#000f22] font-semibold">{article.source}</strong>
                          </span>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => toggleUpvote(article.id, e)}
                              title="Mark as helpful"
                              className={`px-2 py-1 rounded-lg border flex items-center gap-1 text-[11px] transition-all cursor-pointer ${
                                isUpvoted
                                  ? 'bg-blue-50 border-blue-300 text-[#115eaf] font-semibold'
                                  : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                              }`}
                            >
                              <ThumbsUp className={`w-3 h-3 ${isUpvoted ? 'fill-[#115eaf]' : ''}`} />
                              <span>{totalUpvotes}</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => toggleBookmark(article.id, e)}
                              title="Save article"
                              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                isBookmarked
                                  ? 'border-amber-300 bg-amber-50 text-amber-700'
                                  : 'border-slate-200 hover:border-slate-300 text-slate-500 bg-white'
                              }`}
                            >
                              <Bookmark
                                className={`w-3.5 h-3.5 ${
                                  isBookmarked ? 'fill-amber-500 text-amber-500' : ''
                                }`}
                              />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => handleShare(article, e)}
                              title="Share story"
                              className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 bg-white transition-all cursor-pointer"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Floating Edge Arrows for Desktop */}
              {canScrollLeft && (
                <button
                  type="button"
                  onClick={() => scrollCarousel('left')}
                  className="hidden lg:flex absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200 shadow-lg items-center justify-center text-slate-700 hover:text-black hover:scale-105 active:scale-95 transition-all z-10 cursor-pointer"
                  aria-label="Previous articles"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {canScrollRight && (
                <button
                  type="button"
                  onClick={() => scrollCarousel('right')}
                  className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200 shadow-lg items-center justify-center text-slate-700 hover:text-black hover:scale-105 active:scale-95 transition-all z-10 cursor-pointer"
                  aria-label="Next articles"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          ) : (
            /* EXPANDED GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 animate-fadeIn">
              {filteredArticles.map((article) => {
                const isBookmarked = bookmarkedIds.has(article.id);
                const isUpvoted = upvotedIds.has(article.id);
                const totalUpvotes = article.upvotes + (isUpvoted ? 1 : 0);

                return (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="group bg-white dark:bg-[#131f33] rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:border-[#115eaf] dark:hover:border-blue-500/60 flex flex-col justify-between shadow-2xs hover:shadow-xs hover:-translate-y-1 transition-all duration-200 ease-out cursor-pointer overflow-hidden"
                  >
                    {/* Card Image Banner */}
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs backdrop-blur-xs ${getCategoryBadgeColor(
                            article.category
                          )}`}
                        >
                          {article.category}
                        </span>

                        <div className="flex items-center gap-1">
                          {article.isTrending && (
                            <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-900 bg-amber-400/95 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-xs">
                              <Flame className="w-2.5 h-2.5 text-amber-950" />
                              Trending
                            </span>
                          )}
                          {article.verifiedOfficial && (
                            <span className="flex items-center gap-0.5 text-[10px] font-bold text-white bg-emerald-600/90 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-xs">
                              <ShieldCheck className="w-2.5 h-2.5" />
                              Verified
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-white/80" />
                          {article.publishedAt}
                        </span>
                        <span className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px]">
                          {article.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-sm sm:text-[15px] text-[#000f22] group-hover:text-[#115eaf] leading-snug transition-colors line-clamp-2 mb-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-[#43474d] line-clamp-2 leading-relaxed mb-3 font-normal">
                          {article.summary}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] text-slate-600 bg-[#f0f4f8] px-2 py-0.5 rounded-md font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                        <span className="text-[11px] text-[#74777e] font-medium truncate">
                          By <strong className="text-[#000f22] font-semibold">{article.source}</strong>
                        </span>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => toggleUpvote(article.id, e)}
                            title="Mark as helpful"
                            className={`px-2 py-1 rounded-lg border flex items-center gap-1 text-[11px] transition-all cursor-pointer ${
                              isUpvoted
                                ? 'bg-blue-50 border-blue-300 text-[#115eaf] font-semibold'
                                : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                            }`}
                          >
                            <ThumbsUp className={`w-3 h-3 ${isUpvoted ? 'fill-[#115eaf]' : ''}`} />
                            <span>{totalUpvotes}</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(article.id, e)}
                            title="Save article"
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              isBookmarked
                                ? 'border-amber-300 bg-amber-50 text-amber-700'
                                : 'border-slate-200 hover:border-slate-300 text-slate-500 bg-white'
                            }`}
                          >
                            <Bookmark
                              className={`w-3.5 h-3.5 ${
                                isBookmarked ? 'fill-amber-500 text-amber-500' : ''
                              }`}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleShare(article, e)}
                            title="Share story"
                            className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 bg-white transition-all cursor-pointer"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Interactive Progress Bar & Pagination Indicator (in carousel view) */}
          {!isExpandedView && (
            <div className="flex items-center justify-center gap-2 pt-3">
              <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1e1338] rounded-full transition-all duration-150"
                  style={{ width: `${Math.max(20, scrollProgress * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#f8faff] rounded-2xl border border-dashed border-[#c4c6ce] p-8 text-center space-y-3">
          <Newspaper className="w-10 h-10 mx-auto text-[#115eaf]" />
          <h3 className="text-base font-bold text-[#000f22]">
            No news articles found for &quot;{searchQuery || activeCategory}&quot;
          </h3>
          <p className="text-xs sm:text-sm text-[#74777e] max-w-sm mx-auto">
            Try adjusting your search query or reset the filter to explore all verified university updates.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('All News');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-[#115eaf] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#0c4a8a] transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Engaging 'Explore More' Footer Row */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-[#74777e]">
          <Sparkles className="w-4 h-4 text-[#115eaf]" />
          <span>
            Showing <strong>{filteredArticles.length}</strong> verified college news briefs
          </span>
        </div>

        {/* 'Explore More' Action Button */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsExpandedView(!isExpandedView)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border-2 border-[#115eaf] text-[#115eaf] hover:bg-[#115eaf] hover:text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md active:scale-98 cursor-pointer"
          >
            <span>{isExpandedView ? 'Show in Carousel View' : 'Explore More College News'}</span>
            {isExpandedView ? <Layers className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenAdvisor}
            className="w-full sm:w-auto px-4 py-2.5 bg-[#1e1338] hover:bg-[#000f22] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <span>Get Advisory</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Modal Reader for Selected Article */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 bg-[#000f22]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fadeIn"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-900 shrink-0">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${getCategoryBadgeColor(
                      selectedArticle.category
                    )}`}
                  >
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-white/80 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedArticle.publishedAt} • {selectedArticle.readTime}
                  </span>
                </div>
                <h2 className="text-base sm:text-xl font-bold leading-snug text-white">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-[#43474d] leading-relaxed">
              {/* Official Gazette Source Card */}
              <div className="p-3 bg-[#f8faff] rounded-xl border border-[#c4c6ce]/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-[#000f22]">
                    Source: {selectedArticle.source}
                  </span>
                </div>
                {selectedArticle.deadline && (
                  <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-semibold border border-amber-200">
                    Deadline: {selectedArticle.deadline}
                  </span>
                )}
              </div>

              {/* Formatted Article Body */}
              <div className="whitespace-pre-line text-[#1a222f] space-y-3 font-normal leading-relaxed">
                {selectedArticle.fullContent}
              </div>

              {/* Key Takeaways */}
              {selectedArticle.keyTakeaways && selectedArticle.keyTakeaways.length > 0 && (
                <div className="bg-[#f0f4f8] rounded-xl p-4 border border-[#c4c6ce]/60 space-y-2">
                  <h4 className="font-bold text-[#000f22] text-xs sm:text-sm flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#115eaf]" />
                    Key Student Takeaways
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#000f22]/80">
                    {selectedArticle.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Action Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-100 bg-[#f8faff] rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => toggleUpvote(selectedArticle.id)}
                  className={`flex-1 sm:flex-none px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    upvotedIds.has(selectedArticle.id)
                      ? 'bg-blue-50 border-blue-300 text-[#115eaf]'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>
                    Helpful ({selectedArticle.upvotes + (upvotedIds.has(selectedArticle.id) ? 1 : 0)})
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleBookmark(selectedArticle.id)}
                  className={`flex-1 sm:flex-none px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    bookmarkedIds.has(selectedArticle.id)
                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{bookmarkedIds.has(selectedArticle.id) ? 'Saved' : 'Save'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleShare(selectedArticle)}
                  className="px-3 py-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedArticle(null);
                    onOpenAdvisor?.();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#115eaf] hover:bg-[#0c4a8a] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <span>Speak with Academic Advisor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
