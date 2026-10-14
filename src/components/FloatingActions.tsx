import React from 'react';
import { PhoneCall } from 'lucide-react';

interface FloatingActionsProps {
  onOpenCounselorModal: () => void;
  onOpenTrackModal?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenCounselorModal,
}) => {
  return (
    <aside
      aria-label="Quick counselor assistance"
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex items-center"
    >
      {/* Redesigned Counselor Help Floating Button */}
      <button
        type="button"
        onClick={onOpenCounselorModal}
        className="flex items-center gap-2.5 bg-white dark:bg-[#121c2e] hover:bg-[#f8faff] dark:hover:bg-[#182538] text-[#000f22] dark:text-white pl-2.5 pr-4 py-2 sm:py-2.5 rounded-full shadow-sm hover:shadow-md border border-slate-200/80 dark:border-slate-800 hover:border-[#115eaf] dark:hover:border-blue-400 transition-all duration-200 active:scale-95 group font-sans cursor-pointer"
        aria-label="Request free counselor callback"
        title="Free Academic Counselor Help"
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#115eaf] text-white flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105">
          <PhoneCall className="w-4 h-4 text-white" />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="block text-xs font-semibold text-[#000f22] leading-tight font-sans">
              Counselor Help
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="block text-[10px] text-[#555960] font-normal leading-tight mt-0.5 font-sans">
            100% Free Advice
          </span>
        </div>
      </button>
    </aside>
  );
};

