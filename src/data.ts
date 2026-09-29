import { TimelineExperience, EducationItem, CertificationItem, SkillItem, CareerMilestone } from './types';
import wesleyLogo from './assets/images/wesley_logo.png';
import iimcLogo from './assets/images/iimc_logo.png';
import sriChaitanyaLogo from './assets/images/srichaitanya_logo.png';

export const PERSONAL_INFO = {
  name: 'Hassan Mohammad',
  title: 'Senior Consultant',
  company: 'Deloitte India (Offices of the US)',
  office: 'Deloitte India (Offices of the US) (@Deloitte)',
  subhead: '@ Deloitte India (Offices of the US) | SAP MM, WM, Central Procurement | Expert in Implementation and Support projects',
  contextSummary: 'Senior SAP Consultant at Deloitte India (Offices of the US), specializing in SAP MM, WM, and Central Procurement.',
  location: 'Hyderabad, Telangana, India',
  address: 'India',
  phone: '+919059426502',
  phoneDisplay: '+919059426502 (Mobile)',
  email: 'hassan19890@gmail.com',
  linkedInUrl: 'https://www.linkedin.com/in/hassan-mohammad-07ab8838/',
  linkedInHandle: 'linkedin.com/in/hassan-mohammad-07ab8838',
  totalExperienceYears: 15,
  sapExperienceYears: 11,
  deloitteExperienceYears: 8,
  modulesCount: 3,
};

export const CAREER_MILESTONES: CareerMilestone[] = [
  {
    id: 'm1-assoc-trainee',
    stepNumber: 1,
    title: 'Associate Trainee',
    company: 'YASH Technologies',
    location: 'Hyderabad Area, India',
    period: 'Jan 2015 – Jul 2015',
    duration: '7 mos',
    era: 'yash',
    accentColor: '#38BDF8',
    description: 'Involved in Implementation Project as Junior — SAP Materials Management (SAP MM)',
    keyHighlights: ['SAP MM Foundation', 'Implementation Lifecycle', 'Procurement Basics']
  },
  {
    id: 'm2-trainee-consultant',
    stepNumber: 2,
    title: 'Trainee Consultant',
    company: 'YASH Technologies',
    location: 'Hyderabad, Telangana, India',
    period: 'Aug 2015 – Mar 2017',
    duration: '1 yr 8 mos',
    era: 'yash',
    accentColor: '#0EA5E9',
    description: 'Individually handling Shared Support Services, SAP MM Support and Rollout Projects',
    keyHighlights: ['Shared Support Services', 'SAP Warehouse Management', 'Rollout Projects']
  },
  {
    id: 'm3-assoc-consultant',
    stepNumber: 3,
    title: 'Associate Consultant',
    company: 'YASH Technologies',
    location: 'Hyderabad, Telangana, India',
    period: 'Apr 2017 – Apr 2018',
    duration: '1 yr 1 mo',
    era: 'yash',
    accentColor: '#0284C7',
    description: 'Individually handling Shared Support Services, SAP MM Support and Rollout Projects',
    keyHighlights: ['MM Support Lead', 'WM Configuration', 'Integration Testing']
  },
  {
    id: 'm4-consultant',
    stepNumber: 4,
    title: 'Consultant',
    company: 'Deloitte India (Offices of the US)',
    location: 'Hyderabad Area, India',
    period: 'Apr 2018 – May 2021',
    duration: '3 yrs 2 mos',
    era: 'deloitte',
    accentColor: '#2563EB',
    description: 'Enterprise consulting for global clients, handling SAP S/4HANA supply chain, procurement & inventory transformations.',
    keyHighlights: ['Global SAP Deployments', 'S/4HANA Transformations', 'Client Workstreams']
  },
  {
    id: 'm5-sr-consultant',
    stepNumber: 5,
    title: 'Senior Consultant',
    company: 'Deloitte India (Offices of the US)',
    location: 'Hyderabad, Telangana, India',
    period: 'May 2021 – Present',
    duration: '5 yrs 4 mos',
    era: 'deloitte',
    accentColor: '#0F62FE',
    description: 'Senior Consultant leading SAP MM, WM & Central Procurement initiatives across complex multi-system enterprise architectures.',
    keyHighlights: ['SAP Central Procurement', 'SAP Materials Management', 'Strategic Consulting Leadership']
  }
];

export const BIO_PARAGRAPHS = [
  "As a Senior Consultant at Deloitte India (Offices of the US) with over eight years within the organization, I specialize in SAP solutions, including SAP MM, WM, and Central Procurement. My expertise lies in SAP configuration, integration, enhancement, and support, enabling businesses to optimize their operations and streamline processes. I hold multiple SAP certifications, reflecting my commitment to delivering innovative and effective solutions tailored to client needs.",
  "Deloitte India (Offices of the US) has provided a platform to collaborate on SAP S/4HANA and Ariba implementations for diverse industries. My focus remains on facilitating efficient inventory, warehouse management, product sourcing, and commerce automation. Guided by a passion for teamwork and client satisfaction, I aim to drive business value through scalable SAP solutions and strategic consulting."
];

export const EXPERIENCES: TimelineExperience[] = [
  {
    company: 'Deloitte India (Offices of the US) (@Deloitte)',
    totalDuration: '8 yrs 5 mos',
    type: 'Full-time',
    roles: [
      {
        title: 'Senior Consultant',
        period: 'May 2021 – Present',
        duration: '5 yrs 4 mos',
        location: 'Hyderabad, Telangana, India',
        workType: 'Full-time',
        description: 'Senior Consultant at Deloitte India (Offices of the US), specializing in SAP MM, WM, and Central Procurement. Over seven years of experience in SAP solutions, including configuration, integration, enhancement, and support.',
        modules: ['SAP Central Procurement', 'SAP MM', 'SAP WM', 'S/4HANA Sourcing']
      },
      {
        title: 'Consultant',
        period: 'Apr 2018 – May 2021',
        duration: '3 yrs 2 mos',
        location: 'Hyderabad Area, India',
        workType: 'Full-time',
        description: 'Consultant at Deloitte India (Offices of the US) handling SAP MM and WM implementation and global client rollout projects.',
        modules: ['SAP Materials Management', 'SAP Warehouse Management', 'Ariba Integration']
      }
    ]
  },
  {
    company: 'YASH Technologies',
    totalDuration: '3 yrs 4 mos',
    type: 'Full-time',
    roles: [
      {
        title: 'Associate Consultant',
        period: 'Apr 2017 – Apr 2018',
        duration: '1 yr 1 mo',
        location: 'Hyderabad, Telangana, India',
        workType: 'Full-time',
        description: 'Shared Support Services Lead, SAP MM/WM Support and Rollout Projects.',
        modules: ['SAP MM Support', 'WM Configuration', 'Integration Testing']
      },
      {
        title: 'Trainee Consultant',
        period: 'Aug 2015 – Mar 2017',
        duration: '1 yr 8 mos',
        location: 'Hyderabad, Telangana, India',
        workType: 'Full-time',
        description: 'Individually managing Shared Support Services, SAP MM Support and Rollout Projects.',
        modules: ['Shared Support Services', 'SAP WM', 'Rollouts']
      },
      {
        title: 'Associate Trainee',
        period: 'Jan 2015 – Jul 2015',
        duration: '7 mos',
        location: 'Hyderabad Area, India',
        workType: 'Full-time',
        description: 'Involved in Implementation Project as Junior — SAP Materials Management (SAP MM)',
        modules: ['SAP MM Baseline', 'Procurement Basics']
      }
    ]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-wesley-mba',
    institution: 'Wesley PG College',
    degree: 'Master of Business Administration (MBA)',
    field: 'Finance and Marketing',
    fieldOfStudy: 'Finance and Marketing',
    period: '2011 – 2013',
    startYear: 2011,
    endYear: 2013,
    level: 'Master’s Degree',
    location: 'Hyderabad, Telangana, India',
    logoUrl: wesleyLogo
  },
  {
    id: 'edu-iimc-bcom',
    institution: 'IIMC Degree College',
    degree: 'Bachelor of Commerce - BCom (Honours)',
    field: 'Commerce',
    fieldOfStudy: 'Commerce',
    period: 'Jun 2007 – Apr 2010',
    startYear: 2007,
    endYear: 2010,
    level: 'Bachelor’s Degree',
    location: 'Hyderabad, Telangana, India',
    logoUrl: iimcLogo
  },
  {
    id: 'edu-sri-chaitanya',
    institution: 'Sri Chaitanya Junior College',
    degree: 'Intermediate (10+2)',
    field: 'M E C (Mathematics, Economics, Commerce), Accounts',
    fieldOfStudy: 'M E C (Mathematics, Economics, Commerce), Accounts',
    period: '2005 – 2007',
    startYear: 2005,
    endYear: 2007,
    level: 'Intermediate (10+2)',
    location: 'Hyderabad, Telangana, India',
    logoUrl: sriChaitanyaLogo
  },
  {
    id: 'edu-nalanda-high-school',
    institution: 'Nalanda Vidyalaya High School',
    degree: 'Secondary School Certificate (SSC)',
    field: 'Till 10th Standard',
    fieldOfStudy: 'Till 10th Standard',
    period: '1994 – 2005',
    startYear: 1994,
    endYear: 2005,
    level: 'Secondary School (SSC)',
    location: 'Hyderabad, Telangana, India'
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-s4hana-sourcing-upskilling',
    title: 'SAP Certified Application Associate - SAP S/4HANA Sourcing and Procurement - Upskilling for SAP ERP Experts',
    issuer: 'SAP',
    issueDate: 'Issued Apr 2022',
    issuedYear: '2022',
    credentialId: 'SAP Verified Credential'
  },
  {
    id: 'cert-sap-mm',
    title: 'SAP Material Management',
    issuer: 'SAP',
    issueDate: 'Issued Nov 2016 · Expires Dec 2027',
    issuedYear: '2016',
    expiryDate: 'Dec 2027',
    credentialId: 'SAP Verified Credential'
  }
];

export const SKILLS_DATA: SkillItem[] = [
  { name: 'SAP Materials Management (MM)', endorsements: 8, highlight: true, category: 'core', details: 'Expert in P2P cycle, baseline config, invoice verification & master data.' },
  { name: 'SAP Central Procurement', endorsements: 9, highlight: true, category: 'sap', details: 'Architecting central requisitioning, central purchasing & contracts hub.' },
  { name: 'SAP Warehouse Management (WM)', endorsements: 7, highlight: true, category: 'core', details: 'Storage bin topology, transfer orders, movement types & stock reconciliation.' },
  { name: 'SAP S/4HANA Sourcing & Procurement', endorsements: 8, highlight: true, category: 'sap', details: 'Certified associate with full lifecycle transformation deployments.' },
  { name: 'Shared Support Services', endorsements: 7, highlight: false, category: 'business', details: 'Individually leading global shared support with 99.4% SLA adherence.' },
  { name: 'SAP Ariba Integration', endorsements: 6, highlight: false, category: 'tools', details: 'Guided Buying punch-out catalog and supplier connectivity.' },
  { name: 'Full-Cycle Client Rollouts', endorsements: 6, highlight: false, category: 'business', details: 'End-to-end cutover, mock dry-runs, testing & hypercare stabilization.' },
  { name: 'Integration with FI / SD', endorsements: 5, highlight: false, category: 'sap', details: 'Automatic account determination, billing & delivery touchpoints.' },
  { name: 'Inventory Management', endorsements: 5, highlight: false, category: 'core', details: 'Physical inventory valuation, stock adjustments & batch tracking.' },
  { name: 'Solution Architecture & Design', endorsements: 6, highlight: false, category: 'business', details: 'Creating enterprise SDD documentation and client consulting strategy.' }
];

export const CERTIFICATIONS_DATA = CERTIFICATIONS;
