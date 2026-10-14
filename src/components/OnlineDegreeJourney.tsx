import React, { useState } from 'react';
import { 
  FileCheck2, 
  CreditCard, 
  Laptop, 
  GraduationCap, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Video, 
  ShieldCheck, 
  Sparkles,
  Calendar,
  BookOpen,
  Award
} from 'lucide-react';

interface OnlineDegreeJourneyProps {
  onOpenApply: (courseId?: string) => void;
  onOpenHelpDesk: () => void;
}

const STEPS = [
  {
    step: '01',
    title: 'Free Eligibility & University Match',
    tagline: 'Instant document scan with 0 application charges',
    icon: FileCheck2,
    color: 'from-blue-600 to-indigo-600',
    details: [
      'Submit your academic marksheet (10+2 / Graduation) online',
      'Instant eligibility verification under UGC-DEB guidelines',
      'Compare fee structures, NAAC ratings, and curriculum options',
      'Receive instant provisional admission offer within 2 hours',
    ],
    highlight: 'No registration fee charged for advisory or initial document screening.',
    previewTitle: 'Digital Eligibility Verification',
    previewBadge: 'UGC-DEB Compliant',
  },
  {
    step: '02',
    title: 'Paperless Enrollment & 0% EMI',
    tagline: 'Instant university seat confirmation from home',
    icon: CreditCard,
    color: 'from-emerald-600 to-teal-600',
    details: [
      'Complete digital KYC using Aadhaar & DigiLocker integration',
      'Activate Zero-Cost Monthly EMI starting from ₹3,750/month',
      'Zero collateral and 0% interest with zero bank branch visits',
      'Official university registration number & student ID generated',
    ],
    highlight: 'Flexible 6, 9, 12, or 24 months zero-interest installment options.',
    previewTitle: 'Instant Paperless Seat Allotment',
    previewBadge: '0% Interest EMI',
  },
  {
    step: '03',
    title: 'World-Class LMS & Weekend Classes',
    tagline: 'Study on your own schedule with web & mobile app',
    icon: Laptop,
    color: 'from-purple-600 to-pink-600',
    details: [
      '24/7 access to high-definition recorded video lectures',
      'Live interactive masterclasses on Saturdays & Sundays with CXOs',
      'E-library with 50,000+ textbooks, case studies, and Harvard modules',
      'Cloud sandboxes & coding labs for MCA/BCA tech specializations',
    ],
    highlight: 'Requires only 8 to 10 hours per week, perfect for working executives.',
    previewTitle: 'Next-Gen Digital Learning Portal',
    previewBadge: 'Web & Mobile 24/7',
  },
  {
    step: '04',
    title: 'Proctored Home Exams & Degree',
    tagline: '100% remote exams & UGC entitled degree convocation',
    icon: GraduationCap,
    color: 'from-amber-600 to-orange-600',
    details: [
      'Choose your preferred weekend exam slot from anywhere',
      'AI-enabled dual camera proctoring ensures strict academic integrity',
      'Semester marksheets & transcripts issued with DigiLocker sync',
      'Physical degree certificate delivered home + campus convocation invite',
    ],
    highlight: '100% equivalent to regular on-campus degrees under UGC Regulation 22.',
    previewTitle: 'Home-Proctored Examination & Award',
    previewBadge: 'Valid for UPSC & Govt',
  },
];

export const OnlineDegreeJourney: React.FC<OnlineDegreeJourneyProps> = ({
  onOpenApply,
  onOpenHelpDesk,
}) => {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [learnerType, setLearnerType] = useState<'working' | 'fresher'>('working');

  const currentStep = STEPS[activeStepIdx];
  const StepIcon = currentStep.icon;

  return (
    <section id="how-it-works" className="bg-white dark:bg-[#111c2e] rounded-xl border border-slate-200/50 dark:border-slate-800/60 shadow-2xs p-5 sm:p-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-100 dark:border-slate-800/80 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-[11px] font-semibold border border-indigo-200/60 dark:border-indigo-800/60 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HOW ONLINE EDUCATION WORKS</span>
          </div>
          <h2 className="text-2xl font-bold text-[#000f22] dark:text-white">
            100% Digital Admission, Learning &amp; Exam Journey
          </h2>
          <p className="text-[13px] text-[#43474d] dark:text-slate-400 font-normal mt-0.5">
            From eligibility to convocation: experience a flexible degree without leaving your job or home.
          </p>
        </div>

        {/* Schedule Mode Switcher */}
        <div className="inline-flex p-1 bg-slate-100/70 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-[12px] font-semibold shrink-0">
          <button
            type="button"
            onClick={() => setLearnerType('working')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              learnerType === 'working'
                ? 'bg-[#115eaf] text-white shadow-2xs'
                : 'text-[#43474d] dark:text-slate-400 hover:text-[#111c2d] dark:hover:text-white'
            }`}
          >
            For Working Professionals
          </button>
          <button
            type="button"
            onClick={() => setLearnerType('fresher')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              learnerType === 'fresher'
                ? 'bg-[#115eaf] text-white shadow-2xs'
                : 'text-[#43474d] dark:text-slate-400 hover:text-[#111c2d] dark:hover:text-white'
            }`}
          >
            For Fresh Graduates
          </button>
        </div>
      </div>

      {/* Step Selector Horizontal Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {STEPS.map((s, idx) => {
          const Icon = s.icon;
          const isSelected = idx === activeStepIdx;
          return (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStepIdx(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-slate-50 dark:bg-[#131f33] border-[#115eaf] dark:border-blue-400 shadow-xs'
                  : 'bg-white dark:bg-[#111c2e] border-slate-200/60 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#115eaf] to-indigo-500" />
              )}
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-black ${isSelected ? 'text-[#115eaf] dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                  STEP {s.step}
                </span>
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#115eaf] dark:text-blue-400' : 'text-slate-400'}`} />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#000f22] dark:text-white line-clamp-1">
                {s.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {s.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Showcase */}
      <div className="mt-5 p-5 sm:p-6 rounded-xl bg-slate-50/70 dark:bg-[#131f33] border border-slate-200/60 dark:border-slate-700/60 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Stage Details */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#115eaf] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              {currentStep.step}
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#000f22] dark:text-white">
                {currentStep.title}
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {currentStep.tagline}
              </span>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2.5 pt-1">
            {currentStep.details.map((point, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          {/* Special Feature Highlight */}
          <div className="p-3 rounded-lg bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40 text-xs text-[#0f4a82] dark:text-blue-300 font-medium flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-[#115eaf] dark:text-blue-400" />
            <span>{currentStep.highlight}</span>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenApply()}
              className="px-5 py-2.5 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Begin Step 1 Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onOpenHelpDesk}
              className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-medium hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Ask an Admission Counselor
            </button>
          </div>
        </div>

        {/* Right Column: Visual Simulator Card */}
        <div className="lg:col-span-5 bg-white dark:bg-[#111c2e] p-5 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-[#000f22] dark:text-white">
                {currentStep.previewTitle}
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
              {currentStep.previewBadge}
            </span>
          </div>

          {/* Contextual Simulator Box based on step */}
          {activeStepIdx === 0 && (
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Class 10+2 / UG Marksheet</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Verified (62.4%)
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Govt ID Proof (Aadhaar)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> DigiLocker Synced
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 flex justify-between items-center font-medium text-[#115eaf] dark:text-blue-300">
                <span>Eligible Program Allotment</span>
                <span className="font-bold">MBA / MCA Entitled</span>
              </div>
            </div>
          )}

          {activeStepIdx === 1 && (
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/50">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-emerald-800 dark:text-emerald-300 font-bold">Zero-Cost EMI Plan</span>
                  <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300">0% Interest</span>
                </div>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  Total Semester Fee: ₹37,500 converted into 6 monthly EMIs of <strong>₹6,250/mo</strong> with zero processing fees.
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">E-Mandate Setup</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Instant UPI/NetBanking</span>
              </div>
            </div>
          )}

          {activeStepIdx === 2 && (
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Video className="w-3.5 h-3.5 text-indigo-500" />
                  Live Weekend Masterclasses
                </span>
                <span className="text-slate-500 font-medium">Sat &amp; Sun (Evening)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                  Recorded Lectures Archive
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Unlimited 24/7 Access</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Weekly Time Commitment</span>
                <span className="font-bold text-[#115eaf] dark:text-blue-400">8 - 10 Hours / Week</span>
              </div>
            </div>
          )}

          {activeStepIdx === 3 && (
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Exam Mode</span>
                <span className="font-bold text-[#115eaf] dark:text-blue-400">100% Home Online Proctored</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">UGC-DEB Equivalence</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> 100% Equal to Regular
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Degree Delivery</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">Doorstep + On-Campus Event</span>
              </div>
            </div>
          )}

          {/* Schedule Footer */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Designed for: {learnerType === 'working' ? 'Working Executives' : 'Full-Time Students'}</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">No Career Break Needed</span>
          </div>
        </div>
      </div>
    </section>
  );
};
