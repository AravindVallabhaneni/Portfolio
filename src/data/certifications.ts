import { CertificationItem } from '../types';

/**
 * Data-driven certifications collection.
 * Real verified certification from FACE Prep.
 */
export const certificationsData: CertificationItem[] = [
  {
    id: 'mongodb-associate-dba',
    title: 'MongoDB Associate Database Administrator',
    issuer: 'FACE Prep',
    issueDate: 'Certified',
    credentialUrl: undefined, // Add verification link when available
    badgeImage: '/media/cert-placeholder.svg',
    category: 'Database Administration',
    description:
      'Comprehensive certification in MongoDB administration, architecture, document schema design, indexing strategies, aggregation pipelines, and secure database operations.',
  },
];
