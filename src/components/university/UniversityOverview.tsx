import React from 'react';
import { ShieldCheck, CheckCircle2, Building, BookOpen, Clock, Globe } from 'lucide-react';
import { UniversityData } from '../../types/university';

interface UniversityOverviewProps {
  university: UniversityData;
}

export const UniversityOverview: React.FC<UniversityOverviewProps> = ({ university }) => {
  return (
    <section id="overview" className="scroll-mt-32 space-y-6">
      {/* Editorial Title & Lead */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
          About {university.name}
        </h2>
        <div className="mt-1.5 space-y-2.5 text-slate-700 text-sm sm:text-base leading-relaxed max-w-4xl">
          {university.overview.introParagraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Latest News / Updates Banner (if present) */}
      {university.overview.latestNews && (
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-slate-200 text-slate-700 shrink-0 mt-0.5">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>{university.overview.latestNews.date}</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900">
              {university.overview.latestNews.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {university.overview.latestNews.description}
            </p>
          </div>
        </div>
      )}

      {/* Institutional Highlights Grid / Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Key Institutional Highlights
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Verified {university.verifiedYear || '2026'}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="divide-y divide-slate-200/80">
            {university.overview.highlightsTable.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-3 p-3.5 sm:px-6 hover:bg-slate-50/70 transition-colors gap-1 sm:gap-4 items-baseline"
              >
                <div className="text-xs sm:text-sm font-medium text-slate-500">
                  {item.label}
                </div>
                <div className="sm:col-span-2 text-xs sm:text-sm font-semibold text-slate-900">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {university.overview.highlightsSummary && (
          <p className="text-xs text-slate-500 leading-normal">
            {university.overview.highlightsSummary}
          </p>
        )}
      </div>

      {/* UGC & Legal Validity Callout Card */}
      <div className="p-5 sm:p-6 bg-slate-900 text-white rounded-xl space-y-3">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base sm:text-lg font-bold text-white">
            Equivalence & Legal Validity of {university.shortName} Degree
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          As per University Grants Commission (UGC) Open and Distance Learning Regulations and Online
          Programmes Regulations, degrees earned through UGC-entitled online programs from recognized
          universities are treated as <strong className="text-white">fully equivalent</strong> to corresponding
          on-campus regular degrees for government recruitments (UPSC, SSC, State PSCs), corporate employment,
          and admission to higher education across India and globally.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Valid for All Govt Jobs
          </span>
          <span className="flex items-center gap-1.5 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            WES & Global Credential Approved
          </span>
          <span className="flex items-center gap-1.5 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Equal Status to Full-Time Degrees
          </span>
        </div>
      </div>
    </section>
  );
};
