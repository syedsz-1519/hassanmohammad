import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  GraduationCap,
  Calendar,
  MapPin,
  Sparkles,
  School
} from 'lucide-react';
import { EDUCATION_DATA } from '../data';

export const EducationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Enhanced vertical parallax background shifts
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const ambient1Y = useTransform(scrollYProgress, [0, 1], ['-60px', '75px']);
  const ambient2Y = useTransform(scrollYProgress, [0, 1], ['55px', '-60px']);
  const ambient3Y = useTransform(scrollYProgress, [0, 1], ['-20px', '45px']);
  const gridPatternY = useTransform(scrollYProgress, [0, 1], ['-30px', '60px']);
  const headerParallaxY = useTransform(scrollYProgress, [0, 1], ['15px', '-15px']);

  return (
    <section
      ref={sectionRef}
      id="education-slide"
      className="relative min-h-screen w-full flex flex-col justify-start p-6 md:p-12 lg:pl-28 bg-gradient-to-b from-[#FFFDF9] via-[#FFF6EB] to-[#FFF9F2] text-[#0B1220] overflow-hidden select-none"
    >
      {/* Warm Amber & Gold Parallax Ambient Glows */}
      <motion.div
        style={{ y: ambient1Y }}
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#FF8A00]/18 blur-3xl pointer-events-none will-change-transform"
      />
      <motion.div
        style={{ y: ambient2Y }}
        className="absolute top-1/2 -left-32 w-96 h-96 rounded-full bg-[#FFB800]/15 blur-3xl pointer-events-none will-change-transform"
      />
      <motion.div
        style={{ y: ambient3Y }}
        className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-[#FF8A00]/10 blur-3xl pointer-events-none will-change-transform"
      />

      {/* Parallax Floating Grid Pattern */}
      <motion.div
        style={{ y: gridPatternY }}
        className="absolute inset-0 bg-grid-pattern-amber pointer-events-none opacity-45 z-0 will-change-transform"
      />

      {/* Header Section */}
      <motion.div
        style={{ y: headerParallaxY }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 mb-8 flex flex-wrap items-start justify-between gap-4 max-w-7xl mx-auto w-full"
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF8A00] to-[#FFC46B] text-white flex items-center justify-center skeuo-pill-btn shadow-lg shrink-0">
            <GraduationCap className="w-8 h-8 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-md bg-[#FF8A00] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Academic Chronology & Qualifications
              </span>
              <span className="text-xs font-mono text-[#5B6472]">SLIDE // 03</span>
            </div>
            <h2
              id="education-heading"
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#0B1220] tracking-tight"
            >
              Academic Background
            </h2>
            <p className="text-sm md:text-base text-[#5B6472] mt-1 max-w-3xl">
              Educational background and degrees conferred.
            </p>
          </div>
        </div>

        {/* Quick Count */}
        <div className="hidden sm:flex items-center gap-1 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#FF8A00]/20 shadow-xs font-mono text-xs text-[#5B6472]">
          <span className="text-[#FF8A00] font-bold">{EDUCATION_DATA.length} Institutions</span>
        </div>
      </motion.div>

      {/* Clean Grid of Authentic Education Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto w-full">
        {EDUCATION_DATA.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-6 rounded-3xl bg-white/90 border border-[#FF8A00]/20 hover:border-[#FF8A00]/50 transition-all shadow-md backdrop-blur-md relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-lg bg-[#FF8A00]/15 text-[#D97706] text-xs font-mono font-bold">
                  {item.level}
                </span>
                <span className="text-xs font-mono text-[#5B6472] bg-white px-2.5 py-1 rounded-md border border-[#E4E9F0] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#FF8A00]" />
                  {item.period}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-[#0B1220] tracking-tight">
                    {item.institution}
                  </h3>
                  <p className="text-sm font-semibold text-[#FF8A00] mt-1">
                    {item.degree}
                  </p>
                  {item.field && (
                    <p className="text-xs text-[#5B6472] mt-0.5 font-mono">
                      Specialization: {item.field}
                    </p>
                  )}
                </div>
                {item.logoUrl ? (
                  <img
                    src={item.logoUrl}
                    alt={`${item.institution} logo`}
                    className="w-12 h-12 object-contain rounded-xl bg-white p-1.5 border border-[#E4E9F0] shadow-sm shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-[#FF8A00]/10 border border-[#FF8A00]/20 flex items-center justify-center shrink-0">
                    <School className="w-6 h-6 text-[#FF8A00]" />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E4E9F0] flex items-center justify-between text-xs font-mono text-[#5B6472]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{item.location || 'Hyderabad, Telangana, India'}</span>
              </div>
              <div className="flex items-center gap-1 text-[#FF8A00] font-semibold">
                <School className="w-3.5 h-3.5" />
                <span>Verified</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subtle Centered Section Closure Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full flex items-center justify-center mt-12 mb-4"
      >
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#D97706]/70 uppercase">
          <span className="w-10 h-px bg-[#FF8A00]/30" />
          <span>End of Education</span>
          <span className="w-10 h-px bg-[#FF8A00]/30" />
        </div>
      </motion.div>
    </section>
  );
};
