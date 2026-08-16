import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import {
  Building2,
  MapPin,
  ChevronRight,
  Briefcase,
  MousePointer2,
  ArrowDown,
  Touchpad
} from 'lucide-react';
import { SlideId } from '../types';
import { EXPERIENCES, BIO_PARAGRAPHS, PERSONAL_INFO } from '../data';
import deloitteHyderabadBg from '../assets/images/deloitte_hyderabad_real_1786853819516.jpg';
import yashHyderabadBg from '../assets/images/yash_hyderabad_office_1786853833658.jpg';

interface HeroCorridorTransitionProps {
  onNavigate?: (slide: SlideId) => void;
}

export const HeroCorridorTransition: React.FC<HeroCorridorTransitionProps> = ({
  onNavigate
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeEra, setActiveEra] = useState<'deloitte' | 'yash'>('deloitte');
  const isDeloitte = activeEra === 'deloitte';

  const deloitteExp = EXPERIENCES[0];
  const yashExp = EXPERIENCES[1];

  // Touch tracking state for velocity-aware gestures on touch screens
  const touchState = useRef({
    startY: 0,
    startX: 0,
    startTime: 0,
    lastY: 0,
    lastTime: 0,
    velocity: 0,
    isSwiping: false
  });

  // Scroll tracking across the 200vh height track
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  // Smooth scroll-driven background opacity and parallax scales
  const deloitteBgOpacity = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [1, 0.85, 0.15, 0]);
  const yashBgOpacity = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [0, 0.15, 0.85, 1]);
  const deloitteBgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.06]);
  const yashBgScale = useTransform(scrollYProgress, [0.5, 1], [1.06, 1]);

  // Synchronize state with scrolling
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest >= 0.48 && activeEra !== 'yash') {
      setActiveEra('yash');
    } else if (latest < 0.48 && activeEra !== 'deloitte') {
      setActiveEra('deloitte');
    }
  });

  const scrollToDeloitte = useCallback(() => {
    setActiveEra('deloitte');
    if (sectionRef.current) {
      const top = sectionRef.current.offsetTop;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const scrollToYash = useCallback(() => {
    setActiveEra('yash');
    if (sectionRef.current) {
      const top = sectionRef.current.offsetTop + sectionRef.current.offsetHeight * 0.55;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  // Velocity-Aware Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const now = performance.now();
    touchState.current = {
      startY: touch.clientY,
      startX: touch.clientX,
      startTime: now,
      lastY: touch.clientY,
      lastTime: now,
      velocity: 0,
      isSwiping: true
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchState.current.isSwiping || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const now = performance.now();
    const dt = now - touchState.current.lastTime;
    if (dt > 10) {
      const dy = touch.clientY - touchState.current.lastY;
      // Instantaneous velocity (px/ms)
      touchState.current.velocity = dy / dt;
      touchState.current.lastY = touch.clientY;
      touchState.current.lastTime = now;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchState.current.isSwiping) return;
    touchState.current.isSwiping = false;

    const endY = e.changedTouches[0].clientY;
    const endX = e.changedTouches[0].clientX;
    const totalDeltaY = endY - touchState.current.startY;
    const totalDeltaX = endX - touchState.current.startX;
    const totalDuration = performance.now() - touchState.current.startTime;

    // Ensure it's primarily a vertical gesture
    if (Math.abs(totalDeltaY) > Math.abs(totalDeltaX) && Math.abs(totalDeltaY) > 35) {
      const avgVelocity = totalDeltaY / totalDuration; // px/ms
      const finalVelocity = touchState.current.velocity;
      const effectiveVelocity = Math.abs(finalVelocity) > Math.abs(avgVelocity) ? finalVelocity : avgVelocity;

      // Swiping UP (scrolling forward towards YASH)
      if ((totalDeltaY < -40 || effectiveVelocity < -0.3) && activeEra === 'deloitte') {
        scrollToYash();
      }
      // Swiping DOWN (scrolling backward towards DELOITTE)
      else if ((totalDeltaY > 40 || effectiveVelocity > 0.3) && activeEra === 'yash') {
        scrollToDeloitte();
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience-slide"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[200vh] w-full bg-[#030712] text-white select-none touch-pan-y"
    >
      {/* STICKY FULLSCREEN VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-6 md:py-10 px-4 sm:px-6 md:px-12 lg:pl-28">
        
        {/* ======================================================== */}
        {/* HIGH-TRANSPARENCY OFFICE PHOTOGRAPHY BACKGROUNDS */}
        {/* ======================================================== */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* BACKGROUND 1: DELOITTE HYDERABAD */}
          <motion.div
            className="absolute inset-0 will-change-opacity will-change-transform"
            style={{
              opacity: deloitteBgOpacity,
              scale: deloitteBgScale
            }}
          >
            <img
              src={deloitteHyderabadBg}
              alt="Deloitte India (Offices of the US) Hyderabad"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Highly transparent gradient overlay so office architecture shines through clearly */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/55 via-[#030712]/30 to-[#030712]/60 backdrop-blur-[0.5px]" />
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#0F62FE]/25 blur-3xl" />
          </motion.div>

          {/* BACKGROUND 2: YASH TECHNOLOGIES HYDERABAD */}
          <motion.div
            className="absolute inset-0 will-change-opacity will-change-transform"
            style={{
              opacity: yashBgOpacity,
              scale: yashBgScale
            }}
          >
            <img
              src={yashHyderabadBg}
              alt="YASH Technologies Hyderabad"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Highly transparent gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/55 via-[#030712]/30 to-[#030712]/60 backdrop-blur-[0.5px]" />
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#0284C7]/25 blur-3xl" />
          </motion.div>

          {/* Subtle transparent grid texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        </div>

        {/* ======================================================== */}
        {/* SECTION HEADER & ERA CONTROLS */}
        {/* ======================================================== */}
        <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/15 backdrop-blur-xs">
          {/* Organization Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black/35 border border-white/25 text-white flex items-center justify-center backdrop-blur-md shadow-lg shrink-0">
              {isDeloitte ? (
                <Briefcase className="w-5 h-5 text-[#86EFAC]" />
              ) : (
                <Building2 className="w-5 h-5 text-sky-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-white tracking-wide">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-xs text-slate-300">·</span>
                <span
                  className={`text-xs font-mono font-bold tracking-wider ${
                    isDeloitte ? 'text-[#86EFAC]' : 'text-sky-300'
                  }`}
                >
                  {isDeloitte ? 'DELOITTE INDIA (OFFICES OF THE US)' : 'YASH TECHNOLOGIES'}
                </span>
              </div>
              <span className="text-xs text-slate-200 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-300" />
                Hyderabad, Telangana, India
              </span>
            </div>
          </div>

          {/* Era Switcher Toggle & Scroll Hint */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-2xl border border-white/20 backdrop-blur-md shadow-xl">
              <button
                onClick={scrollToDeloitte}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isDeloitte
                    ? 'bg-[#0F62FE] text-white shadow-lg'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Deloitte ({deloitteExp.totalDuration})</span>
              </button>

              <button
                onClick={scrollToYash}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  !isDeloitte
                    ? 'bg-[#0284C7] text-white shadow-lg'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>YASH Tech ({yashExp.totalDuration})</span>
              </button>
            </div>

            {onNavigate && (
              <button
                onClick={() => onNavigate('education')}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-mono border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-md"
                title="Proceed to Education"
              >
                <span>Next:</span>
                <span className="text-amber-300 font-semibold">Education</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
              </button>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN SLEEK CONTENT PANEL (HIGH TRANSPARENCY) */}
        {/* ======================================================== */}
        <div className="relative z-10 max-w-6xl mx-auto w-full my-auto py-6">
          <AnimatePresence mode="wait">
            {isDeloitte ? (
              <motion.div
                key="deloitte-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="p-6 sm:p-8 md:p-10 rounded-3xl bg-black/25 border border-white/20 backdrop-blur-md shadow-2xl space-y-6"
              >
                {/* Era Header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-[#0F62FE]/30 border border-[#0F62FE]/60 text-sky-200 text-xs font-mono font-bold">
                      {deloitteExp.totalDuration.toUpperCase()} AT DELOITTE INDIA (OFFICES OF THE US)
                    </span>
                    <span className="text-xs font-mono text-[#86EFAC] font-semibold bg-black/30 px-2.5 py-1 rounded-lg border border-white/10">
                      May 2021 – Present · Senior Consultant
                    </span>
                  </div>
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
                    Deloitte India (Offices of the US)
                  </h2>
                </div>

                {/* Direct Bio & Context */}
                <div className="space-y-3.5 text-slate-100 text-base sm:text-lg leading-relaxed max-w-4xl">
                  <p className="font-medium text-white/95">
                    {BIO_PARAGRAPHS[0]}
                  </p>
                  <p className="text-slate-200 text-sm sm:text-base">
                    {BIO_PARAGRAPHS[1]}
                  </p>
                </div>

                {/* Roles Timeline Strip */}
                <div className="pt-2 border-t border-white/15 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-mono text-slate-200">
                  <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-[#86EFAC]" />
                    <span className="font-bold text-white">Senior Consultant</span>
                    <span className="text-slate-400">· May 2021 – Present</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    <span className="font-bold text-white">Consultant</span>
                    <span className="text-slate-400">· Apr 2018 – May 2021 (3 yrs 2 mos)</span>
                  </div>
                </div>

                {/* Actions & Scroll Hint */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    onClick={scrollToYash}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sky-300 text-xs font-mono font-bold flex items-center gap-2 transition-all border border-white/20 cursor-pointer backdrop-blur-md shadow-lg"
                  >
                    <span>SCROLL DOWN OR CLICK FOR YASH TECHNOLOGIES (2015 – 2018) ↓</span>
                  </button>

                  {onNavigate && (
                    <button
                      onClick={() => onNavigate('education')}
                      className="px-4 py-2.5 rounded-xl bg-[#0F62FE] hover:bg-[#0043CE] text-white text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-xl cursor-pointer"
                    >
                      <span>VIEW EDUCATION</span>
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="yash-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="p-6 sm:p-8 md:p-10 rounded-3xl bg-black/25 border border-white/20 backdrop-blur-md shadow-2xl space-y-6"
              >
                {/* Era Header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-[#0284C7]/30 border border-[#0284C7]/60 text-sky-200 text-xs font-mono font-bold">
                      {yashExp.totalDuration.toUpperCase()} AT YASH TECHNOLOGIES
                    </span>
                    <span className="text-xs font-mono text-sky-300 font-semibold bg-black/30 px-2.5 py-1 rounded-lg border border-white/10">
                      Jan 2015 – Apr 2018 · Hyderabad
                    </span>
                  </div>
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
                    YASH Technologies
                  </h2>
                </div>

                {/* Direct Bio & Context */}
                <div className="space-y-3.5 text-slate-100 text-base sm:text-lg leading-relaxed max-w-4xl">
                  <p className="font-medium text-white/95">
                    Began dedicated SAP consulting career with <strong className="text-white font-bold">YASH Technologies</strong> in January 2015 as an Associate Trainee, progressing through Trainee Consultant to Associate Consultant.
                  </p>
                  <p className="text-slate-200 text-sm sm:text-base">
                    Managed <strong className="text-white font-semibold">Shared Support Services, SAP MM & WM Support, and Rollout Projects</strong> across international enterprise client accounts.
                  </p>
                </div>

                {/* Roles Timeline Strip */}
                <div className="pt-2 border-t border-white/15 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-mono text-slate-200">
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    <span className="font-bold text-white">Associate Consultant</span>
                    <span className="text-slate-400">· 2017 – 2018</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    <span className="font-bold text-white">Trainee Consultant</span>
                    <span className="text-slate-400">· 2015 – 2017</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    <span className="font-bold text-white">Associate Trainee</span>
                    <span className="text-slate-400">· Jan 2015 – Jul 2015</span>
                  </div>
                </div>

                {/* Actions & Scroll Hint */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    onClick={scrollToDeloitte}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sky-300 text-xs font-mono font-bold flex items-center gap-2 transition-all border border-white/20 cursor-pointer backdrop-blur-md shadow-lg"
                  >
                    <span>↑ SCROLL UP OR CLICK FOR DELOITTE ({deloitteExp.totalDuration})</span>
                  </button>

                  {onNavigate && (
                    <button
                      onClick={() => onNavigate('education')}
                      className="px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-xl cursor-pointer"
                    >
                      <span>VIEW EDUCATION</span>
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* BOTTOM FOOTER INFO & SCROLL STATUS BAR */}
        {/* ======================================================== */}
        <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/15 text-xs font-mono text-slate-300 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full animate-pulse ${isDeloitte ? 'bg-[#22C55E]' : 'bg-[#38BDF8]'}`} />
            <span className="text-white font-medium">
              {isDeloitte ? 'Deloitte India (Offices of the US) · Hyderabad' : 'YASH Technologies · Hyderabad'}
            </span>
          </div>

          {/* Subtle Centered Section Closure Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-slate-400 uppercase"
          >
            <span className="w-6 h-px bg-white/20" />
            <span>End of Experience</span>
            <span className="w-6 h-px bg-white/20" />
          </motion.div>

          <div className="flex items-center gap-2 text-slate-300">
            <MousePointer2 className="w-3.5 h-3.5 text-sky-300" />
            <span className="hidden sm:inline">Scroll or swipe up/down to transition company eras</span>
            <ArrowDown className="w-3 h-3 text-sky-300 animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
};
