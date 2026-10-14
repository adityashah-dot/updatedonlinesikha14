import React, { useState } from 'react';
import { TabType } from '../types';
import { LogIn, User, Menu, X, ArrowRight, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenApply: () => void;
  onOpenHelpDesk: () => void;
  onOpenLms: () => void;
  onOpenChat?: () => void;
  onOpenChatWithQuery?: (query: string) => void;
  onOpenLogin?: () => void;
  loggedInUser?: { name: string; email: string } | null;
}

const GLOBAL_LINKS: { tab: TabType; label: string; badge?: string }[] = [
  { tab: 'universities', label: 'Universities' },
  { tab: 'degrees', label: 'Degrees' },
  { tab: 'roi', label: 'Salary ROI', badge: 'HOT' },
  { tab: 'how-it-works', label: 'How It Works' },
  { tab: 'placements', label: 'Placements' },
  { tab: 'compare', label: 'Compare Matrix' },
  { tab: 'scholarships', label: 'Scholarships 2026' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenApply,
  onOpenHelpDesk,
  onOpenLms,
  onOpenChat,
  onOpenLogin,
  loggedInUser,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleNavClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0b111e]/95 backdrop-blur-md shadow-2xs border-b border-slate-200/50 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-[60px] sm:h-[68px] flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group cursor-pointer select-none shrink-0"
        >
          <img
            src="/logo.svg"
            alt="Online Siksha - Higher Education Gateway"
            className="h-8 sm:h-10 md:h-11 w-auto"
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-[13px] xl:text-[14px] shrink-0">
          {GLOBAL_LINKS.map((link) => {
            const isActive =
              activeTab === link.tab ||
              (link.tab === 'universities' && activeTab === 'overview') ||
              (link.tab === 'degrees' && activeTab === 'courses');
            return (
              <button
                key={link.tab}
                onClick={() => handleNavClick(link.tab)}
                className={`flex items-center gap-1.5 font-medium transition-colors duration-150 shrink-0 pb-1 border-b-2 cursor-pointer ${
                  isActive
                    ? 'text-[#115eaf] dark:text-blue-400 border-[#115eaf] dark:border-blue-400 font-semibold'
                    : 'text-[#43474d] dark:text-slate-300 border-transparent hover:text-[#115eaf] dark:hover:text-blue-400'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[10px] font-bold px-1.5 py-0.2 rounded border border-amber-300 dark:border-amber-800/60">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Cluster */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all duration-150 active:scale-95 shadow-2xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Ask AI Advisor</span>
            </button>
          )}

          {/* Reduced size Get Free Counselling (Desktop) */}
          <button
            onClick={onOpenHelpDesk}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-[11px] font-medium transition-all duration-150 active:scale-95 shadow-2xs cursor-pointer"
          >
            <span>Get Free Counselling</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Login Button */}
          {loggedInUser ? (
            <button
              onClick={onOpenLogin}
              className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-800/70 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold transition-all cursor-pointer shadow-2xs hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
              title={`Logged in as ${loggedInUser.email}`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <User className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span className="truncate max-w-[70px] sm:max-w-[100px]">{loggedInUser.name}</span>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-[#115eaf] dark:hover:border-blue-500 text-[#000f22] dark:text-slate-200 hover:text-[#115eaf] hover:bg-[#f0f4f8] dark:hover:bg-slate-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            >
              <LogIn className="w-3.5 h-3.5 text-[#115eaf] dark:text-blue-400" />
              <span>Login</span>
            </button>
          )}

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-1.5 sm:p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#f0f4f8] dark:hover:bg-slate-800 transition-all cursor-pointer shadow-2xs flex items-center justify-center"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-[#f0f3ff] dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-2xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden relative z-40 bg-white dark:bg-[#0b111e] border-b border-slate-200/50 dark:border-slate-800/60 px-4 pt-3 pb-5 space-y-3 shadow-2xs max-h-[80vh] overflow-y-auto animate-fadeIn">
          {/* Appearance Toggle Row */}
          <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              {theme === 'dark' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              Appearance
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-2xs border border-slate-200 dark:border-slate-700 cursor-pointer flex items-center gap-1.5"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            {GLOBAL_LINKS.map((link) => (
              <button
                key={link.tab}
                onClick={() => handleNavClick(link.tab)}
                className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium flex items-center justify-between cursor-pointer transition-colors ${
                  activeTab === link.tab 
                    ? 'bg-[#f0f3ff] dark:bg-blue-950/40 text-[#115eaf] dark:text-blue-400 font-semibold' 
                    : 'text-[#43474d] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.label}
                  {link.badge && (
                    <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[10px] font-bold px-1.5 py-0.2 rounded border border-amber-300 dark:border-amber-800/60">
                      {link.badge}
                    </span>
                  )}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          {/* Actions in Mobile Menu */}
          <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/60 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHelpDesk();
              }}
              className="w-full py-2.5 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              Get Free Counselling
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            {onOpenChat && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChat();
                }}
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Ask AI Advisor</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
