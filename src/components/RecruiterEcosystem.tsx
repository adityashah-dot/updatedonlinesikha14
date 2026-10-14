import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  ExternalLink, 
  Download, 
  Sparkles,
  Star
} from 'lucide-react';

interface RecruiterEcosystemProps {
  onOpenApply: (courseId?: string) => void;
  onOpenHelpDesk: () => void;
}

const PLACEMENT_METRICS = [
  { value: '₹54.75 LPA', label: 'Highest Package Offered', tone: 'text-[#115eaf] dark:text-blue-400' },
  { value: '₹8.40 LPA', label: 'Average CTC (MBA/MCA)', tone: 'text-emerald-600 dark:text-emerald-400' },
  { value: '500+', label: 'Active Corporate Recruiters', tone: 'text-purple-600 dark:text-purple-400' },
  { value: '+84%', label: 'Average Post-Degree Hike', tone: 'text-amber-600 dark:text-amber-400' },
];

const SECTORS = ['All Sectors', 'Tech Giants', 'Consulting & Big 4', 'Banking & FinTech', 'Product & Global MNCs'] as const;

type SectorType = typeof SECTORS[number];

interface RecruiterItem {
  name: string;
  category: SectorType;
  rolesHired: string;
  avgCtc: string;
}

const RECRUITERS: RecruiterItem[] = [
  { name: 'Amazon', category: 'Tech Giants', rolesHired: 'Cloud Architect, Operations Manager', avgCtc: '₹14.5 - 28 LPA' },
  { name: 'Microsoft', category: 'Tech Giants', rolesHired: 'Software Engineer, Data Specialist', avgCtc: '₹16.0 - 32 LPA' },
  { name: 'Google', category: 'Tech Giants', rolesHired: 'Cloud Associate, Technical Account Lead', avgCtc: '₹18.0 - 35 LPA' },
  { name: 'Deloitte', category: 'Consulting & Big 4', rolesHired: 'Management Consultant, Risk Advisory', avgCtc: '₹9.5 - 18 LPA' },
  { name: 'KPMG', category: 'Consulting & Big 4', rolesHired: 'Strategy Consultant, Audit Associate', avgCtc: '₹8.8 - 16.5 LPA' },
  { name: 'PwC', category: 'Consulting & Big 4', rolesHired: 'Tax Analyst, Advisory Specialist', avgCtc: '₹9.0 - 17 LPA' },
  { name: 'EY (Ernst & Young)', category: 'Consulting & Big 4', rolesHired: 'Business Analyst, Tech Consultant', avgCtc: '₹8.5 - 15 LPA' },
  { name: 'HDFC Bank', category: 'Banking & FinTech', rolesHired: 'Credit Manager, Branch Banking Head', avgCtc: '₹7.5 - 14 LPA' },
  { name: 'ICICI Bank', category: 'Banking & FinTech', rolesHired: 'Relationship Manager, Wealth Strategist', avgCtc: '₹7.0 - 13.5 LPA' },
  { name: 'American Express', category: 'Banking & FinTech', rolesHired: 'Financial Analyst, Fraud Analytics', avgCtc: '₹10.5 - 19 LPA' },
  { name: 'Tata Consultancy Services', category: 'Product & Global MNCs', rolesHired: 'Full-Stack Developer, Project Lead', avgCtc: '₹6.5 - 12 LPA' },
  { name: 'Infosys', category: 'Product & Global MNCs', rolesHired: 'Systems Engineer, AI Consultant', avgCtc: '₹6.8 - 12.5 LPA' },
  { name: 'Accenture', category: 'Product & Global MNCs', rolesHired: 'Strategy Analyst, Solutions Architect', avgCtc: '₹8.5 - 16 LPA' },
  { name: 'Flipkart', category: 'Product & Global MNCs', rolesHired: 'Product Specialist, Supply Chain Lead', avgCtc: '₹11.0 - 21 LPA' },
];

const ALUMNI_STORIES = [
  {
    name: 'Ankit Mehra',
    program: 'Online MCA',
    university: 'Lovely Professional University Online',
    beforeRole: 'Junior Web Developer (₹3.2 LPA)',
    afterRole: 'Cloud Solutions Architect at Amazon (₹16.8 LPA)',
    hike: '+425%',
    quote: 'The flexible weekend labs and cloud computing curriculum gave me the hands-on architectural skills to crack AWS interviews while working full-time.',
    avatarBg: 'bg-blue-600',
    initials: 'AM',
  },
  {
    name: 'Priya Sharma',
    program: 'Online MBA (Marketing)',
    university: 'Amity University Online',
    beforeRole: 'Sales Coordinator (₹4.0 LPA)',
    afterRole: 'Brand Strategy Consultant at Deloitte (₹12.5 LPA)',
    hike: '+212%',
    quote: 'Harvard Business School case studies and 1-on-1 interview prep with corporate mentors completely transformed how I approach business strategy.',
    avatarBg: 'bg-purple-600',
    initials: 'PS',
  },
  {
    name: 'Rohan Gupta',
    program: 'Online M.Com (Finance)',
    university: 'Manipal University Jaipur Online',
    beforeRole: 'Accounts Executive (₹3.5 LPA)',
    afterRole: 'Senior Financial Risk Analyst at KPMG (₹9.2 LPA)',
    hike: '+162%',
    quote: 'Online Siksha guided me towards the ACCA exemption track. The employer recognized my degree seamlessly and offered me a managerial position.',
    avatarBg: 'bg-emerald-600',
    initials: 'RG',
  },
];

export const RecruiterEcosystem: React.FC<RecruiterEcosystemProps> = ({
  onOpenApply,
  onOpenHelpDesk,
}) => {
  const [activeSector, setActiveSector] = useState<SectorType>('All Sectors');

  const filteredRecruiters = activeSector === 'All Sectors'
    ? RECRUITERS
    : RECRUITERS.filter((r) => r.category === activeSector);

  return (
    <section id="placements" className="bg-white dark:bg-[#111c2e] rounded-xl border border-slate-200/50 dark:border-slate-800/60 shadow-2xs p-5 sm:p-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-100 dark:border-slate-800/80 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#115eaf] dark:text-blue-400 text-[11px] font-semibold border border-blue-200/60 dark:border-blue-800/60 mb-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            <span>PLACEMENT CELL & CORPORATE ECOSYSTEM</span>
          </div>
          <h2 className="text-2xl font-bold text-[#000f22] dark:text-white">
            Corporate Hiring Network &amp; Alumni Transformations
          </h2>
          <p className="text-[13px] text-[#43474d] dark:text-slate-400 font-normal mt-0.5">
            Over 500+ top Fortune 500 companies actively hire graduates of our partner UGC-DEB online degree programs.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenHelpDesk}
          className="text-[12px] font-semibold text-[#115eaf] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          Download 2026 Placement Report
        </button>
      </div>

      {/* Metric Stat Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-5">
        {PLACEMENT_METRICS.map((m) => (
          <div
            key={m.label}
            className="p-3.5 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-[#131f33] border border-slate-200/60 dark:border-slate-700/60 text-center"
          >
            <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${m.tone}`}>
              {m.value}
            </div>
            <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Category Pills */}
      <div className="mt-6 flex flex-wrap gap-2 items-center">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1">
          Filter Hiring Network:
        </span>
        {SECTORS.map((sec) => (
          <button
            key={sec}
            type="button"
            onClick={() => setActiveSector(sec)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSector === sec
                ? 'bg-[#115eaf] text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Recruiter Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {filteredRecruiters.map((r) => (
          <div
            key={r.name}
            className="p-3 rounded-xl bg-white dark:bg-[#131f33] border border-slate-200/60 dark:border-slate-700/60 hover:border-[#115eaf] dark:hover:border-blue-500/50 transition-all flex flex-col justify-between group shadow-2xs hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#000f22] dark:text-white group-hover:text-[#115eaf] dark:group-hover:text-blue-400 transition-colors">
                  {r.name}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded">
                  {r.category}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                {r.rolesHired}
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Typical Package:</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">{r.avgCtc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Real Alumni Transformation Stories */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#000f22] dark:text-white">
              Real Alumni Career Transformations
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
              Verified working professionals who accelerated their career while continuing their jobs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ALUMNI_STORIES.map((alum) => (
            <div
              key={alum.name}
              className="p-4 rounded-xl bg-slate-50/70 dark:bg-[#131f33] border border-slate-200/60 dark:border-slate-700/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-full ${alum.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs`}>
                      {alum.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#000f22] dark:text-white leading-tight">
                        {alum.name}
                      </h4>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                        {alum.program} • {alum.university.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
                    {alum.hike} Jump
                  </span>
                </div>

                <div className="bg-white dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200/50 dark:border-slate-700/50 space-y-1.5 text-[11px] mb-3">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span>Pre-Degree:</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{alum.beforeRole}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#115eaf] dark:text-blue-400 font-semibold border-t border-slate-100 dark:border-slate-700 pt-1">
                    <span>Post-Degree:</span>
                    <span className="text-emerald-700 dark:text-emerald-400">{alum.afterRole}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-300 italic font-normal leading-relaxed">
                  "{alum.quote}"
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Placement Record</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placement Cell Services Highlights Bar */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-300 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Career Support Included</span>
          </div>
          <h4 className="text-sm sm:text-base font-bold text-white">
            Resume Clinic • 1-on-1 Mock Interviews • Virtual Job Fairs
          </h4>
          <p className="text-xs text-slate-300 font-normal">
            Every enrolled student gets direct access to 3-5 guaranteed placement drives and corporate referral networks.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenApply()}
          className="px-5 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-[#0b2540] text-xs sm:text-sm font-bold transition-all shadow-md shrink-0 cursor-pointer"
        >
          Explore Placement Assisted Programs
        </button>
      </div>
    </section>
  );
};
