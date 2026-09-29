export type SlideId = 'hero' | 'gallery-corridor' | 'trajectory' | 'experience' | 'education' | 'skills' | 'contact';

export interface TimelineExperience {
  company: string;
  totalDuration: string;
  type: string;
  roles: {
    title: string;
    period: string;
    duration?: string;
    location: string;
    workType?: string;
    description?: string;
    modules?: string[];
  }[];
}

export interface EducationItem {
  id?: string;
  institution: string;
  degree: string;
  field?: string;
  fieldOfStudy?: string;
  period: string;
  startYear?: number;
  endYear?: number;
  level: string;
  summary?: string;
  highlights?: string[];
  grade?: string;
  coursework?: string[];
  location?: string;
  logoUrl?: string;
}

export interface CertificationItem {
  id?: string;
  code?: string;
  title: string;
  issuer: string;
  issueDate?: string;
  issuedYear?: string;
  expiryDate?: string;
  credentialId?: string;
  description?: string;
}

export interface SkillItem {
  name: string;
  endorsements?: number;
  details?: string;
  highlight?: boolean;
  isHighlight?: boolean;
  category?: 'core' | 'sap' | 'business' | 'tools';
}

export interface CareerMilestone {
  id: string;
  stepNumber: number;
  title: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  era: 'yash' | 'deloitte';
  accentColor: string;
  description: string;
  keyHighlights: string[];
}
