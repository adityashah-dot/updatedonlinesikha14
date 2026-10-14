import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  FileCheck, 
  Globe2, 
  Building2, 
  ExternalLink, 
  ChevronRight,
  BookOpenCheck,
  Scale
} from 'lucide-react';

interface StatutoryApprovalsHubProps {
  onOpenHelpDesk: () => void;
  onOpenAdvisor?: () => void;
}

const STATUTORY_BODIES = [
  {
    code: 'UGC-DEB',
    name: 'University Grants Commission - Distance Education Bureau',
    badge: 'Statutory Apex Body',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/60',
    description: 'Statutory mandate entitling Indian universities to offer online degrees with 100% equivalence to on-campus degrees under UGC Regulation 22.',
    keyRule: 'Equivalence Clause: Online degrees hold equal legal status for higher education, central/state employment, and UPSC civil services.',
    icon: Award,
  },
  {
    code: 'AICTE',
    name: 'All India Council for Technical Education',
    badge: 'Technical & Management Entitlement',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60',
    description: 'Mandatory statutory council ensuring MBA, MCA, and technical curriculum standards, practical labs, and credit frameworks match industry norms.',
    keyRule: 'Strict norms on credits, industry internship credits, and certified computing sandbox requirements.',
    icon: ShieldCheck,
  },
  {
    code: 'NAAC A++ / A+',
    name: 'National Assessment and Accreditation Council',
    badge: 'Quality & Infrastructure Grade',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/60',
    description: 'Autonomous body evaluating institutional faculty, digital infrastructure, curriculum, and learner support. Only high-NAAC universities can offer online degrees.',
    keyRule: 'Eligible online providers must hold minimum 3.26+ CGPA (NAAC A+ or A++) for online program approvals.',
    icon: BookOpenCheck,
  },
  {
    code: 'AIU & WES',
    name: 'Association of Indian Universities & World Education Services',
    badge: 'Global & Higher Ed Equivalence',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/60',
    description: 'Recognized by AIU for entry into PhD/IIMs across India, and certified by WES (USA & Canada) for Express Entry PR points and foreign Master’s admissions.',
    keyRule: 'Direct evaluation accepted by WES, IQAS, and CES for international employment and migration.',
    icon: Globe2,
  },
];

const LEGAL_POINTS = [
  {
    title: 'UGC Regulation 22 (Equal Legal Standing)',
    desc: 'The University Grants Commission explicitly states that degrees acquired through Online (OL) and Open & Distance Learning (ODL) shall be treated as equivalent to degrees acquired through conventional conventional on-campus mode.',
  },
  {
    title: 'Valid for UPSC & State PSC Civil Services',
    desc: 'Candidates holding recognized online bachelor’s or master’s degrees are 100% eligible to sit for UPSC IAS, IPS, State Public Service Commission, SSC CGL, and IBPS Bank exams.',
  },
  {
    title: 'Eligible for Central & State Government Jobs',
    desc: 'No government recruitment circular or PSU can discriminate between an entitled online degree and a regular degree as per Ministry of Education directives.',
  },
  {
    title: 'Foreign Study & Global Immigration Points',
    desc: 'Graduates can apply to universities abroad (USA, UK, Canada, Australia, Germany) and receive educational credential evaluation points under Canada Express Entry (WES).',
  },
];

export const StatutoryApprovalsHub: React.FC<StatutoryApprovalsHubProps> = ({
  onOpenHelpDesk,
  onOpenAdvisor,
}) => {
  const [activeTab, setActiveTab] = useState<'approvals' | 'legality'>('approvals');

  return (
    <section id="accreditations" className="bg-white dark:bg-[#111c2e] rounded-xl border border-slate-200/50 dark:border-slate-800/60 shadow-2xs p-5 sm:p-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-100 dark:border-slate-800/80 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#115eaf] dark:text-blue-400 text-[11px] font-semibold border border-blue-200/60 dark:border-blue-800/60 mb-1.5">
            <Scale className="w-3.5 h-3.5" />
            <span>STATUTORY RECOGNITION & LEGAL EQUIVALENCE</span>
          </div>
          <h2 className="text-2xl font-bold text-[#000f22] dark:text-white">
            UGC-DEB Statutory Entitlement &amp; National Validity
          </h2>
          <p className="text-[13px] text-[#43474d] dark:text-slate-400 font-normal mt-0.5">
            Understand how online degrees are recognized by government bodies, statutory councils, and global employers.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="inline-flex p-1 bg-slate-100/70 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-[12px] font-semibold shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('approvals')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'approvals'
                ? 'bg-[#115eaf] text-white shadow-2xs'
                : 'text-[#43474d] dark:text-slate-400 hover:text-[#111c2d] dark:hover:text-white'
            }`}
          >
            Statutory Bodies
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('legality')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'legality'
                ? 'bg-[#115eaf] text-white shadow-2xs'
                : 'text-[#43474d] dark:text-slate-400 hover:text-[#111c2d] dark:hover:text-white'
            }`}
          >
            Govt Job &amp; UPSC Validity
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'approvals' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {STATUTORY_BODIES.map((body) => {
            const Icon = body.icon;
            return (
              <div
                key={body.code}
                className="bg-white dark:bg-[#131f33] rounded-xl border border-slate-200/60 dark:border-slate-700/50 p-4 flex flex-col justify-between hover:border-[#115eaf] dark:hover:border-blue-500/50 transition-all shadow-2xs hover:shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${body.badgeColor}`}>
                      {body.code}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#115eaf] transition-colors" />
                  </div>
                  <h3 className="text-[14px] font-bold text-[#000f22] dark:text-white leading-snug">
                    {body.name}
                  </h3>
                  <p className="text-[12px] text-[#43474d] dark:text-slate-400 font-normal mt-2 leading-relaxed">
                    {body.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-800/30 p-2.5 rounded-lg text-[11px] text-[#2c333e] dark:text-slate-300">
                  <span className="font-semibold block text-[#000f22] dark:text-slate-200 mb-0.5">Key Legal Mandate:</span>
                  {body.keyRule}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {LEGAL_POINTS.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 dark:bg-[#131f33] rounded-xl border border-slate-200/60 dark:border-slate-700/50 p-4 sm:p-5 flex items-start gap-3.5 hover:border-blue-300 dark:hover:border-blue-700/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#000f22] dark:text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-[#43474d] dark:text-slate-300 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trust Guarantee Callout Banner */}
      <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-blue-50/80 via-slate-50 to-emerald-50/80 dark:from-blue-950/30 dark:via-slate-900/40 dark:to-emerald-950/30 border border-blue-200/60 dark:border-blue-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#115eaf] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-[#000f22] dark:text-white text-[13px]">
              Want Official Gazette Verification for Your University?
            </h4>
            <p className="text-slate-600 dark:text-slate-300 font-normal">
              Download the official UGC-DEB equivalence letter or speak with a verified institutional legal counselor.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={onOpenHelpDesk}
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-[12px] font-semibold transition-colors cursor-pointer shadow-2xs text-center"
          >
            Download Gazette Copy
          </button>
          <button
            type="button"
            onClick={onOpenAdvisor || onOpenHelpDesk}
            className="flex-1 sm:flex-initial px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 text-[12px] font-medium transition-colors cursor-pointer text-center"
          >
            Verify My Degree
          </button>
        </div>
      </div>
    </section>
  );
};
