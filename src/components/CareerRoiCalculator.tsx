import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Wallet, 
  Sparkles, 
  ArrowRight, 
  Calculator, 
  Briefcase, 
  Building2, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Percent, 
  HelpCircle 
} from 'lucide-react';

interface CareerRoiCalculatorProps {
  onOpenApply: (courseId?: string) => void;
  onOpenHelpDesk: () => void;
}

interface ProgramConfig {
  id: string;
  name: string;
  short: string;
  totalFee: number;
  perSemFee: number;
  durationMonths: number;
  baseHikeMultiplier: number;
  inDemandRoles: string[];
  topRecruiters: string[];
  badge: string;
}

const PROGRAMS: ProgramConfig[] = [
  {
    id: 'mba',
    name: 'Online MBA (Business & Management)',
    short: 'Online MBA',
    totalFee: 190000,
    perSemFee: 47500,
    durationMonths: 24,
    baseHikeMultiplier: 1.75,
    inDemandRoles: ['Senior Product Manager', 'Management Consultant', 'Financial Risk Analyst', 'Brand Strategy Director'],
    topRecruiters: ['Deloitte', 'KPMG', 'Amazon', 'HDFC Bank', 'McKinsey & Co'],
    badge: 'Highest Salary Jump',
  },
  {
    id: 'mca',
    name: 'Online MCA (AI & Cloud Computing)',
    short: 'Online MCA',
    totalFee: 145000,
    perSemFee: 36250,
    durationMonths: 24,
    baseHikeMultiplier: 1.85,
    inDemandRoles: ['Cloud Solutions Architect', 'Senior AI/ML Engineer', 'Full-Stack Technical Lead', 'DevOps Manager'],
    topRecruiters: ['Microsoft', 'Google', 'TCS', 'Infosys', 'Cognizant'],
    badge: 'Tech & AI Leader',
  },
  {
    id: 'bba',
    name: 'Online BBA (Bachelor of Business Admin)',
    short: 'Online BBA',
    totalFee: 110000,
    perSemFee: 18333,
    durationMonths: 36,
    baseHikeMultiplier: 1.55,
    inDemandRoles: ['Corporate Relationship Manager', 'Digital Growth Specialist', 'Business Operations Analyst', 'Sales Strategist'],
    topRecruiters: ['Genpact', 'ICICI Bank', 'EY', 'Tata Capital', 'WNS'],
    badge: 'Undergraduate Gateway',
  },
  {
    id: 'bca',
    name: 'Online BCA (Computer Applications)',
    short: 'Online BCA',
    totalFee: 125000,
    perSemFee: 20833,
    durationMonths: 36,
    baseHikeMultiplier: 1.65,
    inDemandRoles: ['Software Engineer', 'Cloud Infrastructure Associate', 'Frontend Architect', 'Database Administrator'],
    topRecruiters: ['Wipro', 'Capgemini', 'Tech Mahindra', 'HCLTech', 'Accenture'],
    badge: 'High Tech Demand',
  },
  {
    id: 'mcom',
    name: 'Online M.Com / B.Com (Corporate Finance)',
    short: 'Online Commerce',
    totalFee: 95000,
    perSemFee: 15833,
    durationMonths: 24,
    baseHikeMultiplier: 1.50,
    inDemandRoles: ['Senior Financial Analyst', 'Audit & Tax Manager', 'Treasury Executive', 'Investment Banker Associate'],
    topRecruiters: ['PwC', 'Grant Thornton', 'Axis Bank', 'American Express'],
    badge: 'ACCA Exemptions',
  },
];

const EXPERIENCE_OPTIONS = [
  { id: 'fresher', label: 'Fresher / < 1 yr', expFactor: 0.95 },
  { id: 'early', label: '1 - 3 Years', expFactor: 1.05 },
  { id: 'mid', label: '3 - 6 Years', expFactor: 1.15 },
  { id: 'senior', label: '6+ Years', expFactor: 1.25 },
];

export const CareerRoiCalculator: React.FC<CareerRoiCalculatorProps> = ({
  onOpenApply,
  onOpenHelpDesk,
}) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>('mba');
  const [currentCtcLakhs, setCurrentCtcLakhs] = useState<number>(4.5);
  const [selectedExpId, setSelectedExpId] = useState<string>('early');

  const selectedProgram = useMemo(
    () => PROGRAMS.find((p) => p.id === selectedProgramId) || PROGRAMS[0],
    [selectedProgramId]
  );

  const selectedExp = useMemo(
    () => EXPERIENCE_OPTIONS.find((e) => e.id === selectedExpId) || EXPERIENCE_OPTIONS[1],
    [selectedExpId]
  );

  // Dynamic calculations
  const stats = useMemo(() => {
    // Expected post degree CTC
    const multiplier = selectedProgram.baseHikeMultiplier * (0.85 + selectedExp.expFactor * 0.15);
    const projectedCtc = Math.max(
      currentCtcLakhs * multiplier,
      // minimum threshold realistic benchmark for program
      selectedProgramId === 'mba' ? 7.5 : selectedProgramId === 'mca' ? 6.8 : 4.5
    );

    const absoluteHike = projectedCtc - currentCtcLakhs;
    const percentageHike = Math.round((absoluteHike / currentCtcLakhs) * 100);

    // Monthly additional income
    const monthlyHikeRupees = (absoluteHike * 100000) / 12;

    // Months to recover total tuition fee
    const paybackMonths = Math.max(
      2.5,
      Number((selectedProgram.totalFee / monthlyHikeRupees).toFixed(1))
    );

    // 3 Year cumulative extra income
    const threeYearGainLakhs = Number((absoluteHike * 3).toFixed(1));

    // Zero-cost monthly EMI
    const monthlyEmi = Math.round(selectedProgram.totalFee / 24);

    return {
      projectedCtc: Number(projectedCtc.toFixed(1)),
      absoluteHike: Number(absoluteHike.toFixed(1)),
      percentageHike,
      paybackMonths,
      threeYearGainLakhs,
      monthlyEmi,
    };
  }, [selectedProgram, selectedExp, currentCtcLakhs, selectedProgramId]);

  return (
    <section id="roi-calculator" className="bg-white dark:bg-[#111c2e] rounded-xl border border-slate-200/50 dark:border-slate-800/60 shadow-2xs p-5 sm:p-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-100 dark:border-slate-800/80 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold border border-emerald-200/60 dark:border-emerald-800/60 mb-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE CAREER RETURN ON INVESTMENT</span>
          </div>
          <h2 className="text-2xl font-bold text-[#000f22] dark:text-white">
            Degree Salary Booster &amp; ROI Calculator
          </h2>
          <p className="text-[13px] text-[#43474d] dark:text-slate-400 font-normal mt-0.5">
            Calculate your projected salary hike, payback timeline, and career jump after completing an online degree.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">Based on verified 2025-26 placement surveys</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-6 space-y-5 bg-slate-50/70 dark:bg-[#131f33] p-4 sm:p-5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          {/* 1. Target Degree Selector */}
          <div>
            <label className="block text-xs font-bold text-[#000f22] dark:text-slate-200 uppercase tracking-wider mb-2">
              1. Select Target Online Degree Program
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PROGRAMS.map((prog) => (
                <button
                  key={prog.id}
                  type="button"
                  onClick={() => setSelectedProgramId(prog.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedProgramId === prog.id
                      ? 'bg-white dark:bg-slate-800 border-[#115eaf] dark:border-blue-400 shadow-xs ring-1 ring-[#115eaf]/20'
                      : 'bg-white/60 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-[#000f22] dark:text-white truncate">
                      {prog.short}
                    </span>
                    <span className="text-[10px] font-semibold text-[#115eaf] dark:text-blue-400">
                      ₹{(prog.perSemFee / 1000).toFixed(0)}k/sem
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                    {prog.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Current CTC Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="ctc-slider" className="text-xs font-bold text-[#000f22] dark:text-slate-200 uppercase tracking-wider cursor-pointer">
                2. Current Annual CTC (Salary)
              </label>
              <span className="text-sm font-extrabold text-[#115eaf] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded border border-blue-200/60 dark:border-blue-800/60">
                ₹{currentCtcLakhs.toFixed(1)} LPA
              </span>
            </div>
            <input
              id="ctc-slider"
              type="range"
              min="2.0"
              max="20.0"
              step="0.5"
              value={currentCtcLakhs}
              onChange={(e) => setCurrentCtcLakhs(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#115eaf]"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-1">
              <span>₹2.0 LPA</span>
              <span>₹10.0 LPA</span>
              <span>₹20.0 LPA</span>
            </div>
          </div>

          {/* 3. Work Experience Pills */}
          <div>
            <label className="block text-xs font-bold text-[#000f22] dark:text-slate-200 uppercase tracking-wider mb-2">
              3. Current Work Experience
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {EXPERIENCE_OPTIONS.map((exp) => (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setSelectedExpId(exp.id)}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold text-center border transition-all cursor-pointer ${
                    selectedExpId === exp.id
                      ? 'bg-[#115eaf] text-white border-[#115eaf] shadow-2xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  {exp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Tuition & EMI Fact */}
          <div className="p-3 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Average Program Tuition</span>
              <span className="font-bold text-[#000f22] dark:text-white">
                ₹{selectedProgram.totalFee.toLocaleString('en-IN')} Total
              </span>
            </div>
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700" />
            <div className="text-right">
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">0% Interest Monthly EMI</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                ₹{stats.monthlyEmi.toLocaleString('en-IN')}/mo
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual ROI Output Cards */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          {/* Main Projection Highlight Card */}
          <div className="bg-gradient-to-br from-[#0b2540] via-[#103357] to-[#184472] rounded-xl p-5 text-white shadow-sm border border-[#1d4d7f] relative overflow-hidden">
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold text-blue-200 tracking-wide uppercase">
                  Projected Career Outcome
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +{stats.percentageHike}% Expected Jump
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 my-3 items-end">
                <div>
                  <span className="text-xs text-slate-300 block mb-0.5">Current Salary</span>
                  <div className="text-xl sm:text-2xl font-bold text-slate-200">
                    ₹{currentCtcLakhs.toFixed(1)} LPA
                  </div>
                </div>
                <div className="border-l border-blue-400/30 pl-4">
                  <span className="text-xs text-amber-300 font-medium block mb-0.5">Projected Post-Degree CTC</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    ₹{stats.projectedCtc} LPA
                  </div>
                </div>
              </div>

              {/* Progress Comparison Bar */}
              <div className="mt-4 pt-3 border-t border-blue-400/20">
                <div className="w-full bg-slate-700/60 rounded-full h-2.5 overflow-hidden flex">
                  <div 
                    className="bg-slate-400 h-full" 
                    style={{ width: `${Math.min(100, (currentCtcLakhs / stats.projectedCtc) * 100)}%` }} 
                  />
                  <div 
                    className="bg-emerald-400 h-full animate-pulse" 
                    style={{ width: `${Math.min(100, 100 - (currentCtcLakhs / stats.projectedCtc) * 100)}%` }} 
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-300 mt-1.5 font-medium">
                  <span>Current Baseline</span>
                  <span className="text-emerald-300 font-semibold">+₹{stats.absoluteHike} LPA Additional CTC</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Secondary Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50/80 dark:bg-[#131f33] p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                Tuition Payback
              </span>
              <span className="text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 block">
                {stats.paybackMonths} Months
              </span>
              <span className="text-[10px] text-slate-400 block">Recovers total fee</span>
            </div>

            <div className="bg-slate-50/80 dark:bg-[#131f33] p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                3-Year Extra Gain
              </span>
              <span className="text-base sm:text-lg font-bold text-[#115eaf] dark:text-blue-400 mt-0.5 block">
                +₹{stats.threeYearGainLakhs} L
              </span>
              <span className="text-[10px] text-slate-400 block">Cumulative income</span>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-slate-50/80 dark:bg-[#131f33] p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                Degree Equivalence
              </span>
              <span className="text-base sm:text-lg font-bold text-purple-700 dark:text-purple-400 mt-0.5 block">
                100%
              </span>
              <span className="text-[10px] text-slate-400 block">UGC-DEB Entitled</span>
            </div>
          </div>

          {/* Hiring Roles & Companies Strip */}
          <div className="bg-white dark:bg-[#131f33] p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <div>
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Target Roles for {selectedProgram.short}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProgram.inDemandRoles.map((role) => (
                  <span
                    key={role}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">Actively Hiring:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">
                {selectedProgram.topRecruiters.join(' • ')}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => onOpenApply(selectedProgram.id)}
              className="w-full sm:flex-1 py-2.5 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs hover:shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Apply with Zero-Cost EMI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onOpenHelpDesk}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer text-center"
            >
              Download Detailed Career Roadmap
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
