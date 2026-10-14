import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Laptop, CreditCard, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: 'validity' | 'exams' | 'fees' | 'admissions' | 'placements';
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'validity',
    question: 'Are online degrees recognized by UGC & AICTE and valid for UPSC/Govt jobs?',
    answer:
      'Yes, 100%. Under the UGC (Open and Distance Learning Programmes and Online Programmes) Regulations 2020, online degrees entitled by the UGC Distance Education Bureau (UGC-DEB) and AICTE are recognized on par with conventional campus degrees. They are legally valid for all Central and State Government examinations (UPSC Civil Services, SSC, Banking, Defense, and State PSCs) as well as for higher education admissions across India and globally.',
  },
  {
    category: 'validity',
    question: 'Are online degrees from Indian universities recognized abroad for WES and PR?',
    answer:
      'Yes. Online degrees from NAAC A++ and A+ accredited Indian universities (including LPU, Amity, Chandigarh University, and Manipal) are accepted by World Education Services (WES) for Canada and USA immigration points (Express Entry PR) as well as for admission into foreign master\'s and doctoral programs.',
  },
  {
    category: 'exams',
    question: 'How are semester examinations conducted in online degree programs?',
    answer:
      'Examinations are conducted 100% online through secure, AI-powered remote proctoring technology. You take examinations from your home using a computer with a webcam and microphone. The system features 360-degree environment scans and facial tracking. Most partner universities provide flexible weekend and evening exam time slots to accommodate working professionals.',
  },
  {
    category: 'fees',
    question: 'How do 0% interest monthly EMI financing plans work?',
    answer:
      'All featured universities offer zero-cost monthly EMI options through verified banking partners and NBFCs. Rather than paying the full semester fee upfront, your tuition is split into 6, 9, or 12 equal monthly installments with zero interest and zero loan processing fee. Pre-approval requires only basic identity and KYC documentation.',
  },
  {
    category: 'admissions',
    question: 'What is the eligibility criteria for Online MBA and MCA programs?',
    answer:
      'For Online MBA: Any Bachelor\'s degree (10+2+3 pattern) from a recognized university with at least 50% aggregate marks (45% for reserved categories). No CAT/MAT score is mandatory.\nFor Online MCA: BCA, B.Sc Computer Science/IT, or any graduate with Mathematics/Statistics at 10+2 or Bachelor\'s level with at least 50% marks.',
  },
  {
    category: 'exams',
    question: 'Do I ever need to visit the physical university campus during the course?',
    answer:
      'No physical campus visits are required for coursework or exams. All live lectures, recorded video modules, e-books, assignments, and semester tests are delivered via the university\'s Learning Management System (LMS) or mobile app. However, students are always welcome to attend the annual on-campus convocation ceremony in person.',
  },
  {
    category: 'placements',
    question: 'What placement assistance and career support do online students receive?',
    answer:
      'Enrolled students get access to the university\'s dedicated placement cell. This includes virtual job fairs, 1-on-1 resume building, LinkedIn optimization workshops, AI mock interview training, and direct interview opportunities with 300+ hiring partners (including Amazon, Cognizant, TCS, Deloitte, and Tech Mahindra).',
  },
  {
    category: 'validity',
    question: 'Does the degree certificate state "Online" or mention mode of study?',
    answer:
      'As per UGC regulations, degree certificates issued by entitled universities specify the degree name and the university. While UGC mandates mentioning the delivery mode, the legal standing, credit weightage, curriculum rigor, and alumni benefits are equivalent to regular on-campus graduates under UGC guidelines.',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'validity', label: 'UGC & Legal Validity' },
  { id: 'exams', label: 'Exams & LMS' },
  { id: 'fees', label: 'Fees & 0% EMI' },
  { id: 'admissions', label: 'Eligibility & Admissions' },
  { id: 'placements', label: 'Placements & Career' },
] as const;

interface HomeFaqProps {
  onOpenHelpDesk: () => void;
}

export const HomeFaq: React.FC<HomeFaqProps> = ({ onOpenHelpDesk }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faqs" className="bg-white dark:bg-[#111c2e] rounded-xl border border-slate-200/50 dark:border-slate-800/60 shadow-2xs p-5 md:p-7">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-4 border-b border-slate-100 dark:border-slate-800/80 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-[#115eaf]/10 text-[#115eaf] dark:text-blue-400">
              <HelpCircle className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold text-[#115eaf] dark:text-blue-400 uppercase tracking-wider">
              Student Knowledge Base
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#000f22] dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[13px] text-[#43474d] dark:text-slate-400 font-normal mt-0.5">
            Everything you need to know about UGC-DEB legal validity, home proctored exams, and fees.
          </p>
        </div>

        {/* Quick Help Trigger */}
        <button
          type="button"
          onClick={onOpenHelpDesk}
          className="text-xs font-semibold text-[#115eaf] dark:text-blue-400 hover:text-[#084a8c] dark:hover:text-blue-300 hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <span>Have another question? Speak to an Advisor</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-3 border-b border-slate-100 dark:border-slate-800/60 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              setActiveCategory(cat.id);
              setOpenIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#115eaf] text-white font-semibold shadow-2xs'
                : 'bg-slate-100/70 dark:bg-slate-800/60 text-[#43474d] dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-700/60 hover:text-[#000f22] dark:hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/60 mt-2">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="py-3.5 transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                aria-expanded={isOpen}
                className="w-full text-left flex items-center justify-between gap-4 py-1 text-sm sm:text-[15px] font-semibold text-[#000f22] dark:text-slate-100 hover:text-[#115eaf] dark:hover:text-blue-400 transition-colors cursor-pointer group"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 text-[#115eaf] dark:text-blue-400 text-[11px] font-bold flex items-center justify-center shrink-0 transition-colors">
                    {idx + 1}
                  </span>
                  <span>{faq.question}</span>
                </span>
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-blue-50 dark:bg-blue-950/50 text-[#115eaf] dark:text-blue-400' : 'text-[#74777e] dark:text-slate-400 group-hover:bg-slate-100 dark:group-hover:bg-slate-800'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {isOpen && (
                <div className="mt-2 pl-7.5 pr-4 text-xs sm:text-[13px] text-[#43474d] dark:text-slate-300 leading-relaxed font-normal whitespace-pre-line animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Assistance Banner */}
      <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#115eaf] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#000f22] dark:text-white">
              Still evaluating between programs or fee structures?
            </h4>
            <p className="text-[11px] sm:text-xs text-[#43474d] dark:text-slate-400 font-normal">
              Our educational counselors offer unbiased assistance with zero fees or sales pressure.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenHelpDesk}
          className="px-4 py-2 bg-[#115eaf] hover:bg-[#084a8c] text-white rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
        >
          Ask an Expert Now
        </button>
      </div>
    </section>
  );
};
