import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Award, CheckCircle2, Shield, Sparkles, ExternalLink, Cpu } from 'lucide-react';
import { CERTIFICATIONS, SKILLS_DATA } from '../data';
import { SkillItem } from '../types';

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  // Enhanced vertical parallax shift on background elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const ambient1Y = useTransform(scrollYProgress, [0, 1], ['-60px', '70px']);
  const ambient2Y = useTransform(scrollYProgress, [0, 1], ['50px', '-70px']);
  const ambientOrb3Y = useTransform(scrollYProgress, [0, 1], ['-30px', '50px']);
  const gridPatternY = useTransform(scrollYProgress, [0, 1], ['-25px', '65px']);
  const contentParallaxY = useTransform(scrollYProgress, [0, 1], ['10px', '-10px']);

  // Helper to size & color-grade skills based on endorsement count
  const getSkillStyle = (endorsements: number = 0, isHighlight: boolean = false) => {
    if (endorsements >= 7 || isHighlight) {
      return {
        sizeClasses: 'px-4 py-2.5 text-xs md:text-sm font-bold',
        bgClasses: 'bg-gradient-to-r from-[#00A389] via-[#05B498] to-[#2DD4BF] text-white border-white/40 shadow-md',
        glow: true,
        countBadge: 'bg-white/25 text-white'
      };
    } else if (endorsements >= 4) {
      return {
        sizeClasses: 'px-3.5 py-2 text-xs font-semibold',
        bgClasses: 'bg-gradient-to-r from-white to-[#F0FDF9] text-[#0B1220] border-[#00A389]/30 hover:border-[#00A389]',
        glow: false,
        countBadge: 'bg-[#00A389]/15 text-[#00A389]'
      };
    } else {
      return {
        sizeClasses: 'px-3 py-1.5 text-[11px] font-medium',
        bgClasses: 'bg-white/90 text-[#5B6472] border-[#E4E9F0] hover:border-[#00A389]/40',
        glow: false,
        countBadge: 'bg-[#F4F7FA] text-[#5B6472]'
      };
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills-slide"
      className="relative min-h-screen w-full flex flex-col justify-start p-6 md:p-12 lg:pl-28 bg-gradient-to-b from-[#F2FBF8] via-[#E6F7F2] to-[#F5FCFA] overflow-hidden select-none"
    >
      {/* Enhanced Parallax Teal Ambient Glows */}
      <motion.div
        style={{ y: ambient1Y }}
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#00A389]/18 blur-3xl pointer-events-none will-change-transform"
      />
      <motion.div
        style={{ y: ambient2Y }}
        className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-[#5FD9BE]/25 blur-3xl pointer-events-none will-change-transform"
      />
      <motion.div
        style={{ y: ambientOrb3Y }}
        className="absolute bottom-10 left-1/3 w-72 h-72 rounded-full bg-[#0F62FE]/10 blur-3xl pointer-events-none will-change-transform"
      />

      {/* Parallax Floating Grid Pattern */}
      <motion.div
        style={{ y: gridPatternY }}
        className="absolute inset-0 bg-grid-pattern-teal pointer-events-none opacity-45 z-0 will-change-transform"
      />

      {/* Header */}
      <motion.div
        style={{ y: contentParallaxY }}
        className="relative z-10 mb-8 max-w-7xl mx-auto w-full"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-md bg-[#00A389] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            Central Procurement & Certifications
          </span>
          <span className="text-xs font-mono text-[#5B6472]">SLIDE // 04</span>
        </div>
        <h2
          id="skills-heading"
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#0B1220] tracking-tight"
        >
          Specializations & Verified Certifications
        </h2>
        <p className="text-sm md:text-base text-[#5B6472] mt-2 max-w-3xl">
          Deep functional domain expertise across SAP S/4HANA Sourcing, Central Procurement Hubs, Materials Management, and Certified Professional Credentials.
        </p>
      </motion.div>

      {/* Main Content Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto w-full">
        {/* Left 6-7 Cols: Skills Tag Clouds Categorized */}
        <div className="lg:col-span-6 space-y-6">
          {/* Legend Strip */}
          <div className="bg-white/85 backdrop-blur-md p-4 rounded-2xl border border-[#00A389]/20 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 font-mono text-[#0B1220] font-semibold">
              <Sparkles className="w-4 h-4 text-[#00A389]" />
              <span>Skill Level Indicator</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A389]" />
                Primary Core (7+ Endorsements)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5FD9BE]" />
                Proficient (4+ Endorsements)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                Working Knowledge
              </span>
            </div>
          </div>

          {/* Skill Groups */}
          <div className="space-y-4">
            {/* Core SAP Functional */}
            <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-white/60 shadow-sm">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00A389] mb-3 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Core SAP Functional Modules
              </h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS_DATA.slice(0, 8).map((skill) => {
                  const style = getSkillStyle(skill.endorsements, skill.isHighlight);
                  const isSelected = selectedSkill?.name === skill.name;
                  return (
                    <button
                      key={skill.name}
                      onClick={() => setSelectedSkill(isSelected ? null : skill)}
                      className={`${style.sizeClasses} ${style.bgClasses} rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-2 group ${
                        isSelected ? 'ring-2 ring-[#00A389] scale-105' : 'hover:scale-102'
                      }`}
                    >
                      <span>{skill.name}</span>
                      {skill.endorsements && (
                        <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${style.countBadge}`}>
                          {skill.endorsements}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Procurement & Integration */}
            <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-white/60 shadow-sm">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00A389] mb-3 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Procurement, Warehouse & Rollouts
              </h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS_DATA.slice(8).map((skill) => {
                  const style = getSkillStyle(skill.endorsements, skill.isHighlight);
                  const isSelected = selectedSkill?.name === skill.name;
                  return (
                    <button
                      key={skill.name}
                      onClick={() => setSelectedSkill(isSelected ? null : skill)}
                      className={`${style.sizeClasses} ${style.bgClasses} rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-2 group ${
                        isSelected ? 'ring-2 ring-[#00A389] scale-105' : 'hover:scale-102'
                      }`}
                    >
                      <span>{skill.name}</span>
                      {skill.endorsements && (
                        <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${style.countBadge}`}>
                          {skill.endorsements}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 Cols: SAP Licenses & Certifications Showcase */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-[#00A389]/20 shadow-md space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#E4E9F0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00A389] to-[#2DD4BF] text-white flex items-center justify-center shadow-xs">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#0B1220] tracking-tight">
                    Licenses & certifications
                  </h3>
                  <span className="text-xs font-mono text-[#5B6472]">
                    Official Verified Credentials
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00A389]/10 text-[#00A389] font-mono text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SAP SE</span>
              </div>
            </div>

            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, index) => (
                <div
                  key={cert.id || index}
                  className="p-5 rounded-2xl bg-gradient-to-r from-[#F0FDF9] to-white border border-[#00A389]/25 hover:border-[#00A389] transition-all flex flex-col gap-3 group shadow-xs hover:shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    {/* SAP Logo Emblem */}
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#0F62FE] to-[#0043CE] text-white flex flex-col items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform font-display font-extrabold text-sm tracking-wider">
                      <span>SAP</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-[#0B1220] leading-snug">
                        {cert.title}
                      </h4>
                      <p className="text-xs sm:text-sm font-semibold text-[#00A389] mt-1 font-mono">
                        {cert.issuer}
                      </p>
                      <p className="text-xs text-[#5B6472] mt-0.5 font-mono">
                        {cert.issueDate}
                      </p>
                    </div>
                  </div>

                  {/* Show Credential Action Link */}
                  <div className="pt-2.5 border-t border-[#E4E9F0]/80 flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-[#00A389] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00A389]" />
                      <span>Verified SAP Credential</span>
                    </span>
                    <button
                      onClick={() => alert(`Credential Details:\n\n${cert.title}\n\nIssuer: ${cert.issuer}\n${cert.issueDate}`)}
                      className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#F0FDF9] text-[#0F62FE] hover:text-[#0043CE] border border-[#0F62FE]/30 hover:border-[#0F62FE] transition-all font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>Show credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Centered Section Closure Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full flex items-center justify-center mt-12 mb-4"
      >
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#00A389]/70 uppercase">
          <span className="w-10 h-px bg-[#00A389]/30" />
          <span>End of Skills</span>
          <span className="w-10 h-px bg-[#00A389]/30" />
        </div>
      </motion.div>
    </section>
  );
};
