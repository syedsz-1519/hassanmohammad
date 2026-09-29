import React, { useState } from 'react';
import { Home, Briefcase, GraduationCap, Wrench, Mail, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideId } from '../types';

interface ModuleRailProps {
  activeSlide: SlideId;
  onNavigate: (slide: SlideId) => void;
  onOpenResume?: () => void;
}

interface NavItem {
  id: SlideId;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  tooltipTitle: string;
  tooltipDesc: string;
  meta: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'hero',
    label: 'Home',
    shortLabel: 'Home',
    icon: Home,
    accentColor: '#0F62FE',
    accentBg: 'bg-[#0F62FE]',
    accentBorder: 'border-[#0F62FE]',
    tooltipTitle: 'Profile & Headline',
    tooltipDesc: 'SAP Enterprise Consultant overview & key credentials',
    meta: 'Intro'
  },
  {
    id: 'experience',
    label: 'Experience',
    shortLabel: 'Exp',
    icon: Briefcase,
    accentColor: '#0F62FE',
    accentBg: 'bg-[#0F62FE]',
    accentBorder: 'border-[#0F62FE]',
    tooltipTitle: 'Professional Experience',
    tooltipDesc: 'Deloitte India (Offices of the US) & YASH Technologies enterprise work',
    meta: '11+ Yrs'
  },
  {
    id: 'education',
    label: 'Education',
    shortLabel: 'Edu',
    icon: GraduationCap,
    accentColor: '#FF8A00',
    accentBg: 'bg-[#FF8A00]',
    accentBorder: 'border-[#FF8A00]',
    tooltipTitle: 'Academic Background',
    tooltipDesc: 'MBA (Finance & Marketing), BCom (Honours), Intermediate & SSC',
    meta: 'MBA & BCom'
  },
  {
    id: 'skills',
    label: 'Skills',
    shortLabel: 'Skills',
    icon: Wrench,
    accentColor: '#00A389',
    accentBg: 'bg-[#00A389]',
    accentBorder: 'border-[#00A389]',
    tooltipTitle: 'Competencies & Tools',
    tooltipDesc: 'SAP MM, WM, Central Procurement, S/4HANA, & Ariba',
    meta: 'Tech Stack'
  },
  {
    id: 'contact',
    label: 'Contact',
    shortLabel: 'Contact',
    icon: Mail,
    accentColor: '#0F62FE',
    accentBg: 'bg-[#0F62FE]',
    accentBorder: 'border-[#0F62FE]',
    tooltipTitle: 'Connect & Inquiries',
    tooltipDesc: 'Professional contacts, email, phone & direct networking',
    meta: 'Get in touch'
  }
];

export const ModuleRail: React.FC<ModuleRailProps> = ({
  activeSlide,
  onNavigate,
  onOpenResume
}) => {
  const [hoveredItem, setHoveredItem] = useState<SlideId | null>(null);

  return (
    <>
      {/* Desktop Left Rail Navigation with Refined Hover Tooltips */}
      <nav
        aria-label="Portfolio sections"
        className="hidden lg:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-2.5 bg-[#0B132B]/85 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-2xl"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSlide === item.id;
          const isHovered = hoveredItem === item.id;
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="relative flex items-center"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button
                onClick={() => onNavigate(item.id)}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group cursor-pointer w-full text-left ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
                title={item.label}
              >
                {/* Active Indicator Accent Pill */}
                {isActive && (
                  <span
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full"
                    style={{ backgroundColor: item.accentColor }}
                  />
                )}

                <Icon
                  className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110"
                  style={{ color: isActive ? item.accentColor : 'inherit' }}
                />

                <span className="text-xs font-mono tracking-wide whitespace-nowrap">
                  {item.label}
                </span>
              </button>

              {/* Small, Non-Intrusive Quick-Context Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 6, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute left-full ml-3 top-1/2 -translate-y-1/2 pointer-events-none z-50 min-w-[210px] max-w-[240px]"
                  >
                    <div className="bg-[#0A1224]/95 border border-white/15 backdrop-blur-xl rounded-xl p-2.5 shadow-2xl relative">
                      {/* Left subtle arrow indicator */}
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#0A1224] border-l border-b border-white/15 rotate-45" />

                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-mono font-bold text-white tracking-tight flex items-center gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: item.accentColor }}
                          />
                          {item.tooltipTitle}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                          {item.meta}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-300 leading-snug">
                        {item.tooltipDesc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Dedicated Resume Action Button in Rail */}
        {onOpenResume && (
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={onOpenResume}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#0F62FE]/20 hover:bg-[#0F62FE]/30 text-[#5FA8FF] hover:text-white border border-[#0F62FE]/30 transition-all cursor-pointer w-full text-left font-mono text-xs font-bold"
              title="View Executive Resume"
            >
              <FileText className="w-4 h-4 text-[#0F62FE] shrink-0" />
              <span>Resume</span>
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Floating Navigation Bar */}
      <nav
        aria-label="Mobile portfolio navigation"
        className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 bg-[#0B132B]/90 backdrop-blur-lg px-3 py-2 rounded-2xl border border-white/15 shadow-2xl max-w-[92vw]"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSlide === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center px-2.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon
                className="w-4 h-4"
                style={{ color: isActive ? item.accentColor : 'inherit' }}
              />
              <span className="text-[10px] font-mono mt-0.5 tracking-tight">
                {item.shortLabel}
              </span>
            </button>
          );
        })}

        {onOpenResume && (
          <button
            onClick={onOpenResume}
            className="flex flex-col items-center justify-center px-2.5 py-1.5 rounded-xl bg-[#0F62FE]/30 text-white border border-[#0F62FE]/40 transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#5FA8FF]" />
            <span className="text-[10px] font-mono font-bold mt-0.5 tracking-tight text-[#5FA8FF]">
              CV
            </span>
          </button>
        )}
      </nav>
    </>
  );
};

