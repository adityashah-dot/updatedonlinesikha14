import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { TabType, Course } from './types';
import { COURSES_DATA } from './data/coursesData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { HomeView } from './components/HomeView';
import { CollegeDetailView } from './components/CollegeDetailView';
import { CoursesAndFeesView } from './components/CoursesAndFeesView';
import { AdmissionView } from './components/AdmissionView';
import { ScholarshipsView } from './components/ScholarshipsView';
import { UniversitiesView } from './components/UniversitiesView';
import { CourseDetailModal } from './components/CourseDetailModal';
import { EmiCalculatorModal } from './components/EmiCalculatorModal';
import { ApplyOnlineModal } from './components/ApplyOnlineModal';
import { BrochureModal } from './components/BrochureModal';
import { LmsPortalModal } from './components/LmsPortalModal';
import { HelpDeskModal } from './components/HelpDeskModal';
import { LoginModal, UserSession } from './components/LoginModal';
import { FloatingActions } from './components/FloatingActions';
import { CounselorModal } from './components/CounselorModal';
import { TrackApplicationModal } from './components/TrackApplicationModal';
import { GeminiChatbot, ChatbotFloatingTrigger } from './components/chat/GeminiChatbot';
import { BookOpen, GraduationCap, Home, FileText, Building2, Award } from 'lucide-react';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Keep the existing tab-based Navbar/Footer working by deriving the active
  // tab from the current route instead of holding it in state.
  const routeToTab = (path: string, search: string = ''): TabType => {
    if (path.startsWith('/universities/lpu') || path.startsWith('/universities/lovely')) {
      if (search.includes('section=courses')) return 'courses';
      if (search.includes('section=admission')) return 'admission';
      if (search.includes('section=scholarships')) return 'scholarships';
      return 'overview';
    }
    if (path.startsWith('/universities/amity')) return 'universities';
    if (path.startsWith('/courses')) return 'courses';
    if (path.startsWith('/admission')) return 'admission';
    if (path.startsWith('/scholarships')) return 'scholarships';
    if (path.startsWith('/universities')) return 'universities';
    if (path.startsWith('/colleges')) return 'universities';
    return 'home';
  };

  const activeTab: TabType = routeToTab(location.pathname, location.search);

  const scrollToHomeSection = (id: string) => {
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 80);
  };

  const setActiveTab = (tab: TabType) => {
    const onLpuProfile =
      location.pathname.startsWith('/universities/lpu') ||
      location.pathname.startsWith('/universities/lovely');

    const routes: Record<TabType, string> = {
      home: '/',
      universities: '/universities',
      courses: onLpuProfile ? '/universities/lpu-online?section=courses' : '/courses',
      overview: '/universities/lpu-online',
      admission: onLpuProfile ? '/universities/lpu-online?section=admission' : '/admission',
      scholarships: onLpuProfile ? '/universities/lpu-online?section=scholarships' : '/scholarships',
      lms: '/courses',
      degrees: '/',
      compare: '/',
      nirf: '/universities',
      roi: '/',
      'how-it-works': '/',
      placements: '/',
    };
    navigate(routes[tab]);
    if (tab === 'degrees') scrollToHomeSection('degrees');
    else if (tab === 'compare') scrollToHomeSection('compare');
    else if (tab === 'roi') scrollToHomeSection('roi-calculator');
    else if (tab === 'how-it-works') scrollToHomeSection('how-it-works');
    else if (tab === 'placements') scrollToHomeSection('placements');
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Modals state
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<Course | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [applyCourseId, setApplyCourseId] = useState<string>('mba');
  const [emiPlanDetails, setEmiPlanDetails] = useState<{ emiAmount: number; tenure: number } | null>(null);
  const [isEmiModalOpen, setIsEmiModalOpen] = useState<boolean>(false);
  const [emiCourseId, setEmiCourseId] = useState<string>('mba');
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState<boolean>(false);
  const [selectedCourseForBrochure, setSelectedCourseForBrochure] = useState<Course | null>(null);
  const [isLmsModalOpen, setIsLmsModalOpen] = useState<boolean>(false);
  const [isHelpDeskModalOpen, setIsHelpDeskModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<UserSession | null>(null);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState<boolean>(false);
  const [isCounselorModalOpen, setIsCounselorModalOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatInitialQuery, setChatInitialQuery] = useState<string>('');

  // Handlers
  const handleOpenCourseDetail = (course: Course) => {
    setSelectedCourseForDetail(course);
  };

  const handleSelectCourseById = (courseId: string) => {
    const course = COURSES_DATA.find(c => c.id === courseId);
    if (course) {
      setSelectedCourseForDetail(course);
    }
  };

  const handleOpenApply = (courseId?: string) => {
    if (courseId) {
      setApplyCourseId(courseId);
    }
    setEmiPlanDetails(null);
    setIsApplyModalOpen(true);
  };

  const handleOpenEmi = (courseId?: string) => {
    if (courseId) {
      setEmiCourseId(courseId);
    }
    setIsEmiModalOpen(true);
  };

  const handleApplyWithEmi = (courseId: string, emiAmount: number, tenure: number) => {
    setApplyCourseId(courseId);
    setEmiPlanDetails({ emiAmount, tenure });
    setIsApplyModalOpen(true);
  };

  const handleOpenBrochure = (course?: Course) => {
    setSelectedCourseForBrochure(course || null);
    setIsBrochureModalOpen(true);
  };

  const handleOpenChatWithQuery = (query: string) => {
    setChatInitialQuery(query);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9ff] text-[#111c2d] font-sans pb-14 md:pb-0 transition-colors duration-200">
      {/* Top Application Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenApply={() => handleOpenApply()}
        onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)}
        onOpenLms={() => setIsLmsModalOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        loggedInUser={loggedInUser}
      />

      {/* Routed Pages with Framer Motion Page Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <HomeView
                    onOpenApply={handleOpenApply}
                    onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)}
                  />
                </PageTransition>
              }
            />

            <Route
              path="/universities/:slug"
              element={
                <PageTransition>
                  <CollegeDetailView
                    onSelectCourse={handleOpenCourseDetail}
                    onOpenApply={handleOpenApply}
                    onOpenBrochure={handleOpenBrochure}
                    onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)}
                    onOpenEmi={handleOpenEmi}
                    onOpenLms={() => setIsLmsModalOpen(true)}
                  />
                </PageTransition>
              }
            />

            <Route
              path="/universities"
              element={
                <PageTransition>
                  <UniversitiesView
                    onOpenApply={() => handleOpenApply()}
                    onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)}
                    onOpenBrochure={() => handleOpenBrochure()}
                  />
                </PageTransition>
              }
            />

            <Route
              path="/courses"
              element={
                <PageTransition>
                  <CoursesAndFeesView
                    onSelectCourse={handleOpenCourseDetail}
                    onOpenApply={handleOpenApply}
                    onOpenBrochure={handleOpenBrochure}
                    onOpenEmi={handleOpenEmi}
                    onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)}
                  />
                </PageTransition>
              }
            />

            <Route
              path="/admission"
              element={
                <PageTransition>
                  <AdmissionView
                    onSelectCourse={handleOpenCourseDetail}
                    onOpenApply={handleOpenApply}
                    onOpenBrochure={() => handleOpenBrochure()}
                    onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)}
                    onOpenEmi={() => handleOpenEmi()}
                  />
                </PageTransition>
              }
            />

            <Route
              path="/scholarships"
              element={
                <PageTransition>
                  <ScholarshipsView
                    onOpenApply={handleOpenApply}
                    onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)}
                  />
                </PageTransition>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Institutional Desktop Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onSelectCourse={handleSelectCourseById}
        onOpenApply={() => handleOpenApply()}
      />

      {/* Mobile Sticky Bottom Navigation Dock */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-white/95 dark:bg-[#0b111e]/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800/60 px-1 py-1 flex items-center justify-around shadow-2xs">
        <button
          onClick={() => {
            setActiveTab('courses');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all ${
            activeTab === 'courses' ? 'bg-blue-50 dark:bg-blue-950/50 text-[#115eaf] dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span>Courses</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all ${
            activeTab === 'home' ? 'bg-blue-50 dark:bg-blue-950/50 text-[#115eaf] dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('universities');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all ${
            activeTab === 'universities' ? 'bg-blue-50 dark:bg-blue-950/50 text-[#115eaf] dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Building2 className="w-4 h-4 mb-0.5" />
          <span>Universities</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('admission');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all ${
            activeTab === 'admission' ? 'bg-blue-50 dark:bg-blue-950/50 text-[#115eaf] dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <GraduationCap className="w-4 h-4 mb-0.5" />
          <span>Admission</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('scholarships');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all ${
            activeTab === 'scholarships' ? 'bg-blue-50 dark:bg-blue-950/50 text-[#115eaf] dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Award className="w-4 h-4 mb-0.5" />
          <span>Scholarship</span>
        </button>

        <button
          onClick={() => handleOpenApply()}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[10px] sm:text-[11px] font-bold bg-[#115eaf] hover:bg-[#084a8c] text-white shadow-2xs transition-all active:scale-95"
        >
          <FileText className="w-4 h-4 mb-0.5" />
          <span>Apply</span>
        </button>
      </nav>

      {/* Modals Container */}
      <CourseDetailModal
        course={selectedCourseForDetail}
        isOpen={selectedCourseForDetail !== null}
        onClose={() => setSelectedCourseForDetail(null)}
        onOpenApply={(courseId) => {
          setSelectedCourseForDetail(null);
          handleOpenApply(courseId);
        }}
        onOpenBrochure={(course) => {
          setSelectedCourseForDetail(null);
          handleOpenBrochure(course);
        }}
        onOpenEmi={(courseId) => {
          setSelectedCourseForDetail(null);
          handleOpenEmi(courseId);
        }}
      />

      <EmiCalculatorModal
        isOpen={isEmiModalOpen}
        onClose={() => setIsEmiModalOpen(false)}
        initialCourseId={emiCourseId}
        onApplyWithEmi={handleApplyWithEmi}
      />

      <ApplyOnlineModal
        isOpen={isApplyModalOpen}
        onClose={() => {
          setIsApplyModalOpen(false);
          setEmiPlanDetails(null);
        }}
        preselectedCourseId={applyCourseId}
        emiPlanDetails={emiPlanDetails}
      />

      <BrochureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
        selectedCourse={selectedCourseForBrochure}
      />

      <LmsPortalModal
        isOpen={isLmsModalOpen}
        onClose={() => setIsLmsModalOpen(false)}
        onOpenApply={() => {
          setIsLmsModalOpen(false);
          handleOpenApply();
        }}
      />

      <HelpDeskModal
        isOpen={isHelpDeskModalOpen}
        onClose={() => setIsHelpDeskModalOpen(false)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(user) => {
          setLoggedInUser(user);
        }}
      />

      <TrackApplicationModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
      />

      <CounselorModal
        isOpen={isCounselorModalOpen}
        onClose={() => setIsCounselorModalOpen(false)}
      />

      {/* Floating Bottom Action Buttons */}
      <FloatingActions
        onOpenCounselorModal={() => setIsCounselorModalOpen(true)}
        onOpenTrackModal={() => setIsTrackModalOpen(true)}
      />

      {/* Floating AI Chatbot Trigger & Chat Window */}
      <ChatbotFloatingTrigger onClick={() => setIsChatOpen(true)} />

      <GeminiChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenApply={handleOpenApply}
        initialQuery={chatInitialQuery}
      />
    </div>
  );
}
