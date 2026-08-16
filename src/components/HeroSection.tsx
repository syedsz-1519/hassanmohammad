import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ShieldCheck, ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { SlideId } from '../types';
import heroBgImage from '../assets/images/hero_desk_bg_1786819534034.jpg';

interface HeroSectionProps {
  onNavigate: (slide: SlideId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax scroll calculations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  // Animated count-up for numbers
  const [counts, setCounts] = useState({ total: 0, sap: 0, deloitte: 0, modules: 0 });

  useEffect(() => {
    const duration = 1200;
    const steps = 25;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        total: Math.round(PERSONAL_INFO.totalExperienceYears * ease),
        sap: Math.round(PERSONAL_INFO.sapExperienceYears * ease),
        deloitte: Math.round(PERSONAL_INFO.deloitteExperienceYears * ease),
        modules: Math.round(PERSONAL_INFO.modulesCount * ease)
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-slide"
      className="relative min-h-screen w-full flex flex-col justify-between pt-10 md:pt-14 pb-8 px-8 md:px-16 lg:px-24 bg-[#0B1220] overflow-hidden select-none"
    >
      {/* Full Workspace Background Image with Parallax Movement */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 overflow-hidden will-change-transform scale-110"
      >
        <img
          src={heroBgImage}
          alt="Executive Workspace Background"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Subtle dark tint to preserve image details while ensuring high legibility */}
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Top Left Profile & Headline Content with Parallax Fade/Rise */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-3xl flex flex-col items-start gap-4 mt-2 md:mt-4 will-change-transform"
      >
        {/* Name Title */}
        <h1
          id="hero-name-headline"
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.05] drop-shadow-md"
        >
          {PERSONAL_INFO.name}
        </h1>

        {/* Pill Badge: Senior Consultant */}
        <div
          id="hero-role-pill"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F62FE] text-white font-mono font-bold text-xs tracking-wider uppercase shadow-md"
        >
          <ShieldCheck className="w-4 h-4 text-white stroke-[2.5]" />
          <span>SENIOR CONSULTANT</span>
        </div>

        {/* Subhead Line */}
        <p className="text-base sm:text-lg md:text-xl font-semibold text-white/95 leading-snug drop-shadow-sm max-w-2xl pt-1">
          {PERSONAL_INFO.subhead}
        </p>

        {/* One-Line Context Description */}
        <p className="text-sm md:text-base text-white/85 leading-relaxed max-w-xl">
          {PERSONAL_INFO.contextSummary}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('experience')}
            id="hero-explore-exp-btn"
            className="px-5 py-2.5 rounded-xl bg-white text-[#0B1220] text-xs font-bold tracking-wider font-mono hover:bg-slate-100 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <span>EXPLORE EXPERIENCE</span>
            <span className="text-[#0F62FE]">→</span>
          </button>

          <button
            onClick={() => onNavigate('skills')}
            id="hero-view-skills-btn"
            className="px-5 py-2.5 rounded-xl bg-[#1A1816]/80 border border-white/10 text-white text-xs font-semibold tracking-wider font-mono hover:bg-[#1A1816] transition-all backdrop-blur-sm cursor-pointer"
          >
            <span>SPECIALIZATIONS</span>
          </button>
        </div>
      </motion.div>

      {/* Bottom Statistics Strip & Scroll Cue */}
      <div className="relative z-10 w-full pt-8 pb-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 items-end max-w-6xl">
          {/* Stat 1: Total Experience */}
          <div id="stat-dial-total" className="flex flex-col items-start group">
            <span className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1 drop-shadow-sm">
              TOTAL EXPERIENCE
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-mono font-black text-4xl md:text-5xl text-white tracking-tight drop-shadow-md">
                {counts.total}
              </span>
              <span className="font-mono text-sm font-semibold text-slate-300">yrs</span>
            </div>
            <div className="w-full max-w-[170px] h-1 rounded-full bg-white/20 mt-2 overflow-hidden">
              <div className="h-full bg-[#0F62FE] rounded-full" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Stat 2: SAP Experience */}
          <div id="stat-dial-sap" className="flex flex-col items-start group">
            <span className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1 drop-shadow-sm">
              SAP EXPERIENCE
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-mono font-black text-4xl md:text-5xl text-white tracking-tight drop-shadow-md">
                {counts.sap}
              </span>
              <span className="font-mono text-sm font-semibold text-slate-300">yrs</span>
            </div>
            <div className="w-full max-w-[170px] h-1 rounded-full bg-white/20 mt-2 overflow-hidden">
              <div className="h-full bg-[#0F62FE] rounded-full" style={{ width: '73%' }} />
            </div>
          </div>

          {/* Stat 3: Deloitte Experience */}
          <div id="stat-dial-deloitte" className="flex flex-col items-start group">
            <span className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1 drop-shadow-sm">
              DELOITTE
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-mono font-black text-4xl md:text-5xl text-white tracking-tight drop-shadow-md">
                {counts.deloitte}
              </span>
              <span className="font-mono text-sm font-semibold text-slate-300">yrs</span>
            </div>
            <div className="w-full max-w-[170px] h-1 rounded-full bg-white/20 mt-2 overflow-hidden">
              <div className="h-full bg-[#0F62FE] rounded-full" style={{ width: '53%' }} />
            </div>
          </div>

          {/* Stat 4: Modules Specialized */}
          <div id="stat-dial-modules" className="flex flex-col items-start group">
            <span className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1 drop-shadow-sm">
              MODULES SPECIALIZED
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono font-black text-4xl md:text-5xl text-white tracking-tight drop-shadow-md">
                {counts.modules}
              </span>
              <span className="font-mono text-[11px] md:text-xs font-bold text-[#5FA8FF]">
                MM, WM, CP
              </span>
            </div>
            <div className="w-full max-w-[170px] h-1 rounded-full bg-white/20 mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#0F62FE] via-[#FF8A00] to-[#00A389] rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        {/* Center Scroll Indicator Cue & Section Closure */}
        <div className="w-full flex flex-col items-center justify-center mt-3 gap-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-0.5"
          >
            <span className="w-6 h-px bg-white/20" />
            <span>End of Overview</span>
            <span className="w-6 h-px bg-white/20" />
          </motion.div>
          <button
            onClick={() => onNavigate('experience')}
            className="flex flex-col items-center gap-0.5 text-[10px] font-mono font-bold tracking-widest text-slate-300 hover:text-white transition-colors group cursor-pointer"
          >
            <span>SCROLL</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce text-slate-300 group-hover:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};
