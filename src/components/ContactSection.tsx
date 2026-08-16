import React, { useRef, useState } from 'react';
import {
  User,
  MapPin,
  Building2,
  ExternalLink,
  Linkedin,
  Phone,
  Mail,
  Copy,
  Check,
  Globe,
  Sparkles,
  Send,
  MessageSquare,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { PERSONAL_INFO } from '../data';

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  // Parallax calculations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const ambient1Y = useTransform(scrollYProgress, [0, 1], ['-35px', '35px']);
  const ambient2Y = useTransform(scrollYProgress, [0, 1], ['30px', '-30px']);
  const gridPatternY = useTransform(scrollYProgress, [0, 1], ['-15px', '25px']);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;

    const subject = encodeURIComponent(contactSubject.trim() || 'SAP Consulting Inquiry');
    const body = encodeURIComponent(contactMessage.trim());
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 5000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact-slide"
      className="relative min-h-screen w-full flex flex-col justify-start md:justify-center items-center p-6 md:p-12 lg:pl-28 bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9] text-[#0B1220] overflow-hidden select-none"
    >
      {/* Parallax Ambient background glows */}
      <motion.div
        style={{ y: ambient1Y }}
        className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#0F62FE]/10 blur-3xl pointer-events-none will-change-transform"
      />
      <motion.div
        style={{ y: ambient2Y }}
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#00A389]/10 blur-3xl pointer-events-none will-change-transform"
      />
      <motion.div
        style={{ y: gridPatternY }}
        className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-30 z-0 will-change-transform"
      />

      {/* Slide Label */}
      <div className="relative z-10 mb-6 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F4F7FA] border border-[#E4E9F0] text-xs font-mono text-[#5B6472] mb-2 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#0F62FE]" />
          <span>Professional Connectivity // 05</span>
        </div>
        <h2
          id="contact-heading"
          className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#0B1220] tracking-tight"
        >
          Direct Inquiries & Executive Channels
        </h2>
        <p className="text-sm md:text-base text-[#5B6472] mt-2">
          Reach out directly for enterprise SAP S/4HANA supply chain engagements, Central Procurement advisories, or consulting opportunities.
        </p>
      </div>

      {/* Main Grid: Skeuomorphic Card (Left) & Direct Message (Right) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl w-full">
        {/* Left 6 Cols: Premium Executive Business Card */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex-1 p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B1220] via-[#0F172A] to-[#1E293B] text-white shadow-2xl border border-white/10 relative overflow-hidden flex flex-col justify-between">
            {/* Skeuomorphic corner gold/metallic accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0F62FE]/30 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#00A389]/20 via-transparent to-transparent pointer-events-none" />

            <div>
              {/* Card Header with Deloitte Branding */}
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#86EFAC] block font-bold">
                    DELOITTE INDIA (OFFICES OF THE US)
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight mt-0.5">
                    {PERSONAL_INFO.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-sky-300 mt-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Senior Consultant · SAP MM / WM / CP</span>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md shrink-0 shadow-lg">
                  <ShieldCheck className="w-6 h-6 text-[#86EFAC]" />
                </div>
              </div>

              {/* Verified Contact Details with 1-Click Copy */}
              <div className="space-y-3.5">
                {/* LinkedIn Direct */}
                <a
                  href={PERSONAL_INFO.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">
                        LinkedIn Profile
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                        {PERSONAL_INFO.linkedInHandle}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </a>

                {/* Email with copy */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[#0F62FE] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">
                        Official Direct Email
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                        {PERSONAL_INFO.email}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer shrink-0 ml-2"
                    title="Copy email"
                  >
                    {copiedKey === 'email' ? (
                      <Check className="w-4 h-4 text-[#86EFAC]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone with copy */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#00A389] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">
                        Direct Phone / WhatsApp
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-white font-mono">
                        {PERSONAL_INFO.phone}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer shrink-0 ml-2"
                    title="Copy phone"
                  >
                    {copiedKey === 'phone' ? (
                      <Check className="w-4 h-4 text-[#86EFAC]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#86EFAC]" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <span className="text-[11px] text-sky-300">Open for Global Engagements</span>
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Quick Direct Inquiry Form */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex-1 p-7 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#E4E9F0] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-0.5 rounded-full bg-[#0F62FE]/10 text-[#0F62FE] text-xs font-mono font-bold">
                  DIRECT CONSULTING INQUIRY
                </span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0B1220] tracking-tight">
                Send a Message or Project Brief
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6472] mt-1">
                Prefill your project requirements to launch a preformatted draft directly into your default email client.
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-4 mt-5">
                <div>
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#5B6472] block mb-1.5">
                    Engagement Subject
                  </label>
                  <input
                    type="text"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="e.g. SAP Central Procurement Implementation / Advisory"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E4E9F0] focus:border-[#0F62FE] focus:bg-white text-xs sm:text-sm text-[#0B1220] transition-colors outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#5B6472] block mb-1.5">
                    Project Scope / Consulting Details
                  </label>
                  <textarea
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Describe your organization's SAP S/4HANA timeline, module requirements, or advisory needs..."
                    required
                    className="w-full p-4 rounded-xl bg-[#F8FAFC] border border-[#E4E9F0] focus:border-[#0F62FE] focus:bg-white text-xs sm:text-sm text-[#0B1220] transition-colors outline-none resize-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#0F62FE] hover:bg-[#0043CE] text-white text-xs sm:text-sm font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>LAUNCH EMAIL INQUIRY ({PERSONAL_INFO.email})</span>
                </button>
              </form>
            </div>

            <AnimatePresence>
              {messageSent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Opening your email client to complete transmission.</span>
                </motion.div>
              )}
            </AnimatePresence>
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
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-slate-400 uppercase">
          <span className="w-10 h-px bg-white/20" />
          <span>End of Contact & Portfolio</span>
          <span className="w-10 h-px bg-white/20" />
        </div>
      </motion.div>
    </section>
  );
};
