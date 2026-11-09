import { CertificationItem } from '../types';

/**
 * Data-driven certifications collection.
 * If empty, the UI can either hide the section or display a clean developer roadmap state.
 * To add your certifications, replace or populate the items below.
 */
export const certificationsData: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'TODO: Certification Name (e.g. Meta Front-End Developer / AWS Certified Cloud Practitioner)',
    issuer: 'TODO: Issuer (e.g. Coursera / AWS / DeepLearning.AI)',
    issueDate: 'TODO: Date',
    credentialUrl: 'https://example.com/verify-credential',
    badgeImage: '/media/cert-placeholder.svg',
    category: 'Cloud & Web',
    description: 'TODO: Brief description of verified skills and course objectives.',
  },
  {
    id: 'cert-2',
    title: 'TODO: Machine Learning or Database Specialization',
    issuer: 'TODO: Issuer',
    issueDate: 'TODO: Date',
    credentialUrl: 'https://example.com/verify-credential-2',
    badgeImage: '/media/cert-placeholder.svg',
    category: 'AI / Data',
    description: 'TODO: Brief description of verified skills.',
  },
];

