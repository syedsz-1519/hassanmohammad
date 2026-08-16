import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  Building,
  Calendar,
  MapPin,
  Sparkles,
  ChevronRight,
  Layers,
  Award,
  CheckCircle2,
  TrendingUp,
  RotateCw,
  Clock
} from 'lucide-react';
import { CAREER_MILESTONES } from '../data';
import { CareerMilestone } from '../types';

interface HorizontalTimelineProps {
  onNavigateNext?: () => void;
}

// 5 Complete Real-World Experience Cards aligned with Hassan's 11+ yrs SAP Career
const EXPERIENCES_DATA = [
  {
    id: 'exp-1',
    year: '2015',
    period: 'Jan 2015 – Jul 2015 (7 mos)',
    role: 'Associate Trainee',
    company: 'YASH Technologies',
    location: 'Hyderabad Area, India',
    era: 'YASH ERA',
    accentColor: '#38BDF8',
    summary: 'Foundational SAP Materials Management (SAP MM) lifecycle training and junior implementation support.',
    bulletsFront: [
      'Joined as Associate Trainee in enterprise SAP delivery center',
      'Supported SAP Materials Management baseline configuration',
      'Mastered procurement document types & material master data'
    ],
    bulletsBack: [
      'Gained deep understanding of Procure-to-Pay (P2P) cycle',
      'Assisted senior consultants in integration testing scripts',
      'Completed foundational SAP MM and business process certification'
    ],
    skills: ['SAP Materials Management (MM)', 'Procurement Lifecycle', 'Master Data']
  },
  {
    id: 'exp-2',
    year: '2015 – 2017',
    period: 'Aug 2015 – Mar 2017 (1 yr 8 mos)',
    role: 'Trainee Consultant',
    company: 'YASH Technologies',
    location: 'Hyderabad, Telangana, India',
    era: 'YASH ERA',
    accentColor: '#0EA5E9',
    summary: 'Individually managing Shared Support Services, SAP MM Support and Rollout Projects.',
    bulletsFront: [
      'Handled Shared Support Services for international enterprise clients',
      'Configured Warehouse Management (WM) storage types and bins',
      'Executed full-cycle SAP client rollout deliverables'
    ],
    bulletsBack: [
      'Maintained 99.4% SLA adherence for high-priority production tickets',
      'Automated movement type configurations for inventory accounting',
      'Led client hypercare support during post-go-live stabilization'
    ],
    skills: ['Shared Support Services', 'SAP Warehouse Management', 'Rollout Projects']
  },
  {
    id: 'exp-3',
    year: '2017 – 2018',
    period: 'Apr 2017 – Apr 2018 (1 yr 1 mo)',
    role: 'Associate Consultant',
    company: 'YASH Technologies',
    location: 'Hyderabad, Telangana, India',
    era: 'YASH ERA',
    accentColor: '#0284C7',
    summary: 'Shared Support Services Lead, SAP MM/WM Support and Global Client Rollouts.',
    bulletsFront: [
      'Individually managed Shared Support Services and MM/WM rollout tasks',
      'Engineered cross-module integrations between SAP MM, FI, and SD',
      'Facilitated end-user training and standard operating documentation'
    ],
    bulletsBack: [
      'Delivered seamless physical inventory counting and reconciliation',
      'Resolved complex invoice verification (LIV) matching bottlenecks',
      'Awarded top delivery rating for zero-defect release cycles'
    ],
    skills: ['MM Support Lead', 'WM Configuration', 'Integration Testing']
  },
  {
    id: 'exp-4',
    year: '2018 – 2021',
    period: 'Apr 2018 – May 2021 (3 yrs 2 mos)',
    role: 'Consultant',
    company: 'Deloitte US India Office',
    location: 'Hyderabad Area, India',
    era: 'DELOITTE ERA',
    accentColor: '#2563EB',
    summary: 'Enterprise consulting for global clients, handling SAP S/4HANA supply chain, procurement & inventory transformations.',
    bulletsFront: [
      'Spearheaded SAP S/4HANA sourcing & procurement transformations',
      'Designed end-to-end purchasing approval workflows for Fortune 500s',
      'Integrated SAP Ariba punch-out catalogs with S/4HANA backend'
    ],
    bulletsBack: [
      'Collaborated across global workstreams (US, Middle East, and APAC)',
      'Optimized material requirement planning (MRP) replenishment rules',
      'Led cutover planning, data migration, and dry-run mock conversions'
    ],
    skills: ['Global SAP Deployments', 'S/4HANA Transformations', 'Ariba Integration']
  },
  {
    id: 'exp-5',
    year: '2021 – PRESENT',
    period: 'May 2021 – Present (5 yrs 4 mos)',
    role: 'Senior Consultant',
    company: 'Deloitte US India Office',
    location: 'Hyderabad, Telangana, India',
    era: 'DELOITTE ERA',
    accentColor: '#0F62FE',
    summary: 'Senior Consultant leading SAP MM, WM & Central Procurement initiatives across complex multi-system enterprise architectures.',
    bulletsFront: [
      'Lead SAP Central Procurement & multi-ERP backend hub integration',
      'Architect centralized requisitioning, contract management & analytics',
      'Mentor consulting teams and direct strategic client executive briefings'
    ],
    bulletsBack: [
      'Delivered 35% reduction in enterprise procurement cycle times',
      'Architected resilient cross-system Central Sourcing and Guided Buying',
      'Subject Matter Expert for enterprise S/4HANA supply chain roadmaps'
    ],
    skills: ['SAP Central Procurement', 'SAP Materials Management', 'Consulting Leadership']
  }
];

export const HorizontalExperienceTimeline: React.FC<HorizontalTimelineProps> = ({
  onNavigateNext
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Track vertical scroll across the pinned 350vh height container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Calculate horizontal translation for the cards track
  // On desktop: shift track leftwards from 0% to approx -68%
  const trackX = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '-66%']);
  
  // Progress bar width percentage
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(
        EXPERIENCES_DATA.length - 1,
        Math.max(0, Math.floor(v * EXPERIENCES_DATA.length))
      );
      setActiveCardIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div
      ref={containerRef}
      id="trajectory-slide"
      className="relative w-full h-[360vh] bg-[#070D18] text-white"
    >
      {/* Sticky Fullscreen Pinned Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between select-none z-10">
        
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#0F62FE]/20 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#0284C7]/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        {/* TOP BAR: Header, Timeline Stepper, and Dynamic Progress Bar */}
        <div className="relative z-20 px-6 md:px-12 lg:pl-28 pt-6 max-w-7xl mx-auto w-full">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#0F62FE]/30 border border-[#0F62FE]/60 text-sky-200 text-[11px] font-mono font-bold">
                  INTERACTIVE HORIZONTAL TIMELINE
                </span>
                <span className="text-xs font-mono text-slate-400">
                  SCROLL DOWN TO ADVANCE CARDS & FLIP
                </span>
              </div>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl text-white tracking-tight">
                Career Trajectory & Project Journey
              </h2>
            </div>

            {/* Stepper indicators */}
            <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-2xl border border-white/15 backdrop-blur-md">
              {EXPERIENCES_DATA.map((exp, i) => (
                <div
                  key={exp.id}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeCardIndex === i
                      ? 'bg-[#0F62FE] text-white shadow-md scale-105'
                      : 'text-slate-400'
                  }`}
                >
                  <span>0{i + 1}</span>
                  <span className="hidden sm:inline text-[10px] opacity-80">
                    {exp.era.includes('DELOITTE') ? 'DEL' : 'YASH'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar with glowing indicator */}
          <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
            <motion.div
              style={{ width: progressBarWidth }}
              className="h-full bg-gradient-to-r from-[#38BDF8] via-[#0F62FE] to-[#86EFAC] rounded-full shadow-[0_0_12px_rgba(15,98,254,0.8)]"
            />
          </div>
        </div>

        {/* CENTER: HORIZONTAL TRACK WITH 3D PAGE-CURL / DIAGONAL FLIPPING CARDS */}
        <div className="relative z-10 w-full overflow-hidden flex items-center my-auto py-4">
          <motion.div
            ref={trackRef}
            style={{ x: trackX }}
            className="flex items-center gap-8 md:gap-12 px-6 md:px-16 lg:pl-32 will-change-transform"
          >
            {EXPERIENCES_DATA.map((item, index) => {
              // Custom Scroll Range for this specific card
              const cardStart = index * 0.18;
              const cardEnd = cardStart + 0.28;

              return (
                <TimelineFlippingCard
                  key={item.id}
                  data={item}
                  index={index}
                  total={EXPERIENCES_DATA.length}
                  scrollYProgress={scrollYProgress}
                  startProgress={cardStart}
                  endProgress={cardEnd}
                />
              );
            })}

            {/* Ending Summary Callout Card */}
            <div className="w-[320px] md:w-[380px] shrink-0 p-8 rounded-3xl bg-gradient-to-br from-[#0F62FE]/30 to-[#0A1A38]/90 border border-white/20 backdrop-blur-xl flex flex-col justify-between shadow-2xl h-[460px]">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
                  11+ YEARS SUMMARY
                </span>
                <h3 className="font-display font-bold text-2xl text-white mt-4">
                  Continuous Growth & SAP Mastery
                </h3>
                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  From junior trainee support to leading Fortune 500 multi-system SAP S/4HANA transformations and Central Procurement hubs at Deloitte.
                </p>
                <div className="mt-6 space-y-2 text-xs font-mono text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>8+ Years at Deloitte US India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>3+ Years at YASH Technologies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Cross-Industry Global Client Delivery</span>
                  </div>
                </div>
              </div>

              {onNavigateNext && (
                <button
                  onClick={onNavigateNext}
                  className="w-full py-3 rounded-2xl bg-[#0F62FE] hover:bg-[#0043CE] text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer"
                >
                  <span>VIEW EDUCATION & QUALIFICATIONS</span>
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* BOTTOM HINT BAR */}
        <div className="relative z-20 px-6 md:px-12 lg:pl-28 pb-6 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0F62FE] animate-pulse" />
            <span>Card auto-flips diagonally like a page turn as you scroll through center</span>
          </div>
          <span className="hidden sm:inline text-sky-300">
            Card {activeCardIndex + 1} of {EXPERIENCES_DATA.length}
          </span>
        </div>

      </div>
    </div>
  );
};

// SUB-COMPONENT: Individual Card with 3D Corner-Lift / Diagonal Page-Curl Flip
interface TimelineFlippingCardProps {
  data: typeof EXPERIENCES_DATA[0];
  index: number;
  total: number;
  scrollYProgress: any;
  startProgress: number;
  endProgress: number;
}

const TimelineFlippingCard: React.FC<TimelineFlippingCardProps> = ({
  data,
  index,
  scrollYProgress,
  startProgress,
  endProgress
}) => {
  const [manualFlipped, setManualFlipped] = useState(false);

  // Midpoint when the card passes through center
  const midPoint = (startProgress + endProgress) / 2;
  const flipTriggerStart = Math.max(0, midPoint - 0.08);
  const flipTriggerEnd = Math.min(1, midPoint + 0.08);

  // Continuous diagonal rotation transforms tied to vertical scroll
  const rotateY = useTransform(
    scrollYProgress,
    [flipTriggerStart, midPoint, flipTriggerEnd],
    [0, 90, 180]
  );

  const rotateX = useTransform(
    scrollYProgress,
    [flipTriggerStart, midPoint, flipTriggerEnd],
    [0, 18, 0]
  );

  // Lifting bottom right corner scale & shadow effect
  const cardScale = useTransform(
    scrollYProgress,
    [flipTriggerStart, midPoint, flipTriggerEnd],
    [1, 1.05, 1]
  );

  // Fade out front content before flip, fade in back content after flip
  const frontOpacity = useTransform(
    scrollYProgress,
    [flipTriggerStart, midPoint - 0.02],
    [1, 0]
  );

  const backOpacity = useTransform(
    scrollYProgress,
    [midPoint + 0.02, flipTriggerEnd],
    [0, 1]
  );

  // Track if card has reached the flipped threshold
  const [isScrollFlipped, setIsScrollFlipped] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v: number) => {
      if (v >= midPoint) {
        setIsScrollFlipped(true);
      } else {
        setIsScrollFlipped(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, midPoint]);

  const isFlipped = manualFlipped ? !isScrollFlipped : isScrollFlipped;

  return (
    <div
      className="relative w-[330px] sm:w-[380px] md:w-[420px] h-[480px] shrink-0"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        style={{
          rotateY: manualFlipped ? (isFlipped ? 180 : 0) : rotateY,
          rotateX: manualFlipped ? 0 : rotateX,
          scale: cardScale,
          transformStyle: 'preserve-3d',
          transformOrigin: 'bottom right'
        }}
        onClick={() => setManualFlipped((prev) => !prev)}
        className="w-full h-full relative cursor-pointer group rounded-3xl transition-shadow duration-300"
      >
        {/* CARD FRONT FACE */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl p-7 flex flex-col justify-between bg-[#0F1A30]/95 border border-white/20 shadow-2xl backdrop-blur-xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)'
          }}
        >
          {/* Top meta tags */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold text-white shadow-md flex items-center gap-1.5"
                style={{ backgroundColor: data.accentColor }}
              >
                <Award className="w-3.5 h-3.5" />
                STEP 0{index + 1} // {data.era}
              </span>
              <span className="text-xs font-mono font-bold text-sky-200">
                {data.year}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">
              {data.role}
            </h3>

            <div className="flex items-center gap-2 text-xs font-mono text-sky-300 mt-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-bold text-white">{data.company}</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 mt-1">
              <MapPin className="w-3 h-3 text-slate-500" />
              <span>{data.location}</span>
              <span>•</span>
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{data.period}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mt-4 bg-black/40 p-3 rounded-2xl border border-white/10">
              {data.summary}
            </p>
          </div>

          {/* Bullet points Front */}
          <div className="space-y-2 mt-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
              Core Responsibilities:
            </span>
            <div className="space-y-1.5">
              {data.bulletsFront.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F62FE] mt-1.5 shrink-0" />
                  <span className="leading-snug">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer & Flip Prompt */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-sky-300">
            <span className="flex items-center gap-1">
              <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Scroll or tap to flip</span>
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white/10 text-white text-[10px]">
              FRONT VIEW
            </span>
          </div>
        </div>

        {/* CARD BACK FACE (Revealed after diagonal 3D flip) */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl p-7 flex flex-col justify-between bg-gradient-to-br from-[#122347] to-[#0A1428] border-2 border-[#0F62FE]/60 shadow-[0_20px_50px_rgba(15,98,254,0.3)] backdrop-blur-2xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Top Back Meta */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                KEY DELIVERABLES & IMPACT
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white/10 text-white text-[10px] font-mono">
                BACK VIEW
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-white">
              {data.role} @ {data.company}
            </h3>
            <span className="text-xs font-mono text-sky-300 block mt-1">
              Deep-Dive Client Achievements
            </span>
          </div>

          {/* Back Deep-Dive Bullets */}
          <div className="space-y-2.5 my-auto bg-black/40 p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] font-mono text-sky-300 uppercase tracking-wider block font-bold">
              Key Value Delivered:
            </span>
            <div className="space-y-2">
              {data.bulletsBack.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-[#86EFAC] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Tags on Back */}
          <div className="pt-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
              Associated Competencies:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-[#0F62FE]/20 text-[#86EFAC] text-[11px] font-mono font-bold border border-[#0F62FE]/40"
                >
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Back */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Tap to flip back</span>
            <span className="text-sky-400 font-bold">STEP 0{index + 1}</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
