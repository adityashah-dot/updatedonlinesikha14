import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OverviewView } from './OverviewView';
import { AdmissionView } from './AdmissionView';
import { ScholarshipsView } from './ScholarshipsView';
import { CoursesAndFeesView } from './CoursesAndFeesView';
import { DEGREEFYD_LPU_API } from '../data/apiData';
import { getUniversityBySlug } from '../data/universities';
import { UniversityHero } from './university/UniversityHero';
import { UniversityOverview } from './university/UniversityOverview';
import { UniversityCourses } from './university/UniversityCourses';
import { UniversityAdmissions } from './university/UniversityAdmissions';
import { UniversityFees } from './university/UniversityFees';
import { UniversityPlacements } from './university/UniversityPlacements';
import { UniversityRankings } from './university/UniversityRankings';
import { UniversityLms } from './university/UniversityLms';
import { UniversityDates } from './university/UniversityDates';
import { UniversityFaq } from './university/UniversityFaq';
import { UniversityRelated } from './university/UniversityRelated';
import { UniversityCounsellingCard } from './university/UniversityCounsellingCard';
import type { Course } from '../types';

type LpuSection = 'overview' | 'courses' | 'admission' | 'scholarships' | 'lms';

interface CollegeDetailViewProps {
  onSelectCourse: (course: Course) => void;
  onOpenApply: (courseId?: string) => void;
  onOpenBrochure: (course?: Course) => void;
  onOpenHelpDesk: () => void;
  onOpenEmi: (courseId?: string) => void;
  onOpenLms: () => void;
}

// Slugs that have a full profile page
const SLUG_ALIASES: Record<string, string> = {
  lpu: 'lpu-online',
  'lpu-online': 'lpu-online',
  'lovely-professional-university': 'lpu-online',
  amity: 'amity-online',
  'amity-online': 'amity-online',
  'amity-university-online': 'amity-online',
  cu: 'cu-online',
  'cu-online': 'cu-online',
  'chandigarh-university': 'cu-online',
  manipal: 'manipal-online',
  'manipal-online': 'manipal-online',
  'online-manipal': 'manipal-online',
  jain: 'jain-online',
  'jain-online': 'jain-online',
  upes: 'upes-online',
  'upes-online': 'upes-online',
};

const LPU_TABS: { id: Exclude<LpuSection, 'lms'>; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: 'grid_view' },
  { id: 'courses', label: 'Courses', icon: 'menu_book' },
  { id: 'admission', label: 'Admission', icon: 'school' },
  { id: 'scholarships', label: 'Scholarships', icon: 'workspace_premium' },
];

const parseSection = (value: string | null): LpuSection => {
  if (value === 'courses' || value === 'admission' || value === 'scholarships' || value === 'lms') return value;
  return 'overview';
};

export const CollegeDetailView: React.FC<CollegeDetailViewProps> = ({
  onSelectCourse,
  onOpenApply,
  onOpenBrochure,
  onOpenHelpDesk,
  onOpenEmi,
  onOpenLms,
}) => {
  const { slug = '' } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const normalizedSlug = slug.toLowerCase();

  const collegeId = SLUG_ALIASES[normalizedSlug] || normalizedSlug;
  const college = DEGREEFYD_LPU_API.onlineUniversities.find((c) => c.id === collegeId) || getUniversityBySlug(collegeId);
  const universityData = getUniversityBySlug(collegeId);

  const [lpuSection, setLpuSection] = useState<LpuSection>(() => parseSection(searchParams.get('section')));

  useEffect(() => {
    setLpuSection(parseSection(searchParams.get('section')));
  }, [searchParams]);

  if (!college) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-[#f9f9ff]">
        <h1 className="text-8xl font-black text-[#115eaf]/20 mb-2 tracking-tighter">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#000f22] mb-3">University Not Found</h2>
        <p className="text-[#43474d] mb-8 max-w-md text-sm">
          We couldn't find the online university you're looking for. It may have been removed or the link might be broken.
        </p>
        <Link
          to="/universities"
          className="px-6 py-3 bg-[#115eaf] text-white text-sm font-semibold rounded-xl hover:bg-[#004689] shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse All Universities
        </Link>
      </div>
    );
  }

  const handleTabClick = (tab: LpuSection) => {
    if (tab === 'lms') {
      onOpenLms();
      return;
    }
    setLpuSection(tab);
    if (tab === 'overview') {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ section: tab }, { replace: true });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Section navigation (Clean, sticky, lite border shade)
  const universityNavigation = (
    <div className="sticky top-[68px] z-30 bg-white border-b border-[#e7eeff] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {LPU_TABS.map((tab) => {
            const isActive = lpuSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#115eaf] text-white font-semibold shadow-xs'
                    : 'text-[#43474d] hover:bg-[#f0f3ff] hover:text-[#115eaf]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] sm:text-[18px] leading-none">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => handleTabClick('lms')}
            className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors text-[#43474d] hover:bg-[#f0f3ff] hover:text-[#115eaf]"
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[18px] leading-none">devices</span>
            <span>LMS Portal</span>
          </button>
        </div>
      </div>
    </div>
  );

  // If viewing LPU Online: render LPU's dedicated 4-page views exactly as originally configured
  const isLpu = collegeId === 'lpu-online' || collegeId === 'lpu';
  if (isLpu) {
    return (
      <div>
        {lpuSection === 'overview' && (
          <OverviewView
            onSelectCourse={onSelectCourse}
            onOpenApply={onOpenApply}
            onOpenBrochure={onOpenBrochure}
            onOpenHelpDesk={onOpenHelpDesk}
            universityNavigation={universityNavigation}
          />
        )}

        {lpuSection === 'courses' && (
          <CoursesAndFeesView
            onSelectCourse={onSelectCourse}
            onOpenApply={onOpenApply}
            onOpenBrochure={onOpenBrochure}
            onOpenEmi={onOpenEmi}
            onOpenHelpDesk={onOpenHelpDesk}
            universityNavigation={universityNavigation}
          />
        )}

        {lpuSection === 'admission' && (
          <AdmissionView
            onSelectCourse={onSelectCourse}
            onOpenApply={onOpenApply}
            onOpenBrochure={() => onOpenBrochure()}
            onOpenHelpDesk={onOpenHelpDesk}
            onOpenEmi={() => onOpenEmi()}
            universityNavigation={universityNavigation}
          />
        )}

        {lpuSection === 'scholarships' && (
          <ScholarshipsView
            onOpenApply={onOpenApply}
            onOpenHelpDesk={onOpenHelpDesk}
            universityNavigation={universityNavigation}
          />
        )}
      </div>
    );
  }

  // If viewing any other college (Amity, CU, Manipal, Jain, UPES):
  // Render the exact same 4-page layout structure (Overview, Courses, Admission, Scholarships)
  if (universityData) {
    return (
      <div className="min-h-screen bg-[#f9f9ff]">
        {/* Top Hero Banner */}
        <UniversityHero
          university={universityData}
          onOpenApply={onOpenApply}
          onOpenBrochure={() => onOpenBrochure()}
          onOpenEmi={() => onOpenEmi()}
          onOpenCounselor={onOpenHelpDesk}
        />

        {/* Sticky 4-Page Navigation Tab Bar */}
        {universityNavigation}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <main className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={lpuSection}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="section-container"
                >
                  {/* PAGE 1: OVERVIEW PAGE */}
                  {lpuSection === 'overview' && (
                    <div className="section-container">
                      <UniversityOverview university={universityData} />
                      <UniversityPlacements university={universityData} />
                      <UniversityRankings university={universityData} />
                      <UniversityLms university={universityData} onOpenLms={onOpenLms} />
                      <UniversityFaq university={universityData} />
                      <UniversityRelated currentUniversityId={universityData.id} />
                    </div>
                  )}

                  {/* PAGE 2: COURSES & FEES PAGE */}
                  {lpuSection === 'courses' && (
                    <div className="section-container">
                      <UniversityCourses
                        university={universityData}
                        onOpenApply={onOpenApply}
                        onOpenEmi={onOpenEmi}
                        onSelectCourse={onSelectCourse}
                      />
                      <UniversityFees
                        university={universityData}
                        onOpenEmi={() => onOpenEmi()}
                        onOpenApply={() => onOpenApply()}
                      />
                    </div>
                  )}

                  {/* PAGE 3: ADMISSION PAGE */}
                  {lpuSection === 'admission' && (
                    <div className="section-container">
                      <UniversityAdmissions
                        university={universityData}
                        onOpenApply={() => onOpenApply()}
                      />
                      <UniversityDates
                        university={universityData}
                        onOpenApply={() => onOpenApply()}
                      />
                    </div>
                  )}

                  {/* PAGE 4: SCHOLARSHIPS & FINANCING PAGE */}
                  {lpuSection === 'scholarships' && (
                    <div className="section-container">
                      <UniversityFees
                        university={universityData}
                        onOpenEmi={() => onOpenEmi()}
                        onOpenApply={() => onOpenApply()}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-4 sm:space-y-6 lg:sticky lg:top-32">
              <UniversityCounsellingCard university={universityData} />
            </aside>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
