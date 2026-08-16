import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Building, ChevronRight, Sparkles, Footprints, Calendar, MapPin, Award } from 'lucide-react';
import { ScrollCorridor, MilestoneNodeConfig } from './corridor/ScrollCorridor';
import { CAREER_MILESTONES } from '../data';
import { SlideId } from '../types';

interface CareerTrajectorySectionProps {
  onNavigate?: (slide: SlideId) => void;
}

// Convert CAREER_MILESTONES from data.ts to MilestoneNodeConfigs mapped along the 3D CatmullRom spline
const MILESTONE_CONFIGS: MilestoneNodeConfig[] = CAREER_MILESTONES.map((m, idx) => {
  const tValues = [0.08, 0.28, 0.50, 0.72, 0.92];
  return {
    id: m.id,
    stepNumber: m.stepNumber,
    title: m.title,
    company: m.company,
    period: m.period,
    duration: m.duration,
    accentColor: m.accentColor,
    description: m.description,
    tPosition: tValues[idx] || 0.5,
    era: m.era
  };
});

export const CareerTrajectorySection: React.FC<CareerTrajectorySectionProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Track scroll within this trajectory container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const current = -rect.top;
      const progress = Math.max(0, Math.min(1, current / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeMilestone = CAREER_MILESTONES[activeMilestoneIdx] || CAREER_MILESTONES[0];

  // Mobile / Reduced Motion Fallback: Vertical Stepped Pathway
  if (isReducedMotion || isMobile) {
    return (
      <section
        id="trajectory-slide"
        className="relative py-16 px-6 md:px-12 bg-[#0B1220] text-white border-t border-white/10"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0F62FE]/20 text-[#5FA8FF] flex items-center justify-center">
                <Footprints className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
                  Career Trajectory Pathway
                </h2>
                <span className="text-xs font-mono text-slate-400">
                  Chronological progression from Associate Trainee to Senior Consultant
                </span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-[#0F62FE] text-white text-xs font-mono font-bold">
              Jan 2015 – Present (11+ Yrs)
            </span>
          </div>

          {/* Stepped Timeline List */}
          <div className="relative pl-6 space-y-6">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#38BDF8] via-[#2563EB] to-[#0F62FE]" />

            {CAREER_MILESTONES.map((milestone) => (
              <div key={milestone.id} className="relative group">
                <div
                  className="absolute -left-6 top-1.5 w-5 h-5 rounded-full border-2 border-white shadow-md flex items-center justify-center"
                  style={{ backgroundColor: milestone.accentColor }}
                >
                  <span className="text-[9px] font-mono font-bold text-white">
                    {milestone.stepNumber}
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold text-white"
                      style={{ backgroundColor: milestone.accentColor }}
                    >
                      {milestone.era === 'deloitte' ? 'DELOITTE ERA' : 'YASH ERA'}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {milestone.period} · {milestone.duration}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white">
                    {milestone.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{milestone.company}</span>
                    <span>•</span>
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{milestone.location}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {milestone.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {milestone.keyHighlights.map((hl, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono text-slate-300 border border-white/10"
                      >
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 3D Scroll-Driven Walking Pathway Corridor (~280vh pinned scroll range)
  return (
    <div
      ref={containerRef}
      id="trajectory-slide"
      className="relative w-full h-[280vh] bg-[#070D18]"
    >
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between select-none">
        {/* 3D Scene with CatmullRom curve & Glowing Floor Nodes */}
        <div className="absolute inset-0 z-0">
          <ScrollCorridor
            type="career-pathway"
            progress={scrollProgress}
            milestones={MILESTONE_CONFIGS}
            onActiveIndexChange={setActiveMilestoneIdx}
          />
        </div>

        {/* Top Corridor HUD Bar */}
        <div className="relative z-10 p-6 md:px-12 lg:pl-28 flex items-center justify-between max-w-7xl mx-auto w-full backdrop-blur-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0F62FE] to-[#5FA8FF] text-white flex items-center justify-center shadow-lg">
              <Footprints className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-lg md:text-xl text-white tracking-tight">
                  Career Trajectory Pathway
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                  WALKING 3D CORRIDOR
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                SCROLL TO ADVANCE ALONG THE CAREER MILESTONES (2015 → PRESENT)
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono text-white">
              STEP {activeMilestone.stepNumber} OF {CAREER_MILESTONES.length}
            </span>
          </div>
        </div>

        {/* Floating Active Milestone Info Plaque Card in Center-Bottom */}
        <div className="relative z-10 px-6 md:px-12 lg:pl-28 max-w-7xl mx-auto w-full mb-8">
          <div className="p-6 rounded-3xl bg-[#0B1426]/85 border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              {/* Left Details */}
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center flex-wrap gap-2.5">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold text-white shadow-md flex items-center gap-1.5"
                    style={{ backgroundColor: activeMilestone.accentColor }}
                  >
                    <Award className="w-3.5 h-3.5" />
                    STEP 0{activeMilestone.stepNumber} // {activeMilestone.era.toUpperCase()} ERA
                  </span>

                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-slate-200 border border-white/15">
                    {activeMilestone.period} ({activeMilestone.duration})
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">
                    {activeMilestone.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-mono text-[#5FA8FF] mt-1">
                    <Building className="w-4 h-4" />
                    <span className="font-bold text-white">{activeMilestone.company}</span>
                    <span>•</span>
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-300">{activeMilestone.location}</span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                  {activeMilestone.description}
                </p>

                {/* Milestone Key Highlights */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeMilestone.keyHighlights.map((hl, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-mono text-white border border-white/15 shadow-xs"
                    >
                      ✓ {hl}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Milestone Switcher & Scroll Meter */}
              <div className="flex flex-col items-end gap-3 w-full lg:w-auto">
                <div className="flex items-center gap-1.5 bg-black/50 p-1.5 rounded-xl border border-white/15">
                  {CAREER_MILESTONES.map((m, idx) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveMilestoneIdx(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        activeMilestoneIdx === idx
                          ? 'bg-white text-[#0B1220] shadow-md scale-105'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title={m.title}
                    >
                      0{m.stepNumber}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <span>PATH PROGRESS:</span>
                  <span className="text-white font-bold">{Math.round(scrollProgress * 100)}%</span>
                  <div className="w-24 h-1.5 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#38BDF8] via-[#2563EB] to-[#0F62FE]"
                      style={{ width: `${scrollProgress * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
