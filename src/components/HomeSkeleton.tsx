import React from 'react';

/**
 * Subtle Skeleton Screen Loader for HomeView Main Content Areas
 * Designed to eliminate layout shift (CLS = 0) with matching card heights,
 * subtle pulse animation, and elegant support for both light and dark modes.
 */

export const DegreeProgramsSkeleton: React.FC = () => {
  return (
    <section className="bg-white dark:bg-[#111c2e] rounded-xl border border-slate-200/50 dark:border-slate-800/60 shadow-2xs p-5 sm:p-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-100 dark:border-slate-800/80 gap-3">
        <div className="space-y-2">
          <div className="h-6 w-56 sm:w-72 bg-slate-200/80 dark:bg-slate-800/80 rounded-md" />
          <div className="h-3.5 w-72 sm:w-96 bg-slate-100 dark:bg-slate-850/60 rounded" />
        </div>
        {/* Category Pills Skeleton */}
        <div className="flex gap-1.5 p-1 bg-slate-100/70 dark:bg-slate-800/60 rounded-lg">
          <div className="h-7 w-24 bg-slate-200/90 dark:bg-slate-700/80 rounded-md" />
          <div className="h-7 w-24 bg-slate-200/50 dark:bg-slate-800/50 rounded-md" />
          <div className="h-7 w-28 bg-slate-200/50 dark:bg-slate-800/50 rounded-md" />
        </div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#131f33] rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-5 flex flex-col justify-between shadow-2xs space-y-4"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-5 w-24 bg-blue-100/70 dark:bg-blue-950/40 rounded-full" />
                <div className="h-5 w-28 bg-emerald-100/70 dark:bg-emerald-950/40 rounded-full" />
              </div>
              <div className="h-6 w-36 bg-slate-200/80 dark:bg-slate-800/80 rounded-md" />
              <div className="h-4 w-48 bg-slate-100 dark:bg-slate-850/60 rounded" />

              {/* Specs Rows */}
              <div className="py-3 border-y border-slate-100 dark:border-slate-800/80 space-y-2">
                <div className="flex justify-between">
                  <div className="h-3.5 w-24 bg-slate-100 dark:bg-slate-850/60 rounded" />
                  <div className="h-3.5 w-32 bg-slate-200/70 dark:bg-slate-800/70 rounded" />
                </div>
                <div className="flex justify-between">
                  <div className="h-3.5 w-20 bg-slate-100 dark:bg-slate-850/60 rounded" />
                  <div className="h-3.5 w-28 bg-blue-100/70 dark:bg-blue-950/40 rounded" />
                </div>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="pt-2 flex items-center justify-between">
              <div className="space-y-1">
                <div className="h-3 w-16 bg-slate-100 dark:bg-slate-850/60 rounded" />
                <div className="h-5 w-24 bg-slate-200/80 dark:bg-slate-800/80 rounded-md" />
              </div>
              <div className="h-8 w-28 bg-[#115eaf]/40 dark:bg-[#115eaf]/30 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const FeaturedUniversitiesSkeleton: React.FC = () => {
  return (
    <section className="bg-white dark:bg-[#111c2e] rounded-xl border border-slate-200/50 dark:border-slate-800/60 shadow-2xs p-5 sm:p-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-100 dark:border-slate-800/80 gap-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <div className="h-6 w-64 sm:w-80 bg-slate-200/80 dark:bg-slate-800/80 rounded-md" />
          </div>
          <div className="h-3.5 w-56 sm:w-72 bg-slate-100 dark:bg-slate-850/60 rounded" />
        </div>
        <div className="h-4 w-32 bg-blue-100/70 dark:bg-blue-950/40 rounded" />
      </div>

      {/* 4 Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {[1, 2, 3, 4].map((idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#131f33] rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-5 flex flex-col justify-between shadow-2xs space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-5 w-24 bg-amber-100/70 dark:bg-amber-950/40 rounded" />
                <div className="h-4 w-16 bg-slate-100 dark:bg-slate-850/60 rounded" />
              </div>
              <div className="h-5 w-44 bg-slate-200/80 dark:bg-slate-800/80 rounded" />
              <div className="h-3.5 w-24 bg-blue-100/60 dark:bg-blue-950/40 rounded" />

              {/* Info Container */}
              <div className="p-3 bg-slate-50/70 dark:bg-slate-800/40 rounded-lg border border-slate-100 dark:border-slate-700/40 space-y-2">
                {[1, 2, 3, 4].map((r) => (
                  <div key={r} className="flex justify-between">
                    <div className="h-3 w-20 bg-slate-200/60 dark:bg-slate-700/60 rounded" />
                    <div className="h-3 w-16 bg-slate-200/80 dark:bg-slate-700/80 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2 pt-1">
              <div className="h-9 w-full bg-[#115eaf]/40 dark:bg-[#115eaf]/30 rounded-lg" />
              <div className="h-8 w-full bg-slate-100 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/50" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const StatutoryRecognitionSkeleton: React.FC = () => {
  return (
    <section className="bg-white dark:bg-[#111c2e] rounded-xl p-5 sm:p-6 border border-slate-200/50 dark:border-slate-800/60 shadow-2xs space-y-4 animate-pulse">
      <div className="space-y-2">
        <div className="h-3.5 w-32 bg-blue-100/70 dark:bg-blue-950/40 rounded" />
        <div className="h-6 w-72 sm:w-96 bg-slate-200/80 dark:bg-slate-800/80 rounded-md" />
        <div className="h-3.5 w-full max-w-xl bg-slate-100 dark:bg-slate-850/60 rounded" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        {[1, 2, 3, 4].map((idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/40 flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-slate-700/80 shrink-0" />
            <div className="space-y-1.5 flex-1">
              <div className="h-4 w-32 bg-slate-200/80 dark:bg-slate-700/80 rounded" />
              <div className="h-3 w-40 bg-slate-100 dark:bg-slate-800/60 rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const ComparisonMatrixSkeleton: React.FC = () => {
  return (
    <section className="bg-white dark:bg-[#111c2e] rounded-xl border border-slate-200/50 dark:border-slate-800/60 shadow-2xs p-5 sm:p-6 space-y-4 animate-pulse">
      <div className="space-y-2">
        <div className="h-6 w-80 bg-slate-200/80 dark:bg-slate-800/80 rounded-md" />
        <div className="h-3.5 w-96 bg-slate-100 dark:bg-slate-850/60 rounded" />
      </div>

      <div className="border border-slate-200/50 dark:border-slate-700/60 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="bg-slate-50/80 dark:bg-slate-800/60 p-3 flex gap-4 border-b border-slate-200/50 dark:border-slate-700/60">
          <div className="h-4 w-44 bg-slate-200/80 dark:bg-slate-700/80 rounded" />
          <div className="h-4 w-28 bg-blue-100/80 dark:bg-blue-950/50 rounded" />
          <div className="h-4 w-28 bg-blue-100/80 dark:bg-blue-950/50 rounded" />
          <div className="h-4 w-28 bg-blue-100/80 dark:bg-blue-950/50 rounded" />
          <div className="h-4 w-28 bg-blue-100/80 dark:bg-blue-950/50 rounded" />
        </div>
        {/* Table Rows */}
        {[1, 2, 3, 4, 5].map((row) => (
          <div
            key={row}
            className="p-3 flex gap-4 border-b border-slate-100 dark:border-slate-800/80 last:border-b-0"
          >
            <div className="h-3.5 w-48 bg-slate-200/70 dark:bg-slate-700/70 rounded" />
            <div className="h-3.5 w-24 bg-slate-100 dark:bg-slate-800/60 rounded" />
            <div className="h-3.5 w-24 bg-slate-100 dark:bg-slate-800/60 rounded" />
            <div className="h-3.5 w-24 bg-slate-100 dark:bg-slate-800/60 rounded" />
            <div className="h-3.5 w-24 bg-slate-100 dark:bg-slate-800/60 rounded" />
          </div>
        ))}
      </div>
    </section>
  );
};

export const FullHomeViewSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-3.5 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6 md:space-y-8">
      <StatutoryRecognitionSkeleton />
      <DegreeProgramsSkeleton />
      <FeaturedUniversitiesSkeleton />
      <ComparisonMatrixSkeleton />
    </div>
  );
};
