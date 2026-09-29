import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Printer,
  Copy,
  Check,
  Building2,
  GraduationCap,
  Award,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION_DATA, CERTIFICATIONS, SKILLS_DATA } from '../data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summaryText = `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title} at ${PERSONAL_INFO.company}
Location: ${PERSONAL_INFO.location}
Phone: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedInUrl}

Executive Summary:
${PERSONAL_INFO.subhead}
Senior Consultant at Deloitte India (Offices of the US) with over 11 years of SAP experience specializing in SAP MM, WM, Central Procurement, and S/4HANA Sourcing & Procurement implementations and support.`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Glassmorphism Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 z-10"
        >
          {/* Modal Sticky Header Actions Bar (Hidden during Print) */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800 print:hidden">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0F62FE] text-white flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white">Executive Curriculum Vitae</h3>
                <p className="text-[11px] text-slate-400 font-mono">Hassan Mohammad — SAP Senior Consultant</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySummary}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Copy Executive Summary"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-lg bg-[#0F62FE] hover:bg-blue-600 text-xs font-mono font-bold text-white flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Resume Content */}
          <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-slate-50 text-slate-900 print:bg-white print:p-0 print:text-black">
            
            {/* Header Section */}
            <div className="border-b border-slate-200 pb-6 print:border-black">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight print:text-black">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className="text-lg font-bold text-[#0F62FE] mt-1 flex items-center gap-2 print:text-black">
                    <span>{PERSONAL_INFO.title}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0F62FE] border border-blue-200 print:border-black print:text-black">
                      Deloitte India (Offices of the US)
                    </span>
                  </p>
                  <p className="text-xs text-slate-600 font-mono mt-1">
                    Specializing in SAP MM, WM, & Central Procurement Implementation & Support
                  </p>
                </div>

                <div className="flex flex-col text-xs font-mono text-slate-600 space-y-1 sm:text-right print:text-black">
                  <span className="flex items-center gap-1.5 sm:justify-end">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 print:hidden" />
                    <span>{PERSONAL_INFO.location}</span>
                  </span>
                  <span className="flex items-center gap-1.5 sm:justify-end">
                    <Phone className="w-3.5 h-3.5 text-slate-400 print:hidden" />
                    <span>{PERSONAL_INFO.phoneDisplay}</span>
                  </span>
                  <span className="flex items-center gap-1.5 sm:justify-end">
                    <Mail className="w-3.5 h-3.5 text-slate-400 print:hidden" />
                    <span>{PERSONAL_INFO.email}</span>
                  </span>
                  <span className="flex items-center gap-1.5 sm:justify-end">
                    <Linkedin className="w-3.5 h-3.5 text-slate-400 print:hidden" />
                    <a
                      href={PERSONAL_INFO.linkedInUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0F62FE] hover:underline print:text-black"
                    >
                      {PERSONAL_INFO.linkedInHandle}
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs print:border-black">
              <div className="text-center">
                <span className="block text-2xl font-black text-slate-900 font-mono">11+ Yrs</span>
                <span className="text-[11px] font-mono text-slate-500 uppercase">SAP Experience</span>
              </div>
              <div className="text-center border-l border-slate-200">
                <span className="block text-2xl font-black text-[#0F62FE] font-mono print:text-black">8+ Yrs</span>
                <span className="text-[11px] font-mono text-slate-500 uppercase">At Deloitte</span>
              </div>
              <div className="text-center border-l border-slate-200">
                <span className="block text-2xl font-black text-slate-900 font-mono">3 Modules</span>
                <span className="text-[11px] font-mono text-slate-500 uppercase">MM, WM & CP</span>
              </div>
              <div className="text-center border-l border-slate-200">
                <span className="block text-2xl font-black text-emerald-600 font-mono print:text-black">2 Certs</span>
                <span className="text-[11px] font-mono text-slate-500 uppercase">SAP Certified</span>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0F62FE] flex items-center gap-2 print:text-black">
                <FileText className="w-4 h-4" />
                <span>Executive Profile</span>
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200 print:p-0 print:border-none print:text-black">
                Senior Consultant at Deloitte India (Offices of the US) with over 11 years of experience in SAP solutions, including SAP MM, WM, and Central Procurement. Proven track record in full-lifecycle SAP configuration, integration, enhancement, and shared support services. Skilled in architecting procurement workflows, inventory management, warehouse topology, and S/4HANA sourcing transformations for global enterprise clients.
              </p>
            </div>

            {/* Professional Experience */}
            <div className="space-y-4">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0F62FE] flex items-center gap-2 print:text-black">
                <Briefcase className="w-4 h-4" />
                <span>Professional Experience</span>
              </h2>

              <div className="space-y-6">
                {/* Deloitte */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 print:p-0 print:border-none">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 print:text-black">
                        Deloitte India (Offices of the US)
                      </h3>
                      <p className="text-xs font-mono text-slate-500">Hyderabad, Telangana, India</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#0F62FE] font-mono text-xs font-bold border border-blue-200 print:border-black print:text-black">
                      Apr 2018 – Present (8 yrs 5 mos)
                    </span>
                  </div>

                  <div className="space-y-3 pl-2 border-l-2 border-blue-500 print:border-black">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-slate-800 print:text-black">Senior Consultant</h4>
                        <span className="text-xs font-mono text-slate-500">May 2021 – Present</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed print:text-black">
                        Lead SAP MM, WM, and Central Procurement consulting engagements. Oversee multi-system integration, baseline configuration, central contract management, and hypercare stabilization for enterprise clients.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-slate-800 print:text-black">Consultant</h4>
                        <span className="text-xs font-mono text-slate-500">Apr 2018 – May 2021</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed print:text-black">
                        Executed SAP Materials Management and Warehouse Management rollouts and global client support operations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* YASH Technologies */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 print:p-0 print:border-none">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 print:text-black">
                        YASH Technologies
                      </h3>
                      <p className="text-xs font-mono text-slate-500">Hyderabad, Telangana, India</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-bold border border-slate-200 print:border-black print:text-black">
                      Jan 2015 – Apr 2018 (3 yrs 4 mos)
                    </span>
                  </div>

                  <div className="space-y-3 pl-2 border-l-2 border-slate-400 print:border-black">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-slate-800 print:text-black">Associate Consultant</h4>
                        <span className="text-xs font-mono text-slate-500">Apr 2017 – Apr 2018</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Managed Shared Support Services, SAP MM/WM support tickets, and rollout deliverables.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-slate-800 print:text-black">Trainee Consultant & Associate Trainee</h4>
                        <span className="text-xs font-mono text-slate-500">Jan 2015 – Mar 2017</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Hands-on implementation of SAP MM baseline configuration, procurement workflows, and support operations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications & Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Certifications */}
              <div className="space-y-3">
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0F62FE] flex items-center gap-2 print:text-black">
                  <Award className="w-4 h-4" />
                  <span>SAP Certifications</span>
                </h2>
                <div className="space-y-2">
                  {CERTIFICATIONS.map((cert) => (
                    <div
                      key={cert.id}
                      className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3 print:p-0 print:border-none"
                    >
                      <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5 print:text-black" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 leading-snug print:text-black">{cert.title}</h4>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">{cert.issuer} • {cert.issueDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0F62FE] flex items-center gap-2 print:text-black">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education</span>
                </h2>
                <div className="space-y-2">
                  {EDUCATION_DATA.slice(0, 2).map((edu) => (
                    <div
                      key={edu.id}
                      className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs print:p-0 print:border-none"
                    >
                      <h4 className="font-bold text-xs text-slate-900 print:text-black">{edu.institution}</h4>
                      <p className="text-xs text-[#0F62FE] font-semibold print:text-black">{edu.degree}</p>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">{edu.period} • {edu.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Core Competencies Matrix */}
            <div className="space-y-2">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0F62FE] print:text-black">
                Core Competencies & Tools
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {SKILLS_DATA.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-800 text-xs font-mono font-semibold print:border-black print:text-black"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Sign-off */}
            <div className="text-center pt-4 border-t border-slate-200 text-xs font-mono text-slate-400 print:text-black">
              <span>Hassan Mohammad • SAP Senior Consultant • Deloitte India (Offices of the US)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
