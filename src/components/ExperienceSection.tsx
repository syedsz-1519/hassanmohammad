import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  Layers,
  Award,
  Calendar,
  MapPin,
  Building,
  ChevronRight,
  TrendingUp,
  Sparkles,
  ArrowRight,
  RotateCw
} from 'lucide-react';
import { BIO_PARAGRAPHS, EXPERIENCES, CERTIFICATIONS, CAREER_MILESTONES } from '../data';
import experienceOfficeBg from '../assets/images/experience_office_bg_1786821156461.jpg';

export const ExperienceSection: React.FC = () => {
  const [selectedMilestoneIdx, setSelectedMilestoneIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'profile' | 'trajectory'>('profile');

  const activeMilestone = CAREER_MILESTONES[selectedMilestoneIdx] || CAREER_MILESTONES[0];

  return (
    <section
      id="experience-slide"
      className="relative min-h-screen w-full flex flex-col justify-start p-6 md:p-12 lg:pl-28 bg-[#0A1120] text-[#0B1220] overflow-hidden select-none"
    >
      {/* Executive Clean Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={experienceOfficeBg}
          alt="Executive Office Background"
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1120]/85 via-[#0E1B33]/80 to-[#0A1120]/95 backdrop-blur-xs" />
      </div>

      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#0F62FE]/25 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-[#5FA8FF]/20 blur-3xl pointer-events-none z-0" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 mb-8 max-w-7xl mx-auto w-full flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-md bg-[#0F62FE] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              SAP MM & Central Procurement
            </span>
            <span className="text-xs font-mono text-slate-300">EXPERIENCE & TRAJECTORY</span>
          </div>
          <h2
            id="experience-heading"
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight drop-shadow-md"
          >
            Experience & Career Trajectory
          </h2>
          <div className="w-24 h-1.5 rounded-full bg-[#0F62FE] mt-3" />
        </div>

        {/* View mode toggle on mobile or quick switch */}
        <div className="flex lg:hidden items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/20 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'profile' ? 'bg-[#0F62FE] text-white shadow-md' : 'text-slate-300'
            }`}
          >
            Profile & Roles
          </button>
          <button
            onClick={() => setActiveTab('trajectory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'trajectory' ? 'bg-[#0F62FE] text-white shadow-md' : 'text-slate-300'
            }`}
          >
            Trajectory Timeline
          </button>
        </div>
      </motion.div>

      {/* DUAL-PANE FLIP & TIMELINE OVERVIEW LAYOUT */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 items-start">
        
        {/* LEFT COLUMN (7 Cols): Interactive Profile Summary, Deloitte & YASH Deep-Dives */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`lg:col-span-7 flex flex-col gap-6 ${activeTab === 'trajectory' ? 'hidden lg:flex' : 'flex'}`}
        >
          {/* 1. PROFESSIONAL SUMMARY */}
          <div className="skeuo-card-glass bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl border border-white/60">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#0F62FE] to-[#5FA8FF] text-white flex items-center justify-center shadow-md">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-[#0B1220]">
                    Professional Summary
                  </h3>
                  <span className="text-xs font-mono text-[#5B6472]">Overview & Enterprise SAP Specializations</span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-[#0F62FE]/10 text-[#0F62FE] text-xs font-mono font-bold border border-[#0F62FE]/20">
                11+ YRS SAP EXPERT
              </span>
            </div>

            <div className="text-sm md:text-base leading-relaxed text-[#0B1220] space-y-3.5">
              <p>
                As a Senior Consultant at <strong className="text-[#0F62FE] font-bold">Deloitte</strong> with over eight years within the organization, I specialize in SAP solutions across{' '}
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#0F62FE]/10 text-[#0F62FE] font-mono text-xs font-bold border border-[#0F62FE]/20 mx-0.5">
                  SAP MM
                </span>
                ,{' '}
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#FF8A00]/10 text-[#FF8A00] font-mono text-xs font-bold border border-[#FF8A00]/20 mx-0.5">
                  WM
                </span>
                , and{' '}
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#00A389]/10 text-[#00A389] font-mono text-xs font-bold border border-[#00A389]/20 mx-0.5">
                  Central Procurement
                </span>
                . My expertise lies in SAP configuration, integration, enhancement, and support, enabling businesses to optimize their operations and streamline processes.
              </p>
              <p className="text-[#475569] text-sm md:text-[15px]">
                {BIO_PARAGRAPHS[1]}
              </p>
            </div>
          </div>

          {/* 2. CHRONOLOGICAL ROLES (Deloitte & YASH Technologies) */}
          <div className="skeuo-card-glass bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl border border-white/60 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4E9F0]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0F62FE] text-white flex items-center justify-center shadow-md">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl text-[#0B1220]">
                    Enterprise Roles & Organizations
                  </h3>
                  <span className="text-xs font-mono text-[#5B6472]">Deloitte & YASH Technologies Experience</span>
                </div>
              </div>
              <span className="text-xs font-mono text-[#0F62FE] font-bold bg-[#0F62FE]/10 px-2.5 py-1 rounded-md">
                2015 – Present
              </span>
            </div>

            {/* Deloitte Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-[#F8FBFF] border border-[#0F62FE]/30 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                    <h4 className="font-display font-bold text-lg text-[#0B1220]">
                      Deloitte US India Office
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-[#5B6472]">Full-time · 8 yrs 5 mos</span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#0F62FE] text-white text-xs font-mono font-bold">
                  May 2018 – Present
                </span>
              </div>

              {/* Sub-roles */}
              <div className="space-y-3 pt-2">
                <div className="pl-3 border-l-2 border-[#0F62FE] bg-blue-50/40 p-2.5 rounded-r-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#0F62FE]">Senior Consultant</span>
                    <span className="text-xs font-mono text-[#5B6472]">May 2021 – Present</span>
                  </div>
                  <span className="text-xs text-[#5B6472] font-mono block">Hyderabad, Telangana, India · Hybrid</span>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="px-2 py-0.5 rounded-md bg-white text-[#0F62FE] text-[11px] font-mono font-semibold border border-[#0F62FE]/20 shadow-xs">
                      SAP MM
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white text-[#00A389] text-[11px] font-mono font-semibold border border-[#00A389]/20 shadow-xs">
                      SAP Central Procurement
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white text-[#5B6472] text-[11px] font-mono border border-[#E4E9F0]">
                      S/4HANA Ariba Integration
                    </span>
                  </div>
                </div>

                <div className="pl-3 border-l-2 border-[#D5DCE5] p-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#0B1220]">Consultant</span>
                    <span className="text-xs font-mono text-[#5B6472]">Apr 2018 – May 2021</span>
                  </div>
                  <span className="text-xs text-[#5B6472] font-mono block">Hyderabad Area, India</span>
                </div>
              </div>
            </div>

            {/* YASH Technologies Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-[#F8FBFF] border border-[#E4E9F0] shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                    <h4 className="font-display font-bold text-lg text-[#0B1220]">
                      YASH Technologies
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-[#5B6472]">Full-time · On-site · 3 yrs 4 mos</span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-slate-700 text-white text-xs font-mono font-bold">
                  Jan 2015 – Apr 2018
                </span>
              </div>

              {/* Sub-roles */}
              <div className="space-y-3 pt-2">
                <div className="pl-3 border-l-2 border-[#5FA8FF]">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#0B1220]">Associate Consultant</span>
                    <span className="text-xs font-mono text-[#5B6472]">Apr 2017 – Apr 2018</span>
                  </div>
                  <p className="text-xs text-[#5B6472] mt-0.5">
                    Individually handled Shared Support Services, SAP MM & WM Support and Rollout Projects.
                  </p>
                </div>

                <div className="pl-3 border-l-2 border-[#D5DCE5]">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#0B1220]">Trainee Consultant & Associate Trainee</span>
                    <span className="text-xs font-mono text-[#5B6472]">Jan 2015 – Mar 2017</span>
                  </div>
                  <p className="text-xs text-[#5B6472] mt-0.5">
                    Full-lifecycle implementation projects as junior in SAP Materials Management (MM).
                  </p>
                </div>
              </div>
            </div>

            {/* Key Industries & Clients summary */}
            <div className="pt-2">
              <span className="text-xs font-mono font-bold text-[#5B6472] uppercase tracking-wider block mb-2">
                Key Industries & Clients Worked:
              </span>
              <div className="flex flex-wrap gap-2">
                {['Oil & Gas (Middle East)', 'Life Sciences & Pharma (USA)', 'Aerospace & Defense (USA)', 'Retail / Supermarket (South Africa)', 'Consumer Goods (CPG)'].map((ind, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-[#F4F7FA] text-[#0B1220] text-xs font-mono border border-[#E4E9F0] shadow-xs"
                  >
                    ✓ {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN (5 Cols): STICKY FLIPPING CAREER TRAJECTORY TIMELINE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-20 ${activeTab === 'profile' ? 'hidden lg:flex' : 'flex'}`}
        >
          {/* Header Card for Timeline */}
          <div className="skeuo-card-glass bg-[#0B1426]/90 backdrop-blur-xl p-5 rounded-2xl border border-white/20 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0F62FE] to-[#38BDF8] text-white flex items-center justify-center shadow-md">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-white">
                    Career Trajectory Timeline
                  </h4>
                  <span className="text-[11px] font-mono text-sky-300">
                    5 Milestones (2015 → 2026+)
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                11+ YRS
              </span>
            </div>

            {/* Quick Milestone Stepper Bar */}
            <div className="grid grid-cols-5 gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
              {CAREER_MILESTONES.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMilestoneIdx(idx)}
                  className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                    selectedMilestoneIdx === idx
                      ? 'bg-[#0F62FE] text-white shadow-lg scale-105'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={`${m.title} at ${m.company}`}
                >
                  <span>0{m.stepNumber}</span>
                  <span className="text-[9px] opacity-80">{m.era === 'deloitte' ? 'DEL' : 'YASH'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ACTIVE FLIPPING MILESTONE CARD (Storytelling Plaque) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.id}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: 1000 }}
              className="skeuo-card-glass bg-[#0F1B33]/95 backdrop-blur-xl p-6 rounded-2xl border border-white/20 text-white shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold text-white shadow-md flex items-center gap-1.5"
                  style={{ backgroundColor: activeMilestone.accentColor }}
                >
                  <Award className="w-3.5 h-3.5" />
                  STEP 0{activeMilestone.stepNumber} // {activeMilestone.era.toUpperCase()} ERA
                </span>
                <span className="text-xs font-mono text-sky-200">
                  {activeMilestone.period}
                </span>
              </div>

              <div>
                <h4 className="font-display font-bold text-xl md:text-2xl text-white">
                  {activeMilestone.title}
                </h4>
                <div className="flex items-center gap-2 text-xs font-mono text-sky-300 mt-1">
                  <Building className="w-3.5 h-3.5" />
                  <span className="font-bold text-white">{activeMilestone.company}</span>
                  <span>•</span>
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-300">{activeMilestone.location}</span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/10">
                {activeMilestone.description}
              </p>

              {/* Key Highlights */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Core Highlights:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeMilestone.keyHighlights.map((hl, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/10 text-[11px] font-mono text-white border border-white/15 shadow-xs"
                    >
                      ✓ {hl}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation stepper buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <button
                  disabled={selectedMilestoneIdx === 0}
                  onClick={() => setSelectedMilestoneIdx((prev) => Math.max(0, prev - 1))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedMilestoneIdx === 0
                      ? 'opacity-30 cursor-not-allowed text-slate-500'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  ← PREV
                </button>
                <span className="text-xs font-mono text-slate-400">
                  {selectedMilestoneIdx + 1} / {CAREER_MILESTONES.length}
                </span>
                <button
                  disabled={selectedMilestoneIdx === CAREER_MILESTONES.length - 1}
                  onClick={() => setSelectedMilestoneIdx((prev) => Math.min(CAREER_MILESTONES.length - 1, prev + 1))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedMilestoneIdx === CAREER_MILESTONES.length - 1
                      ? 'opacity-30 cursor-not-allowed text-slate-500'
                      : 'bg-[#0F62FE] hover:bg-[#0043CE] text-white shadow-md'
                  }`}
                >
                  NEXT →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Chronological Vertical Flow Preview */}
          <div className="skeuo-card-glass bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-lg space-y-2">
            <span className="text-[11px] font-mono font-bold text-[#5B6472] uppercase tracking-wider block">
              11-Year Journey Progression
            </span>
            <div className="space-y-2">
              {CAREER_MILESTONES.map((m, idx) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMilestoneIdx(idx)}
                  className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-between text-xs font-mono ${
                    selectedMilestoneIdx === idx
                      ? 'bg-[#0F62FE] text-white shadow-md font-bold'
                      : 'hover:bg-slate-100 text-[#0B1220]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-5 h-5 rounded-md bg-black/10 flex items-center justify-center text-[10px]">
                      0{m.stepNumber}
                    </span>
                    <span className="truncate">{m.title}</span>
                  </div>
                  <span className="text-[10px] opacity-75 shrink-0 ml-2">
                    {m.period.split('–')[0].trim()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
