import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export interface ProcessStep {
  stepNumber?: string;
  title: string;
  description: string;
  points?: string[];
  badgeTag?: string;
}

interface AnimatedStepProcessProps {
  id?: string;
  badgeLabel?: string;
  title: string;
  description: string;
  steps: ProcessStep[];
  className?: string;
}

export const AnimatedStepProcess: React.FC<AnimatedStepProcessProps> = ({
  id,
  badgeLabel,
  title,
  description,
  steps,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealedSteps, setRevealedSteps] = useState<boolean[]>(() =>
    new Array(steps.length).fill(false)
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setRevealedSteps(new Array(steps.length).fill(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          // Stagger the reveal of each step
          steps.forEach((_, idx) => {
            window.setTimeout(() => {
              setRevealedSteps((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }, idx * 280);
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <section
      id={id}
      ref={containerRef}
      className={`page-section card bg-white dark:bg-[#111c2e] rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-2xs p-5 sm:p-7 transition-colors ${className}`}
    >
      {/* Header */}
      <div className="mb-6">
        {badgeLabel && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#115eaf] dark:text-blue-400 text-[11px] font-semibold border border-blue-200/60 dark:border-blue-800/60 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badgeLabel}</span>
          </div>
        )}
        <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] dark:text-white">
          {title}
        </h2>
        <span className="block w-16 h-[4px] rounded-full bg-[#115eaf] mt-1 mb-2" />
        <p className="section-description text-sm text-[#43474d] dark:text-slate-300 leading-relaxed font-normal mt-1 max-w-4xl">
          {description}
        </p>
      </div>

      {/* Step Flow List */}
      <div className="space-y-0 pt-2">
        {steps.map((step, idx) => {
          const isRevealed = revealedSteps[idx];
          const stepNumber = step.stepNumber || `Step ${String(idx + 1).padStart(2, '0')}`;

          return (
            <div
              key={idx}
              className={`anim-step group ${isRevealed ? 'step-in' : ''}`}
            >
              {/* Left Column: Chevron Badge & Connecting Chevrons */}
              <div className="step-left">
                <div className="step-badge shadow-2xs group-hover:brightness-110 transition-all">
                  <span className="tabular-nums tracking-tight select-none">
                    {stepNumber}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="step-conn" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                )}
              </div>

              {/* Right Column: Step Content Body */}
              <div className="step-body">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#000f22] dark:text-white leading-snug">
                    {step.title}
                  </h3>
                  {step.badgeTag && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-[#115eaf] dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                      {step.badgeTag}
                    </span>
                  )}
                </div>
                <p className="text-[13.5px] sm:text-[14.5px] text-[#43474d] dark:text-slate-300 leading-relaxed font-normal">
                  {step.description}
                </p>

                {/* Optional key points bullet list */}
                {step.points && step.points.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {step.points.map((pt, pIdx) => (
                      <span
                        key={pIdx}
                        className="inline-flex items-center gap-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 rounded-md px-2.5 py-1 font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#115eaf] dark:text-blue-400 shrink-0" />
                        <span>{pt}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
