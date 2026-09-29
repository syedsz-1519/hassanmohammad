import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { SlideId } from './types';
import { ModuleRail } from './components/ModuleRail';
import { HeroSection } from './components/HeroSection';
import { HeroCorridorTransition } from './components/HeroCorridorTransition';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { SectionDivider } from './components/SectionDivider';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [activeSlide, setActiveSlide] = useState<SlideId>('hero');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const isScrollingRef = useRef(false);

  // Motion scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  // Track scroll position for active slide and Back to Top visibility
  useEffect(() => {
    const slideIds: SlideId[] = ['hero', 'experience', 'education', 'skills', 'contact'];
    const elements = slideIds.map((id) => document.getElementById(`${id}-slide`));

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const heroThreshold = window.innerHeight * 0.45;
      
      // Show Back to Top button when scrolled past hero section
      setShowBackToTop(currentScroll > heroThreshold);

      if (isScrollingRef.current) return;

      const scrollPosition = currentScroll + window.innerHeight * 0.35;

      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSlide(slideIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const slideIds: SlideId[] = ['hero', 'experience', 'education', 'skills', 'contact'];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        const currentIndex = slideIds.indexOf(activeSlide);
        if (currentIndex < slideIds.length - 1) {
          e.preventDefault();
          scrollToSlide(slideIds[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        const currentIndex = slideIds.indexOf(activeSlide);
        if (currentIndex > 0) {
          e.preventDefault();
          scrollToSlide(slideIds[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide]);

  const scrollToSlide = (slideId: SlideId) => {
    const target = document.getElementById(`${slideId}-slide`);
    if (target) {
      isScrollingRef.current = true;
      setActiveSlide(slideId);
      target.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 700);
    }
  };

  const scrollToTop = () => {
    isScrollingRef.current = true;
    setActiveSlide('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 700);
  };

  return (
    <div className="relative min-h-screen bg-[#0A1120] text-[#0B1220] font-sans antialiased selection:bg-[#0F62FE] selection:text-white">
      {/* Thin Colored Scroll Progress Indicator Pinned to Top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-slate-800/40 backdrop-blur-xs">
        <motion.div
          className="h-full bg-gradient-to-r from-[#0F62FE] via-[#38BDF8] via-[#FF8A00] to-[#00A389] origin-left"
          style={{ scaleX }}
        />
      </div>

      {/* Left Persistent Module Rail */}
      <ModuleRail
        activeSlide={activeSlide}
        onNavigate={scrollToSlide}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full flex flex-col">
        {/* Section 1: Hero */}
        <div className="w-full">
          <HeroSection
            onNavigate={scrollToSlide}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        </div>

        {/* Section Divider: Hero to Experience */}
        <SectionDivider variant="circuit" color="#0F62FE" className="bg-[#060b14]" />

        {/* Unified Experience Section: Deloitte & YASH Environment Animations -> Seamless Horizontal Flipping Timeline */}
        <div className="w-full">
          <HeroCorridorTransition onNavigate={scrollToSlide} />
        </div>

        {/* Section Divider: Experience to Education */}
        <SectionDivider variant="wave" color="#FF8A00" className="bg-[#0A1120]" />

        {/* Section 3: Education */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <EducationSection />
        </motion.div>

        {/* Section Divider: Education to Skills */}
        <SectionDivider variant="dots" color="#00A389" className="bg-[#0A1120]" />

        {/* Section 4: Skills & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <SkillsSection />
        </motion.div>

        {/* Section Divider: Skills to Contact */}
        <SectionDivider variant="curve" color="#0F62FE" className="bg-[#0A1120]" />

        {/* Section 5: Contact / Business Card */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <ContactSection />
        </motion.div>
      </main>

      {/* Interactive Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Floating 'Back to Top' Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-gradient-to-r from-[#0F62FE] to-[#38BDF8] text-white shadow-2xl hover:shadow-[0_0_25px_rgba(15,98,254,0.6)] cursor-pointer flex items-center justify-center border border-white/20 backdrop-blur-md group"
            title="Back to top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
