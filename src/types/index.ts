export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  resume: string;
  leetcode?: string;
}

export interface Availability {
  status: 'available' | 'busy' | 'selective';
  headline: string;
  roles: string[];
  locationPreference: string; // e.g. "TODO: city/remote preference"
}

export interface ProfileData {
  name: string;
  fullName: string;
  role: string;
  positioningLine: string;
  bio: string[];
  availability: Availability;
  links: SocialLinks;
  media: {
    poster: string;
    videoMp4: string;
    videoWebm?: string;
    alt: string;
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  role: string;
  stack: string[];
  highlights: string[];
  result: string; // May contain TODO:
  links: {
    repo: string;
    live?: string;
  };
  category: 'Full-Stack' | 'AI / ML' | 'Systems';
  featured: boolean;
  architectureNotes?: string[];
  screenshotPlaceholder?: string;
}

export type InProgressStatus = 'Planning' | 'Building' | 'Testing';

export interface InProgressProject {
  id: string;
  title: string;
  description: string;
  status: InProgressStatus;
  progressPercent: number; // 0 - 100
  techChips: string[];
  repoUrl?: string;
  lastCommitDate?: string;
}

export interface SkillItem {
  name: string;
  level?: 'Intermediate' | 'Proficient' | 'Exploring';
  isPrimary?: boolean;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  badgeImage?: string;
  category: string;
  description?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  score: string;
  highlights?: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  context: string;
  date?: string;
  link?: string;
}

export interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number | null;
  submissionCalendar: Record<string, number>; // unix timestamp seconds -> count
  lastUpdated: string;
  isMock?: boolean;
}

